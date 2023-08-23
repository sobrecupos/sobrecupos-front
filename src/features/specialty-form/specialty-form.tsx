"use client";

import { specialtiesClient } from "@marketplace/data-access/specialties/specialties.client";
import { Button } from "@marketplace/ui/button";
import { Form, useForm } from "@marketplace/ui/form";
import { Input } from "@marketplace/ui/input";
import { CreateSpecialtyRequest } from "@marketplace/utils/types/specialties";
import { useRouter } from "next/navigation";
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

export const SpecialtyForm = ({
  id,
  name = "",
  picture = "",
}: SpecialtyFormProps) => {
  const router = useRouter();

  const formContext = useForm({
    onSubmit: async (values: CreateSpecialtyRequest) => {
      if (id) {
        await specialtiesClient.update(id, values);
      } else {
        const created = await specialtiesClient.create(values);
        router.push(`/app/especialidades/${created.id}`);
      }
    },
    schema: {
      name: {
        value: name,
      },
      picture: {
        value: picture,
      },
    },
    rules: {
      name: [
        {
          validator: required,
          message: "Ingresa un nombre",
        },
      ],
      picture: [
        {
          validator: required,
          message: "Sube una imagen para la especialidad!",
        },
      ],
    },
  });

  return (
    <Form {...formContext}>
      <UploadPicture name="picture" />
      <Input label="Nombre" name="name" />
      <Button block type="submit">
        Guardar
      </Button>
    </Form>
  );
};
