"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronUp,
  MessageSquareWarning,
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";

export function DemoControls() {
  const {
    replayAuthAndOnboarding,
    triggerFreshDrop,
    fillChatsToCap,
    resetAllDemoState,
  } = useKora();

  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 sm:right-5 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-72 bg-white rounded-3xl hairline editorial-shadow p-2.5 space-y-1"
          >
            <div className="px-2.5 py-1.5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6E586B]">
                Evaluator Demo Controls
              </span>
              <span className="text-[10px] text-[#9D889A]">localStorage</span>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                replayAuthAndOnboarding();
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FFF7F2] text-xs text-[#261428] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5 text-[#1E8E72] shrink-0" />
              <span>Switch Account / Replay Auth &amp; Onboarding</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                triggerFreshDrop();
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FFF7F2] text-xs text-[#261428] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#E84A5F] shrink-0" />
              <span>Trigger Fresh Match Drop</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                fillChatsToCap();
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FFF7F2] text-xs text-[#261428] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <MessageSquareWarning className="h-3.5 w-3.5 text-[#E84A5F] shrink-0" />
              <span>Fill Active Chats to 3/3 (Test Cap)</span>
            </button>

            <div className="hairline-t my-1" />

            <button
              onClick={() => {
                setOpen(false);
                resetAllDemoState();
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#E84A5F]/[0.08] text-xs text-[#E84A5F] font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" />
              <span>Reset All Demo State</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#261428] hover:bg-[#3D2240] text-[#FFF7F2] text-xs font-medium editorial-shadow transition-colors cursor-pointer"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-[#E84A5F]" />
        <span>Demo Controls</span>
        <ChevronUp
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
