"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Heart,
  MapPin,
  MessageCircleHeart,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  X,
  CheckCircle2,
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

  const cardFront = MATCH_POOL[0];
  const cardBackLeft = MATCH_POOL[1];
  const cardBackRight = MATCH_POOL[3];

  return (
    <div className="min-h-screen bg-[#110C14] text-white flex flex-col overflow-x-hidden">
      {/* Erased confirmation banner */}
      {state.erasedBanner && (
        <div className="bg-[#1E8E72] text-white px-4 py-2.5 text-xs sm:text-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Your account data has been permanently erased.</span>
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

      {/* Vibrant Tinder-Inspired Hero Backdrop */}
      <div className="relative flex-1 flex flex-col">
        {/* Warm Flame-Coral Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,68,88,0.34),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(255,122,69,0.24),_transparent_55%)]"
        />

        {/* Navbar */}
        <header className="relative z-20 w-full">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#FF4458] to-[#FF7854] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(255,68,88,0.45)]">
                <Flame className="h-5 w-5 fill-white" />
              </div>
              <span className="font-display font-extrabold text-[28px] leading-none tracking-tight text-white">
                kora
              </span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setMobileSheetOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/85 hover:text-white px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md transition-colors cursor-pointer"
              >
                <Smartphone className="h-3.5 w-3.5 text-[#FF7854]" />
                <span className="hidden sm:inline">Download App</span>
                <span className="sm:hidden">App</span>
              </button>
              <button
                onClick={() => setGoogleModalOpen(true)}
                className="text-xs sm:text-sm font-bold text-[#110C14] bg-white hover:bg-white/90 px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Log in
              </button>
            </div>
          </div>
        </header>

        {/* Hero Grid */}
        <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-14 flex flex-col justify-between gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Bold Headline + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFB399] bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5864]" />
                <span>Real profiles · Better matches · Zero ghosting</span>
              </div>

              <h1 className="font-display font-extrabold text-[48px] sm:text-[66px] leading-[0.98] tracking-[-0.03em] text-white">
                Swipe right on{" "}
                <span className="bg-gradient-to-r from-[#FF4458] via-[#FF6B57] to-[#FFA05C] bg-clip-text text-transparent">
                  someone real.
                </span>
              </h1>

              <p className="text-[16px] sm:text-[18px] leading-relaxed text-white/75 max-w-lg mx-auto lg:mx-0">
                Meet verified people nearby who actually want to grab coffee,
                talk past “hey”, and keep things fun. Swipe through curated
                profiles, break the ice with quick prompts, and focus on up to 3
                active chats at a time.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setGoogleModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#FF4458] to-[#FF7854] text-white text-sm sm:text-base font-bold shadow-[0_14px_34px_-8px_rgba(255,68,88,0.6)] cursor-pointer"
                >
                  <span className="bg-white rounded-full p-1">
                    <GoogleGIcon />
                  </span>
                  <span>Continue with Google</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <button
                  onClick={() => setMobileSheetOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold backdrop-blur-md transition-colors cursor-pointer"
                >
                  <Smartphone className="h-4 w-4 text-[#FF7854]" />
                  <span>Get Mobile App</span>
                </button>
              </div>
            </motion.div>

            {/* Right Tinder-Style Fanned Card Stack (CRISP, UNBLURRED PHOTOS!) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-[330px] sm:max-w-[360px] h-[440px] sm:h-[470px]">
                {/* Back Left Card */}
                <motion.div
                  initial={{ opacity: 0, rotate: -14, x: -30 }}
                  animate={{ opacity: 0.72, rotate: -10, x: -34 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="hidden sm:block absolute inset-0 rounded-[30px] overflow-hidden border border-white/15 shadow-2xl origin-bottom"
                >
                  <img
                    src={cardBackLeft.photoUrl}
                    alt={cardBackLeft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                </motion.div>

                {/* Back Right Card */}
                <motion.div
                  initial={{ opacity: 0, rotate: 14, x: 30 }}
                  animate={{ opacity: 0.72, rotate: 10, x: 34 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="hidden sm:block absolute inset-0 rounded-[30px] overflow-hidden border border-white/15 shadow-2xl origin-bottom"
                >
                  <img
                    src={cardBackRight.photoUrl}
                    alt={cardBackRight.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                </motion.div>

                {/* Main Front Crisp Portrait Card */}
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full h-full rounded-[32px] overflow-hidden border-2 border-white/20 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.75)] bg-[#1D1521]"
                >
                  <img
                    src={cardFront.photoUrl}
                    alt={cardFront.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  {/* Top Live Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-semibold text-white">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Active nearby
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF4458] to-[#FF7854] text-[11px] font-bold text-white shadow">
                      {cardFront.compatibilityScore}% match
                    </span>
                  </div>

                  {/* Bottom Profile Info */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-extrabold text-3xl text-white leading-none">
                        {cardFront.name.split(" ")[0]}, {cardFront.age}
                      </h2>
                      <BadgeCheck className="h-6 w-6 text-[#38BDF8] fill-[#38BDF8]/20 shrink-0" />
                    </div>
                    <p className="text-xs text-white/85 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#FF7854]" />
                      <span>
                        {cardFront.city} · {cardFront.role}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                        Filter Coffee
                      </span>
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                        Long Walks
                      </span>
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                        Theatre
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Iconic Floating Tinder-Style Action Buttons */}
                <div className="relative z-20 -mt-7 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setGoogleModalOpen(true)}
                    aria-label="Pass preview"
                    className="h-14 w-14 rounded-full bg-white text-[#FF4458] flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  >
                    <X className="h-7 w-7 stroke-[2.6]" />
                  </button>
                  <button
                    onClick={() => setGoogleModalOpen(true)}
                    aria-label="Super prompt preview"
                    className="h-12 w-12 rounded-full bg-white text-[#38BDF8] flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Star className="h-5 w-5 fill-[#38BDF8]" />
                  </button>
                  <button
                    onClick={() => setGoogleModalOpen(true)}
                    aria-label="Like preview"
                    className="h-14 w-14 rounded-full bg-gradient-to-tr from-[#FF4458] to-[#FF7854] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(255,68,88,0.55)] hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Heart className="h-7 w-7 fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clean 3-Card Feature Strip */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-4">
            <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-6 space-y-2.5 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-2xl bg-[#FF4458]/20 text-[#FF5864] flex items-center justify-center">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Swipe with intention
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                Smooth card swiping with transparent compatibility signals and
                fun 2-question icebreakers so chats never start dry.
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-6 space-y-2.5 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-2xl bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Verified &amp; coworker-shielded
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                Quick profile verification plus a one-tap blocklist to keep your
                profile hidden from colleagues at your company.
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-6 space-y-2.5 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                <MessageCircleHeart className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Max 3 active chats
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                No 40-chat graveyards. Focus on 3 matches at once, and wrap up
                politely with a single tap whenever you want to open a slot.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
