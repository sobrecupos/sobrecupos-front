import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");

  if (typeof code !== "string") {
    return NextResponse.json({ error: true }, { status: 400 });
  }

  const publicProfile = await practitionersService.getPublicProfile(code);

  return NextResponse.json(publicProfile);
};

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
