import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { NextRequest, NextResponse } from "next/server";

dayjs.extend(isoWeek);

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const practitionerId = searchParams.get("practitionerId");

  if (!practitionerId) {
    throw new Error("You must provide a practitionerId!");
  }

  const week = Number(searchParams.get("week") || dayjs().isoWeek());
  const year = Number(searchParams.get("year") || dayjs().year());

  const result = await appointmentsService.getCalendar({
    practitionerId,
    week,
    year,
  });

  return NextResponse.json(result);
};
