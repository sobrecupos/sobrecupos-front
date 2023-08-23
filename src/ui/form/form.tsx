"use client";

import { PropsWithChildren } from "react";
import { FormContext } from "./form-context";
import { FormProvider } from "./form.types";

export type FormProps = PropsWithChildren<
  {
    className?: string;
  } & FormProvider
>;

export const Form = ({ children, className, ...context }: FormProps) => (
  <form className={className} onSubmit={context.handleSubmit}>
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  </form>
);
