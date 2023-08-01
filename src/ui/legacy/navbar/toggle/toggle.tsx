import classNames from "classnames";
import { MouseEvent } from "react";
import { classes } from "../classes";

export type ToggleProps = {
  onToggle: (event: MouseEvent) => void;
  isOpen?: boolean;
  toggle?: {
    open: string;
    close?: string;
  };
};

export const Toggle = ({ onToggle, isOpen, toggle }: ToggleProps) => (
  <button
    className={classes.toggle}
    onClick={onToggle}
    aria-label={isOpen ? toggle?.close : toggle?.open}
  >
    <span
      className={classNames(classes.toggleIcon, {
        [`${classes.toggleIcon}--open`]: isOpen,
      })}
    >
      <span />
      <span />
      <span />
    </span>
  </button>
);
