import { notFound } from "next/navigation";
import { getStepById, getAdjacentSteps } from "@/content/tutorial/steps";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import StepContent from "./StepContent";

interface Props {
  params: Promise<{ stepId: string }>;
}

export async function generateStaticParams() {
  const { ALL_STEPS } = await import("@/content/tutorial/steps");
  return ALL_STEPS.map((s) => ({ stepId: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { stepId } = await params;
  const step = getStepById(stepId);
  if (!step) return {};
  return {
    title: `${step.title} — 1stvibe.ai Tutorial`,
  };
}

export default async function TutorialStepPage({ params }: Props) {
  const { stepId } = await params;
  const step = getStepById(stepId);
  if (!step) notFound();

  const { prev, next } = getAdjacentSteps(stepId);

  return (
    <TutorialLayout currentStepId={stepId}>
      <StepContent stepId={stepId} prev={prev} next={next} />
    </TutorialLayout>
  );
}
