import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./button.scss";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "neutral";
  block?: boolean;
};

const classes = getComponentClassNames("button", {});

export const Button = ({
  children,
  className,
  block,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button
    className={classNames(
      classes.namespace,
      `${classes.namespace}--${variant}`,
      { [`${classes.namespace}--d-block`]: block },
      className
    )}
    type={type}
    {...props}
  >
    {children}
  </button>
);
