"use client";

import { specialtiesClient } from "@marketplace/data-access/specialties/specialties.client";
import { Button } from "@marketplace/ui/button";
import { Form, useForm } from "@marketplace/ui/form";
import { Input } from "@marketplace/ui/input";
import { Select } from "@marketplace/ui/select";
import { useRouter } from "next/navigation";
import { required } from "../form/validators/required";
import { UploadPicture } from "../upload-picture";

export type SpecialtyFormProps = {
  id?: string;
  name?: string;
  picture?: string;
  seo?: {
    title: string;
    description: string;
  };
  type?: string;
};

const initialValues = {
  picture: "",
  name: "",
};

export const SpecialtyForm = ({
  id,
  name = "",
  picture = "",
  seo,
  type,
}: SpecialtyFormProps) => {
  const router = useRouter();

  const formContext = useForm({
    onSubmit: async (values: {
      name: string;
      picture: string;
      seoTitle: string;
      seoDescription: string;
      type: string;
    }) => {
      const payload = {
        name: values.name,
        picture: values.picture,
        seo: {
          title: values.seoTitle,
          description: values.seoDescription,
        },
        type: values.type || "specialty",
        enabled: true,
      };

      if (id) {
        await specialtiesClient.update(id, payload);
      } else {
        const created = await specialtiesClient.create(payload);
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
      seoTitle: {
        value: seo?.title || "",
      },
      seoDescription: {
        value: seo?.description || "",
      },
      type: {
        value: type || "specialty",
      },
      enabled: {
        value: true,
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
      seoTitle: [
        {
          validator: required,
          message: "Ingresa un título!",
        },
      ],
      seoDescription: [
        {
          validator: required,
          message: "Ingresa una descripción!",
        },
      ],
      type: [
        {
          validator: required,
          message: "Ingresa un tipo!",
        },
      ],
      enabled: [
        {
          validator: required,
          message: "Ingresa un estado!",
        },
      ],
    },
  });

  return (
    <Form {...formContext}>
      <UploadPicture name="picture" />
      <Input label="Nombre" name="name" />
      <Input label="Título SEO" name="seoTitle" />
      <Input label="Descripción SEO" name="seoDescription" />
      <Select label="Tipo" name="type" options={[{ label: "Especialidad", value: "specialty" }, { label: "Examen", value: "exam" }]} />
      <Input type="checkbox" label="Habilitado" name="enabled" />
      <Button block type="submit">
        Guardar
      </Button>
    </Form>
  );
};
