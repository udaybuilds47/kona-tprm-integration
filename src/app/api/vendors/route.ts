import { NextResponse } from "next/server";
import { vendors } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ vendors });
}
