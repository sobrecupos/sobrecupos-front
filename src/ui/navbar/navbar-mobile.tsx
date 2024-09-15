"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { classes } from "./classes";
import { CollapsibleMenu } from "./collapsible-menu";
import { NavbarProps } from "./navbar.types";
import { Toggle } from "./toggle";

const toggle = {
  open: "Abrir menú",
  close: "Cerrar menú",
};

export const NavbarMobile = ({ config }: NavbarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const handleToggle = () => {
    setOpenPanel(null);
    setIsOpen((open) => !open);
  };

  const handlePanelClick = (panelId: string) => {
    setOpenPanel((panel) => (panelId === panel ? null : panelId));
  };

  return (
    <nav
      className={classNames(classes.namespace, `${classes.namespace}--mobile`)}
    >
      <div className={classNames(classes.content)}>
        <Link href="/" aria-label="Inicio" className={classes.home}>
          <Image
            src="/brand-logo-v2.svg"
            alt="Logo sobrecupos"
            width="180"
            height="29"
          />
        </Link>

        <Toggle onToggle={handleToggle} isOpen={isOpen} toggle={toggle} />
      </div>

      <CollapsibleMenu
        config={config}
        isOpen={isOpen}
        currentPath={pathname}
        onPanelClick={handlePanelClick}
        openPanel={openPanel}
        onLinkClick={handleToggle}
      />
    </nav>
  );
};
