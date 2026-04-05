"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  order: number;
}

interface Chapter {
  id: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: { id: string } | null;
}

interface UserData {
  id: string;
  name: string;
  isAdmin: boolean;
  lessonProgress: { lessonId: string }[];
  quizAttempts: { quizId: string; score: number; totalQuestions: number }[];
}

interface Resource {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  completed: boolean;
  hasNotes: boolean;
}

interface Person {
  id: string;
  name: string;
  description: string;
  url: string;
  platform: string;
  category: string;
}

type Tab = "learning" | "resources";

function getYouTubeThumbnail(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/) ?? url.match(/youtu\.be\/([^?]+)/);
  const id = match?.[1] ?? "";
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

function QuizRow({
  chapterSlug,
  quizId,
  allLessonsDone,
  passed,
}: {
  chapterSlug: string;
  quizId: string;
  allLessonsDone: boolean;
  passed: boolean;
}) {
  const [showWarning, setShowWarning] = useState(false);

  if (passed || allLessonsDone) {
    return (
      <Link
        href={`/learn/${chapterSlug}/quiz`}
        className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 transition-colors group"
      >
        {passed ? (
          <div className="w-5 h-5 rounded-full bg-green-500 shrink-0 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 group-hover:border-indigo-500 shrink-0 transition-colors flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <span className={`text-xs font-medium ${passed ? "text-green-600" : "text-indigo-600"}`}>
          Quiz
        </span>
        {passed && <span className="text-xs text-green-500 ml-auto">Passed</span>}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setShowWarning((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xs font-medium text-gray-400">Quiz</span>
        <svg className="w-3.5 h-3.5 text-gray-300 ml-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      </button>
      {showWarning && (
        <div className="mx-5 mb-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
          <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-amber-700">
            Complete all lessons in this chapter before taking the quiz.
          </p>
        </div>
      )}
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "youtube") {
    return (
      <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (platform === "twitter") {
    return (
      <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg className="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.id}`}
      className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 w-28 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={getYouTubeThumbnail(resource.youtubeUrl)}
          alt={resource.title}
          className="w-full h-full object-cover aspect-video"
        />
        {resource.completed && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        {!resource.completed && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
        <div className="flex items-center gap-3 mt-2">
          {resource.completed ? (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Watched
            </span>
          ) : (
            <span className="text-xs text-gray-400">Not watched</span>
          )}
          {resource.hasNotes && (
            <span className="text-xs text-indigo-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Notes saved
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function HomePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(
    searchParams.get("tab") === "resources" ? "resources" : "learning"
  );
  const [resources, setResources] = useState<Resource[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [resourceSubTab, setResourceSubTab] = useState<"videos" | "people">("videos");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [userName, setUserName] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [chaptersRes, meRes, resourcesRes, peopleRes] = await Promise.all([
      fetch("/api/chapters?include=lessons"),
      fetch("/api/auth/me"),
      fetch("/api/resources"),
      fetch("/api/people"),
    ]);
    if (chaptersRes.ok) setChapters(await chaptersRes.json());
    if (resourcesRes.ok) setResources(await resourcesRes.json());
    if (peopleRes.ok) setPeople(await peopleRes.json());
    if (meRes.ok) {
      const me: UserData = await meRes.json();
      setUserData(me);
      setUserName(me.name);
      localStorage.setItem("userName", me.name);
      localStorage.setItem("userId", me.id);
      localStorage.setItem("isAdmin", String(me.isAdmin));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      router.replace("/admin");
      return;
    }
    loadData();
  }, [loadData, router]);

  // Re-fetch when the user navigates back to this page (window regains focus)
  useEffect(() => {
    const onFocus = () => loadData();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadData]);

  const completedLessonIds = new Set(
    userData?.lessonProgress.map((p) => p.lessonId) ?? []
  );
  const passedQuizIds = new Set(
    userData?.quizAttempts
      .filter((a) => a.score / a.totalQuestions >= 0.6)
      .map((a) => a.quizId) ?? []
  );

  const totalLessons = chapters.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedCount = chapters.reduce(
    (sum, c) => sum + c.lessons.filter((l) => completedLessonIds.has(l.id)).length,
    0
  );

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

  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {userName ? `Welcome back, ${userName.split(" ")[0]}` : "Creative Strategist Onboarding"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your structured learning path for the Creative Strategist role.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setTab("learning")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "learning"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Learning
          </button>
          <button
            onClick={() => setTab("resources")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "resources"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Resources
          </button>
        </div>

        {/* Learning tab */}
        {tab === "learning" && (
          <>
            {/* Completion card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-800">Completion</span>
                <span className="text-sm font-semibold text-indigo-600">
                  {totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {completedCount} of {totalLessons} lessons completed
              </p>
            </div>

            {/* Chapters with lessons */}
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  {/* Chapter header — links to first lesson */}
                  <Link
                    href={chapter.lessons[0] ? `/learn/${chapter.slug}/${chapter.lessons[0].slug}` : `/learn/${chapter.slug}/quiz`}
                    className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-indigo-100 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        Chapter {index + 1}: {chapter.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {chapter.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 shrink-0 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Lessons + Quiz */}
                  <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {chapter.lessons.map((lesson) => {
                      const done = completedLessonIds.has(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${chapter.slug}/${lesson.slug}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group"
                        >
                          {done ? (
                            <div className="w-5 h-5 rounded-full bg-indigo-500 shrink-0 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 shrink-0 transition-colors" />
                          )}
                          <span
                            className={`text-xs transition-colors ${
                              done
                                ? "text-gray-500"
                                : "text-gray-600 group-hover:text-gray-900"
                            }`}
                          >
                            {lesson.title}
                          </span>
                        </Link>
                      );
                    })}

                    {chapter.quiz && (
                      <QuizRow
                        chapterSlug={chapter.slug}
                        quizId={chapter.quiz.id}
                        allLessonsDone={chapter.lessons.every((l) => completedLessonIds.has(l.id))}
                        passed={passedQuizIds.has(chapter.quiz.id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Resources tab */}
        {tab === "resources" && (
          <div>
            {/* Sub-tabs */}
            <div className="flex items-center gap-5 mb-5 border-b border-gray-200">
              <button
                onClick={() => setResourceSubTab("videos")}
                className={`pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  resourceSubTab === "videos"
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setResourceSubTab("people")}
                className={`pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  resourceSubTab === "people"
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                People & Channels
              </button>
            </div>

            {/* Videos sub-tab */}
            {resourceSubTab === "videos" && (() => {
              const categories = Array.from(new Set(resources.map((r) => r.category)));
              const filteredResources = resources.filter((r) => {
                if (resourceFilter === "completed") return r.completed;
                if (resourceFilter === "not-completed") return !r.completed;
                if (resourceFilter !== "all") return r.category === resourceFilter;
                return true;
              });
              const showGrouped = resourceFilter === "all";

              return (
                <div>
                  {/* Videos heading + filter */}
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-gray-800">Videos</h2>
                    <div className="relative">
                      <select
                        value={resourceFilter}
                        onChange={(e) => setResourceFilter(e.target.value)}
                        className="appearance-none text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="not-completed">Not Completed</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {filteredResources.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                      <p className="text-sm text-gray-400">No videos match this filter.</p>
                    </div>
                  ) : showGrouped ? (
                    <div className="space-y-5">
                      {categories.map((cat) => {
                        const catVideos = filteredResources.filter((r) => r.category === cat);
                        if (catVideos.length === 0) return null;
                        return (
                          <div key={cat}>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">{cat}</p>
                            <div className="space-y-2">
                              {catVideos.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* People & Channels sub-tab */}
            {resourceSubTab === "people" && (() => {
              if (people.length === 0) {
                return (
                  <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                    <p className="text-sm text-gray-400">No people added yet.</p>
                  </div>
                );
              }
              const categories = Array.from(new Set(people.map((p) => p.category)));
              return (
                <div className="flex flex-col gap-6">
                  {categories.map((cat) => (
                    <div key={cat}>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">{cat}</h3>
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-100">
                              <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Name</th>
                              <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3 hidden sm:table-cell">About</th>
                              <th className="text-right text-xs font-semibold text-gray-400 px-5 py-3">Follow</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {people.filter((p) => p.category === cat).map((person) => (
                              <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-3">
                                  <span className="font-medium text-gray-900 text-sm">{person.name}</span>
                                  <p className="text-xs text-gray-500 mt-0.5 sm:hidden line-clamp-2">{person.description}</p>
                                </td>
                                <td className="px-5 py-3 hidden sm:table-cell">
                                  <p className="text-xs text-gray-500 line-clamp-2">{person.description}</p>
                                </td>
                                <td className="px-5 py-3 text-right">
                                  <a
                                    href={person.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                                  >
                                    <PlatformIcon platform={person.platform} />
                                    <span className="capitalize">{person.platform}</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomePageInner />
    </Suspense>
  );
}
