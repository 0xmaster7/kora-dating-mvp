"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  Heart,
  Lock,
  MessageCircleHeart,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
    <div className="min-h-screen bg-[#FFF7F2] text-[#261428] flex flex-col">
      {/* Erased confirmation banner */}
      {state.erasedBanner && (
        <div className="bg-[#1E8E72] text-white px-4 py-2.5 text-xs sm:text-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                Your DPDP consent has been withdrawn and all local Kora account
                data has been permanently erased.
              </span>
            </div>
            <button
              onClick={dismissErasedBanner}
              className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Dismiss notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Playful Navbar */}
      <header className="w-full sticky top-0 z-20 bg-[#FFF7F2]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-[#E84A5F] text-white flex items-center justify-center playful-shadow -rotate-3">
              <Heart className="h-4.5 w-4.5 fill-white" />
            </div>
            <span className="font-display font-extrabold text-[26px] leading-none tracking-tight text-[#261428]">
              kora
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFE8DC] text-[#A63344]">
              2020–2023 Grads
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileSheetOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E586B] hover:text-[#261428] px-3.5 py-2 rounded-full bg-white hairline hover:border-[#261428]/20 transition-all cursor-pointer"
            >
              <Smartphone className="h-3.5 w-3.5 text-[#E84A5F]" />
              <span className="hidden sm:inline">Mobile App</span>
              <span className="sm:hidden">App</span>
            </button>
            <button
              onClick={() => setGoogleModalOpen(true)}
              className="text-xs font-semibold text-white bg-[#261428] hover:bg-[#3A203E] px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-4 pb-24 space-y-12 sm:space-y-16">
        {/* Framed Playful Hero Canvas */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#FFE9DF] via-[#FFF0E8] to-[#FFE2E6] hairline editorial-shadow overflow-hidden p-6 sm:p-10 lg:p-14"
        >
          {/* Subtle playful decorative blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[#FFB36B]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#E84A5F]/15 blur-3xl"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E8E72] bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>eLitmus Verified Alumni · Zero pH Scores</span>
              </div>

              <h1 className="font-display font-extrabold text-[42px] sm:text-[56px] leading-[1.04] tracking-[-0.025em] text-[#261428]">
                Real dates,{" "}
                <span className="relative inline-block text-[#E84A5F]">
                  zero swipe
                  <svg
                    viewBox="0 0 220 14"
                    fill="none"
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#FFB36B]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 10.5C52 3.5 152 2.5 217 9.5"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                burnout.
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#5C4559] max-w-lg">
                Meet verified 2020–2023 Indian tech &amp; engineering grads across
                Bengaluru, Hyderabad, Pune &amp; NCR. Three curated drops every
                Thursday, playful prompt reveals, and a strict 3-chat cap.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setGoogleModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-sm font-bold transition-colors playful-shadow cursor-pointer"
                >
                  <span className="bg-white rounded-full p-1">
                    <GoogleGIcon />
                  </span>
                  <span>Continue with Google</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileSheetOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#261428] text-sm font-semibold hairline transition-colors cursor-pointer"
                >
                  <Smartphone className="h-4 w-4 text-[#E84A5F]" />
                  <span>Get PWA / APK</span>
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#6E586B] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#E84A5F]" />
                  Workplace &amp; batchmate shield
                </span>
                <span>·</span>
                <span>DPDP Act compliant</span>
                <span>·</span>
                <span>Zero ads</span>
              </div>
            </div>

            {/* Right Illustrated Artwork + Floating Match Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(51,24,50,0.3)] border-4 border-white/80 bg-[#FFE6DA]">
                <img
                  src="/hero-illustration.jpg"
                  alt="Playful twilight balcony illustration of a smiling young Indian couple"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>

              {/* Floating Playful Match Sticker */}
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-4 bg-white rounded-2xl p-3.5 hairline editorial-shadow flex items-center gap-3 max-w-[300px]"
              >
                <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 bg-[#FFE8DC]">
                  <img
                    src={previewMatch.photoUrl}
                    alt="Blurred match preview"
                    className="h-full w-full object-cover blur-[5px] scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#261428]/20">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-[#261428] truncate">
                      {previewMatch.name.split(" ")[0]}, {previewMatch.age}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFE8DC] text-[#D2374C]">
                      {previewMatch.compatibilityScore}% vibe
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E586B] truncate">
                    Unblurs after a 2-question prompt
                  </p>
                </div>
              </motion.div>

              {/* Floating Top-Right Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="hidden sm:inline-flex items-center gap-1.5 absolute -top-3.5 -right-2 bg-[#331832] text-[#FFF7F2] px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg rotate-2"
              >
                <Coffee className="h-3.5 w-3.5 text-[#FFB36B]" />
                <span>Thursday 7 PM Drop</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Playful Tinted Story Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-3xl bg-[#FFF0E8] p-6 sm:p-7 space-y-3.5 hairline">
            <div className="h-11 w-11 rounded-2xl bg-[#E84A5F] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-display font-bold text-xl text-[#261428]">
              3 curated drops, every Thursday
            </h2>
            <p className="text-sm leading-relaxed text-[#5C4559]">
              Ditch the endless thumb workout. Get three genuinely compatible
              matches each week with clear reasons why you clicked.
            </p>
          </div>

          <div className="rounded-3xl bg-[#E9F9F4] p-6 sm:p-7 space-y-3.5 hairline">
            <div className="h-11 w-11 rounded-2xl bg-[#1E8E72] text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display font-bold text-xl text-[#261428]">
              Verified grads, zero awkwardness
            </h2>
            <p className="text-sm leading-relaxed text-[#425B54]">
              eLitmus checks only your grad year (never your pH score). Block
              your office domain or college batchmates with one tap.
            </p>
          </div>

          <div className="rounded-3xl bg-[#F4EEFF] p-6 sm:p-7 space-y-3.5 hairline">
            <div className="h-11 w-11 rounded-2xl bg-[#5D3A9B] text-white flex items-center justify-center shadow-sm">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <h2 className="font-display font-bold text-xl text-[#261428]">
              Max 3 chats, zero ghosting
            </h2>
            <p className="text-sm leading-relaxed text-[#504263]">
              Keep your attention where it counts. To start a fourth chat,
              kindly wrap up an existing one with a respectful one-tap note.
            </p>
          </div>
        </section>

        {/* Warm Twilight Plum Invitation Banner */}
        <section className="rounded-[32px] bg-[#331832] text-[#FFF7F2] p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 editorial-shadow">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB36B]">
              <Heart className="h-3.5 w-3.5 fill-[#FFB36B]" />
              <span>Ready for better Thursday evenings?</span>
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-snug">
              One great filter coffee beats forty dead matches.
            </h2>
          </div>

          <button
            onClick={() => setGoogleModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-sm font-bold transition-colors playful-shadow cursor-pointer shrink-0"
          >
            <span>Try Interactive Demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
}
