"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090f] px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mb-4 text-5xl">🔐</div>
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block text-sm text-zinc-300">
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-pink-500"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-xl bg-pink-600 px-4 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Remembered your password?{' '}
          <Link href="/login" className="font-semibold text-pink-400 hover:text-pink-300">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
