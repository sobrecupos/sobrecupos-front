import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { classes } from "../classes";
import { NavbarConfig } from "../navbar.types";
import "./collapsible-menu.scss";

export type CollapsibleMenuProps = {
  isOpen?: boolean;
  onPanelClick: (panelId: string) => void;
  onLinkClick: () => void;
  openPanel: string | null;
  currentPath: string | null;
  config: NavbarConfig;
};

export const CollapsibleMenu = ({
  isOpen,
  currentPath,
  onPanelClick,
  onLinkClick,
  openPanel,
  config,
}: CollapsibleMenuProps) => (
  <ul
    className={classNames(classes.collapsibleMenu, {
      [`${classes.collapsibleMenu}--open`]: isOpen,
    })}
    aria-hidden={!isOpen}
  >
    {config.map(({ id, path, label, contents }) => (
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
            onClick={onLinkClick}
          >
            {label}
          </Link>
        ) : null}
        {id === "submenu" ? (
          <>
            <button
              className={`${classes.collapsibleLink}`}
              onClick={() => onPanelClick(path)}
              tabIndex={isOpen ? undefined : -1}
            >
              {label}
              <span className={classes.collapsibleLinkIcon}>
                <ChevronDownIcon id="chevron-down" size={14} />
              </span>
            </button>
            <ul
              className={classNames(classes.innerMenu, {
                [`${classes.innerMenu}--open`]: openPanel === path,
              })}
              aria-hidden={openPanel !== path}
            >
              {contents.map(({ path: innerPath, label }) => (
                <li
                  key={`collapsible-navbar-panel-${innerPath}`}
                  className={classes.collapsibleMenuItem}
                >
                  <Link
                    href={innerPath}
                    className={classNames(classes.collapsibleLink, {
                      [`${classes.collapsibleLink}--current`]:
                        currentPath === innerPath,
                    })}
                    tabIndex={openPanel === path ? undefined : -1}
                    onClick={onLinkClick}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </li>
    ))}
    <li>
      <Link href="/iniciar" className={classes.collapsibleLink}>
        Inicia Sesión
      </Link>
    </li>
  </ul>
);
