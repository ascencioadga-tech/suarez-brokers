"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    // Placeholder — wire up to real auth later (Supabase / NextAuth / Clerk).
    await new Promise((r) => setTimeout(r, 700));
    setError("Authentication backend not yet connected.");
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-cobalt-ink font-sans text-ivory">
      {/* Aerial flyover background — same asset as the public hero */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        src="/video/flyover.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Cinematic dark overlay over the video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,24,48,0.92) 0%, rgba(11,24,48,0.78) 40%, rgba(7,16,30,0.96) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(7, 13, 24, 0.7) 100%)",
        }}
      />

      {/* Brand-colored floating blobs (cobalt + amber + brand red) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 -top-60 -z-10 h-[620px] w-[620px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "#d4922e", animation: "blob-a 22s ease-in-out infinite" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -right-60 -z-10 h-[540px] w-[540px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "#fa0109", animation: "blob-b 26s ease-in-out infinite" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[100px]"
        style={{ background: "#3a5fc0", animation: "blob-c 30s ease-in-out infinite" }}
      />

      <style jsx>{`
        @keyframes blob-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(110px, 90px) scale(1.1); }
        }
        @keyframes blob-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-100px, -70px) scale(1.15); }
        }
        @keyframes blob-c {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.14; }
          50%      { transform: translate(-44%, -56%) scale(1.2); opacity: 0.22; }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 146, 46, 0.55); }
          50%      { box-shadow: 0 0 0 8px rgba(212, 146, 46, 0); }
        }
      `}</style>

      {/* Main grid */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT — Brand panel */}
        <aside className="flex flex-col justify-between px-8 py-12 md:px-14 md:py-14 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link
              href="/"
              aria-label="Suarez Brokerage — Home"
              className="inline-block"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(255,255,255,0.45)) brightness(1.08)",
              }}
            >
              <Image
                src="/suarez-logo.png"
                alt="Suarez Brokerage Company"
                width={1414}
                height={452}
                priority
                className="h-12 w-auto md:h-14"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
            className="max-w-xl"
          >
            <span
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-amber/30 bg-amber/[0.08] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-amber-light"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-amber"
                style={{ animation: "badge-pulse 2.4s ease-in-out infinite" }}
              />
              Internal Team Access
            </span>
            <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-tight text-ivory md:text-[56px]">
              Sign in to your{" "}
              <span className="font-serif italic text-amber-light">
                team dashboard.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/65 md:text-[16px]">
              Manage shipments, manifests, and the daily program. Suarez
              Brokerage staff only.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 1, ease: EASE }}
            className="flex items-center gap-9"
          >
            <Stat n="46" l="Years shipping" />
            <span className="block h-9 w-px bg-ivory/15" />
            <Stat n="6" l="Border crossings" />
            <span className="block h-9 w-px bg-ivory/15" />
            <Stat n="6" l="Licensed brokers" />
          </motion.div>
        </aside>

        {/* RIGHT — Login card */}
        <section className="flex items-center justify-center px-6 py-12 md:px-12 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.85, ease: EASE }}
            className="relative w-full max-w-md rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-8 backdrop-blur-xl md:p-10"
            style={{
              boxShadow:
                "0 30px 80px -20px rgba(7,13,24,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <Link
              href="/"
              className="absolute right-7 top-7 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-ivory/55 transition-colors hover:text-amber-light"
            >
              <svg
                width="11"
                height="11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to site
            </Link>

            <div className="mb-7">
              <div
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber-light"
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-[26px] leading-tight tracking-tight text-ivory">
                Sign in to continue
              </h2>
              <p className="mt-1.5 text-[14px] text-ivory/55">
                Enter your team credentials to access the dashboard.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: [0, -4, 4, -3, 3, 0] }}
                transition={{ duration: 0.45 }}
                role="alert"
                className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-400/30 bg-red-500/[0.08] px-3.5 py-2.5 text-[13px] text-red-200"
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 9v3.75M12 16.5h.008" />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                id="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={setUsername}
                icon={
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20a7.5 7.5 0 0115 0" strokeLinecap="round" />
                  </svg>
                }
              />
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                icon={
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                }
              />

              <div className="flex items-center justify-between pt-1 text-[13px]">
                <label className="flex cursor-pointer items-center gap-2 text-ivory/65 transition-colors hover:text-ivory">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-3.5 w-3.5 cursor-pointer accent-amber"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-amber-light/85 transition-colors hover:text-amber"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group/cta relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ivory px-7 py-3.5 text-[14px] font-medium tracking-wide text-cobalt-ink transition disabled:opacity-60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover/cta:scale-x-100"
                />
                <span className="relative z-10">
                  {submitting ? "Signing in…" : "Sign in"}
                </span>
                {!submitting && (
                  <span className="relative z-10 transition-transform group-hover/cta:translate-x-0.5">
                    →
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-ivory/8 pt-5 text-center text-[11.5px] text-ivory/45">
              © {new Date().getFullYear()} Suarez Brokerage Company, Inc.
              <span className="mx-2 text-ivory/25">·</span>
              <Link
                href="/"
                className="transition-colors hover:text-amber-light"
              >
                suarezbrokers.com
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[34px] font-medium leading-none tracking-tight text-amber-light">
        {n}
      </div>
      <div className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-ivory/55">
        {l}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.20em] text-ivory/65"
      >
        {label}
      </label>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center text-ivory/45"
        >
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ivory/12 bg-ivory/[0.04] pl-10 pr-4 py-3 text-[14px] text-ivory placeholder:text-ivory/35 outline-none transition focus:border-amber/55 focus:bg-ivory/[0.07]"
        />
      </div>
    </div>
  );
}
