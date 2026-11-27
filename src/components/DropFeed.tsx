"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Lock,
  MapPin,
  MessageSquarePlus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { MatchProfile } from "@/types/kora";
import { PromptRevealModal } from "@/components/PromptRevealModal";

function useThursdayCountdown() {
  const [label, setLabel] = useState("6d 14h 22m");

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      // Next Thursday at 19:00 local
      const target = new Date(now);
      const daysUntilThu = (4 - now.getDay() + 7) % 7;
      target.setDate(
        now.getDate() + (daysUntilThu === 0 && now.getHours() >= 19 ? 7 : daysUntilThu || 7)
      );
      target.setHours(19, 0, 0, 0);
      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setLabel(`${d}d ${h}h ${m}m`);
    };
    compute();
    const id = setInterval(compute, 30000);
    return () => clearInterval(id);
  }, []);

  return label;
}

export function DropFeed() {
  const {
    curatedDrop,
    activeThreads,
    isAtChatCap,
    passMatch,
    setFocusCapOpen,
    triggerFreshDrop,
    state,
  } = useKora();

  const countdown = useThursdayCountdown();
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [expandedWhyId, setExpandedWhyId] = useState<string | null>(null);

  const handleConnectClick = (match: MatchProfile) => {
    if (isAtChatCap) {
      setFocusCapOpen(true);
      return;
    }
    setSelectedMatch(match);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Drop Header */}
      <header className="space-y-3 pb-6 hairline-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#B8502D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8502D]" />
            <span>Thursday Drop · {curatedDrop.length} Curated Matches</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#6B6863] bg-white px-3 py-1 rounded-full hairline">
            <Clock className="h-3.5 w-3.5 text-[#9A9690]" />
            <span>Next drop in {countdown}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-4xl sm:text-[44px] leading-[1.06] text-[#161615]">
              Your weekly curation
            </h1>
            <p className="text-sm text-[#6B6863] mt-1.5">
              Photos remain frosted until you both answer a shared scenario
              prompt. Active chat slots: {activeThreads.length} / 3.
            </p>
          </div>
        </div>

        {state.shieldedDomains.length > 0 && (
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2F5E4E] pt-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              Shield active: hiding {state.shieldedDomains.join(", ")}
              {state.shieldedColleges.length > 0
                ? ` & ${state.shieldedColleges.join(", ")}`
                : ""}
            </span>
          </div>
        )}
      </header>

      {/* Curated Cards */}
      {curatedDrop.length === 0 ? (
        <div className="bg-white rounded-2xl hairline editorial-shadow p-10 text-center space-y-4">
          <div className="mx-auto h-11 w-11 rounded-full bg-[#FAF8F5] hairline flex items-center justify-center text-[#6B6863]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            <h2 className="font-serif text-2xl text-[#161615]">
              You’ve reviewed this week’s drop
            </h2>
            <p className="text-xs text-[#6B6863] leading-relaxed">
              Your next three verified matches arrive Thursday at 7:00 PM IST.
              For testing, you can deliver a fresh batch immediately.
            </p>
          </div>
          <button
            onClick={triggerFreshDrop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161615] hover:bg-[#2a2a28] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Deliver Fresh Drop (Demo)</span>
          </button>
        </div>
      ) : (
        <div className="space-y-7">
          <AnimatePresence mode="popLayout">
            {curatedDrop.map((match, index) => {
              const isExpanded = expandedWhyId === match.id;
              return (
                <motion.article
                  key={match.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white rounded-2xl hairline editorial-shadow overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    {/* Frosted Portrait Column */}
                    <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[340px] bg-[#F3EFE9] overflow-hidden">
                      <img
                        src={match.photoUrl}
                        alt={`${match.name} frosted portrait`}
                        className="w-full h-full object-cover blur-md scale-105 select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161615]/35 via-transparent to-[#161615]/10" />

                      {/* Top Cohort Tag */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF8F5]/92 backdrop-blur-md text-[11px] font-medium text-[#2F5E4E] hairline">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Verified ’{String(match.gradYear).slice(-2)} Grad</span>
                        </span>
                      </div>

                      {/* Bottom Frosted Lock Tag */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5]/92 backdrop-blur-md text-[11px] font-medium text-[#161615] hairline">
                          <Lock className="h-3 w-3 text-[#B8502D]" />
                          <span>Unblurs after shared prompt</span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Details Column */}
                    <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between gap-5">
                      <div className="space-y-4">
                        {/* Identity */}
                        <div>
                          <div className="flex items-baseline justify-between gap-3">
                            <h2 className="font-serif text-[32px] leading-tight text-[#161615]">
                              {match.name}, {match.age}
                            </h2>
                            <span className="text-xs font-medium text-[#2F5E4E] bg-[#2F5E4E]/[0.08] px-2.5 py-1 rounded-full shrink-0">
                              {match.compatibilityScore}% match
                            </span>
                          </div>
                          <p className="text-sm font-medium text-[#161615]/85 mt-0.5">
                            {match.role}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B6863] mt-1.5">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-[#9A9690]" />
                              {match.city}
                            </span>
                            <span className="text-[#9A9690]">·</span>
                            <span>{match.relocation}</span>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm leading-relaxed text-[#6B6863]">
                          {match.about}
                        </p>

                        {/* Transparent "Why You Matched" Compatibility Bar */}
                        <div className="rounded-xl bg-[#FAF8F5] hairline p-4 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6863]">
                              Why You Matched
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedWhyId(isExpanded ? null : match.id)
                              }
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#161615] hover:text-[#B8502D] transition-colors cursor-pointer"
                            >
                              <span>
                                {isExpanded ? "Hide breakdown" : "See breakdown"}
                              </span>
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div className="h-1.5 w-full rounded-full bg-[#161615]/[0.08] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${match.compatibilityScore}%`,
                              }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="h-full rounded-full bg-[#2F5E4E]"
                            />
                          </div>

                          <p className="text-xs text-[#6B6863] leading-relaxed">
                            {match.compatibilitySummary}
                          </p>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden pt-2 space-y-2.5 hairline-t"
                              >
                                {match.compatibilityBreakdown.map((dim) => (
                                  <div
                                    key={dim.label}
                                    className="space-y-1 text-xs"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-[#161615]">
                                        {dim.label}
                                      </span>
                                      <span className="text-[#6B6863]">
                                        {dim.note} ·{" "}
                                        <span className="font-medium text-[#2F5E4E]">
                                          {dim.score}%
                                        </span>
                                      </span>
                                    </div>
                                    <div className="h-1 w-full rounded-full bg-[#161615]/[0.06] overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-[#2F5E4E]/75"
                                        style={{ width: `${dim.score}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => passMatch(match.id)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full hairline bg-white hover:bg-[#FAF8F5] text-xs font-medium text-[#6B6863] hover:text-[#161615] transition-colors cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Pass</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleConnectClick(match)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#B8502D] hover:bg-[#9E4223] text-white text-xs sm:text-sm font-medium transition-colors editorial-shadow cursor-pointer"
                        >
                          <MessageSquarePlus className="h-4 w-4" />
                          <span>Answer Prompt to Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Shared Prompt & Progressive Reveal Modal */}
      <PromptRevealModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
}
