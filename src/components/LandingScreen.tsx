"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { MATCH_POOL } from "@/data/seed";

function GoogleGIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

export function LandingScreen() {
  const {
    state,
    setGoogleModalOpen,
    setMobileSheetOpen,
    dismissErasedBanner,
  } = useKora();

  const previewMatch = MATCH_POOL[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161615] flex flex-col">
      {/* Erased confirmation banner */}
      {state.erasedBanner && (
        <div className="bg-[#2F5E4E] text-[#FAF8F5] px-4 py-2.5 text-xs sm:text-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                Your DPDP consent has been withdrawn and all local Kora account
                data has been permanently erased.
              </span>
            </div>
            <button
              onClick={dismissErasedBanner}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Dismiss notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <header className="w-full hairline-b bg-[#FAF8F5]/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[28px] leading-none tracking-tight text-[#161615]">
              Kora<span className="text-[#B8502D]">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-[#6B6863] tracking-wide">
              2020–2023 Verified Alumni
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileSheetOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6863] hover:text-[#161615] px-3 py-2 rounded-full hairline bg-white/70 hover:bg-white transition-colors cursor-pointer"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile App</span>
            </button>
            <button
              onClick={() => setGoogleModalOpen(true)}
              className="text-xs font-medium text-[#161615] hover:text-[#B8502D] px-3 py-2 transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Hero */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-12 sm:py-20 flex flex-col justify-between gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#2F5E4E] bg-[#2F5E4E]/[0.07] px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>eLitmus Verified Alumni Layer · Zero pH Scores</span>
            </div>

            <h1 className="font-serif text-[46px] sm:text-[62px] leading-[1.03] tracking-[-0.015em] text-[#161615]">
              Slow, intentional dating for{" "}
              <span className="italic text-[#B8502D]">verified</span> Indian
              tech grads.
            </h1>

            <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#6B6863] max-w-xl">
              Built for 2020–2023 engineering graduates across Bengaluru,
              Hyderabad, Pune, and NCR. Three curated matches every Thursday,
              progressive photo reveal after a shared prompt, and a strict
              three-conversation cap.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setGoogleModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#161615] hover:bg-[#2a2a28] text-[#FAF8F5] text-sm font-medium transition-all editorial-shadow cursor-pointer"
              >
                <span className="bg-white rounded-full p-1">
                  <GoogleGIcon />
                </span>
                <span>Continue with Google</span>
                <ArrowRight className="h-4 w-4 opacity-80" />
              </button>

              <button
                onClick={() => setMobileSheetOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#F3EFE9] text-[#161615] text-sm font-medium hairline transition-colors cursor-pointer"
              >
                <Smartphone className="h-4 w-4 text-[#6B6863]" />
                <span>Install PWA / Android APK</span>
              </button>
            </div>

            <p className="text-xs text-[#9A9690] leading-relaxed">
              DPDP Act compliant by design · Workplace &amp; batchmate shield
              included · Zero ad-tracking or job-portal crossover.
            </p>
          </motion.div>

          {/* Right Editorial Artifact Preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl hairline editorial-shadow overflow-hidden max-w-[380px] mx-auto lg:ml-auto">
              <div className="px-5 py-3.5 hairline-b flex items-center justify-between text-[11px] uppercase tracking-[0.08em] text-[#6B6863]">
                <span>Thursday Drop · 01 of 03</span>
                <span className="text-[#2F5E4E] font-medium normal-case tracking-normal flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified ’21
                </span>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE9]">
                <img
                  src={previewMatch.photoUrl}
                  alt="Frosted portrait preview"
                  className="w-full h-full object-cover blur-md scale-105"
                />
                <div className="absolute inset-0 bg-[#161615]/10" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[11px] font-medium text-[#161615] hairline">
                    <Lock className="h-3 w-3 text-[#B8502D]" />
                    Unblurs after shared prompt
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#161615]/75 text-[#FAF8F5] text-[11px] font-medium backdrop-blur-sm">
                    {previewMatch.compatibilityScore}% match
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3.5">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl text-[#161615]">
                      {previewMatch.name}, {previewMatch.age}
                    </h2>
                    <span className="text-xs text-[#6B6863]">
                      {previewMatch.city}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6863] mt-0.5">
                    {previewMatch.role} · {previewMatch.relocation}
                  </p>
                </div>

                <div className="pt-2 hairline-t space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#6B6863]">
                    <span>Why you matched</span>
                    <span className="font-medium text-[#161615]">
                      India-first · Calm weekends
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#F3EFE9] overflow-hidden">
                    <div className="h-full w-[94%] rounded-full bg-[#2F5E4E]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quiet 3-Pillar Editorial Strip */}
        <section className="pt-10 hairline-t grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#B8502D]">
              01 · Anti-Swipe
            </span>
            <h3 className="font-serif text-xl text-[#161615]">
              Three curated matches, once a week
            </h3>
            <p className="text-xs leading-relaxed text-[#6B6863]">
              No infinite decks or dopamine slots. Every Thursday at 7 PM IST,
              receive three thoughtfully matched profiles with transparent
              compatibility signals.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#2F5E4E]">
              02 · Verified Trust
            </span>
            <h3 className="font-serif text-xl text-[#161615]">
              Alumni verified, workplace shielded
            </h3>
            <p className="text-xs leading-relaxed text-[#6B6863]">
              eLitmus confirms only your graduation year—never your pH score.
              Block your company domain or college batchmates before you appear.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#161615]">
              03 · Focus Cap
            </span>
            <h3 className="font-serif text-xl text-[#161615]">
              Max three active conversations
            </h3>
            <p className="text-xs leading-relaxed text-[#6B6863]">
              Real attention doesn’t scale to forty threads. To start a fourth
              chat, close an existing one with a single-tap, respectful note.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
