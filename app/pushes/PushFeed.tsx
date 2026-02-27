"use client";

import { useEffect, useState } from "react";
import { Rocket, Clock, User, GitBranch } from "lucide-react";

interface PushEntry {
  id: string;
  author: string;
  summary: string;
  commitHash: string | null;
  createdAt: string;
}

const COOKIE_NAME = "pushes_last_visit";

function getLastVisit(): Date | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const val = decodeURIComponent(match.split("=")[1]);
  const date = new Date(val);
  return isNaN(date.getTime()) ? null : date;
}

function setLastVisit() {
  const now = new Date().toISOString();
  // Cookie expires in 1 year
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(now)}; path=/pushes; expires=${expires}; SameSite=Lax`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function PushFeed({ entries }: { entries: PushEntry[] }) {
  const [lastVisit, setLastVisitState] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const lv = getLastVisit();
    setLastVisitState(lv);
    setMounted(true);
    // Set the new timestamp after reading the old one
    setLastVisit();
  }, []);

  const newCount = mounted && lastVisit
    ? entries.filter((e) => new Date(e.createdAt) > lastVisit).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        {/* Git pull reminder */}
        <div className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 flex items-start gap-3">
          <GitBranch size={18} className="text-indigo-600 mt-0.5 shrink-0" />
          <p className="text-sm text-indigo-900 leading-relaxed">
            <strong>Before building anything new,</strong> start each Claude Code session by
            pulling the latest code from GitHub (e.g.{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono">
              git pull origin main
            </code>
            ) to avoid merge conflicts.
          </p>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Rocket size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Push Log</h1>
          </div>
          <p className="text-gray-500 text-sm ml-[52px]">
            What&apos;s been shipped — by Michael and Josh.
          </p>
          {mounted && newCount > 0 && (
            <p className="text-sm font-medium text-indigo-600 mt-3 ml-[52px]">
              {newCount} new {newCount === 1 ? "push" : "pushes"} since your last visit
            </p>
          )}
        </div>

        {/* Feed */}
        {entries.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No pushes yet.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const isNew =
                mounted &&
                lastVisit !== null &&
                new Date(entry.createdAt) > lastVisit;

              return (
                <article
                  key={entry.id}
                  className={[
                    "relative rounded-xl border p-5 transition-all",
                    isNew
                      ? "bg-indigo-50/70 border-indigo-200 shadow-sm shadow-indigo-100"
                      : "bg-white border-gray-100",
                  ].join(" ")}
                >
                  {/* "New" badge */}
                  {isNew && (
                    <span className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <User size={12} />
                      {entry.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {formatDate(entry.createdAt)}
                    </span>
                    {entry.commitHash && (
                      <code className="text-[11px] text-gray-300 font-mono">
                        {entry.commitHash.slice(0, 7)}
                      </code>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {entry.summary}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-12">
          Internal tool — not indexed. Powered by /push in Claude Code.
        </p>
      </div>
    </div>
  );
}
