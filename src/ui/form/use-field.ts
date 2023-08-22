"use client";

import { useContext } from "react";
import { FormContext } from "./form-context";

export const useField = <T = unknown>(name: string = "") => {
  const { currentSchema, setFieldValue, setCurrentSchema, validateField } =
    useContext(FormContext);
  const field = currentSchema[name] || {};

  return {
    ...field,
    value: field.value as T,
    setCurrentSchema,
    setFieldValue,
    validateField,
  };
};
