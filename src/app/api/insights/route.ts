import { NextResponse } from "next/server";
import { generateInsight } from "@/lib/mock-ai";
import type { LicensedVertical, Role } from "@/lib/types";

export async function POST(req: Request) {
  const body = (await req.json()) as { query?: string; role?: Role; vertical?: LicensedVertical };
  const query = body.query ?? "";
  const role = body.role ?? "Risk Administrator";
  const vertical = body.vertical ?? "general";
  const result = generateInsight(query, role, vertical);
  return NextResponse.json(result);
}
