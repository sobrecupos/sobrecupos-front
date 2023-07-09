import "@marketplace/styles/globals.scss";
import { Layout } from "@marketplace/ui/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleEnd = () => {
      NProgress.done(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);
    router.events.on("routeChangeError", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
      router.events.off("routeChangeError", handleEnd);
    };
  }, []);

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
