import React from "react";
import Section from "../components/section";
import Link from "../components/link";
import Text from "../components/text";
import Page from "../components/page";
import { currentVersion, linuxBuildFromSource } from "../links";

function LinuxPage() {
  const ubuntu2404Link = `https://github.com/Chatterino/chatterino2/releases/download/v${currentVersion}/Chatterino-Ubuntu-24.04.deb`;
  const ubuntu2204Link = `https://github.com/Chatterino/chatterino2/releases/download/v${currentVersion}/Chatterino-Ubuntu-22.04.deb`;
  return (
    <Page title="Chatterino on Linux">
      <div className="guide">
        <Section>
          <h1>Chatterino on Linux</h1>
          {/* Ubuntu 24.04 */}
          <h2>Ubuntu 24.04 (Noble Numbat)</h2>
          <Text>
            A .deb file is available from{" "}
            <Link href={ubuntu2404Link}>here</Link>.
          </Text>
          <Text>
            The Universe repository must be enabled for it to download the
            relevant dependencies.
          </Text>
          {/* Ubuntu 22.04 */}
          <h2>Ubuntu 22.04 (Jammy Jellyfish)</h2>
          <Text>
            A .deb file is available from{" "}
            <Link href={ubuntu2204Link}>here</Link>.
          </Text>
          <Text>
            The Universe repository must be enabled for it to download the
            relevant dependencies.
          </Text>
          {/* Flatpak */}
          <h2>Flatpak</h2>
          <Text>
            Chatterino is available on{" "}
            <Link href="https://flathub.org/apps/details/com.chatterino.chatterino">
              Flathub
            </Link>
            . To install it run: <code>flatpak install chatterino</code>{" "}
          </Text>
          {/* AUR */}
          <h2>Arch Linux</h2>
          <Text>
            You can install Chatterino through the{" "}
            <Link href="https://wiki.archlinux.org/title/Arch_User_Repository">
              Arch User Repository
            </Link>{" "}
            with{" "}
            <Link href="https://wiki.archlinux.org/title/Makepkg">makepkg</Link>{" "}
            or with an{" "}
            <Link href="https://wiki.archlinux.org/title/AUR_helpers">
              AUR helper
            </Link>{" "}
            like <Link href="https://github.com/Jguer/yay">yay</Link> or{" "}
            <Link href="https://github.com/Morganamilo/paru">Paru</Link>.
          </Text>
          <br />
          <Text>
            Get the latest stable version from{" "}
            <Link href="https://aur.archlinux.org/packages/chatterino2-bin/">
              chatterino2-bin
            </Link>
            <p>
              e.g. <code>yay -S chatterino2-bin</code> or{" "}
              <code>paru -S chatterino2-bin</code>
            </p>
          </Text>
          <Text>
            Get the latest nightly version from{" "}
            <Link href="https://aur.archlinux.org/packages/chatterino2-nightly-bin/">
              chatterino2-nightly-bin
            </Link>
            <p>
              e.g. <code>yay -S chatterino2-nightly-bin</code> or{" "}
              <code>paru -S chatterino2-nightly-bin</code>
            </p>
          </Text>
          <Text>
            Build latest stable version from source from{" "}
            <Link href="https://aur.archlinux.org/packages/chatterino2/">
              chatterino2
            </Link>
            <p>
              e.g. <code>yay -S chatterino2</code> or{" "}
              <code>paru -S chatterino2</code>
            </p>
          </Text>
          <Text>
            Build latest development version from source from{" "}
            <Link href="https://aur.archlinux.org/packages/chatterino2-git/">
              chatterino2-git
            </Link>
            <p>
              e.g. <code>yay -S chatterino2-git</code> or{" "}
              <code>paru -S chatterino2-git</code>
            </p>
          </Text>

          {/* Gentoo */}
          <h2>Gentoo Linux</h2>
          <Text>
            Chatterino is available on Gentoo from{" "}
            <Link href="https://wiki.gentoo.org/wiki/Project:GURU">GURU</Link>.
            For information on how to enable the GURU repository, see{" "}
            <Link href="https://wiki.gentoo.org/wiki/Project:GURU/Information_for_End_Users">
              this page
            </Link>
            .
          </Text>
          <br />
          <Text>
            Get the latest stable version from{" "}
            <Link href="https://gitweb.gentoo.org/repo/proj/guru.git/tree/net-im/chatterino">
              Gentoo's GURU net-im/chatterino package
            </Link>{" "}
            by running <code>emerge chatterino --ask</code>
          </Text>
          <Text>
            Get the latest development version from{" "}
            <Link href="https://gitweb.gentoo.org/repo/proj/guru.git/tree/net-im/chatterino/chatterino-9999.ebuild">
              Gentoo's GURU net-im/chatterino-9999 package
            </Link>{" "}
            by adding <code>net-im/chatterino **</code> to your{" "}
            <code>package.accept_keywords</code>, then running{" "}
            <code>emerge chatterino --ask</code>
          </Text>

          {/* Fedora official */}
          <h2>Fedora Linux</h2>
          <Text>
            Get the latest stable version of Chatterino through{" "}
            <a href="https://src.fedoraproject.org/rpms/chatterino2">
              Fedora's official package
            </a>{" "}
            packaged by{" "}
            <a href="https://src.fedoraproject.org/user/solomoncyj">
              solomoncyj
            </a>
            : <code>sudo dnf install chatterino</code>
          </Text>
          {/* Building from Source */}
          <h2>Building from Source</h2>
          <Text>
            If the options above don't work, then you can try{" "}
            <Link href={linuxBuildFromSource}>this guide</Link> to build it from
            source.
          </Text>
          {/* Ubuntu 20.04 */}
          <h2>Ubuntu 20.04 (Focal Fossa)</h2>
          <Text>
            We no longer support Ubuntu 20.04 as of Chatterino v2.5.5. See{" "}
            <a href="https://github.com/Chatterino/chatterino2/discussions/6522">
              this discussion
            </a>{" "}
            for more information.
          </Text>
          {/* AppImage */}
          <h2>AppImage</h2>
          <Text>
            We no longer support AppImage as of Chatterino v2.5.5. See{" "}
            <a href="https://github.com/Chatterino/chatterino2/discussions/6110">
              this discussion
            </a>{" "}
            for more information.
          </Text>
        </Section>
      </div>
    </Page>
  );
}

export default LinuxPage;
