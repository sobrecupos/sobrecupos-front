export type BaseField = {
  value: unknown;
  errors?: string[];
  status?: "valid" | "error";
  disabled?: boolean;
};

export type RuleValidator<T> = (value: T) => boolean;

export type Rule<T> = {
  validator: RuleValidator<T>;
  message: string;
};

export type FormSchema = Record<string, BaseField>;

export type FormProvider = {
  setFieldValue: (field: string, value: unknown) => void;
  validateField: (field?: string) => void;
  validate: () => void;
  currentSchema: FormSchema;
  setCurrentSchema: (
    setterOrValue: FormSchema | ((prevValues: FormSchema) => FormSchema)
  ) => void;
  isSubmitting?: boolean;
  hasSubmitError?: boolean;
};
