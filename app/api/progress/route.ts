import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let session;
  try {
    session = await requireSession(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await request.json();

  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  try {
    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: session.sub, lessonId } },
      update: {},
      create: { userId: session.sub, lessonId },
    });
    return NextResponse.json(progress);
  } catch {
    return NextResponse.json({ error: "Failed to record progress" }, { status: 500 });
  }
}
