"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TutorialStep } from "@/types";
import StepNav from "@/components/tutorial/StepNav";

interface Props {
  stepId: string;
  prev: TutorialStep | null;
  next: TutorialStep | null;
}

// Dynamically import step MDX modules
const stepComponents: Record<string, React.ComponentType> = {
  welcome: dynamic(() => import("@/content/tutorial/section-1/welcome.mdx")),
  "how-internet-works": dynamic(() => import("@/content/tutorial/section-1/how-internet-works.mdx")),
  "install-claude-code": dynamic(() => import("@/content/tutorial/section-1/install-claude-code.mdx")),
  "create-claude-account": dynamic(() => import("@/content/tutorial/section-1/create-claude-account.mdx")),
  "what-to-build": dynamic(() => import("@/content/tutorial/section-2/what-to-build.mdx")),
  "first-conversation": dynamic(() => import("@/content/tutorial/section-2/first-conversation.mdx")),
  "see-locally": dynamic(() => import("@/content/tutorial/section-2/see-locally.mdx")),
  iterate: dynamic(() => import("@/content/tutorial/section-2/iterate.mdx")),
  "github-account": dynamic(() => import("@/content/tutorial/section-3/github-account.mdx")),
  "vercel-account": dynamic(() => import("@/content/tutorial/section-3/vercel-account.mdx")),
  "connect-github-vercel": dynamic(() => import("@/content/tutorial/section-3/connect-github-vercel.mdx")),
  "push-to-github": dynamic(() => import("@/content/tutorial/section-3/push-to-github.mdx")),
  "deploy-vercel": dynamic(() => import("@/content/tutorial/section-3/deploy-vercel.mdx")),
  "big-moment": dynamic(() => import("@/content/tutorial/section-3/big-moment.mdx")),
  "custom-domain": dynamic(() => import("@/content/tutorial/section-4/custom-domain.mdx")),
  "screenshot-trick": dynamic(() => import("@/content/tutorial/section-4/screenshot-trick.mdx")),
  "dev-console": dynamic(() => import("@/content/tutorial/section-4/dev-console.mdx")),
  "whats-next": dynamic(() => import("@/content/tutorial/section-4/whats-next.mdx")),
  completion: dynamic(() => import("@/content/tutorial/section-5/completion.mdx")),
};

export default function StepContent({ stepId, prev, next }: Props) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tutorial_progress");
    if (saved) setCompletedSteps(JSON.parse(saved));
  }, []);

  function markComplete(id: string) {
    setCompletedSteps((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem("tutorial_progress", JSON.stringify(next));
      return next;
    });
    // Also force sidebar to refresh via storage event
    window.dispatchEvent(new Event("storage"));
  }

  const StepMDX = stepComponents[stepId];

  if (!StepMDX) {
    return (
      <div className="prose">
        <p className="text-gray-500">Content coming soon for this step.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="prose max-w-none">
        <StepMDX />
      </div>
      <StepNav
        prev={prev}
        next={next}
        currentId={stepId}
        onMarkComplete={markComplete}
        isCompleted={completedSteps.includes(stepId)}
      />
    </div>
  );
}
