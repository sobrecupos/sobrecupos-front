import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const body = await request.json();

  return practicesService.findOne(body);
};

export const PATCH = async (request: NextRequest) => {
  const { id, ...practice } = await request.json();

  return practicesService.update(id, practice);
};
