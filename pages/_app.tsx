import "../styles/globals.css";
import "../components/chatprop.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { ComponentType } from "react";
import Head from "next/head";

type Props = {
  Component: ComponentType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white bg-gray-800" style={{ minHeight: "100vh" }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
