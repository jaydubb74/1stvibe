"use client";

import { TUTORIAL_SECTIONS } from "@/content/tutorial/steps";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";

interface Props {
  currentStepId: string;
  completedSteps: string[];
}

export default function ChecklistPane({ currentStepId, completedSteps }: Props) {
  return (
    <nav className="h-full overflow-y-auto py-6 px-4">
      <div className="space-y-6">
        {TUTORIAL_SECTIONS.map((section) => (
          <div key={section.id}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = step.id === currentStepId;

                return (
                  <li key={step.id}>
                    <Link
                      href={`/tutorial/${step.id}`}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors group",
                        isCurrent
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : isCompleted
                          ? "text-gray-500 hover:bg-gray-50"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <span className="shrink-0">
                        {isCompleted ? (
                          <CheckCircle2
                            size={16}
                            className="text-green-500"
                          />
                        ) : isCurrent ? (
                          <Circle
                            size={16}
                            className="text-indigo-500 fill-indigo-100"
                          />
                        ) : (
                          <Circle size={16} className="text-gray-300" />
                        )}
                      </span>
                      <span className={cn("leading-snug", isCompleted && "line-through decoration-gray-300")}>
                        {step.title}
                      </span>
                      {step.optional && (
                        <span className="ml-auto text-xs text-gray-400 shrink-0">
                          optional
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
