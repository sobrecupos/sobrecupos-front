import { useState } from "react";
import { classes } from "./classes";
import { Icon } from "@marketplace/ui/icon";
import classNames from "classnames";

export type FAQElementProps = {
  title: string;
  text: string;
};

export const FAQElement = ({ title, text }: FAQElementProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(classes.card, {
        [`${classes.card}--open`]: isOpen,
      })}
    >
      <button
        className={classes.cardTitleContainer}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon id={isOpen ? "circle-minus" : "circle-plus"} variant="solid" />
        <h3 className={classes.cardTitle}>{title}</h3>
      </button>
      <p className={classes.content}>
        <span className={classes.textContent}>{text}</span>
      </p>
    </div>
  );
};
