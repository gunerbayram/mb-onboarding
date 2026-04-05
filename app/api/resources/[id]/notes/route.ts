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

  const note = await prisma.resourceNote.findUnique({
    where: { userId_resourceId: { userId: session.sub, resourceId: params.id } },
  });

  return NextResponse.json({ content: note?.content ?? "" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    session = await requireSession(request);
  } catch (e) {
    return e as Response;
  }

  const { content } = await request.json();

  await prisma.resourceNote.upsert({
    where: { userId_resourceId: { userId: session.sub, resourceId: params.id } },
    create: { userId: session.sub, resourceId: params.id, content: content ?? "" },
    update: { content: content ?? "" },
  });

  return NextResponse.json({ ok: true });
}
