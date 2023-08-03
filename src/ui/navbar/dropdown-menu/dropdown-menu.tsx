"use client";

import { useClosable } from "@marketplace/ui/use-closable";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { classes } from "../classes";
import { NavbarConfig } from "../navbar.types";

export type DropdownMenuProps = {
  contents: NavbarConfig[number]["contents"];
  label: string;
};

export const DropdownMenu = ({ label, contents }: DropdownMenuProps) => {
  const { container, isOpen, setIsOpen, toggleOpen } =
    useClosable<HTMLLIElement>();

  return (
    <li
      className={classes.barItem}
      ref={container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={classes.barLink} onClick={toggleOpen}>
        {label}
        <span className={classes.barLinkIcon}>
          <ChevronDown />
        </span>
      </button>
      <ul
        className={classNames(classes.innerBar, {
          [`${classes.innerBar}--open`]: isOpen,
        })}
      >
        {contents.map(({ path, label }) => (
          <li key={`desktop-nav-${path}`} className={classes.innerBarItem}>
            <Link
              className={classes.innerBarLink}
              href={path}
              onClick={toggleOpen}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
