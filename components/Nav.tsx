"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-full.png"
              alt="1stVibe.ai"
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#demo" className="hover:text-brand transition-colors">
              Try the Demo
            </Link>
            <Link href="/tutorial/welcome" className="hover:text-brand transition-colors">
              Tutorial
            </Link>
            <Link href="/tools-explained" className="hover:text-brand transition-colors">
              AI Tools Explained
            </Link>
            <Link href="/faq" className="hover:text-brand transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="hover:text-brand transition-colors">
              About
            </Link>
            <Link href="/pushes" className="hover:text-brand transition-colors">
              Pushes
            </Link>
            <Link href="/prompt" className="hover:text-brand transition-colors">
              Prompt
            </Link>
            <Link
              href="/tutorial/welcome"
              className="ml-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Start Building →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link href="/#demo" onClick={() => setOpen(false)}>
            Try the Demo
          </Link>
          <Link href="/tutorial/welcome" onClick={() => setOpen(false)}>
            Tutorial
          </Link>
          <Link href="/tools-explained" onClick={() => setOpen(false)}>
            AI Tools Explained
          </Link>
          <Link href="/faq" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/pushes" onClick={() => setOpen(false)}>
            Pushes
          </Link>
          <Link href="/prompt" onClick={() => setOpen(false)}>
            Prompt
          </Link>
          <Link
            href="/tutorial/welcome"
            onClick={() => setOpen(false)}
            className="bg-brand text-white text-center px-4 py-2 rounded-lg"
          >
            Start Building →
          </Link>
        </div>
      )}
    </nav>
  );
}
