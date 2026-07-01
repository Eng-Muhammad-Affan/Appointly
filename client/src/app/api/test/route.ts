import { NextResponse, type NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  console.log("Development test route")
  return NextResponse.json({
    message:"success"
  });
}
