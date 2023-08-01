"use client";

import { Alert } from "@marketplace/ui/alert";
import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export type SignInFormProps = { csrfToken?: string };

const classes = getComponentClassNames("signin", {
  submit: "submit",
  label: "label",
  input: "input",
});

export const SignInForm = ({ csrfToken }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    signIn("email", { email })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.namespace}>
      <Input name="csrfToken" type="hidden" value={csrfToken} readOnly />
      <Input
        label="Correo Electrónico"
        className={classes.input}
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        disabled={isLoading}
      />
      {hasError ? (
        <Alert>No se pudo iniciar sesión, inténtalo de nuevo</Alert>
      ) : null}
      <Button
        isLoading={isLoading}
        className={classes.submit}
        type="submit"
        block
      >
        Iniciar sesión
      </Button>
    </form>
  );
};
