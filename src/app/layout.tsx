import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { PropsWithChildren } from "react";
import "./layout.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  display: "swap",
});

const classes = getComponentClassNames("layout", {});

const RootLayout = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <html
    lang="es-CL"
    className={classNames(classes.namespace, montserrat.className)}
  >
    <Script id="posthog" strategy="beforeInteractive">
      {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_pRa2fHv4zFtW07XOatxs9xL2JuZhZXrLZlK2aqP6eWh',{api_host:'https://app.posthog.com'})`}
    </Script>
    <body>{children}</body>
  </html>
);

export default RootLayout;
