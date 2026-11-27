"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { DEMO_ACCOUNTS } from "@/data/seed";
import { useKora } from "@/context/KoraContext";

export function GoogleAccountModal() {
  const { googleModalOpen, setGoogleModalOpen, signInWithDemoAccount } =
    useKora();
  const [skipOnboarding, setSkipOnboarding] = useState(false);

  return (
    <AnimatePresence>
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGoogleModalOpen(false)}
            className="absolute inset-0 bg-[#261428]/35 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Sign in with Google"
            className="relative w-full max-w-md bg-white rounded-3xl hairline editorial-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 hairline-b flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#6E586B]">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF7F2] hairline text-[11px] font-semibold text-[#261428]">
                    G
                  </span>
                  <span>Sign in with Google</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-[#261428]">
                  Choose an account
                </h2>
                <p className="text-xs text-[#6E586B]">
                  to continue to{" "}
                  <span className="font-medium text-[#261428]">Kora</span>{" "}
                  (Interactive Prototype)
                </p>
              </div>
              <button
                onClick={() => setGoogleModalOpen(false)}
                className="p-1.5 rounded-full text-[#6E586B] hover:text-[#261428] hover:bg-[#FFF7F2] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Account list */}
            <div className="p-4 space-y-2">
              {DEMO_ACCOUNTS.map((acc, idx) => (
                <button
                  key={acc.id}
                  onClick={() => signInWithDemoAccount(acc, skipOnboarding)}
                  className="w-full text-left p-3.5 rounded-xl hairline hover:border-[#261428]/25 hover:bg-[#FFF7F2] transition-all flex items-center gap-3.5 group cursor-pointer"
                >
                  <img
                    src={acc.avatarUrl}
                    alt={acc.name}
                    className="h-11 w-11 rounded-full object-cover hairline shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#261428] truncate">
                        {acc.name}
                      </p>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#FFEFE6] text-[#6E586B]">
                        Demo {idx === 0 ? "A" : "B"}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E586B] truncate">
                      {acc.email}
                    </p>
                    <p className="text-[11px] text-[#9D889A] truncate mt-0.5">
                      {acc.role} @ {acc.company} · {acc.gradYear} {acc.college}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#9D889A] group-hover:text-[#E84A5F] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {/* Flow choice toggle */}
            <div className="px-6 py-4 bg-[#FFF7F2] hairline-t space-y-3">
              <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
                <span className="text-xs text-[#6E586B]">
                  Skip setup &amp; jump straight to Discover
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={skipOnboarding}
                  onClick={() => setSkipOnboarding((v) => !v)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    skipOnboarding ? "bg-[#E84A5F]" : "bg-[#261428]/15"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      skipOnboarding ? "translate-x-4.5" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>

              <div className="flex items-center gap-1.5 text-[11px] text-[#9D889A]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1E8E72] shrink-0" />
                <span>
                  OAuth-ready via <code className="text-[#6E586B]">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
