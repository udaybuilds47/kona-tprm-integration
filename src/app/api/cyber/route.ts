import { NextResponse } from "next/server";
import { cyberTelemetry } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ telemetry: cyberTelemetry });
}
