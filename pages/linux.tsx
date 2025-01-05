import React from "react";
import Section from "../components/section";
import Link from "../components/link";
import Text from "../components/text";
import Page from "../components/page";
import {
  currentVersion,
  linuxAppimageUrl,
  linuxBuildFromSource,
} from "../links";

function LinuxPage() {
  const ubuntu2404Link = `https://github.com/Chatterino/chatterino2/releases/download/v${currentVersion}/Chatterino-Ubuntu-24.04.deb`;
  const ubuntu2204Link = `https://github.com/Chatterino/chatterino2/releases/download/v${currentVersion}/Chatterino-Ubuntu-22.04.deb`;
  const ubuntu2004Link = `https://github.com/Chatterino/chatterino2/releases/download/v${currentVersion}/Chatterino-Ubuntu-20.04.deb`;
  return (
    <Page title="Chatterino on Linux">
      <div className="p-16">
        <Section>
          <h1 className="text-5xl">Chatterino on Linux</h1>
          {/* Ubuntu 24.04 */}
          <h2 className="text-3xl pt-10 pb-4">Ubuntu 24.04 (Noble Numbat)</h2>
          <Text>
            A .deb file is available from{" "}
            <Link href={ubuntu2404Link}>here</Link>.
          </Text>
          <Text>
            The Universe repository must be enabled for it to download the
            relevant dependencies.
          </Text>
          {/* Ubuntu 22.04 */}
          <h2 className="text-3xl pt-10 pb-4">
            Ubuntu 22.04 (Jammy Jellyfish)
          </h2>
          <Text>
            A .deb file is available from{" "}
            <Link href={ubuntu2204Link}>here</Link>.
          </Text>
          <Text>
            The Universe repository must be enabled for it to download the
            relevant dependencies.
          </Text>
          {/* Ubuntu 20.04 */}
          <h2 className="text-3xl pt-10 pb-4">Ubuntu 20.04 (Focal Fossa)</h2>
          <Text>
            A .deb file is available from{" "}
            <Link href={ubuntu2004Link}>here</Link>.
          </Text>
          <Text>
            The Universe repository must be enabled for it to download the
            relevant dependencies.
          </Text>
          {/* Flatpak */}
          <h2 className="text-3xl pt-10 pb-4">Flatpak</h2>
          <Text>
            Chatterino is available on{" "}
            <Link href="https://flathub.org/apps/details/com.chatterino.chatterino">
              Flathub
            </Link>
            . To install it run:{" "}
            <code className="p-1 px-2 mt-4 border-gray-600 border bg-gray-900">
              flatpak install chatterino
            </code>{" "}
          </Text>
          {/* AUR */}
          <h2 className="text-3xl pt-10 pb-4">Arch Linux</h2>
          <Text>
            The{" "}
            <Link href="https://aur.archlinux.org/packages/chatterino2-git/">
              chatterino2-git
            </Link>{" "}
            package will build and install chatterino.
          </Text>
          {/* Fedora */}
          <h2 className="text-3xl pt-10 pb-4">Fedora Linux</h2>
          <Text>
            Run{" "}
            <code className="p-1 px-2 mt-4 border-gray-600 border bg-gray-900">
              dnf install chatterino2
            </code>{" "}
            to install it from the ports tree.
          </Text>
          {/* AppImage */}
          <h2 className="text-3xl pt-10 pb-4">AppImage for all distros</h2>
          <Text>
            You can install an AppImage with all dependencies bundled in a
            single executable. Run this script in a terminal to install:
            <div className="p-4 mt-4 bg-gray-900 border-gray-600 border">
              <pre>cd /usr/local/bin</pre>
              <pre>
                sudo bash -c "curl {linuxAppimageUrl} &gt; ./chatterino"
              </pre>
              <pre>sudo chmod +x ./chatterino</pre>
            </div>
          </Text>
          {/* Building from Source */}
          <h2 className="text-3xl pt-10 pb-4">Building from Source</h2>
          <Text>
            If the options above don't work, then you can try{" "}
            <Link href={linuxBuildFromSource}>this guide</Link> to build it from
            source.
          </Text>
        </Section>
      </div>
    </Page>
  );
}

export default LinuxPage;
