import React from "react";
import Link from "./link";
import Section from "./section";

function Footer() {
  return (
    <Section className="bg-gray-900">
      <div className="p-6 p-x-24 flex flex-wrap justify-evenly space-x-8">
        <div>
          Chatterino is made by{" "}
          <Link href="https://twitter.com/fourtf_xd">fourtf</Link>,{" "}
          <Link href="https://pajlada.se">pajlada</Link>, and contributors.
        </div>
        <div>
          Design by <Link href="https://twitter.com/smaczny">Smaczny</Link>
        </div>
      </div>
    </Section>
  );
}

export default Footer;
