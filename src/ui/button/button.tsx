import classNames from "classnames";
import { Loader2 } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./button.scss";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "neutral" | "text";
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
    {isLoading ? (
      <span className={classes.loader}>
        <Loader2 />
      </span>
    ) : null}
    {children}
  </button>
);
