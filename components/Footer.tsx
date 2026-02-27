import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-indigo-600">1stvibe.ai</span>
            <span>— the fastest path to your first build.</span>
          </div>

          <nav className="flex items-center gap-5">
            <Link href="/about" className="hover:text-gray-800 transition-colors">
              About
            </Link>
            <Link href="/tutorial/welcome" className="hover:text-gray-800 transition-colors">
              Tutorial
            </Link>
            <a
              href="https://patreon.com/1stvibe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-800 transition-colors"
            >
              <Heart size={13} className="text-rose-400" />
              Help us keep this free
            </a>
            <Link href="/privacy" className="hover:text-gray-800 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-800 transition-colors">
              Terms
            </Link>
            <a
              href="mailto:hello@1stvibe.ai"
              className="hover:text-gray-800 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
