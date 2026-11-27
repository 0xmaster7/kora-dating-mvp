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
            className="absolute inset-0 bg-[#261428]/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl hairline editorial-shadow p-6 space-y-5 safe-pb"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1E8E72]">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>PWA + Capacitor Android</span>
                </div>
                <h2 className="font-display font-bold text-3xl text-[#261428]">
                  Install Kora on Mobile
                </h2>
              </div>
              <button
                onClick={() => setMobileSheetOpen(false)}
                className="p-1.5 rounded-full text-[#6E586B] hover:text-[#261428] hover:bg-[#FFF7F2] cursor-pointer"
                aria-label="Close mobile sheet"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* PWA Install */}
            <div className="rounded-xl bg-[#FFF7F2] hairline p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#261428]">
                <Download className="h-3.5 w-3.5 text-[#E84A5F]" />
                <span>Option 1: Instant Mobile PWA (iOS &amp; Android)</span>
              </div>
              <ul className="text-xs text-[#6E586B] space-y-1 list-disc list-inside leading-relaxed">
                <li>
                  <span className="font-medium text-[#261428]">iOS Safari:</span>{" "}
                  Tap Share → <span className="italic">Add to Home Screen</span>
                </li>
                <li>
                  <span className="font-medium text-[#261428]">Android Chrome:</span>{" "}
                  Tap Menu (⋮) → <span className="italic">Install app</span>
                </li>
              </ul>
            </div>

            {/* Android APK via Capacitor */}
            <div className="rounded-xl bg-white hairline p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#261428]">
                  <Terminal className="h-3.5 w-3.5 text-[#1E8E72]" />
                  <span>Option 2: Build Android Debug APK (Capacitor)</span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1E8E72]/10 text-[#1E8E72]">
                  /android synced
                </span>
              </div>
              <p className="text-xs text-[#6E586B] leading-relaxed">
                The Capacitor <code className="text-[#261428]">/android</code>{" "}
                project is pre-initialized and synced with Next.js static export
                (<code className="text-[#261428]">out/</code>). On any machine
                with Android SDK installed, run:
              </p>
              <div className="relative rounded-xl bg-[#261428] text-[#FFF7F2] p-3 pr-10 font-mono text-[11px] overflow-x-auto">
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
              <p className="text-[11px] text-[#9D889A]">
                Output APK:{" "}
                <code className="text-[#6E586B]">
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
