"use client";

import { specialtiesClient } from "@marketplace/data-access/specialties/specialties.client";
import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "../form/use-form";
import { required } from "../form/validators/required";
import { UploadPicture } from "../upload-picture";

export type SpecialtyFormProps = {
  id?: string;
  name?: string;
  picture?: string;
};

const initialValues = {
  picture: "",
  name: "",
};

const rules = {
  name: {
    validator: required,
    message: "Ingresa un nombre",
  },
  picture: {
    validator: required,
    message: "Sube una imagen para la especialidad!",
  },
};

export const SpecialtyForm = ({ id, ...specialty }: SpecialtyFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { register, validate, values } = useForm({
    initialValues: { ...initialValues, ...specialty },
    rules,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setHasError(false);
    const { isValid } = await validate();

    if (!isValid || isLoading) return;

    try {
      if (id) {
        await specialtiesClient.update(id, values);
      } else {
        const created = await specialtiesClient.create(values);
        router.push(`/app/especialidades/${created.id}`);
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UploadPicture {...register("picture")} />
      <Input label="Nombre" {...register("name")} />
      <Button block type="submit" disabled={isLoading}>
        Guardar
      </Button>
    </form>
  );
};
