import classNames from "classnames";
import { classes } from "./classes";
import Link from "next/link";
import Image from "next/image";
import { specialties } from "./links";
import { Icon } from "../icon";
import { useClosable } from "../use-closable";
import { useState } from "react";
import { Modal } from "../modal";
import { PractitionerSignupForm } from "../practitioner-signup-form";

export const NavbarDesktop = () => {
  const { container, isOpen, setIsOpen, toggleOpen } =
    useClosable<HTMLLIElement>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
        <li className={classes.barItem}>
          <Link href="/" className={classes.barLink}>
            Inicio
          </Link>
        </li>
        <li
          className={classes.barItem}
          ref={container}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            type="button"
            className={classes.barLink}
            onClick={toggleOpen}
          >
            Especialidades
            <span className={classes.barLinkIcon}>
              <Icon id="chevron-down" variant="solid" />
            </span>
          </button>
          <ul
            className={classNames(classes.innerBar, {
              [`${classes.innerBar}--open`]: isOpen,
            })}
          >
            {specialties.map(({ path, label }) => (
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
        <li className={classes.barItem}>
          <Link href="/preguntas-frecuentes" className={classes.barLink}>
            Preguntas frecuentes
          </Link>
        </li>
        <li className={classes.barItem}>
          <button
            type="button"
            className={classes.barAction}
            onClick={() => setIsModalOpen(true)}
          >
            🧐 ¿Eres médico?
          </button>
        </li>
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="small"
        showCloseButton
        closeOnBackdropClick
      >
        <PractitionerSignupForm />
      </Modal>
    </nav>
  );
};
