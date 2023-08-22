"use client";

import { useContext } from "react";
import { FormContext } from "../form";
import { ButtonUI, ButtonUIProps } from "./button-ui";

export const Button = (props: ButtonUIProps) => {
  const { isSubmitting } = useContext(FormContext);
  const contextProps =
    props.type === "submit"
      ? { isLoading: isSubmitting, disabled: isSubmitting }
      : {};

  return <ButtonUI {...contextProps} {...props} />;
};
