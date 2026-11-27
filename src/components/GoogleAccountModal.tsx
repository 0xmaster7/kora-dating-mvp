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
            className="absolute inset-0 bg-[#161615]/35 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Sign in with Google"
            className="relative w-full max-w-md bg-white rounded-2xl hairline editorial-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 hairline-b flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#6B6863]">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF8F5] hairline text-[11px] font-semibold text-[#161615]">
                    G
                  </span>
                  <span>Sign in with Google</span>
                </div>
                <h2 className="font-serif text-2xl text-[#161615]">
                  Choose an account
                </h2>
                <p className="text-xs text-[#6B6863]">
                  to continue to{" "}
                  <span className="font-medium text-[#161615]">Kora</span>{" "}
                  (Interactive Prototype)
                </p>
              </div>
              <button
                onClick={() => setGoogleModalOpen(false)}
                className="p-1.5 rounded-full text-[#6B6863] hover:text-[#161615] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
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
                  className="w-full text-left p-3.5 rounded-xl hairline hover:border-[#161615]/25 hover:bg-[#FAF8F5] transition-all flex items-center gap-3.5 group cursor-pointer"
                >
                  <img
                    src={acc.avatarUrl}
                    alt={acc.name}
                    className="h-11 w-11 rounded-full object-cover hairline shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#161615] truncate">
                        {acc.name}
                      </p>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F3EFE9] text-[#6B6863]">
                        Demo {idx === 0 ? "A" : "B"}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6863] truncate">
                      {acc.email}
                    </p>
                    <p className="text-[11px] text-[#9A9690] truncate mt-0.5">
                      {acc.role} @ {acc.company} · {acc.gradYear} {acc.college}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#9A9690] group-hover:text-[#B8502D] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {/* Flow choice toggle */}
            <div className="px-6 py-4 bg-[#FAF8F5] hairline-t space-y-3">
              <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
                <span className="text-xs text-[#6B6863]">
                  Skip onboarding &amp; jump straight to Thursday Drop
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={skipOnboarding}
                  onClick={() => setSkipOnboarding((v) => !v)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    skipOnboarding ? "bg-[#B8502D]" : "bg-[#161615]/15"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      skipOnboarding ? "translate-x-4.5" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>

              <div className="flex items-center gap-1.5 text-[11px] text-[#9A9690]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2F5E4E] shrink-0" />
                <span>
                  OAuth-ready via <code className="text-[#6B6863]">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
