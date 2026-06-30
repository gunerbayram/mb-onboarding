import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
  } catch (e) {
    return e as Response;
  }

  const role = request.nextUrl.searchParams.get("role") ?? "creative-strategist";

  const people = await prisma.person.findMany({
    where: { role },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return NextResponse.json(people);
}
