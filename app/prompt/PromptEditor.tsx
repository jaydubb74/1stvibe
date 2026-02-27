"use client";

import { useCallback, useEffect, useState } from "react";
import { Save, Clock, CheckCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PromptVersion {
  id: string;
  content: string;
  label: string | null;
  version: number;
  isActive: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PromptEditor() {
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [activeVersion, setActiveVersion] = useState<PromptVersion | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dirty flag — true when editor text differs from the loaded version
  const isDirty =
    activeVersion !== null && editorContent !== activeVersion.content;

  // -----------------------------------------------------------------------
  // Fetch all versions
  // -----------------------------------------------------------------------
  const fetchVersions = useCallback(async () => {
    try {
      const res = await fetch("/api/prompt/versions");
      if (!res.ok) throw new Error("Failed to fetch versions");
      const data = await res.json();
      const list: PromptVersion[] = data.versions ?? [];
      setVersions(list);

      // Load the active version into the editor
      const active = list.find((v) => v.isActive) ?? list[0] ?? null;
      if (active) {
        setActiveVersion(active);
        setEditorContent(active.content);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  // -----------------------------------------------------------------------
  // Save handler
  // -----------------------------------------------------------------------
  const handleSave = async () => {
    if (!editorContent.trim()) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/prompt/versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editorContent }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }

      // Re-fetch sidebar + active state
      await fetchVersions();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------------------------------------
  // Click a version in the sidebar to load it
  // -----------------------------------------------------------------------
  const handleSelectVersion = (v: PromptVersion) => {
    setActiveVersion(v);
    setEditorContent(v.content);
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        Loading prompt versions...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ----------------------------------------------------------------- */}
      {/* Editor Panel (2/3) */}
      {/* ----------------------------------------------------------------- */}
      <div className="lg:w-2/3 flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium text-gray-700">
              {activeVersion
                ? (activeVersion.label ?? `Version ${activeVersion.version}`)
                : "No version"}
            </span>
            {isDirty && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                Unsaved changes
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm leading-relaxed text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-300 resize-y"
          style={{ minHeight: 600 }}
          spellCheck={false}
        />

        {/* Character count */}
        <div className="text-right text-xs text-gray-400">
          {editorContent.length.toLocaleString()} characters
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Sidebar (1/3) */}
      {/* ----------------------------------------------------------------- */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Version History</h2>

        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
          {versions.map((v) => {
            const isSelected = activeVersion?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelectVersion(v)}
                className={[
                  "text-left rounded-lg border p-3 transition-all",
                  isSelected
                    ? "border-indigo-300 bg-indigo-50 ring-1 ring-indigo-200"
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm",
                ].join(" ")}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-800">
                    {v.label ?? `Version ${v.version}`}
                  </span>
                  {v.isActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                      <CheckCircle size={10} />
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-1.5">
                  <Clock size={10} />
                  {new Date(v.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2 font-mono">
                  {v.content.slice(0, 80)}
                  {v.content.length > 80 ? "..." : ""}
                </div>
              </button>
            );
          })}

          {versions.length === 0 && (
            <p className="text-sm text-gray-400">No versions yet.</p>
          )}
        </div>

        {/* Info box */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold text-gray-700 mb-1">How it works</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              Edit the prompt and click <strong>Save</strong> to create a new
              version.
            </li>
            <li>
              The newest saved version becomes the active prompt used for demo
              generation.
            </li>
            <li>
              Click any older version to load it into the editor — save it to
              revert.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
