import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const body = await request.json();

  const response = await specialtiesService.findOne(body);

  return NextResponse.json(response);
};

export const PATCH = async (request: NextRequest) => {
  const { id, ...specialty } = await request.json();

  const response = await specialtiesService.update(id, specialty);

  return NextResponse.json(response);
};
