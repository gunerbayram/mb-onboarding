import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireSession(request);
  } catch (e) {
    return e as Response;
  }

  const people = await prisma.person.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return NextResponse.json(people);
}
