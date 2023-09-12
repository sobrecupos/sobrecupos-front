"use client";

import { practitionersClient } from "@marketplace/data-access/practitioners/practitioners.client";
import { Button } from "@marketplace/ui/button";
import { Form, useForm } from "@marketplace/ui/form";
import { Input } from "@marketplace/ui/input";
import { Modal } from "@marketplace/ui/modal";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select } from "@marketplace/ui/select";
import { Practice } from "@marketplace/utils/types/practices";
import {
  PractitionerPractice,
  PrivatePractitionerProfileResponse,
} from "@marketplace/utils/types/practitioners";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { required } from "../form/validators/required";
import { requiredWithoutDefault } from "../form/validators/required-without-default";
import {
  PractitionerPracticeForm,
  PractitionerPracticeFormSubmitValues,
} from "../practitioner-practice-form/practitioner-practice-form";
import { UploadPicture } from "../upload-picture";
import "./practitioner-profile-form.scss";
import { PractitionerProfilePractices } from "./practitioner-profile-practices";

export type PractitionerProfileFormProps =
  Partial<PrivatePractitionerProfileResponse> & {
    availablePractices: Practice[];
    availableSpecialties: SpecialtyResponse[];
    userId: string;
    userEmail: string;
  };

export type OnPractitionerProfileFormSubmit = Partial<
  Omit<PrivatePractitionerProfileResponse, "specialty">
> & { specialty?: string };

const classes = getComponentClassNames("practitioner-profile-form", {
  sectionTitle: "section-title",
  form: "form",
  addressContainer: "address-container",
  address: "address",
  practiceActions: "practice-actions",
  addressError: "address-error",
  deleteAction: "delete-action",
});

const defaultInsuranceProviders = [
  { id: "1", name: "Fonasa", isActive: false },
  { id: "2", name: "Isapre", isActive: false },
  { id: "3", name: "Particular", isActive: false },
];

