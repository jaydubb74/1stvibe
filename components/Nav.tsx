"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <Image
              src="/mascot.png"
              alt="1stvibe.ai mascot"
              width={36}
              height={36}
              className="rounded-full object-cover transition-transform duration-200 group-hover:scale-110"
              priority
            />
            <span className="text-xl font-bold text-indigo-600 tracking-tight">1stvibe.ai</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#demo" className="hover:text-indigo-600 transition-colors">
              Try the Demo
            </Link>
            <Link href="/tutorial/welcome" className="hover:text-indigo-600 transition-colors">
              Tutorial
            </Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link
              href="/tutorial/welcome"
              className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link
            href="/tutorial/welcome"
            onClick={() => setOpen(false)}
            className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg"
          >
            Start Building →
          </Link>
        </div>
      )}
    </nav>
  );
}
