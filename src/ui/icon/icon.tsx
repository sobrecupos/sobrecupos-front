import classNames from "classnames";

export type IconProps = {
  id: string;
  variant?: "regular" | "solid";
  spin?: boolean;
};

export const Icon = ({ id, variant = "regular", spin }: IconProps) => (
  <i
    className={classNames(`fa-${variant}`, `fa-${id}`, { [`fa-spin`]: spin })}
  />
);
