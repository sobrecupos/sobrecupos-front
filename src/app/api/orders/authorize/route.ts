import { ordersService } from "@marketplace/data-access/orders/orders.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const text = await req.text();
  const body = new URLSearchParams(text);
  const token = body.get("token");

  if (typeof token !== "string") {
    return NextResponse.json({ error: true }, { status: 500 });
  }

  await ordersService.authorize(token);

  return NextResponse.json({ status: "ok" });
};
