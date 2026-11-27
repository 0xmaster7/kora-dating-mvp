"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  LockOpen,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { MatchProfile } from "@/types/kora";
import { useKora } from "@/context/KoraContext";

interface PromptRevealModalProps {
  match: MatchProfile | null;
  onClose: () => void;
}

export function PromptRevealModal({ match, onClose }: PromptRevealModalProps) {
  const { unlockMatchWithPrompt, setActiveTab, selectThread } = useKora();

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [createdThreadId, setCreatedThreadId] = useState<string | null>(null);

  useEffect(() => {
    if (match) {
      setA1("");
      setA2("");
      setRevealed(false);
      setCreatedThreadId(null);
    }
  }, [match]);

  if (!match) return null;

  const fillThoughtfulSample = () => {
    setA1(
      "Staying in India. Being a short flight from family matters more to me long-term, and the engineering work in Bengaluru is genuinely exciting right now."
    );
    setA2(
      "Early morning filter coffee and a slow walk before the city wakes up—followed by an unhurried afternoon."
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!a1.trim() || !a2.trim()) return;
    const result = unlockMatchWithPrompt(match, a1.trim(), a2.trim());
    if (!result.ok) {
      onClose();
      return;
    }
    setCreatedThreadId(result.threadId || null);
    setRevealed(true);
  };

  const handleOpenChat = () => {
    if (createdThreadId) {
      selectThread(createdThreadId);
    }
    setActiveTab("chats");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#261428]/40 backdrop-blur-[2px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl hairline editorial-shadow"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-6 py-4 hairline-b flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden hairline shrink-0">
                <motion.img
                  src={match.photoUrl}
                  alt={match.name}
                  animate={{
                    
                    
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-[#261428] leading-none">
                  {revealed
                    ? `You & ${match.name.split(" ")[0]} are connected`
                    : `Shared Prompt with ${match.name.split(" ")[0]}`}
                </h2>
                <p className="text-xs text-[#6E586B] mt-1">
                  {revealed
                    ? "Both answers revealed · Ready to chat"
                    : "Answer 2 quick icebreakers to spark a real conversation"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6E586B] hover:text-[#261428] hover:bg-[#FFF7F2] transition-colors cursor-pointer"
              aria-label="Close prompt modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!revealed ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#261428]">
                  01. {match.prompts.q1}
                </label>
                <textarea
                  rows={3}
                  required
                  value={a1}
                  onChange={(e) => setA1(e.target.value)}
                  placeholder="Share your honest take (2–3 lines)..."
                  className="w-full rounded-xl bg-[#FFF7F2] hairline px-4 py-3 text-sm text-[#261428] placeholder:text-[#9D889A] focus:outline-none focus:border-[#261428]/30 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#261428]">
                  02. {match.prompts.q2}
                </label>
                <textarea
                  rows={3}
                  required
                  value={a2}
                  onChange={(e) => setA2(e.target.value)}
                  placeholder="Keep it real and specific..."
                  className="w-full rounded-xl bg-[#FFF7F2] hairline px-4 py-3 text-sm text-[#261428] placeholder:text-[#9D889A] focus:outline-none focus:border-[#261428]/30 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 hairline-t">
                <button
                  type="button"
                  onClick={fillThoughtfulSample}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E586B] hover:text-[#261428] transition-colors cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#E84A5F]" />
                  <span>Fill sample answers (quick test)</span>
                </button>

                <button
                  type="submit"
                  disabled={!a1.trim() || !a2.trim()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] disabled:opacity-45 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Send Icebreaker &amp; Match</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 space-y-6">
              {/* Progressive Photo Unblur Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[#FFF7F2] rounded-2xl hairline p-4">
                <div className="sm:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFEFE6]">
                  <motion.img
                    src={match.photoUrl}
                    alt={match.name}
                    initial={{ scale: 0.96, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E8E72] text-white text-[11px] font-medium"
                  >
                    <LockOpen className="h-3 w-3" />
                    <span>Matched!</span>
                  </motion.div>
                </div>

                <div className="sm:col-span-7 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E8E72]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Profile</span>
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[#261428]">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-xs text-[#6E586B]">
                    {match.role} · {match.city}
                  </p>
                  <p className="text-xs text-[#6E586B] leading-relaxed pt-1">
                    Conversation unlocked in Active Chats. Take your time—no
                    24-hour expiry timers.
                  </p>
                </div>
              </div>

              {/* Side-by-Side Answers */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#6E586B]">
                    01. {match.prompts.q1}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#FFF7F2] hairline p-3.5 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E84A5F]">
                        Your Answer
                      </span>
                      <p className="text-xs leading-relaxed text-[#261428]">
                        {a1}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white hairline p-3.5 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E8E72]">
                        {match.name.split(" ")[0]}’s Answer
                      </span>
                      <p className="text-xs leading-relaxed text-[#261428]">
                        {match.prompts.q1Answer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#6E586B]">
                    02. {match.prompts.q2}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#FFF7F2] hairline p-3.5 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E84A5F]">
                        Your Answer
                      </span>
                      <p className="text-xs leading-relaxed text-[#261428]">
                        {a2}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white hairline p-3.5 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E8E72]">
                        {match.name.split(" ")[0]}’s Answer
                      </span>
                      <p className="text-xs leading-relaxed text-[#261428]">
                        {match.prompts.q2Answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 hairline-t">
                <button
                  onClick={handleOpenChat}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#261428] hover:bg-[#3D2240] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Open Conversation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
