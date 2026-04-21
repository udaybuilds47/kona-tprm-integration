import { NextResponse } from "next/server";
import { parseRuleFromNaturalLanguage } from "@/lib/mock-ai";
import { rules } from "@/lib/mock-data/core";

export async function GET() {
  return NextResponse.json({ rules });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { prompt?: string };
  return NextResponse.json({ preview: parseRuleFromNaturalLanguage(body.prompt ?? "") });
}
