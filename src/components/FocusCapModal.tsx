"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { useKora } from "@/context/KoraContext";

export function FocusCapModal() {
  const { focusCapOpen, setFocusCapOpen, setActiveTab } = useKora();

  return (
    <AnimatePresence>
      {focusCapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocusCapOpen(false)}
            className="absolute inset-0 bg-[#161615]/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl hairline editorial-shadow p-6 sm:p-7 space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8502D]/[0.09] text-[#B8502D] text-xs font-medium">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Active Conversations: 3 / 3</span>
              </div>
              <button
                onClick={() => setFocusCapOpen(false)}
                className="p-1.5 rounded-full text-[#6B6863] hover:text-[#161615] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Close focus cap modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl leading-tight text-[#161615]">
                Your focus cap is full
              </h2>
              <p className="text-sm text-[#6B6863] leading-relaxed">
                Kora limits active conversations to{" "}
                <span className="font-semibold text-[#161615]">three at a time</span>{" "}
                so nobody gets buried in a 40-chat graveyard or left on read.
              </p>
              <p className="text-xs text-[#6B6863] leading-relaxed pt-1">
                To unlock a new match, politely close one of your current
                conversations with a one-tap respectful note—your slot opens
                instantly.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setFocusCapOpen(false);
                  setActiveTab("chats");
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#161615] hover:bg-[#2a2a28] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Review Active Chats</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setFocusCapOpen(false)}
                className="px-4 py-2.5 rounded-full hairline text-xs font-medium text-[#6B6863] hover:text-[#161615] transition-colors cursor-pointer"
              >
                Stay here
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
