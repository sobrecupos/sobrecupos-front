"use client";

import { Button } from "@marketplace/ui/button";
import { Checkbox } from "@marketplace/ui/checkbox";
import { Form, useForm } from "@marketplace/ui/form";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select, SelectProps } from "@marketplace/ui/select";
import { PractitionerPractice } from "@marketplace/utils/types/practitioners";
import classNames from "classnames";
import { requiredWithoutDefault } from "../form/validators/required-without-default";
import "./practitioner-practice-form.scss";
import { PractitionerPracticeFormInsuranceProviders } from "./practitioner-practice-form.types";

export type PractitionerPracticeFormSubmitValues = {
  practice: string;
  insuranceProviders: PractitionerPractice["insuranceProviders"];
};

export type PractitionerPracticeFormProps = {
  className?: string;
  practice?: string;
  practiceOptions: SelectProps["options"];
  insuranceProviderOptions: PractitionerPractice["insuranceProviders"];
  onSubmit: (values: PractitionerPracticeFormSubmitValues) => Promise<unknown>;
};

const classes = getComponentClassNames("practice-form", {
  sectionTitle: "section-title",
  checkbox: "checkbox",
  error: "error",
});

export const PractitionerPracticeForm = ({
  practice = "default",
  practiceOptions,
  insuranceProviderOptions,
  onSubmit,
  className,
}: PractitionerPracticeFormProps) => {
  const formContext = useForm({
    onSubmit,
    schema: {
      practice: {
        value: practice,
      },
      insuranceProviders: {
        value: insuranceProviderOptions,
      },
    },
    rules: {
      practice: [
        {
          validator: requiredWithoutDefault,
          message: "Selecciona una dirección",
        },
      ],
      insuranceProviders: [
        {
          validator: (value: PractitionerPracticeFormInsuranceProviders) =>
            value.some(({ isActive }) => isActive),
          message: "Selecciona al menos una previsión",
        },
      ],
    },
  });

  const insuranceProviderErrors =
    formContext.currentSchema.insuranceProviders.errors?.[0];

  return (
    <Form {...formContext} className={classNames(classes.namespace, className)}>
      <Select label="Dirección" options={practiceOptions} name="practice" />
      <p className={classes.sectionTitle}>Previsión ofrecida en la dirección</p>
      {(
        formContext.currentSchema.insuranceProviders
          .value as PractitionerPractice["insuranceProviders"]
      ).map(({ name, isActive }, index) => (
        <Checkbox
          className={classes.checkbox}
          key={`insurance-provider-option-${name}`}
          label={name}
          checked={isActive}
          onChange={(checked) => {
            formContext.setCurrentSchema((prevSchema) => {
              const nextSchema = structuredClone(prevSchema);
              (
                nextSchema.insuranceProviders
                  .value as PractitionerPracticeFormInsuranceProviders
              )[index].isActive = checked;
              nextSchema.insuranceProviders.errors = undefined;

              return nextSchema;
            });
          }}
        />
      ))}
      <span className={classes.error}>{insuranceProviderErrors || ""}</span>
      <Button type="submit" block>
        Guardar dirección
      </Button>
    </Form>
  );
};
