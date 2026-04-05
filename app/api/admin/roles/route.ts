import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
  } catch (e) {
    return e as Response;
  }

  const result = await Promise.all(
    ROLES.map(async (role) => {
      const chapters = await prisma.chapter.findMany({
        where: { role: role.value },
        include: { _count: { select: { lessons: true } } },
      });

      const totalLessons = chapters.reduce(
        (sum, c) => sum + c._count.lessons,
        0
      );

      const employees = await prisma.user.findMany({
        where: { role: role.value, isAdmin: false },
        select: {
          id: true,
          name: true,
          email: true,
          language: true,
          createdAt: true,
          lessonProgress: { select: { lessonId: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        value: role.value,
        label: role.label,
        chapterCount: chapters.length,
        totalLessons,
        employees: employees.map((emp) => ({
          id: emp.id,
          name: emp.name,
          email: emp.email,
          language: emp.language,
          createdAt: emp.createdAt,
          completedLessons: emp.lessonProgress.length,
        })),
      };
    })
  );

  return NextResponse.json(result);
}
