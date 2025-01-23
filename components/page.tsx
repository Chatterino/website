import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./footer";
import Nav from "./nav";

type Props = {
  children: ReactNode;
  title: string;
};

function Page({ children, title }: Props) {
  return (
    <div className={"text-white flex flex-col "} style={{ minHeight: "100vh" }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />

      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}

export default Page;
