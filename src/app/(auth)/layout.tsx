import { Card } from "@marketplace/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { authLayoutClasses } from "./classes";
import "./layout.scss";

const AuthLayout = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <div className={authLayoutClasses.namespace}>
    <Card elevated className={authLayoutClasses.card}>
      <Link href="/" className="hover:cursor-pointer" >
        <Image
          className={authLayoutClasses.logo}
          src="/brand-logo.png"
          alt="Logo sobrecupos"
          width="218"
          height="34"
        />
      </Link>
      {children}
    </Card>
  </div>
);

export default AuthLayout;
