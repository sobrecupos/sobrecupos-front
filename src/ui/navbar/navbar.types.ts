export type NavbarConfig = {
  id: "action" | "submenu";
  path: string;
  label: string;
  contents: {
    id: "action";
    path: string;
    label: string;
  }[];
}[];

export type NavbarProps = {
  config: NavbarConfig;
  cta?: React.ReactNode;
};
