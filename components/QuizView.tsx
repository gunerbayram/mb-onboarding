"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

interface Question {
  id: string;
  order: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Props {
  quizId: string;
  quizTitle: string;
  questions: Question[];
  chapterSlug: string;
  nextChapterSlug?: string;
}

export default function QuizView({ quizId, quizTitle, questions, chapterSlug, nextChapterSlug }: Props) {
  const router = useRouter();
  const { t } = useLang();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<{
    score: number;
    totalQuestions: number;
    results: Array<{ questionId: string; selected: number; correct: boolean; correctAnswer: number }>;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, answers }),
    });

    const data = await res.json();
    setResults(data);
    setSubmitting(false);
  }

  const passed = results ? results.score / results.totalQuestions >= 0.6 : false;

  if (results) {
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-6 text-center ${passed ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
          <div className={`text-5xl font-bold mb-1 ${passed ? "text-green-600" : "text-amber-600"}`}>
            {results.score}/{results.totalQuestions}
          </div>
          <p className={`text-sm font-medium ${passed ? "text-green-700" : "text-amber-700"}`}>
            {passed ? t("quizPassed") : t("quizFailed")}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const result = results.results.find((r) => r.questionId === q.id);
            return (
              <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {i + 1}. {q.question}
                </p>
                <div className="space-y-1.5">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correctAnswer;
                    const isSelected = result?.selected === idx;
                    return (
                      <div
                        key={idx}
                        className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : isSelected && !isCorrect
                            ? "bg-red-100 text-red-800"
                            : "text-gray-600"
                        }`}
                      >
                        {isCorrect ? (
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : isSelected ? (
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-4 h-4 shrink-0" />
                        )}
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-2.5 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            All chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{quizTitle}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {questions.length} {t("questionsLabel")}
        </p>
      </div>

      <div className="space-y-5">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                  className={`w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-colors ${
                    answers[q.id] === idx
                      ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? t("submitting") : t("submitAnswers")}
      </button>
    </div>
  );
}
