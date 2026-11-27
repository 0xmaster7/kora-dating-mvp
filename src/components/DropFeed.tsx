"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  BadgeCheck,
  ChevronDown,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { MatchProfile } from "@/types/kora";
import { PromptRevealModal } from "@/components/PromptRevealModal";

interface SwipeCardProps {
  match: MatchProfile;
  isTop: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenPrompt: () => void;
}

function SwipeCard({
  match,
  isTop,
  onSwipeLeft,
  onSwipeRight,
  onOpenPrompt,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -30], [1, 0]);
  const [showDetails, setShowDetails] = useState(false);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 110) {
      onSwipeRight();
    } else if (info.offset.x < -110) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={isTop ? { x, rotate } : undefined}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: isTop ? 0.97 : 0.93, opacity: 0, y: 12 }}
      animate={{
        scale: isTop ? 1 : 0.94,
        opacity: isTop ? 1 : 0.65,
        y: isTop ? 0 : 14,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`absolute inset-0 rounded-[32px] overflow-hidden bg-[#1D1521] shadow-[0_24px_56px_-18px_rgba(38,20,40,0.35)] select-none ${
        isTop ? "z-20 cursor-grab active:cursor-grabbing" : "z-10 pointer-events-none"
      }`}
    >
      {/* Crisp, Unblurred Full-Bleed Portrait */}
      <img
        src={match.photoUrl}
        alt={match.name}
        draggable={false}
        className="w-full h-full object-cover"
      />

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-black/15 pointer-events-none" />

      {/* Swipe LIKE / NOPE Stamps */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute top-8 left-6 border-4 border-emerald-400 text-emerald-400 font-display font-extrabold text-3xl px-4 py-1 rounded-xl -rotate-12 tracking-wider"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="pointer-events-none absolute top-8 right-6 border-4 border-[#FF4458] text-[#FF4458] font-display font-extrabold text-3xl px-4 py-1 rounded-xl rotate-12 tracking-wider"
          >
            NOPE
          </motion.div>
        </>
      )}

      {/* Top Pills */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {match.city}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF4458] to-[#FF7854] text-[11px] font-bold text-white shadow">
          <Flame className="h-3 w-3 fill-white" />
          {match.compatibilityScore}% match
        </span>
      </div>

      {/* Bottom Profile Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-2.5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-3xl leading-none truncate">
                {match.name.split(" ")[0]}, {match.age}
              </h2>
              <BadgeCheck className="h-6 w-6 text-[#38BDF8] fill-[#38BDF8]/20 shrink-0" />
            </div>
            <p className="text-xs sm:text-sm text-white/85 mt-1 truncate">
              {match.role}
            </p>
            <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3.5 w-3.5 text-[#FF7854] shrink-0" />
              <span className="truncate">{match.relocation}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails((v) => !v);
            }}
            className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white shrink-0 transition-colors cursor-pointer"
            aria-label="Toggle match details"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-white/85 line-clamp-2">
          {match.about}
        </p>

        {/* Expandable Compatibility Breakdown */}
        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-2 space-y-2 border-t border-white/15"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FFB399]">
                Why You Match
              </p>
              {match.compatibilityBreakdown.map((dim) => (
                <div key={dim.label} className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-white/85">
                    <span>{dim.label}</span>
                    <span className="font-semibold text-emerald-300">
                      {dim.score}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF4458] to-[#FFA05C]"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPrompt();
                }}
                className="w-full mt-2 py-2 rounded-full bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Answer Icebreaker Prompt →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function DropFeed() {
  const {
    curatedDrop,
    activeThreads,
    isAtChatCap,
    passMatch,
    unlockMatchWithPrompt,
    setFocusCapOpen,
    triggerFreshDrop,
    setActiveTab,
    selectThread,
    state,
  } = useKora();

  const [promptMatch, setPromptMatch] = useState<MatchProfile | null>(null);
  const [matchedModal, setMatchedModal] = useState<{
    match: MatchProfile;
    threadId: string;
  } | null>(null);

  const topMatch = curatedDrop[0] || null;
  const nextMatch = curatedDrop[1] || null;

  const handleQuickLike = (match: MatchProfile) => {
    if (isAtChatCap) {
      setFocusCapOpen(true);
      return;
    }
    const res = unlockMatchWithPrompt(
      match,
      "Loved your vibe—definitely up for grabbing coffee soon!",
      "Easygoing weekends, good conversation, and zero games."
    );
    if (res.ok && res.threadId) {
      setMatchedModal({ match, threadId: res.threadId });
    }
  };

  const handleOpenPrompt = (match: MatchProfile) => {
    if (isAtChatCap) {
      setFocusCapOpen(true);
      return;
    }
    setPromptMatch(match);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Compact Header */}
      <header className="w-full max-w-[420px] flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-[#261428] leading-none">
            Discover
          </h1>
          <p className="text-xs text-[#6E586B] mt-1">
            Drag left to pass, right to like, or tap ★ to send an icebreaker
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hairline text-xs font-semibold text-[#261428] shrink-0">
          <MessageCircle className="h-3.5 w-3.5 text-[#E84A5F]" />
          <span>{activeThreads.length}/3 chats</span>
        </div>
      </header>

      {state.shieldedDomains.length > 0 && (
        <div className="w-full max-w-[420px] flex items-center gap-1.5 text-[11px] font-medium text-[#1E8E72] bg-[#E6F7F2] px-3.5 py-1.5 rounded-full">
          <Shield className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            Coworker shield active: hiding {state.shieldedDomains.join(", ")}
          </span>
        </div>
      )}

      {/* Tinder-Style Swipe Deck */}
      {!topMatch ? (
        <div className="w-full max-w-[420px] bg-white rounded-[32px] hairline editorial-shadow p-10 text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-[#FFE8DC] flex items-center justify-center text-[#E84A5F]">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-display font-bold text-2xl text-[#261428]">
              You’re all caught up!
            </h2>
            <p className="text-xs text-[#6E586B] leading-relaxed">
              Fresh curated matches drop soon—or load a new stack right now to
              keep exploring.
            </p>
          </div>
          <button
            onClick={triggerFreshDrop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4458] to-[#FF7854] text-white text-xs font-bold playful-shadow cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Load Fresh Profiles</span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[420px] space-y-6">
          <div className="relative w-full h-[520px] sm:h-[550px]">
            <AnimatePresence>
              {nextMatch && (
                <SwipeCard
                  key={nextMatch.id}
                  match={nextMatch}
                  isTop={false}
                  onSwipeLeft={() => {}}
                  onSwipeRight={() => {}}
                  onOpenPrompt={() => {}}
                />
              )}
              <SwipeCard
                key={topMatch.id}
                match={topMatch}
                isTop={true}
                onSwipeLeft={() => passMatch(topMatch.id)}
                onSwipeRight={() => handleQuickLike(topMatch)}
                onOpenPrompt={() => handleOpenPrompt(topMatch)}
              />
            </AnimatePresence>
          </div>

          {/* Iconic Circular Action Controls */}
          <div className="flex items-center justify-center gap-5 pt-1">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => passMatch(topMatch.id)}
              aria-label="Pass"
              className="h-15 w-15 rounded-full bg-white hairline editorial-shadow text-[#FF4458] flex items-center justify-center cursor-pointer"
            >
              <X className="h-7 w-7 stroke-[2.6]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleOpenPrompt(topMatch)}
              aria-label="Send icebreaker prompt"
              title="Answer 2-question icebreaker"
              className="h-13 w-13 rounded-full bg-white hairline editorial-shadow text-[#38BDF8] flex items-center justify-center cursor-pointer"
            >
              <Star className="h-6 w-6 fill-[#38BDF8]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleQuickLike(topMatch)}
              aria-label="Like"
              className="h-15 w-15 rounded-full bg-gradient-to-tr from-[#FF4458] to-[#FF7854] text-white playful-shadow flex items-center justify-center cursor-pointer"
            >
              <Heart className="h-7 w-7 fill-white" />
            </motion.button>
          </div>

          <p className="text-center text-[11px] text-[#9D889A]">
            {curatedDrop.length} profile{curatedDrop.length === 1 ? "" : "s"} in
            this stack · Tap ★ to answer a prompt first
          </p>
        </div>
      )}

      {/* "It's a Match!" Celebration Modal */}
      <AnimatePresence>
        {matchedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMatchedModal(null)}
              className="absolute inset-0 bg-[#110C14]/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="relative w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#2A1633] to-[#160D1C] border border-white/15 p-7 text-center text-white space-y-6 shadow-2xl"
            >
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#FF7854]">
                  <Sparkles className="h-3.5 w-3.5" /> It’s a Match!
                </span>
                <h2 className="font-display font-extrabold text-3xl">
                  You &amp; {matchedModal.match.name.split(" ")[0]} clicked
                </h2>
              </div>

              <div className="flex items-center justify-center -space-x-4">
                <img
                  src={
                    state.account?.avatarUrl ||
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85"
                  }
                  alt="You"
                  className="h-24 w-24 rounded-full object-cover border-4 border-[#2A1633] shadow-lg"
                />
                <div className="z-10 h-10 w-10 rounded-full bg-gradient-to-tr from-[#FF4458] to-[#FF7854] flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 fill-white text-white" />
                </div>
                <img
                  src={matchedModal.match.photoUrl}
                  alt={matchedModal.match.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-[#2A1633] shadow-lg"
                />
              </div>

              <p className="text-xs text-white/75 leading-relaxed">
                {matchedModal.match.name.split(" ")[0]} is waiting in your
                Active Chats. Say hi while the spark is fresh!
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    selectThread(matchedModal.threadId);
                    setMatchedModal(null);
                    setActiveTab("chats");
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF4458] to-[#FF7854] text-white text-sm font-bold playful-shadow cursor-pointer"
                >
                  Send a Message
                </button>
                <button
                  onClick={() => setMatchedModal(null)}
                  className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white/85 cursor-pointer"
                >
                  Keep Swiping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Icebreaker Prompt Modal */}
      <PromptRevealModal
        match={promptMatch}
        onClose={() => setPromptMatch(null)}
      />
    </div>
  );
}
