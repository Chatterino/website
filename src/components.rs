use std::collections::BTreeMap;
use std::sync::Mutex;

use minijinja::value::{Kwargs, Value};
use minijinja::{Environment, Error, ErrorKind, State, context};

use crate::env::Env;

pub fn register(env: &mut Environment, vars: &Env) {
    env.add_global("env", Value::from_serialize(vars));

    env.add_function("read_json", read_json);
    env.add_function("credit", credit);
    env.add_function("github_user", |username: String| {
        Value::from_safe_string(github_user(&username))
    });
    env.add_function("figure", figure);
    env.add_function("redirect", redirect);
    env.add_filter("callout", callout);
}

/// Escape some characters into HTML entities
pub fn basic_html_escape(text: &str) -> String {
    let mut out = String::with_capacity(text.len());
    for c in text.chars() {
        match c {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            c => out.push(c),
        }
    }
    out
}

fn github_user(username: &str) -> String {
    let username = username.trim();
    format!(
        concat!(
            r#"<a href="https://github.com/{username}" class="gh-author">"#,
            r#"<img src="https://avatars.githubusercontent.com/{username}?v=4&amp;s=60" class="gh-avatar">"#,
            r#"@{username}</a>"#,
        ),
        username = username,
    )
}

fn pull_request(id: &str) -> String {
    let id = id.trim();
    format!(
        r##"<a href="https://github.com/Chatterino/chatterino2/pull/{id}" class="gh-pr">#{id}</a>"##
    )
}

/// - 1 item: `X`
/// - 2 items: `X and Y`
/// - 3+ items: `<span>X, </span><span>Y, </span>and Z`
fn format_list(items: &[String]) -> String {
    match items {
        [] => String::new(),
        [a] => a.clone(),
        [a, b] => format!("{a} and {b}"),
        [init @ .., last] => {
            let mut out = String::new();
            for item in init {
                out.push_str(&format!("<span>{item}, </span>"));
            }
            out.push_str(&format!("and {last}"));
            out
        }
    }
}

/// Read `path` and deserialize it from JSON.
fn read_json(path: &str) -> Result<Value, Error> {
    static FILE_CACHE: Mutex<BTreeMap<String, String>> = const { Mutex::new(BTreeMap::new()) };

    let mut cache = FILE_CACHE.lock().expect("not poisoned");
    if let Some(s) = cache.get(path) {
        return Ok(serde_json::from_str(s).expect("parsed before, cannot fail"));
    }

    let s = std::fs::read_to_string(path)
        .map_err(|e| Error::new(ErrorKind::InvalidOperation, e.to_string()))?;
    let v = serde_json::from_str(&s)
        .map_err(|e| Error::new(ErrorKind::CannotDeserialize, e.to_string()))?;

    // only insert after successful read + parse
    cache.insert(path.to_owned(), s.clone());

    Ok(v)
}

/// `Authored by ..., ..., and ... with help from ..., ..., and ... in #1337`
fn credit(kwargs: Kwargs) -> Result<Value, Error> {
    let author: String = kwargs.get("author")?;
    let helper: Option<String> = kwargs.get("helper")?;
    let prs: Option<String> = kwargs.get("prs")?;
    let inline: Option<bool> = kwargs.get("inline")?;
    kwargs.assert_all_used()?;

    let users = |list: &str| -> Vec<String> { list.split(',').map(github_user).collect() };

    let mut contents = format!("Authored by {}", format_list(&users(&author)));
    if let Some(helper) = helper {
        contents.push_str(&format!(" with help from {}", format_list(&users(&helper))));
    }
    if let Some(prs) = prs {
        let prs: Vec<String> = prs.split(',').map(pull_request).collect();
        contents.push_str(&format!(" in {}", format_list(&prs)));
    }

    let tag = if inline.unwrap_or(false) {
        "span"
    } else {
        "div"
    };
    Ok(Value::from_safe_string(format!(
        r#"<{tag} class="credit">{contents}</{tag}>"#
    )))
}

/// Image/video with optional caption
fn figure(src: &str, kwargs: Kwargs) -> Result<Value, Error> {
    let caption: Option<String> = kwargs.get("caption")?;
    let width: Option<u32> = kwargs.get("width")?;
    kwargs.assert_all_used()?;

    let src_attr = basic_html_escape(src);
    let width_attr = match width {
        Some(width) => format!(r#" width="{width}""#),
        None => String::new(),
    };
    let media = if src.ends_with(".webm") {
        format!(
            r#"<video src="{src_attr}"{width_attr} controls autoplay playsinline loop></video>"#
        )
    } else {
        format!(r#"<img src="{src_attr}"{width_attr}>"#)
    };
    let caption = caption.unwrap_or_default();
    Ok(Value::from_safe_string(format!(
        "<figure>{media}<figcaption>{caption}</figcaption></figure>"
    )))
}

/// A full HTML document that redirects to `url`.
fn redirect(url: &str) -> Value {
    let url = basic_html_escape(url);
    Value::from_safe_string(format!(
        r#"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url={url}">
    <title>Redirecting</title>
  </head>
  <body>
    <a href="{url}">Click this if you are not being redirected.</a>
  </body>
</html>
"#
    ))
}

fn callout(state: &State, content: &str, kind: &str) -> Result<Value, Error> {
    let (title, class, icon_template) = match kind {
        "note" => ("Note", "callout-note", "icons/callout_note.svg"),
        _ => {
            return Err(Error::new(
                ErrorKind::InvalidOperation,
                format!("unknown callout type: {kind}"),
            ));
        }
    };
    let icon = state
        .env()
        .get_template(icon_template)?
        .render(context! {})?;
    let icon = icon.trim_end();
    Ok(Value::from_safe_string(format!(
        concat!(
            r#"<div class="callout {class}">"#,
            r#"<div class="callout-title">{icon} {title}</div>"#,
            r#"<div>{content}</div>"#,
            r#"</div>"#,
        ),
        class = class,
        icon = icon,
        title = title,
        content = content,
    )))
}
