"use client";
import { FormEvent, startTransition, useCallback, useState } from "react";

import { FormSchema, Rule } from "./form.types";

export type UseForm<T extends FormSchema> = {
  onSubmit?: (values: { [K in keyof T]: T[K]["value"] }) => Promise<unknown>;
  onSubmitError?: (error: unknown) => void;
  schema: T;
  rules?: {
    [K in keyof T]?: Rule<T[K]["value"]>[];
  };
};

const getErrorsFromRules = <T extends unknown>(
  value: T,
  rules: Rule<T>[] = []
) => {
  if (!rules) return undefined;

  const errors = rules
    .map(({ validator, message }) => (validator(value) ? "" : message))
    .filter((error) => !!error);

  return errors.length > 0 ? errors : undefined;
};

const getValues = <T extends FormSchema>(schema: FormSchema) =>
  Object.keys(schema).reduce(
    (values, field) => ({ ...values, [field]: schema[field].value }),
    {}
  ) as { [K in keyof T]: T[K]["value"] };

export const useForm = <T extends FormSchema>({
  onSubmit,
  onSubmitError,
  schema,
  rules = {},
}: UseForm<T>) => {
  const [currentSchema, setCurrentSchema] = useState<FormSchema>(schema);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const setFieldValue = useCallback(
    (field: string, value: unknown) =>
      setCurrentSchema((prevSchema) => ({ ...prevSchema, [field]: { value } })),
    [setCurrentSchema]
  );

  const validateField = useCallback(
    (field?: string) => {
      if (!field) return;

      startTransition(() => {
        setCurrentSchema((prevSchema) => ({
          ...prevSchema,
          [field]: {
            ...prevSchema[field],
            errors: getErrorsFromRules(prevSchema[field].value, rules[field]),
          },
        }));
      });
    },
    [setCurrentSchema, rules]
  );

  const getValidatedSchema = useCallback(
    (pendingForValidation: FormSchema) => {
      let isValid = true;
      const validations = Object.keys(rules);
      const nextSchema = structuredClone(pendingForValidation);

      validations.forEach((field) => {
        const errors = getErrorsFromRules(
          nextSchema[field].value,
          rules[field]
        );
        nextSchema[field].errors = errors;

        if (errors) {
          isValid = false;
        }
      });

      return { nextSchema, isValid };
    },
    [rules]
  );

  const validate = () => {
    const { isValid, nextSchema } = getValidatedSchema(currentSchema);

    if (!isValid) {
      startTransition(() => {
        setCurrentSchema(nextSchema);
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSubmitting) return;

    const { isValid, nextSchema } = getValidatedSchema(currentSchema);

    if (!isValid) {
      startTransition(() => {
        setCurrentSchema(nextSchema);
      });
      return;
    }

    setIsSubmitting(true);
    setHasSubmitError(false);

    onSubmit?.(getValues<T>(currentSchema))
      .catch((error) => {
        setHasSubmitError(true);
        onSubmitError?.(error);
      })
      .then(() => setIsSubmitting(false));
  };

  return {
    setFieldValue,
    validateField,
    validate,
    currentSchema,
    setCurrentSchema,
    isSubmitting,
    hasSubmitError,
    handleSubmit,
  };
};
