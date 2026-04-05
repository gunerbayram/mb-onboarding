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

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") ?? "creative-strategist";

  const includeLessons = searchParams.get("include") === "lessons";

  const chapters = await prisma.chapter.findMany({
    where: { role },
    orderBy: { order: "asc" },
    include: {
      _count: { select: { lessons: true } },
      quiz: { select: { id: true } },
      ...(includeLessons && {
        lessons: {
          select: { id: true, slug: true, title: true, order: true },
          orderBy: { order: "asc" },
        },
      }),
    },
  });

  return NextResponse.json(chapters);
}
