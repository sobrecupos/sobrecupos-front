import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobile } from "./navbar-mobile";
import "./navbar.scss";
import { NavbarProps } from "./navbar.types";

export const Navbar = ({ config, cta }: NavbarProps) => (
  <>
    <NavbarDesktop config={config} cta={cta} />
    <NavbarMobile config={config} cta={cta} />
  </>
);
