import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    session = await requireSession(request);
  } catch (e) {
    return e as Response;
  }

  const resource = await prisma.resource.findUnique({
    where: { id: params.id },
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

  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: resource.id,
    title: resource.title,
    description: resource.description,
    youtubeUrl: resource.youtubeUrl,
    completed: resource.progress.length > 0,
    notes: resource.notes[0]?.content ?? "",
  });
}
