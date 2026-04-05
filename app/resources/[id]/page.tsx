"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

interface Resource {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  completed: boolean;
  notes: string;
}

function getYouTubeId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/) ?? url.match(/youtu\.be\/([^?]+)/);
  return match?.[1] ?? "";
}

// Minimal YT types to avoid @types/youtube dependency
interface YTPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}
interface YTPlayerConstructor {
  new (el: string, opts: object): YTPlayer;
  PlayerState: { PLAYING: number };
}
declare global {
  interface Window {
    YT?: { Player: YTPlayerConstructor; PlayerState: { PLAYING: number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function ResourcePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [canComplete, setCanComplete] = useState(false);
  const [watchedPct, setWatchedPct] = useState(0);
  const [loading, setLoading] = useState(true);

  const playerRef = useRef<YTPlayer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoId = resource ? getYouTubeId(resource.youtubeUrl) : "";

  // Fetch resource data
  useEffect(() => {
    fetch(`/api/resources/${id}`)
      .then((r) => r.json())
      .then((data: Resource) => {
        setResource(data);
        setNotes(data.notes);
        if (data.completed) setCanComplete(true);
        setLoading(false);
      });
  }, [id]);

  // Load YouTube IFrame API and initialise player
  useEffect(() => {
    if (!videoId) return;

    const initPlayer = () => {
      if (!window.YT) return;
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (event: { data: number }) => {
            const PLAYING = 1;
            if (event.data === PLAYING) {
              intervalRef.current = setInterval(() => {
                const p = playerRef.current;
                if (!p) return;
                const duration = p.getDuration();
                if (duration <= 0) return;
                const pct = Math.round((p.getCurrentTime() / duration) * 100);
                setWatchedPct(pct);
                if (pct >= 50) {
                  setCanComplete(true);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                }
              }, 1000);
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      // Script may already be loading — only append once
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy();
    };
  }, [videoId]);

  async function handleMarkComplete() {
    if (!resource || resource.completed || !canComplete) return;
    setCompleting(true);
    await fetch(`/api/resources/${id}/progress`, { method: "POST" });
    setResource((r) => (r ? { ...r, completed: true } : r));
    setCompleting(false);
    router.refresh();
  }

  async function handleSaveNotes() {
    setSaving(true);
    await fetch(`/api/resources/${id}/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: notes }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
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

  if (!resource) {
    return (
      <>
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-gray-500">Resource not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          href="/?tab=resources"
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Resources
        </Link>

        {/* Title */}
        <div className="mb-5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-900">{resource.title}</h1>
            {resource.completed && (
              <span className="shrink-0 flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Watched
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
        </div>

        {/* YouTube player (API-controlled) */}
        <div className="rounded-2xl overflow-hidden bg-black mb-4 aspect-video">
          <div id="yt-player" className="w-full h-full" />
        </div>

        {/* Watch progress hint */}
        {!resource.completed && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">
                {canComplete
                  ? "You can now mark this video as complete."
                  : `Watch at least 50% to mark as complete (${watchedPct}% watched)`}
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  canComplete ? "bg-green-500" : "bg-indigo-400"
                }`}
                style={{ width: `${Math.min(watchedPct * 2, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Mark complete */}
        {!resource.completed ? (
          <button
            onClick={handleMarkComplete}
            disabled={!canComplete || completing}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors mb-6 ${
              canComplete
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {completing ? "Saving…" : "Mark as Complete"}
          </button>
        ) : (
          <div className="flex items-center gap-2 justify-center py-3 bg-green-50 border border-green-200 rounded-xl mb-6">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-700">Video watched</span>
          </div>
        )}

        {/* Key learnings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">Key Learnings</h2>
            <p className="text-xs text-gray-400">Your personal notes from this video</p>
          </div>
          <textarea
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
            placeholder="What did you learn? Write your key takeaways here…"
            rows={6}
            className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex items-center justify-between mt-3">
            <p className={`text-xs transition-opacity ${saved ? "text-green-600 opacity-100" : "opacity-0"}`}>
              ✓ Saved
            </p>
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="text-xs font-semibold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save Notes"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
