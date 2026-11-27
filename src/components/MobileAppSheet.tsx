"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, Smartphone, Terminal, X } from "lucide-react";
import { useKora } from "@/context/KoraContext";

const APK_CMD =
  "npm run build && npx cap sync android && cd android && ./gradlew assembleDebug";

export function MobileAppSheet() {
  const { mobileSheetOpen, setMobileSheetOpen } = useKora();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(APK_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {mobileSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSheetOpen(false)}
            className="absolute inset-0 bg-[#161615]/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl hairline editorial-shadow p-6 space-y-5 safe-pb"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#2F5E4E]">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>PWA + Capacitor Android</span>
                </div>
                <h2 className="font-serif text-3xl text-[#161615]">
                  Install Kora on Mobile
                </h2>
              </div>
              <button
                onClick={() => setMobileSheetOpen(false)}
                className="p-1.5 rounded-full text-[#6B6863] hover:text-[#161615] hover:bg-[#FAF8F5] cursor-pointer"
                aria-label="Close mobile sheet"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* PWA Install */}
            <div className="rounded-xl bg-[#FAF8F5] hairline p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#161615]">
                <Download className="h-3.5 w-3.5 text-[#B8502D]" />
                <span>Option 1: Instant Mobile PWA (iOS &amp; Android)</span>
              </div>
              <ul className="text-xs text-[#6B6863] space-y-1 list-disc list-inside leading-relaxed">
                <li>
                  <span className="font-medium text-[#161615]">iOS Safari:</span>{" "}
                  Tap Share → <span className="italic">Add to Home Screen</span>
                </li>
                <li>
                  <span className="font-medium text-[#161615]">Android Chrome:</span>{" "}
                  Tap Menu (⋮) → <span className="italic">Install app</span>
                </li>
              </ul>
            </div>

            {/* Android APK via Capacitor */}
            <div className="rounded-xl bg-white hairline p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#161615]">
                  <Terminal className="h-3.5 w-3.5 text-[#2F5E4E]" />
                  <span>Option 2: Build Android Debug APK (Capacitor)</span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#2F5E4E]/10 text-[#2F5E4E]">
                  /android synced
                </span>
              </div>
              <p className="text-xs text-[#6B6863] leading-relaxed">
                The Capacitor <code className="text-[#161615]">/android</code>{" "}
                project is pre-initialized and synced with Next.js static export
                (<code className="text-[#161615]">out/</code>). On any machine
                with Android SDK installed, run:
              </p>
              <div className="relative rounded-xl bg-[#161615] text-[#FAF8F5] p-3 pr-10 font-mono text-[11px] overflow-x-auto">
                <code>{APK_CMD}</code>
                <button
                  onClick={handleCopy}
                  className="absolute right-2.5 top-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Copy build command"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#9A9690]">
                Output APK:{" "}
                <code className="text-[#6B6863]">
                  android/app/build/outputs/apk/debug/app-debug.apk
                </code>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
