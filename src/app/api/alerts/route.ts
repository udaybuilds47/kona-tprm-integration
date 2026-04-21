import { NextResponse } from "next/server";
import { alerts } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ alerts });
}
