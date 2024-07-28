import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const speciality = searchParams.get("speciality");

  if (!speciality) {
    throw new Error("You must provide a speciality!");
  }

  const result = await appointmentsService.getCountAppointmentsBySpecialty(
    speciality
  );

  return NextResponse.json(result);
};
