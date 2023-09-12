"use client";

import { practicesClient } from "@marketplace/data-access/practices/practices.client";
import { Button } from "@marketplace/ui/button";
import { Form, useForm } from "@marketplace/ui/form";
import { Input } from "@marketplace/ui/input";
import { useRouter } from "next/navigation";
import { required } from "../form/validators/required";

export type PracticeFormProps = {
  id?: string;
  name?: string;
  streetNumber?: string;
  route?: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel3?: string;
};

export const PracticeForm = ({
  id,
  name = "",
  streetNumber = "",
  route = "",
  administrativeAreaLevel1 = "",
  administrativeAreaLevel3 = "",
}: PracticeFormProps) => {
  const router = useRouter();

  const formContext = useForm({
    onSubmit: async (values: {
      name: string;
      streetNumber: string;
      route: string;
      administrativeAreaLevel1: string;
      administrativeAreaLevel3: string;
    }) => {
      if (id) {
        await practicesClient.update(id, values);
      } else {
        const created = await practicesClient.create(values);
        router.push(`/app/instituciones/${created.id}`);
      }
    },
    schema: {
      name: {
        value: name,
      },
      streetNumber: {
        value: streetNumber,
      },
      route: {
        value: route,
      },
      administrativeAreaLevel1: {
        value: administrativeAreaLevel1,
      },
      administrativeAreaLevel3: {
        value: administrativeAreaLevel3,
      },
    },
    rules: {
      name: [
        {
          validator: required,
          message: "Ingresa un nombre",
        },
      ],
      streetNumber: [
        {
          validator: required,
          message: "Ingresa un número de calle",
        },
      ],
      route: [
        {
          validator: required,
          message: "Ingresa una calle",
        },
      ],
      administrativeAreaLevel3: [
        {
          validator: required,
          message: "Ingresa una comuna",
        },
      ],
      administrativeAreaLevel1: [
        {
          validator: required,
          message: "Ingresa una región",
        },
      ],
    },
  });

  return (
    <Form {...formContext}>
      <Input
        label="Nombre del centro médico"
        name="name"
        placeholder="Clínica RedSalud Providencia"
      />
      <Input label="Calle" name="route" placeholder="Av. Salvador" />
      <Input label="Número de calle" name="streetNumber" placeholder="100" />
      <Input
        label="Comuna"
        name="administrativeAreaLevel3"
        placeholder="Providencia"
      />
      <Input
        label="Región"
        name="administrativeAreaLevel1"
        placeholder="Región Metropolitana"
      />
      <Button block type="submit">
        Guardar
      </Button>
    </Form>
  );
};
