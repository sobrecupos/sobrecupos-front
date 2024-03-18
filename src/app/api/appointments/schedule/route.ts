import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const practitionerId = searchParams.get("practitionerId");

  if (!practitionerId) {
    throw new Error("You must provide a practitionerId!");
  }

  const from = searchParams.get("from") ?? undefined;
  const result = await appointmentsService.getSchedule(practitionerId, from);

  return NextResponse.json(result);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = await appointmentsService.saveSchedule(body);

  return NextResponse.json(result);
};

// export const GETByDate = async (
//   req: NextRequest,
//   { params }: { params: { practitionerId: string; fromDateString?: string } }
// ) => {
//   if (!params.practitionerId) {
//     return NextResponse.json({ error: true }, { status: 401 });
//   }

//   try {
//     const response = await appointmentsService.getAppointmentsByPractice(
//       params.practitionerId,
//       params.fromDateString
//     );
//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: true }, { status: 500 });
//   }
// };
