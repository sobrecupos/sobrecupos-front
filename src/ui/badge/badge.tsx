import classNames from "classnames";
import { PropsWithChildren } from "react";
import { getComponentClassNames } from "../namespace";
import "./badge.scss";

export type BadgeProps = PropsWithChildren<{
  className?: string;
  variant?: "success" | "error" | "warning" | "info";
}>;

const classes = getComponentClassNames("badge", {});

export const Badge = ({
  children,
  className,
  variant = "info",
}: BadgeProps) => (
  <span
    className={classNames(
      classes.namespace,
      `${classes.namespace}--${variant}`,
      className
    )}
  >
    {children}
  </span>
);
