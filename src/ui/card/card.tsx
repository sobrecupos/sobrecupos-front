import classNames from "classnames";
import { PropsWithChildren } from "react";
import { getComponentClassNames } from "../namespace";
import "./card.scss";

export type CardProps = PropsWithChildren<{
  elevated?: boolean;
  className?: string;
}>;

const classes = getComponentClassNames("card", {});

export const Card = ({ className, elevated, children }: CardProps) => (
  <div
    className={classNames(
      classes.namespace,
      { [`${classes.namespace}--elevated`]: elevated },
      className
    )}
  >
    {children}
  </div>
);
