import { filesService } from "@marketplace/data-access/files/files.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const file = searchParams.get("file");
  const fileType = searchParams.get("fileType");
  const prefixHash = searchParams.get("prefixHash") === "true";

  if (!file || !fileType) {
    return NextResponse.json(
      {
        type: "missingAttributes",
        message: "Missing file or fileType query params",
      },
      { status: 400 }
    );
  }

  const response = await filesService.createPresignedPost({
    file,
    fileType,
    prefixHash,
  });

  return NextResponse.json(response);
};
