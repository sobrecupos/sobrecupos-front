import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const body = await request.json();
  const response = await practicesService.findOne(body);

  return NextResponse.json(response);
};

export const PATCH = async (request: NextRequest) => {
  const { id, ...practice } = await request.json();

  const response = await practicesService.update(id, practice);

  return NextResponse.json(response);
};
