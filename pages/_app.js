// @ts-check
import "styles/globals.css";
import "components/chatprop.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
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
