import { NextResponse } from "next/server";
import { actionLog } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ actions: actionLog });
}
