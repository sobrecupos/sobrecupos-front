"use client";

import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export type SignOutFormProps = {
  csrfToken?: string;
};

export const SignOutForm = ({ csrfToken }: SignOutFormProps) => {
  const { replace } = useRouter();

  return (
    <form>
      <Input name="csrfToken" type="hidden" value={csrfToken} readOnly />
      <Button
        type="button"
        onClick={async () => {
          await signOut();
          replace("/");
        }}
        block
      >
        Cerrar sesión
      </Button>
    </form>
  );
};
