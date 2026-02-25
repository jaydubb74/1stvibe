import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-6">
          <MailCheck size={32} className="text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
        <p className="text-gray-600 mb-6">
          We sent a magic link to your inbox. Click it to sign in — no password
          required. The link expires in 15 minutes.
        </p>
        <p className="text-sm text-gray-400">
          Didn&apos;t get it? Check your spam folder, or{" "}
          <Link href="/" className="text-indigo-600 hover:underline">
            try again
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
