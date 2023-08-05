"use client";

import { useState } from "react";

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  rules,
}: {
  initialValues: T;
  rules: {
    [K in keyof T]?: {
      validator: (value: T[K]) => Promise<boolean>;
      message: string;
    };
  };
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const handleChange = (name: keyof typeof values) => (value: unknown) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };
  const validateField = (name: keyof typeof values) => async () => {
    const rule = rules[name];

    if (!rule) return;

    const hasError = await rule.validator(values[name]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: hasError ? rule.message : undefined,
    }));
  };
  const register = <K extends keyof T>(name: K) => ({
    value: values[name],
    onChange: handleChange(name),
    onBlur: validateField(name),
    error: errors[name],
  });
  const validate = async () => {
    const validations = Object.entries(rules).map(
      async ([name, { validator, message }]) => {
        const hasError = await validator(values[name]);

        return hasError
          ? {
              [name]: message,
            }
          : null;
      }
    );
    const errorList = await Promise.all(validations);
    const updatedErrors = errorList.reduce(
      (currentErrors, error) =>
        error ? { ...currentErrors, ...error } : currentErrors,
      {}
    ) as { [K in keyof T]?: string };

    setErrors(updatedErrors);

    return { isValid: Object.keys(updatedErrors).length === 0 };
  };

  return { values, handleChange, validateField, validate, errors, register };
};
