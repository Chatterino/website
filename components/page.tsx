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
    <div className="page">
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />

      <div className="page-body">{children}</div>
      <Footer />
    </div>
  );
}

export default Page;
