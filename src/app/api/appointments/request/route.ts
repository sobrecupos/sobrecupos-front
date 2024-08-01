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

  if (
    !name ||
    !lastName ||
    !secondLastName ||
    !phone ||
    !email ||
    !speciality ||
    !comment ||
    !time
  ) {
    return NextResponse.json(
      { error: "You must provide all required fields!" },
      { status: 400 }
    );
  }
  console.log("time :: ", time);
  try {
    const result = await appointmentsService.requestAppointment(
      name,
      lastName,
      secondLastName,
      phone,
      email,
      speciality,
      comment,
      time
    );

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error requesting appointment:", error);
    return NextResponse.json(
      { error: "Failed to request appointment" },
      { status: 500 }
    );
  }
};
