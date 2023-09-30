import { ordersService } from "@marketplace/data-access/orders/orders.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const itemId = req.nextUrl.searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  try {
    const response = await ordersService.findByItemId(itemId);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