export const PractitionerProfileForm = ({
  id,
  userId,
  userEmail,
  picture = "",
  names = "",
  firstSurname = "",
  secondSurname = "",
  phone = "",
  description = "",
  licenseId = "",
  specialty,
  practices = [],
  availablePractices,
  availableSpecialties,
}: PractitionerProfileFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] =
    useState<PractitionerPractice | null>(null);
  const specialtyOptions = useMemo(
    () => [
      {
        value: "default",
        label: "Selecciona una especialidad",
        disabled: true,
      },
      ...availableSpecialties.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    ],
    [availableSpecialties]
  );
  const practiceOptions = useMemo(
    () => [
      { value: "default", label: "Selecciona una institución", disabled: true },
      ...availablePractices.map(({ id, name, shortFormattedAddress }) => ({
        value: id,
        label: `${name} - ${shortFormattedAddress}`,
      })),
    ],
    [availablePractices]
  );
  const formContext = useForm({
    onSubmit: async ({
      specialty,
      ...values
    }: OnPractitionerProfileFormSubmit) => {
      const currentSpecialty = availableSpecialties.find(
        ({ id }) => id === specialty
      );

      try {
        await practitionersClient.updateOrCreate({
          ...values,
          specialty: currentSpecialty
            ? {
                id: currentSpecialty.id,
                name: currentSpecialty.name,
                code: currentSpecialty.code,
              }
            : undefined,
          userId,
          email: userEmail,
          id: id || "",
        });
        toast.success("¡Perfil guardado exitosamente!", {
          duration: 5000,
        });
      } catch (error) {
        console.error(
          `Failed to save profile, reason: ${JSON.stringify(error)}`
        );

        toast.error("¡Algo salió mal! Inténtalo de nuevo.", {
          duration: 5000,
        });
      }
    },
    schema: {
      picture: { value: picture },
      names: { value: names },
      firstSurname: { value: firstSurname },
      secondSurname: { value: secondSurname },
      phone: { value: phone },
      description: { value: description },
      licenseId: { value: licenseId },
      specialty: { value: specialty?.id || "default" },
      practices: { value: practices },
    },
    rules: {
      picture: [
        {
          validator: required,
          message: "Ingresa una imagen",
        },
      ],
      names: [
        {
          validator: required,
          message: "Ingresa un nombre",
        },
      ],
      firstSurname: [
        {
          validator: required,
          message: "Ingresa un apellido",
        },
      ],
      description: [
        {
          validator: required,
          message: "Ingresa una breve descripción sobre ti",
        },
      ],
      licenseId: [
        {
          validator: required,
          message: "Ingresa tu número de SIS",
        },
      ],
      specialty: [
        {
          validator: requiredWithoutDefault,
          message: "Selecciona una especialidad",
        },
      ],
      practices: [
        {
          validator: (value?: unknown[]) => !!value && value?.length !== 0,
          message: "Ingresa al menos una dirección",
        },
      ],
    },
  });
  const handlePractitionerPracticeSubmit = (
    values: PractitionerPracticeFormSubmitValues
  ) => {
    const currentPractice = availablePractices.find(
      ({ id }) => id === values.practice
    );

    if (currentPractice) {
      const nextPractice = {
        id: currentPractice.id,
        address: `${currentPractice.name}, ${currentPractice.shortFormattedAddress}`,
        tag: currentPractice.administrativeAreaLevel3,
        insuranceProviders: values.insuranceProviders,
      };

      formContext.setCurrentSchema((prevSchema) => {
        const nextSchema = structuredClone(prevSchema);

        if (Array.isArray(nextSchema.practices.value)) {
          nextSchema.practices.value.push(nextPractice);
        } else {
          nextSchema.practices.value = [nextPractice];
        }

        nextSchema.practices.errors = undefined;

        return nextSchema;
      });
    }
  };

  return (
    <Form className={classes.namespace} {...formContext}>
      <UploadPicture name="picture" />
      <h3 className={classes.sectionTitle}>Información personal</h3>
      <Input label="Nombre(s)" name="names" />
      <Input label="Primer apellido" name="firstSurname" />
      <Input label="Segundo apellido" name="secondSurname" />
      <Input label="Teléfono" type="tel" name="phone" />
      <h3 className={classes.sectionTitle}>Información profesional</h3>
      <Input label="Sobre mí" name="description" />
      <Input label="Número SIS" name="licenseId" />
      <Select
        label="Especialidad"
        options={specialtyOptions}
        name="specialty"
      />
      <h3 className={classes.sectionTitle}>Mis direcciones</h3>
      <PractitionerProfilePractices
        practices={
          formContext.currentSchema.practices
            .value as PrivatePractitionerProfileResponse["practices"]
        }
        error={formContext.currentSchema.practices.errors?.[0]}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(practice) => {
          setSelectedPractice(practice);
          setIsModalOpen(true);
        }}
        onRemove={(index) => {
          formContext.setCurrentSchema((prevSchema) => {
            const nextSchema = structuredClone(prevSchema);
            (
              nextSchema.practices
                .value as PrivatePractitionerProfileResponse["practices"]
            ).splice(index, 1);

            return nextSchema;
          });
        }}
      />
      <Modal
        variant="small"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPractice(null);
        }}
        closeOnBackdropClick={false}
        title="Agregar dirección"
        renderBody={({ close }) => (
          <PractitionerPracticeForm
            className={classes.form}
            practiceOptions={practiceOptions}
            practice={selectedPractice?.id}
            insuranceProviderOptions={
              selectedPractice?.insuranceProviders || defaultInsuranceProviders
            }
            onSubmit={async (values: PractitionerPracticeFormSubmitValues) => {
              handlePractitionerPracticeSubmit(values);
              close();
            }}
          />
        )}
        showCloseButton
      />
      <Button type="submit" block>
        Guardar
      </Button>
    </Form>
  );
};
