use std::collections::BTreeMap;
use std::fs;
use std::path::Path;

use anyhow::{Context, Result, bail};

#[derive(serde::Serialize)]
pub struct Env {
    pub twitch_oauth_client_id: String,
    pub twitch_oauth_redirect_url: String,
}

#[derive(Clone, Copy)]
pub enum Mode {
    Development,
    Production,
}

impl Mode {
    pub fn is_development(&self) -> bool {
        matches!(self, Self::Development)
    }

    pub fn is_production(&self) -> bool {
        matches!(self, Self::Production)
    }
}

/// Load environment variables.
///
/// Order: `std::env::var`, `.env.{mode}`
pub fn load(root_dir: &Path, mode: Mode) -> Result<Env> {
    let path = match mode {
        Mode::Development => root_dir.join(".env.development"),
        Mode::Production => root_dir.join(".env.production"),
    };
    let dotenv = match fs::read_to_string(&path) {
        Ok(file) => {
            parse_dotenv(&file).with_context(|| format!("failed to parse {}", path.display()))?
        }
        Err(err) if err.kind() == std::io::ErrorKind::NotFound => BTreeMap::new(),
        Err(err) => return Err(err.into()),
    };

    // Get var from `std::env` or `.env.{mode}`
    let get = |name: &str| -> Result<String> {
        match std::env::var(name) {
            Ok(value) => Ok(value),
            Err(_) => dotenv
                .get(name)
                .cloned()
                .with_context(|| format!("missing environment variable {name}")),
        }
    };

    Ok(Env {
        twitch_oauth_client_id: get("TWITCH_OAUTH_CLIENT_ID")?,
        twitch_oauth_redirect_url: get("TWITCH_OAUTH_REDIRECT_URL")?,
    })
}

/// Parse a `.env` file
fn parse_dotenv(source: &str) -> Result<BTreeMap<String, String>> {
    let mut vars = BTreeMap::new();
    for line in source.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let Some((key, value)) = line.split_once('=') else {
            bail!("line without `=`: {line:?}");
        };
        vars.insert(key.trim().to_owned(), value.trim().to_owned());
    }
    Ok(vars)
}
