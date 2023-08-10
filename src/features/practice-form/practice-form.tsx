"use client";

import { practicesClient } from "@marketplace/data-access/practices/practices.client";
import { Button } from "@marketplace/ui/button";
import { Input } from "@marketplace/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "../form/use-form";
import { required } from "../form/validators/required";

export type PracticeFormProps = {
  id?: string;
  name?: string;
  streetNumber?: string;
  route?: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel3?: string;
};

const initialValues = {
  name: "",
  streetNumber: "",
  route: "",
  administrativeAreaLevel1: "",
  administrativeAreaLevel3: "",
};

const rules = {
  name: {
    validator: required,
    message: "Ingresa un nombre",
  },
  streetNumber: {
    validator: required,
    message: "Ingresa un número de calle",
  },
  route: {
    validator: required,
    message: "Ingresa una calle",
  },
  administrativeAreaLevel1: {
    validator: required,
    message: "Ingresa una comuna",
  },
  administrativeAreaLevel3: {
    validator: required,
    message: "Ingresa una región",
  },
};

export const PracticeForm = ({ id, ...practice }: PracticeFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { register, validate, values } = useForm({
    initialValues: { ...initialValues, ...practice },
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
        await practicesClient.update(id, values);
      } else {
        const created = await practicesClient.create(values);
        router.push(`/app/instituciones/${created.id}`);
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Nombre del centro médico"
        {...register("name")}
        placeholder="Clínica RedSalud Providencia"
      />
      <Input label="Calle" {...register("route")} placeholder="Av. Salvador" />
      <Input
        label="Número de calle"
        {...register("streetNumber")}
        placeholder="100"
      />
      <Input
        label="Comuna"
        {...register("administrativeAreaLevel1")}
        placeholder="Providencia"
      />
      <Input
        label="Región"
        {...register("administrativeAreaLevel3")}
        placeholder="Región Metropolitana"
      />
      <Button block type="submit" disabled={isLoading}>
        Guardar
      </Button>
    </form>
  );
};
