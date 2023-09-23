import "@marketplace/styles/globals.scss";
import { Layout } from "@marketplace/ui/legacy/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

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
      <Script id="posthog" strategy="beforeInteractive">
        {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_pRa2fHv4zFtW07XOatxs9xL2JuZhZXrLZlK2aqP6eWh',{api_host:'https://app.posthog.com'})`}
      </Script>
      <Head>
        <link rel="icon" href="/sobrecupos-logo-isotype.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
