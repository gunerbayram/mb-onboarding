import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    session = await requireSession(request);
  } catch (e) {
    return e as Response;
  }

  await prisma.resourceProgress.upsert({
    where: { userId_resourceId: { userId: session.sub, resourceId: params.id } },
    create: { userId: session.sub, resourceId: params.id },
    update: {},
  });

  return NextResponse.json({ ok: true });
}
