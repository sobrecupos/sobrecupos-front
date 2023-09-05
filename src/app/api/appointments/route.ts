import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const practitionerId = searchParams.get("practitionerId");

  if (!practitionerId) {
    throw new Error("You must provide a practitionerId!");
  }

  const from = searchParams.get("from") ?? undefined;
  const result = await appointmentsService.getAppointmentsByPractice(
    practitionerId,
    from
  );

  return NextResponse.json(result);
};
