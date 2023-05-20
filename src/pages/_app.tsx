import "@marketplace/styles/globals.scss";
import { Layout } from "@marketplace/ui/layout";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        src="https://kit.fontawesome.com/9dcfc70478.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </Layout>
  );
}
