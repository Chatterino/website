import { ReactNode } from "react";
import { Tux, Windows, FreeBSD, Apple } from "./components/logos";

export const discord = "https://discord.gg/rabs2GZd8b";
export const github = "https://github.com/chatterino/chatterino2";
export const tip = "https://streamelements.com/fourtf/tip";
export const wiki = "https://wiki.chatterino.com";
export const nightly =
  "https://github.com/Chatterino/chatterino2/releases/tag/nightly-build";
export const allDownloads = "download";

export const currentVersion = "2.5.4";
export const baseDownloadLink = `https://chatterino.fra1.digitaloceanspaces.com/bin`;
const dl = `https://chatterino.fra1.digitaloceanspaces.com/bin/${currentVersion}`;

export const allVersions = [
  "2.1.0",
  "2.1.4",
  "2.1.5-4",
  "2.1.6",
  "2.1.7",
  "2.2.0",
  "2.2.1",
  "2.2.2-fix",
  "2.2.3-beta2",
  "2.3.0",
  "2.3.1",
  "2.3.2",
  "2.3.3",
  "2.3.4",
  "2.3.5",
  "2.4.0",
  "2.4.1",
  "2.4.2",
  "2.4.3",
  "2.4.4",
  "2.4.5",
  "2.4.6",
  "2.5.0",
  "2.5.1",
  "2.5.2",
];
export const allV1Versions = [
  "0.2.6.4",
  "1.0.9",
  "1.1.0.0",
  "1.2.11",
  "1.2.12",
  "1.2.13",
  "1.2.3.0",
  "1.2.4",
  "1.2.5",
  "1.2.6",
  "1.2.8",
  "1.2.9",
  "1.3.2",
  "1.3",
];

export type DownloadType = [() => React.JSX.Element, string, string];
export const windows: DownloadType = [
  Windows,
  `${currentVersion} for Windows 64-Bit`,
  `${dl}/Chatterino.Installer.exe`,
];
export const linux: DownloadType = [Tux, "Linux", "linux"];
export const freeBsd: DownloadType = [FreeBSD, "FreeBSD", "freebsd"];
export const macOs: DownloadType = [Apple, "macOS", `${dl}/Chatterino.dmg`];
export const windowsPortable = `${dl}/Chatterino.Portable.zip`;
export const linuxAppimageUrl = `${dl}/Chatterino-x86_64.AppImage`;

export const linuxBuildFromSource =
  "https://github.com/Chatterino/chatterino2/blob/master/BUILDING_ON_LINUX.md";
