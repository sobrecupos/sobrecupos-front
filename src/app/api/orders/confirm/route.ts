import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const text = await req.text();
  const body = new URLSearchParams(text);

  return NextResponse.redirect(
    `${req.nextUrl.origin}/resumen?paymentId=${body.get("token")}`,
    {
      status: 303,
    }
  );
};
