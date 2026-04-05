import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ chapterSlug: string; lessonSlug: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { chapterSlug, lessonSlug } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { slug: chapterSlug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quiz: { select: { id: true } },
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  const lesson = chapter.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json({ chapter, lesson });
}
