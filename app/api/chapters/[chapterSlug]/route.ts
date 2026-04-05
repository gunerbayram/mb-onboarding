import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ chapterSlug: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { chapterSlug } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { slug: chapterSlug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quiz: { select: { id: true } },
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allChapters = await prisma.chapter.findMany({
    orderBy: { order: "asc" },
    select: { id: true, slug: true, order: true },
  });

  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id);
  const nextChapter = allChapters[currentIndex + 1] ?? null;

  return NextResponse.json({ chapter, nextChapter });
}
