import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  let session;
  try {
    session = await requireSession(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const includeLessons = searchParams.get("include") === "lessons";

  const chapters = await prisma.chapter.findMany({
    where: { role: session.role },
    orderBy: { order: "asc" },
    include: {
      _count: { select: { lessons: true } },
      quiz: { select: { id: true } },
      ...(includeLessons
        ? {
            lessons: {
              orderBy: { order: "asc" },
              select: { id: true, slug: true, title: true, order: true },
            },
          }
        : {}),
    },
  });

  return NextResponse.json(chapters);
}
