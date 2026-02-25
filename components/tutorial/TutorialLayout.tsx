"use client";

import { useState, useEffect } from "react";
import ChecklistPane from "./ChecklistPane";
import { Menu, X } from "lucide-react";

interface Props {
  currentStepId: string;
  children: React.ReactNode;
}

export default function TutorialLayout({ currentStepId, children }: Props) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load progress from localStorage (anonymous users)
  useEffect(() => {
    const saved = localStorage.getItem("tutorial_progress");
    if (saved) setCompletedSteps(JSON.parse(saved));
  }, []);

  function markComplete(stepId: string) {
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) return prev;
      const next = [...prev, stepId];
      localStorage.setItem("tutorial_progress", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* ── Sidebar overlay (mobile) ─────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside
        className={`
          fixed lg:static top-16 left-0 z-50 h-[calc(100vh-64px)]
          w-72 bg-white border-r border-gray-100 flex-shrink-0
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 lg:hidden">
          <span className="text-sm font-semibold text-gray-700">Tutorial Steps</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>
        <ChecklistPane
          currentStepId={currentStepId}
          completedSteps={completedSteps}
        />
      </aside>

      {/* ── Content pane ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open checklist"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm text-gray-500 font-medium">Tutorial</span>
        </div>

        {/* Pass markComplete down via context-like prop injection */}
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
          {/* Inject markComplete as a prop by wrapping children */}
          {typeof children === "function"
            ? (children as (props: { markComplete: (id: string) => void }) => React.ReactNode)({ markComplete })
            : children}
        </div>
      </div>
    </div>
  );
}
