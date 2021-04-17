import { Tux, Windows, FreeBSD, Apple } from "components/logos";

export const discord = "https://discord.gg/3vmJRwy";
export const github = "https://github.com/chatterino/chatterino2";
export const tip = "https://streamelements.com/fourtf/tip";
export const wiki = "https://wiki.chatterino.com";
export const nightly =
  "https://github.com/Chatterino/chatterino2/releases/tag/nightly-build";
export const allDownloads = "download";

const currentVersion = "2.3.0";
const downloadBaseUrl = `https://chatterino.fra1.digitaloceanspaces.com/bin/${currentVersion}`;

export const windows = [
  Windows,
  `${currentVersion} for Windows 64-Bit`,
  `${downloadBaseUrl}/Chatterino%20Installer.exe`,
];
export const linux = [Tux, "Linux", "linux"];
export const freeBsd = [FreeBSD, "FreeBSD", "freebsd"];
export const macOs = [Apple, "macOS", `${downloadBaseUrl}/Chatterino.dmg`];
export const windowsPortable = `${downloadBaseUrl}/Chatterino%20Portable.zip`;
export const linuxAppimageUrl = `${downloadBaseUrl}/Chatterino-x86_64.AppImage`;

export const linuxBuildFromSource =
  "https://github.com/Chatterino/chatterino2/blob/master/BUILDING_ON_LINUX.md";
