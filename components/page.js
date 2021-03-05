// @ts-check
import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Nav from "./nav";

function Page({ children, title }) {
  return (
    <div className={"text-white flex flex-col "} style={{ minHeight: "100vh" }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />

      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default Page;
