mod args;
mod components;
mod env;
mod markdown;
mod site;

use std::path::{Path, PathBuf};

use args::Args;

fn main() -> anyhow::Result<()> {
    let args = Args::parse();

    let root_dir = Path::new(".");
    let output_dir = args.output_dir.unwrap_or_else(|| PathBuf::from("out"));
    let env = env::load(root_dir, args.mode)?;

    site::render(root_dir, &output_dir, &env)
}
