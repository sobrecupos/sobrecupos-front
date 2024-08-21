import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  const secondLastName = searchParams.get("secondLastName");
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const speciality = searchParams.get("speciality");
  const comment = searchParams.get("comment");
  const time = searchParams.get("time");
  const region = searchParams.get("region");

  if (
    !name ||
    !lastName ||
    !secondLastName ||
    !phone ||
    !email ||
    !speciality ||
    !comment ||
    !time ||
    !region
  ) {
    throw new Error("You must provide a all inputs!");
  }

  const result = await appointmentsService.requestAppointment(
    name,
    lastName,
    secondLastName,
    phone,
    email,
    speciality,
    comment,
    time,
    region
  );

  return NextResponse.json(result);
};
