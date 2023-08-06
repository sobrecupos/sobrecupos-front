import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const created = await practitionersService.create(body);
  return NextResponse.json(created);
};

export const PATCH = async (req: NextRequest) => {
  const { id, ...body } = await req.json();
  const updated = await practitionersService.update(id, body);
  return NextResponse.json(updated);
};
