"use client";

import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { Modal } from "@marketplace/ui/modal";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select, SelectProps } from "@marketplace/ui/select";
import { FormEvent, useState } from "react";
import { useForm } from "../form/use-form";
import { PracticeForm } from "../practice-form/practice-form";
import { ProfilePicture } from "../profile-picture";
import {
  practitionerProfileFormDefaults,
  practitionerProfileFormRules,
} from "./practitioner-profile-form-config";
import "./practitioner-profile-form.scss";
import { PractitionerProfilePractices } from "./practitioner-profile-practices";

export type PractitionerProfileFormProps = {
  addressOptions: SelectProps["options"];
  specialtyOptions: SelectProps["options"];
  picture?: string;
  names?: string;
  firstSurname?: string;
  secondSurname?: string;
  phone?: string;
  description?: string;
  licenseId?: string;
  specialty?: string;
  practices?: {
    _id: string;
    address: string;
    insuranceProviders: { name: string; isActive: boolean }[];
  }[];
};

const classes = getComponentClassNames("practitioner-profile-form", {
  sectionTitle: "section-title",
  form: "form",
  addressContainer: "address-container",
  address: "address",
  practiceActions: "practice-actions",
  addressError: "address-error",
  deleteAction: "delete-action",
});

export const PractitionerProfileForm = ({
  addressOptions,
  specialtyOptions,
  ...profile
}: PractitionerProfileFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const { register, validate, values, setValues, errors, setErrors } = useForm({
    initialValues: { ...practitionerProfileFormDefaults, ...profile },
    rules: practitionerProfileFormRules,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { isValid } = await validate();

    if (!isValid) return;
  };

  return (
    <form className={classes.namespace} onSubmit={handleSubmit}>
      <ProfilePicture {...register("picture")} />
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
        options={specialtyOptions}
        {...register("specialty")}
      />
      <h3 className={classes.sectionTitle}>Mis direcciones</h3>
      <PractitionerProfilePractices
        practices={values.practices}
        error={errors.practices}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(index) => {
          setSelectedAddress(index);
          setIsModalOpen(true);
        }}
        onRemove={(index) => {
          setValues((prevValues) => ({
            ...prevValues,
            practices: [
              ...prevValues.practices.slice(0, index),
              ...prevValues.practices.slice(index + 1),
            ],
          }));
        }}
      />
      <Modal
        variant="small"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAddress(null);
        }}
        closeOnBackdropClick={false}
        renderBody={({ close }) => (
          <PracticeForm
            className={classes.form}
            addressOptions={addressOptions}
            {...(selectedAddress !== null
              ? {
                  address: values.practices[selectedAddress]._id,
                  insuranceProviders:
                    values.practices[selectedAddress].insuranceProviders,
                }
              : { address: "default" })}
            onSubmit={({ address, insuranceProviders }) => {
              close();
              setValues((prevValues) => {
                const index = selectedAddress ?? prevValues.practices.length;

                return {
                  ...prevValues,
                  practices: [
                    ...prevValues.practices.slice(0, index),
                    {
                      _id: address,
                      address:
                        addressOptions.find(({ value }) => value === address)
                          ?.label || "",
                      insuranceProviders: insuranceProviders,
                    },
                    ...prevValues.practices.slice(index + 1),
                  ],
                };
              });
              setErrors((prevErrors) => ({
                ...prevErrors,
                practices: undefined,
              }));
            }}
          />
        )}
        title="Agregar dirección"
        showCloseButton
      />
      <Button type="submit" block>
        Guardar
      </Button>
    </form>
  );
};
