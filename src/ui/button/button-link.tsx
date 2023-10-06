import classNames from "classnames";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./button.scss";

export type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "neutral" | "text";
  block?: boolean;
  href: string;
};

const classes = getComponentClassNames("button", { loader: "loader" });

export const ButtonLink = ({
  children,
  className,
  block,
  variant = "primary",
  ...props
}: ButtonLinkProps) => (
  <Link
    className={classNames(
      classes.namespace,
      `${classes.namespace}--link`,
      `${classes.namespace}--${variant}`,
      { [`${classes.namespace}--d-block`]: block },
      className
    )}
    {...props}
  >
    {children}
  </Link>
);
