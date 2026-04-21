import { NextResponse } from "next/server";
import { cases } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ cases });
}
