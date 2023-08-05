import { usersService } from "@marketplace/data-access/users/users.service";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const user = await usersService.createUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
