import { TutorialSection } from "@/types";

export const TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    steps: [
      {
        id: "welcome",
        sectionId: "getting-started",
        sectionTitle: "Getting Started",
        title: "Welcome — what you'll build",
        order: 1,
      },
      {
        id: "how-internet-works",
        sectionId: "getting-started",
        sectionTitle: "Getting Started",
        title: "How the internet works",
        optional: true,
        order: 2,
      },
      {
        id: "install-claude-code",
        sectionId: "getting-started",
        sectionTitle: "Getting Started",
        title: "Install Claude Code",
        order: 3,
      },
      {
        id: "create-claude-account",
        sectionId: "getting-started",
        sectionTitle: "Getting Started",
        title: "Create your Claude account",
        order: 4,
      },
    ],
  },
  {
    id: "build-something",
    title: "Build Something",
    steps: [
      {
        id: "what-to-build",
        sectionId: "build-something",
        sectionTitle: "Build Something",
        title: "What do you want to build?",
        order: 5,
      },
      {
        id: "first-conversation",
        sectionId: "build-something",
        sectionTitle: "Build Something",
        title: "Your first conversation with Claude Code",
        order: 6,
      },
      {
        id: "see-locally",
        sectionId: "build-something",
        sectionTitle: "Build Something",
        title: "See it in your browser",
        order: 7,
      },
      {
        id: "iterate",
        sectionId: "build-something",
        sectionTitle: "Build Something",
        title: "Iterate and refine",
        order: 8,
      },
    ],
  },
  {
    id: "put-it-online",
    title: "Put It on the Internet",
    steps: [
      {
        id: "github-account",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "Create a GitHub account",
        order: 9,
      },
      {
        id: "vercel-account",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "Create a Vercel account",
        order: 10,
      },
      {
        id: "connect-github-vercel",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "Connect GitHub to Vercel",
        order: 11,
      },
      {
        id: "push-to-github",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "Push your code to GitHub",
        order: 12,
      },
      {
        id: "deploy-vercel",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "Deploy on Vercel",
        order: 13,
      },
      {
        id: "big-moment",
        sectionId: "put-it-online",
        sectionTitle: "Put It on the Internet",
        title: "🎉 Your site is live!",
        order: 14,
      },
    ],
  },
  {
    id: "make-it-yours",
    title: "Make It Yours",
    steps: [
      {
        id: "custom-domain",
        sectionId: "make-it-yours",
        sectionTitle: "Make It Yours",
        title: "Buy a custom domain",
        optional: true,
        order: 15,
      },
      {
        id: "screenshot-trick",
        sectionId: "make-it-yours",
        sectionTitle: "Make It Yours",
        title: "Pro tip: the screenshot trick",
        optional: true,
        order: 16,
      },
      {
        id: "dev-console",
        sectionId: "make-it-yours",
        sectionTitle: "Make It Yours",
        title: "Pro tip: the developer console",
        optional: true,
        order: 17,
      },
      {
        id: "whats-next",
        sectionId: "make-it-yours",
        sectionTitle: "Make It Yours",
        title: "What's next",
        optional: true,
        order: 18,
      },
    ],
  },
  {
    id: "you-did-it",
    title: "You Did It",
    steps: [
      {
        id: "completion",
        sectionId: "you-did-it",
        sectionTitle: "You Did It",
        title: "Congratulations!",
        order: 19,
      },
    ],
  },
];

export const ALL_STEPS = TUTORIAL_SECTIONS.flatMap((s) => s.steps);

export function getStepById(id: string) {
  return ALL_STEPS.find((s) => s.id === id);
}

export function getAdjacentSteps(id: string) {
  const idx = ALL_STEPS.findIndex((s) => s.id === id);
  return {
    prev: idx > 0 ? ALL_STEPS[idx - 1] : null,
    next: idx < ALL_STEPS.length - 1 ? ALL_STEPS[idx + 1] : null,
  };
}
