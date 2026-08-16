use std::format_args as f;
use std::path::PathBuf;

use crate::env;

pub struct Args {
    /// Directory to output files into.
    pub output_dir: Option<PathBuf>,

    /// Build mode.
    pub mode: env::Mode,
}

impl Args {
    pub fn parse() -> Args {
        let mut output_dir: Option<PathBuf> = None;
        let mut mode: Option<env::Mode> = None;

        let mut args = std::env::args().skip(1);
        while let Some(arg) = args.next() {
            match arg.as_str() {
                "-o" | "--output" => {
                    if output_dir.is_some() {
                        exit_with_help(f!("`{arg}` may only be specified once"));
                    }
                    let Some(path) = args.next() else {
                        exit_with_help(f!("expected file name after `{arg}`"));
                    };
                    output_dir = Some(PathBuf::from(path));
                }

                "--dev" => {
                    if mode.is_some_and(|v| v.is_development()) {
                        exit_with_help(f!("duplicate argument `{arg}`"));
                    }
                    if mode.is_some_and(|v| v.is_production()) {
                        exit_with_help(f!("`{arg}` cannot be used together with `--prod`"));
                    }
                    mode = Some(env::Mode::Development);
                }
                "--prod" => {
                    if mode.is_some_and(|v| v.is_production()) {
                        exit_with_help(f!("duplicate argument `{arg}`"));
                    }
                    if mode.is_some_and(|v| v.is_development()) {
                        exit_with_help(f!("`{arg}` cannot be used together with `--dev`"));
                    }
                    mode = Some(env::Mode::Production);
                }

                "-h" | "--help" => {
                    usage();
                    std::process::exit(0);
                }

                _ => {
                    exit_with_help(f!("unrecognized argument: `{arg}`"));
                }
            }
        }

        let mode = mode.unwrap_or(env::Mode::Development);

        Args { output_dir, mode }
    }
}

/// Print `problem` and help, then exit
fn exit_with_help(problem: impl std::fmt::Display) -> ! {
    eprintln!("{problem}\n");
    usage();
    std::process::exit(1);
}

fn usage() {
    let exe = std::env::args().next().expect("where is the exe arg");
    eprintln!(
        "\
{exe} [OPTIONS]

Options:
    --dev          build in development mode
    --prod         build in production mode
    -o, --output   path to output directory
    -h, --help     print this message
"
    )
}
