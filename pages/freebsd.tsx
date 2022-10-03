// @ts-check
import React from "react";
import Section from "../components/section";
import Page from "../components/page";

function LinuxPage() {
  return (
    <Page title="Chatterino on Linux">
      <Section className="p-16">
        <h1 className="text-5xl pb-10">Chatterino on FreeBSD</h1>
        Chatterino2 is available in the ports tree. Run{" "}
        <code className="p-1 px-2 mt-4 border-gray-600 border bg-gray-900">
          pkg install chatterino2
        </code>{" "}
        to install it.
      </Section>
    </Page>
  );
}

export default LinuxPage;
