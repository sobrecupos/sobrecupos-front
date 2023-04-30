import Link from "next/link";
import { classes } from "../classes";
import classNames from "classnames";
import { useEffect, useState } from "react";

export type CollapsibleMenuProps = {
  isOpen?: boolean;
  onPanelClick: (panelId: string) => void;
  openPanel: string | null;
  currentPath?: string;
};

const links = [
  { id: "action", path: "/", label: "Inicio", contents: [] },
  {
    id: "submenu",
    path: "/especialidades",
    label: "Especialidades",
    contents: [
      {
        id: "action",
        path: "/especialidades/oftalmologia",
        label: "Oftalmologia",
      },
      {
        id: "action",
        path: "/especialidades/medicina-general",
        label: "Medicina general",
      },
    ],
  },
  {
    id: "action",
    path: "/preguntas-frecuentes",
    label: "Preguntas frecuentes",
    contents: [],
  },
];

export const CollapsibleMenu = ({
  isOpen,
  currentPath,
  onPanelClick,
  openPanel,
}: CollapsibleMenuProps) => (
  <ul
    className={classNames(classes.collapsibleMenu, {
      [`${classes.collapsibleMenu}--open`]: isOpen,
    })}
    aria-hidden={!isOpen}
  >
    {links.map(({ id, path, label, contents }) => (
      <li
        key={`collapsible-navbar-${path}`}
        className={classes.collapsibleMenuItem}
      >
        {id === "action" ? (
          <Link
            href={path}
            className={classNames(classes.collapsibleLink, {
              [`${classes.collapsibleLink}--current`]: currentPath === path,
            })}
            tabIndex={isOpen ? undefined : -1}
          >
            {label}
          </Link>
        ) : null}
        {id === "submenu" ? (
          <>
            <button
              className={classes.collapsibleLink}
              onClick={() => onPanelClick(path)}
            >
              {label}
            </button>
            <ul
              className={classNames(
                // classes.collapsibleMenu,
                // // `${classes.collapsibleMenu}--fixed`,
                // {
                //   [`${classes.collapsibleMenu}--open`]: openPanel === path,
                // }
              )}
              aria-hidden={openPanel === path}
            >
              {contents.map(({ path: innerPath, label }) => (
                <li
                  key={`collapsible-navbar-panel-${innerPath}`}
                  className={classes.collapsibleMenuItem}
                >
                  asdf
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </li>
    ))}
  </ul>
);
