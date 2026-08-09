use std::fs;
use std::path::Path;

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};

// #[derive(Deserialize, Serialize)]
// pub struct Links {
//     pub discord: String,
//     pub github: String,
//     pub tip: String,
//     pub wiki: String,
//     pub nightly: String,
//     pub all_downloads: String,
//     pub current_version: String,
//     pub base_download_link: String,
//     pub linux_build_from_source: String,
//     pub versions: Vec<String>,
// }

// /// Load `links.json`, which contains various links, base urls, and also c2 versions.
// pub fn load(path: &Path) -> Result<Links> {
//     let source =
//         fs::read_to_string(path).with_context(|| format!("failed to read {}", path.display()))?;
//     serde_json::from_str(&source).with_context(|| format!("failed to parse {}", path.display()))
// }

// #[derive(Deserialize, Serialize)]
// pub struct Download {
//     pub icon: String,
//     pub label: String,
//     pub href: String,
// }

// #[derive(Serialize)]
// pub struct Downloads {
//     pub windows: Download,
//     pub linux: Download,
//     pub macos: Download,
//     pub freebsd: Download,
//     pub windows_portable: String,
// }

// impl Downloads {
//     pub fn new(links: &Links) -> Downloads {
//         let version = &links.current_version;
//         let dl = format!("{}/{version}", links.base_download_link);
//         Downloads {
//             windows: Download {
//                 icon: "windows".to_owned(),
//                 label: format!("{version} for Windows 64-Bit"),
//                 href: format!("{dl}/Chatterino.Installer.exe"),
//             },
//             linux: Download {
//                 icon: "tux".to_owned(),
//                 label: "Linux".to_owned(),
//                 href: "linux".to_owned(),
//             },
//             macos: Download {
//                 icon: "apple".to_owned(),
//                 label: "macOS".to_owned(),
//                 href: format!("{dl}/Chatterino.dmg"),
//             },
//             freebsd: Download {
//                 icon: "freebsd".to_owned(),
//                 label: "FreeBSD".to_owned(),
//                 href: "freebsd".to_owned(),
//             },
//             windows_portable: format!("{dl}/Chatterino.Portable.zip"),
//         }
//     }
// }
