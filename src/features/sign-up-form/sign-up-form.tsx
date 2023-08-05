"use client";

import { usersClient } from "@marketplace/data-access/users/users.client";
import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type SignUpFormProps = {
  referralCode?: string;
};

export const SignUpForm = ({ referralCode = "" }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [_hasError, setHasError] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    usersClient
      .createUser({ email, referralCode })
      .then(() => {
        router.push(`/iniciar?email=${email}`);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setHasError(true);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={referralCode}
        label="Código de invitación"
        readOnly
        error={
          referralCode ? undefined : "Necesitas una invitación para iniciar"
        }
      />
      <Input
        type="email"
        value={email}
        onChange={setEmail}
        label="Correo electrónico"
        disabled={isLoading}
      />
      <Button
        type="submit"
        block
        isLoading={isLoading}
        disabled={!referralCode}
      >
        Registrarme
      </Button>
    </form>
  );
};
