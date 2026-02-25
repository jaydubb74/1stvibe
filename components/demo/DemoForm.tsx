"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function DemoForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      router.push(`/demo/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="I want a webpage that... (e.g. shows my favorite hiking spots with photos and a contact form)"
              className="w-full h-20 sm:h-14 px-4 py-3.5 pr-4 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-gray-800 placeholder-gray-400 text-base transition-colors"
              maxLength={500}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            loading={loading}
            disabled={!prompt.trim()}
            className="sm:self-end sm:h-14 whitespace-nowrap"
          >
            <Sparkles size={18} />
            Build It
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        <p className="mt-2 text-xs text-gray-400 text-center">
          Free to try · No account required · Takes about 15 seconds
        </p>
      </div>
    </form>
  );
}
