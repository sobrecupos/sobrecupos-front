import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await specialtiesService.list();

    if (!result) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const result = await specialtiesService.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
