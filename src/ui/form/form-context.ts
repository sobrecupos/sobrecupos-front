import { createContext } from "react";
import { FormProvider } from "./form.types";

const noop = () => {};

export const INITIAL_FORM_CONTEXT: FormProvider = {
  setFieldValue: noop,
  validateField: noop,
  validate: noop,
  currentSchema: {},
  setCurrentSchema: noop,
  handleSubmit: noop,
};

export const FormContext = createContext(INITIAL_FORM_CONTEXT);
