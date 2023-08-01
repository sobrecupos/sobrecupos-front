import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Montserrat } from "next/font/google";
import { Navbar } from "../navbar";
import { getComponentClassNames } from "../../namespace";
import classNames from "classnames";
import { Icon } from "../icon";

export type LayoutProps = PropsWithChildren<Record<never, never>>;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
});

const classes = getComponentClassNames("layout", {
  content: "content",
  contact: "contact",
  contactIcon: 'contact-icon',
});

export const Layout = ({ children }: LayoutProps) => (
  <div className={classNames(classes.namespace, montserrat.className)}>
    <Navbar />
    <main className={classes.content}>{children}</main>
    <footer>
      <Link href="/" aria-label="Inicio">
        <Image
          src="/brand-logo.png"
          alt="Logo sobrecupos"
          width="187"
          height="29"
        />
      </Link>
      <a className={classes.contact} href="mailto:contacto@sobrecupos.com">
        <span className={classes.contactIcon}>
          <Icon id="envelope" />
        </span>
        contacto@sobrecupos.com
      </a>
    </footer>
  </div>
);
