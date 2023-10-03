"use client";

import { Button } from "@marketplace/ui/button";
import { Form, useForm } from "@marketplace/ui/form";
import { Select } from "@marketplace/ui/select";
import { UpdateOrCreateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/update-or-create-appointment-request.type";
import { PractitionerPractice } from "@marketplace/utils/types/practitioners";
import { useMemo } from "react";
import { required } from "../form/validators/required";

export type AppointmentsCalendarFormProps = {
  appointment: UpdateOrCreateAppointmentRequest;
  practices: PractitionerPractice[];
  readOnly?: boolean;
  onSubmit?: (appointment: UpdateOrCreateAppointmentRequest) => Promise<void>;
  onSubmitError?: (error: unknown) => void;
};

export const AppointmentsCalendarForm = ({
  appointment,
  practices,
  onSubmit,
  onSubmitError,
  readOnly,
}: AppointmentsCalendarFormProps) => {
  const form = useForm({
    onSubmit: async ({ practiceId }: { practiceId: string }) => {
      if (readOnly) return;

      await onSubmit?.({
        ...appointment,
        status: "FREE",
        practice: practices.find(({ id }) => id === practiceId)!,
      });
    },
    onSubmitError,
    schema: {
      practiceId: { value: appointment.practice.id },
    },
    rules: {
      practiceId: [
        {
          validator: required,
          message: "Selecciona un lugar de atención",
        },
      ],
    },
  });

  const options = useMemo(
    () => practices.map(({ id, address }) => ({ value: id, label: address })),
    [practices]
  );

  return (
    <Form {...form}>
      <Select
        label="Lugar de atención"
        options={options}
        disabled={readOnly}
        name="practiceId"
      />
      <Button type="submit" block disabled={readOnly}>
        Guardar
      </Button>
    </Form>
  );
};
