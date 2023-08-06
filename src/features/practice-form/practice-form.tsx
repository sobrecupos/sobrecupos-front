"use client";

import { Button } from "@marketplace/ui/button";
import { Checkbox } from "@marketplace/ui/checkbox";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select } from "@marketplace/ui/select";
import classNames from "classnames";
import { FormEvent, useState } from "react";
import { useForm } from "../form/use-form";
import {
  practiceFormDefaults,
  practiceFormRules,
} from "./practice-form-config";
import "./practice-form.scss";
import { PracticeFormInsuranceProviders } from "./practice-form.types";

export type PracticeFormProps = {
  className?: string;
  address?: string;
  insuranceProviders?: PracticeFormInsuranceProviders;
  addressOptions: {
    value: string;
    label: string;
  }[];
  onSubmit: (values: {
    address: string;
    insuranceProviders: PracticeFormInsuranceProviders;
  }) => void;
};

const classes = getComponentClassNames("practice-form", {
  sectionTitle: "section-title",
  checkbox: "checkbox",
  error: "error",
});

export const PracticeForm = ({
  onSubmit,
  addressOptions,
  className,
  ...currentValues
}: PracticeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { values, validate, register, setValues, errors, setErrors } = useForm({
    initialValues: { ...practiceFormDefaults, ...currentValues },
    rules: practiceFormRules,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    const { isValid } = await validate();

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    onSubmit?.(values);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(classes.namespace, className)}
    >
      <Select
        label="Dirección"
        options={addressOptions}
        {...register("address")}
      />
      <p className={classes.sectionTitle}>Previsión ofrecida en la dirección</p>
      {values.insuranceProviders.map(({ name, isActive }, index) => (
        <Checkbox
          className={classes.checkbox}
          key={`insurance-provider-option-${name}`}
          label={name}
          checked={isActive}
          onChange={(checked) => {
            setValues((prevValues) => ({
              ...prevValues,
              insuranceProviders: [
                ...prevValues.insuranceProviders.slice(0, index),
                { name, isActive: checked },
                ...prevValues.insuranceProviders.slice(index + 1),
              ],
            }));
            setErrors((prevValues) => ({
              ...prevValues,
              insuranceProviders: undefined,
            }));
          }}
        />
      ))}
      <span className={classes.error}>{errors.insuranceProviders || ""}</span>
      <Button disabled={isLoading} type="submit" block>
        Guardar dirección
      </Button>
    </form>
  );
};
