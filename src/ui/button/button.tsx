import classNames from "classnames";
import { Loader2 } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./button.scss";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "neutral";
  isLoading?: boolean;
  block?: boolean;
};

const classes = getComponentClassNames("button", { loader: "loader" });

export const Button = ({
  children,
  className,
  block,
  isLoading,
  type = "button",
  variant = "primary",
  disabled,
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
    disabled={isLoading || disabled}
    {...props}
  >
    <span className={classes.loader}>{isLoading ? <Loader2 /> : null}</span>
    {children}
  </button>
);
