import { ordersService } from "@marketplace/data-access/orders/orders.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const response = await ordersService.create(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
