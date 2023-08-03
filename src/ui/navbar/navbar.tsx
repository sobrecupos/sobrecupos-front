import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobile } from "./navbar-mobile";
import "./navbar.scss";
import { NavbarProps } from "./navbar.types";

export const Navbar = ({ config }: NavbarProps) => (
  <>
    <NavbarDesktop config={config} />
    <NavbarMobile config={config} />
  </>
);
