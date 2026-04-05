import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
  } catch (e) {
    return e as Response;
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      language: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
  } catch (e) {
    return e as Response;
  }

  const { name, email, password, role, language, isAdmin } = await request.json();

  if (!name || !email || !password || !role || !language) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role,
        language,
        isAdmin: isAdmin === true,
      },
      select: {
        id: true, name: true, email: true,
        role: true, language: true, isAdmin: true, createdAt: true,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanımda." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
