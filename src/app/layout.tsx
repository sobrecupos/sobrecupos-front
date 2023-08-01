import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import { Poppins } from "next/font/google";
import { PropsWithChildren } from "react";
import "./layout.scss";

const poppins = Poppins({
  weight: ["400", "600"],
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const classes = getComponentClassNames("layout", {});

const RootLayout = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <html
    lang="es-CL"
    className={classNames(classes.namespace, poppins.className)}
  >
    <body>{children}</body>
  </html>
);

export default RootLayout;
