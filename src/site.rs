use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};
use minijinja::syntax::SyntaxConfig;
use minijinja::value::Value;
use minijinja::{AutoEscape, Environment, context};
use walkdir::WalkDir;

use crate::env::Env;
use crate::{components, markdown};

/// Render the site rooted at `root` into `out_dir`.
pub fn render(root: &Path, out_dir: &Path, vars: &Env) -> Result<()> {
    let mut env = jinja_environment();
    add_templates(&mut env, root)?;
    components::register(&mut env, vars);

    let pages = collect_pages(root)?;
    copy_directory_recursive(&root.join("public"), out_dir)?;
    copy_directory_recursive(&root.join("styles"), &out_dir.join("styles"))?;
    render_site(&env, &pages, out_dir)?;
    Ok(())
}

fn jinja_environment() -> Environment<'static> {
    let mut env = Environment::new();
    env.set_auto_escape_callback(|_| AutoEscape::Html);
    // The default comment delimiters `{# .. #}` collide with the `{#heading-id}` markdown syntax.
    env.set_syntax(
        SyntaxConfig::builder()
            .comment_delimiters("{!", "!}")
            .build()
            .expect("valid syntax config"),
    );
    env
}

/// Load `{root}/templates` into the environment
fn add_templates(env: &mut Environment<'static>, root: &Path) -> Result<()> {
    let dir = root.join("templates");
    for relative_path in collect_files_sorted(&dir)? {
        let path = dir.join(&relative_path);
        let source = fs::read_to_string(&path)
            .with_context(|| format!("failed to read {}", path.display()))?;
        env.add_template_owned(relative_path, source)?;
    }
    Ok(())
}

/// Collect all pages in `{root}/pages`.
fn collect_pages(root: &Path) -> Result<Vec<Page>> {
    let dir = root.join("pages");
    let mut pages = Vec::new();
    for relative_path in collect_files_sorted(&dir)? {
        let path = dir.join(&relative_path);
        let source = fs::read_to_string(&path)
            .with_context(|| format!("failed to read {}", path.display()))?;
        let page = Page::parse(&relative_path, source)
            .with_context(|| format!("failed to parse {}", path.display()))?;
        pages.push(page);
    }
    Ok(pages)
}

fn render_site(env: &Environment, pages: &[Page], out_dir: &Path) -> Result<()> {
    if pages.is_empty() {
        return Ok(());
    }

    // Split pages into chunks and render chunks in parallel.
    let threads = std::thread::available_parallelism()
        .map(|n| n.get())
        .unwrap_or(1)
        .min(pages.len());
    let chunk_size = pages.len().div_ceil(threads);

    // Each page can fail to render independently, we aggregate the errors.
    let errors: Vec<anyhow::Error> = std::thread::scope(|scope| {
        let mut handles = Vec::with_capacity(pages.len() % chunk_size);

        for chunk in pages.chunks(chunk_size) {
            handles.push(scope.spawn(move || {
                let mut errors = Vec::new();

                for page in chunk {
                    if let Err(err) = render_single_page(env, page, out_dir) {
                        let err = err.context(format!("failed to render {}", page.template_name));
                        errors.push(err);
                    }
                }

                errors
            }));
        }

        handles
            .into_iter()
            .flat_map(|handle| handle.join().expect("render thread panicked"))
            .collect()
    });

    if !errors.is_empty() {
        let mut message = format!("failed to render {} page(s):", errors.len());
        for error in &errors {
            write!(message, "\n  {error:#}").expect("writing to a string cannot fail");
        }
        bail!(message);
    }

    Ok(())
}

fn render_single_page(env: &Environment, page: &Page, out_dir: &Path) -> Result<()> {
    let template = env.template_from_named_str(&page.template_name, &page.source)?;
    let html = match page.kind {
        PageKind::Html => template.render(context! {})?,
        PageKind::Markdown => {
            let md = template.render(context! {})?;
            let content = markdown::to_html(&md);
            let wrapper = env.get_template("markdown.j2")?;
            wrapper.render(context! {
                content => Value::from_safe_string(content),
                meta => page.meta,
            })?
        }
    };

    let out_path = out_dir.join(&page.relative_output_path);
    if let Some(parent) = out_path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&out_path, html).with_context(|| format!("failed to write {}", out_path.display()))
}

struct Page {
    kind: PageKind,

    /// Jinja source of the page, with any front matter stripped.
    source: String,

    /// Template name for error messages, e.g. `pages/a/b.j2`.
    template_name: String,

    /// Output path relative to the output directory, e.g. `a/b.html`.
    relative_output_path: PathBuf,

    /// Front matter, exposed to the wrapper template of markdown pages.
    meta: BTreeMap<String, String>,
}

enum PageKind {
    Html,
    Markdown,
}

impl Page {
    /// Read a file from `pages`, so we can check whether it's markdown or plain HTML.
    ///
    /// If markdown, this also parses the frontmatter.
    fn parse(relative_path: &str, source: String) -> Result<Page> {
        let Some(stem) = relative_path.strip_suffix(".j2") else {
            bail!("expected a `.j2` extension");
        };

        let (kind, stem) = match stem.strip_suffix(".md") {
            Some(stem) => (PageKind::Markdown, stem),
            None => (PageKind::Html, stem),
        };

        let (meta, source) = match kind {
            PageKind::Markdown => {
                let fm = Frontmatter::parse(source)?;
                (fm.data, fm.body)
            }
            PageKind::Html => (BTreeMap::new(), source),
        };

        Ok(Page {
            template_name: format!("pages/{relative_path}"),
            relative_output_path: PathBuf::from(format!("{stem}.html")),
            kind,
            meta,
            source,
        })
    }
}

struct Frontmatter {
    data: BTreeMap<String, String>,
    body: String,
}

impl Frontmatter {
    fn parse(source: String) -> Result<Self> {
        let Some(rest) = source.strip_prefix("---\n") else {
            return Ok(Self {
                data: BTreeMap::new(),
                body: source,
            });
        };
        let Some((header, body)) = rest.split_once("\n---\n") else {
            bail!("unterminated front matter");
        };

        let mut meta = BTreeMap::new();
        for line in header.lines() {
            let Some((key, value)) = line.split_once(':') else {
                bail!("front matter line without `:`: {line:?}");
            };
            meta.insert(key.trim().to_owned(), value.trim().to_owned());
        }
        Ok(Self {
            data: meta,
            body: body.to_owned(),
        })
    }
}

/// Collect all files under `dir` as paths relative to `dir`.
fn collect_files_sorted(dir: &Path) -> Result<Vec<String>> {
    let mut files = Vec::new();
    for entry in WalkDir::new(dir).sort_by_file_name() {
        let entry = entry?;
        if !entry.file_type().is_file() {
            continue;
        }
        let path = entry
            .path()
            .strip_prefix(dir)
            .expect("walked path is under its root")
            .components()
            .map(|c| c.as_os_str().to_str().expect("non-utf8 path"))
            .collect::<Vec<_>>()
            .join("/");
        files.push(path);
    }
    Ok(files)
}

/// Copy all files from `source` to `destination`, recursively.
///
/// Leaves behind any files already in `destination`.
fn copy_directory_recursive(source: &Path, destination: &Path) -> Result<()> {
    for relative_path in collect_files_sorted(source)? {
        let from = source.join(&relative_path);
        let to = destination.join(&relative_path);
        if let Some(parent) = to.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::copy(&from, &to)
            .with_context(|| format!("failed to copy {} to {}", from.display(), to.display()))?;
    }
    Ok(())
}
