import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  let session;
  try {
    session = await requireSession(request);
  } catch (e) {
    return e as Response;
  }

  const resources = await prisma.resource.findMany({
    orderBy: { order: "asc" },
    include: {
      progress: {
        where: { userId: session.sub },
        select: { completedAt: true },
      },
      notes: {
        where: { userId: session.sub },
        select: { content: true },
      },
    },
  });

  return NextResponse.json(
    resources.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      youtubeUrl: r.youtubeUrl,
      category: r.category,
      order: r.order,
      completed: r.progress.length > 0,
      hasNotes: r.notes.length > 0 && r.notes[0].content.trim().length > 0,
    }))
  );
}
