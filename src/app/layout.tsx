import { getComponentClassNames } from "@marketplace/ui/namespace";
import { TrackPageview, TrackingProvider } from "@marketplace/ui/tracking";
import classNames from "classnames";
import { Montserrat } from "next/font/google";
import { PropsWithChildren, Suspense } from "react";
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
    <Suspense>
      <TrackPageview />
    </Suspense>
    <TrackingProvider>
      <body>{children}</body>
    </TrackingProvider>
  </html>
);

export default RootLayout;
