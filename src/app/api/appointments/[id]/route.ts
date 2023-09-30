import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id?: string } }
) => {
  const body = await req.json();

  if (!params.id) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  try {
    const response = await appointmentsService.update(params.id, body);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id?: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  try {
    const response = await appointmentsService.remove(params.id);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
