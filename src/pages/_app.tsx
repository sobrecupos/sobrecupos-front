import "@marketplace/styles/globals.scss";
import { Layout } from "@marketplace/ui/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        src="https://kit.fontawesome.com/9dcfc70478.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
      <Head>
        <link rel="icon" href="/sobrecupos-logo-isotype.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
