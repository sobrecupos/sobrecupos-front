"use client";

import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select } from "@marketplace/ui/select";
import { FormEvent } from "react";
import { useForm } from "../form/use-form";
import {
  practitionerProfileFormDefaults,
  practitionerProfileFormRules,
} from "./practitioner-profile-form-config";
import "./practitioner-profile-form.scss";

export type PractitionerProfileFormProps = {
  names?: string;
  firstSurname?: string;
  secondSurname?: string;
  phone?: string;
  description?: string;
  licenseId?: string;
  specialty?: string;
};

const classes = getComponentClassNames("practitioner-profile-form", {
  sectionTitle: "section-title",
});

export const PractitionerProfileForm = (
  profile: PractitionerProfileFormProps
) => {
  const { register, validate, values } = useForm({
    initialValues: { ...practitionerProfileFormDefaults, ...profile },
    rules: practitionerProfileFormRules,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { isValid } = await validate();

    if (!isValid) return;

    // save practitioner
  };

  return (
    <form className={classes.namespace} onSubmit={handleSubmit}>
      <h3 className={classes.sectionTitle}>Información personal</h3>
      <Input label="Nombre(s)" {...register("names")} />
      <Input label="Primer apellido" {...register("firstSurname")} />
      <Input label="Segundo apellido" {...register("secondSurname")} />
      <Input label="Teléfono" type="tel" {...register("phone")} />
      <h3 className={classes.sectionTitle}>Información profesional</h3>
      <Input label="Sobre mí" {...register("description")} />
      <Input label="Número SIS" {...register("licenseId")} />
      <Select
        label="Especialidad"
        options={[
          { value: "default", label: "Selecciona una opción", disabled: true },
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
        {...register("specialty")}
      />
      <Button type="submit" block>
        Guardar
      </Button>
    </form>
  );
};
