import classNames from "classnames";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getComponentClassNames } from "../namespace";
import "./footer.scss";

const classes = getComponentClassNames("footer", {
  link: "link",
  contact: "contact",
  contactIcon: "contact-icon",
});

export const Footer = () => (
  <footer className={classes.namespace}>
    <Link className={classes.link} href="/" aria-label="Inicio">
      <Image
        src="/brand-logo.png"
        alt="Logo sobrecupos"
        width="187"
        height="29"
      />
    </Link>
    <a
      className={classNames(classes.link, classes.contact)}
      href="mailto:contacto@sobrecupos.com"
    >
      <MailIcon size={16} className={classes.contactIcon} />
      contacto@sobrecupos.com
    </a>
  </footer>
);
