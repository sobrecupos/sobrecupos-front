import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { classes } from "./classes";
import { DropdownMenu } from "./dropdown-menu";
import { NavbarProps } from "./navbar.types";

export const NavbarDesktop = ({ config, cta = null }: NavbarProps) => (
  <nav
    className={classNames(classes.namespace, `${classes.namespace}--desktop`)}
  >
    <ul className={classes.bar}>
      <li className={classes.barItem}>
        <Link href="/" aria-label="Inicio" className={classes.home}>
          <Image
            src="/brand-logo.png"
            alt="Logo sobrecupos"
            width="218"
            height="34"
          />
        </Link>
      </li>
      {config.map(({ id, path, label, contents }, i) => {
        if (id === "action") {
          return (
            <li className={classes.barItem} key={`desktop-nav-elem-${i}`}>
              <Link href={path} className={classes.barLink}>
                {label}
              </Link>
            </li>
          );
        }

        if (id === "submenu") {
          return (
            <DropdownMenu
              key={`desktop-nav-elem-${i}`}
              label={label}
              contents={contents}
            />
          );
        }

        return null;
      })}
      {cta ? <li className={classes.barItem}>{cta}</li> : null}
    </ul>
  </nav>
);
