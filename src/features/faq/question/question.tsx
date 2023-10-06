"use client";

import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import "./question.scss";

export type QuestionProps = {
  title: string;
  text: string;
};

const classes = getComponentClassNames("question", {
  titleContainer: "title-container",
  title: "title",
  content: "content",
  textContent: "text-content",
});

export const Question = ({ title, text }: QuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(classes.namespace, {
        [`${classes.namespace}--open`]: isOpen,
      })}
    >
      <button
        className={classes.titleContainer}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <MinusCircleIcon size={24} /> : <PlusCircleIcon size={24} />}
        <h3 className={classes.title}>{title}</h3>
      </button>
      <p className={classes.content}>
        <span className={classes.textContent}>{text}</span>
      </p>
    </div>
  );
};
