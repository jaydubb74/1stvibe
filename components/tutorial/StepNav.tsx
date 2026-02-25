"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { TutorialStep } from "@/types";
import Button from "@/components/ui/Button";

interface Props {
  prev: TutorialStep | null;
  next: TutorialStep | null;
  currentId: string;
  onMarkComplete: (id: string) => void;
  isCompleted: boolean;
}

export default function StepNav({ prev, next, currentId, onMarkComplete, isCompleted }: Props) {
  return (
    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
      <div>
        {prev && (
          <Link
            href={`/tutorial/${prev.id}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={14} />
            {prev.title}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!isCompleted && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onMarkComplete(currentId)}
            className="flex items-center gap-1.5"
          >
            <CheckCircle2 size={14} />
            Mark complete
          </Button>
        )}
        {isCompleted && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <CheckCircle2 size={14} />
            Completed
          </span>
        )}
        {next && (
          <Link href={`/tutorial/${next.id}`}>
            <Button size="sm" className="flex items-center gap-1.5">
              {next.title}
              <ArrowRight size={14} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
