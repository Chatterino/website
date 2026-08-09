import React from "react";
import Section from "../components/section";
import Page from "../components/page";

function LinuxPage() {
  return (
    <Page title="Chatterino on Linux">
      <Section className="guide">
        <h1 className="guide-title">Chatterino on FreeBSD</h1>
        Chatterino2 is available in the ports tree. Run{" "}
        <code>pkg install chatterino2</code> to install it.
      </Section>
    </Page>
  );
}

export default LinuxPage;
