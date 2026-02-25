import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1stvibe.ai — Build Your First Website with AI",
  description:
    "The fastest path from 'I've never coded' to 'I just built a live website with AI.' Guided, beginner-friendly, no CS degree required.",
  openGraph: {
    title: "1stvibe.ai — Build Your First Website with AI",
    description:
      "See what all the hype is about. Build your first thing with AI — in under an hour.",
    url: "https://1stvibe.ai",
    siteName: "1stvibe.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-white text-gray-900 flex flex-col min-h-screen`}>
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
