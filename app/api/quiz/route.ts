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

  const { quizId, answers } = await request.json();
  // answers: Record<questionId, selectedIndex>

  if (!quizId || !answers) {
    return NextResponse.json({ error: "quizId and answers required" }, { status: 400 });
  }

  const questions = await prisma.quizQuestion.findMany({
    where: { quizId },
    orderBy: { order: "asc" },
  });

  let score = 0;
  const results = questions.map((q) => {
    const selected = answers[q.id];
    const correct = selected === q.correctAnswer;
    if (correct) score++;
    return { questionId: q.id, selected, correct, correctAnswer: q.correctAnswer };
  });

  await prisma.quizAttempt.create({
    data: {
      userId: session.sub,
      quizId,
      score,
      totalQuestions: questions.length,
    },
  });

  return NextResponse.json({ score, totalQuestions: questions.length, results });
}
