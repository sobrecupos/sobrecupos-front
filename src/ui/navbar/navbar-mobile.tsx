import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { classes } from "./classes";
import { Toggle } from "./toggle";
import { useState } from "react";
import { CollapsibleMenu } from "./collapsible-menu";
import { useRouter } from "next/router";

const toggle = {
  open: "Abrir menú",
  close: "Cerrar menú",
};

export const NavbarMobile = () => {
  const { asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  const handlePanelClick = (panelId: string) => {
    console.log(panelId)
    setOpenPanel((panel) => (panelId === panel ? null : panelId));
  };

  return (
    <nav className={classNames(classes.namespace)}>
      <div className={classNames(classes.content)}>
        <Link href="/" aria-label="Inicio" className={classes.home}>
          <Image
            src="/brand-logo.png"
            alt="Logo sobrecupos"
            width="187"
            height="29"
          />
        </Link>

        <Toggle onToggle={handleToggle} isOpen={isOpen} toggle={toggle} />
      </div>

      <CollapsibleMenu
        isOpen={isOpen}
        currentPath={asPath}
        onPanelClick={handlePanelClick}
        openPanel={openPanel}
      />
    </nav>
  );
};
