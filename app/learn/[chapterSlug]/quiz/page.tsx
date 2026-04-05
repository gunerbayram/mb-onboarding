import { prisma } from "@/lib/db";
import NavBar from "@/components/NavBar";
import QuizView from "@/components/QuizView";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ chapterSlug: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { chapterSlug } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { slug: chapterSlug },
    include: {
      quiz: {
        include: {
          questions: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!chapter || !chapter.quiz) notFound();

  const allChapters = await prisma.chapter.findMany({
    orderBy: { order: "asc" },
    select: { id: true, slug: true, order: true },
  });
  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id);
  const nextChapter = allChapters[currentIndex + 1] ?? null;

  const questions = chapter.quiz.questions.map((q) => ({
    ...q,
    options: JSON.parse(q.options) as string[],
  }));

  return (
    <>
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All chapters
        </Link>

        <QuizView
          quizId={chapter.quiz.id}
          quizTitle={chapter.quiz.title}
          questions={questions}
          chapterSlug={chapterSlug}
          nextChapterSlug={nextChapter?.slug}
        />
      </main>
    </>
  );
}
