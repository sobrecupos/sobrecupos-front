export type IconProps = {
  id: string;
  variant?: "regular" | "solid";
};

export const Icon = ({ id, variant = "regular" }: IconProps) => (
  <i className={`fa-${variant} fa-${id}`} />
);
