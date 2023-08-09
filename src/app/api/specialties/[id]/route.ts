import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const body = await request.json();

  return specialtiesService.findOne(body);
};

export const PATCH = async (request: NextRequest) => {
  const { id, ...specialty } = await request.json();

  return specialtiesService.update(id, specialty);
};
