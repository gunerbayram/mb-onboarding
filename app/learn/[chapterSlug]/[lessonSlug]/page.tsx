"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import LessonMarkdown from "@/components/LessonMarkdown";
import { useLang } from "@/components/LanguageProvider";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
}

interface Chapter {
  id: string;
  slug: string;
  title: string;
  order: number;
  lessons: Lesson[];
  quiz: { id: string } | null;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLang();
  const chapterSlug = params.chapterSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);

  const fetchLesson = useCallback(async () => {
    const res = await fetch(`/api/chapters/${chapterSlug}/lessons/${lessonSlug}`);
    if (res.ok) {
      const data = await res.json();
      setChapter(data.chapter);
      setLesson(data.lesson);
    }
    setLoading(false);
  }, [chapterSlug, lessonSlug]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  useEffect(() => {
    if (!lesson) return;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((user) => {
        if (user.lessonProgress?.some((p: { lessonId: string }) => p.lessonId === lesson.id)) {
          setCompleted(true);
        }
      });
  }, [lesson]);

  async function handleTranslate() {
    if (translatedContent) {
      setTranslatedContent(null);
      setTranslatedTitle(null);
      return;
    }
    if (!lesson) return;
    setTranslating(true);
    const translateText = async (text: string) => {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      return (data[0] as string[][]).map((chunk) => chunk[0]).join("");
    };
    const [title, content] = await Promise.all([
      translateText(lesson.title),
      translateText(lesson.content),
    ]);
    setTranslatedTitle(title);
    setTranslatedContent(content);
    setTranslating(false);
  }

  async function markComplete() {
    if (!lesson) return;
    setMarking(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id }),
    });
    setCompleted(true);
    setMarking(false);
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!lesson || !chapter) {
    return (
      <>
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-gray-500 text-sm">{t("lessonNotFound")}</p>
        </main>
      </>
    );
  }

  const currentIndex = chapter.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = chapter.lessons[currentIndex + 1] ?? null;
  const prevLesson = chapter.lessons[currentIndex - 1] ?? null;

  return (
    <>
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">All chapters</Link>
          <span>/</span>
          <span className="text-gray-600">{lesson.title}</span>
        </nav>

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              {t("chapterLabel")} {chapter.order} · {t("lessonLabel")} {lesson.order}
            </span>
            <h1 className="text-xl font-bold text-gray-900 mt-1">
              {translatedTitle ?? lesson.title}
            </h1>
          </div>
          <button
            onClick={handleTranslate}
            disabled={translating}
            className="shrink-0 mt-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {translating ? t("translating") : translatedContent ? t("showOriginal") : t("translateToTurkish")}
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <LessonMarkdown content={translatedContent ?? lesson.content} />
        </div>

        {!completed ? (
          <button
            onClick={markComplete}
            disabled={marking}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors mb-4"
          >
            {marking ? t("saving") : t("markAsComplete")}
          </button>
        ) : (
          <div className="flex items-center gap-2 justify-center py-3 bg-green-50 border border-green-200 rounded-xl mb-4">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-700">{t("lessonCompleted")}</span>
          </div>
        )}

        <div className="flex gap-3">
          {prevLesson ? (
            <button
              onClick={() => router.push(`/learn/${chapterSlug}/${prevLesson.slug}`)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("previous")}
            </button>
          ) : (
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              All chapters
            </button>
          )}

          {nextLesson ? (
            <button
              onClick={() => router.push(`/learn/${chapterSlug}/${nextLesson.slug}`)}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
            >
              {t("next")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : chapter.quiz ? (
            <button
              onClick={() => router.push(`/learn/${chapterSlug}/quiz`)}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t("takeQuiz")}
            </button>
          ) : (
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              All chapters
            </button>
          )}
        </div>
      </main>
    </>
  );
}
