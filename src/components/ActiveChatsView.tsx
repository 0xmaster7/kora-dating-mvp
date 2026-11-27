"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ChevronDown,
  Feather,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { CLOSURE_NOTES } from "@/data/seed";

export function ActiveChatsView() {
  const {
    state,
    activeThreads,
    closedThreads,
    selectThread,
    sendMessage,
    closeThreadPolitely,
    setActiveTab,
  } = useKora();

  const [draft, setDraft] = useState("");
  const [showPromptRecap, setShowPromptRecap] = useState(false);
  const [closureModalOpen, setClosureModalOpen] = useState(false);
  const [selectedClosureIdx, setSelectedClosureIdx] = useState(0);
  const [showArchived, setShowArchived] = useState(false);
  const [mobileShowThread, setMobileShowThread] = useState(false);

  const selectedThread = useMemo(() => {
    const found = state.threads.find((t) => t.id === state.selectedThreadId);
    if (found) return found;
    return activeThreads[0] || closedThreads[0] || null;
  }, [state.threads, state.selectedThreadId, activeThreads, closedThreads]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThread || selectedThread.status !== "active" || !draft.trim())
      return;
    sendMessage(selectedThread.id, draft);
    setDraft("");
  };

  const handleConfirmClose = () => {
    if (!selectedThread) return;
    closeThreadPolitely(selectedThread.id, CLOSURE_NOTES[selectedClosureIdx]);
    setClosureModalOpen(false);
    setMobileShowThread(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Capacity Indicator */}
      <header className="pb-5 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[#161615]">
            Active Chats
          </h1>
          <p className="text-sm text-[#6B6863] mt-1">
            Three deliberate conversations at a time—zero ghosting, graceful
            closure.
          </p>
        </div>

        {/* Capacity Pill */}
        <div className="bg-white rounded-xl hairline px-4 py-2.5 flex items-center gap-3 self-start sm:self-auto shrink-0 whitespace-nowrap">
          <div className="text-xs whitespace-nowrap">
            <span className="text-[#6B6863]">Active Conversations: </span>
            <span
              className={`font-semibold ${
                activeThreads.length >= 3 ? "text-[#B8502D]" : "text-[#161615]"
              }`}
            >
              {activeThreads.length} / 3
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((slot) => (
              <span
                key={slot}
                className={`h-2 w-4 rounded-full transition-colors ${
                  slot < activeThreads.length
                    ? activeThreads.length >= 3
                      ? "bg-[#B8502D]"
                      : "bg-[#2F5E4E]"
                    : "bg-[#161615]/10"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Split Pane Chat Layout */}
      <div className="bg-white rounded-2xl hairline editorial-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* Thread List */}
        <aside
          className={`lg:col-span-4 hairline-r flex flex-col ${
            mobileShowThread ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="p-3.5 hairline-b text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6863]">
            Open Threads ({activeThreads.length})
          </div>

          <div className="divide-y divide-[#161615]/[0.06] flex-1 overflow-y-auto">
            {activeThreads.length === 0 ? (
              <div className="p-6 text-center space-y-3">
                <p className="text-xs text-[#6B6863]">
                  All 3 slots are open. Visit your Thursday Drop to start a
                  conversation.
                </p>
                <button
                  onClick={() => setActiveTab("drop")}
                  className="text-xs font-medium text-[#B8502D] hover:underline cursor-pointer"
                >
                  Go to Thursday Drop →
                </button>
              </div>
            ) : (
              activeThreads.map((t) => {
                const isSelected = selectedThread?.id === t.id;
                const lastMsg = t.messages[t.messages.length - 1];
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      selectThread(t.id);
                      setMobileShowThread(true);
                      setShowPromptRecap(false);
                    }}
                    className={`w-full text-left p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/60"
                    }`}
                  >
                    <img
                      src={t.matchPhotoUrl}
                      alt={t.matchName}
                      className="h-11 w-11 rounded-full object-cover hairline shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold text-[#161615] truncate">
                          {t.matchName}
                        </p>
                        <span className="text-[10px] text-[#9A9690] shrink-0">
                          ’{String(t.matchGradYear).slice(-2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6863] truncate">
                        {t.matchRole}
                      </p>
                      {lastMsg && (
                        <p className="text-xs text-[#9A9690] truncate mt-1">
                          {lastMsg.sender === "me" ? "You: " : ""}
                          {lastMsg.text}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Archived / Politely Closed Threads */}
          {closedThreads.length > 0 && (
            <div className="hairline-t bg-[#FAF8F5]/70">
              <button
                type="button"
                onClick={() => setShowArchived((v) => !v)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-medium text-[#6B6863] hover:text-[#161615] cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Archive className="h-3.5 w-3.5" />
                  <span>Closed Politely ({closedThreads.length})</span>
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    showArchived ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showArchived && (
                <div className="divide-y divide-[#161615]/[0.06] hairline-t">
                  {closedThreads.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        selectThread(t.id);
                        setMobileShowThread(true);
                      }}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <img
                        src={t.matchPhotoUrl}
                        alt={t.matchName}
                        className="h-8 w-8 rounded-full object-cover grayscale"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[#161615] truncate">
                          {t.matchName}
                        </p>
                        <p className="text-[11px] text-[#9A9690] truncate">
                          Closed {t.closedAt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Active Conversation Pane */}
        <section
          className={`lg:col-span-8 flex flex-col ${
            !mobileShowThread ? "hidden lg:flex" : "flex"
          }`}
        >
          {selectedThread ? (
            <>
              {/* Thread Header */}
              <div className="px-4 sm:px-5 py-3.5 sm:py-4 hairline-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setMobileShowThread(false)}
                    className="lg:hidden p-1.5 -ml-1 rounded-full hover:bg-[#FAF8F5] text-[#6B6863]"
                    aria-label="Back to threads"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <img
                    src={selectedThread.matchPhotoUrl}
                    alt={selectedThread.matchName}
                    className="h-10 w-10 rounded-full object-cover hairline shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-xl text-[#161615] truncate">
                        {selectedThread.matchName}
                      </h2>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-[#2F5E4E] bg-[#2F5E4E]/[0.08] px-2 py-0.5 rounded-full">
                        <ShieldCheck className="h-3 w-3" />
                        Verified ’{String(selectedThread.matchGradYear).slice(-2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6863] truncate">
                      {selectedThread.matchRole} · {selectedThread.matchCity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pl-9 sm:pl-0">
                  <button
                    type="button"
                    onClick={() => setShowPromptRecap((v) => !v)}
                    className="text-xs font-medium text-[#6B6863] hover:text-[#161615] px-3 py-1.5 rounded-full hairline bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    {showPromptRecap ? "Hide prompts" : "Shared prompts"}
                  </button>

                  {selectedThread.status === "active" && (
                    <button
                      type="button"
                      onClick={() => setClosureModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8502D] hover:bg-[#B8502D]/[0.08] px-3 py-1.5 rounded-full border border-[#B8502D]/25 transition-colors cursor-pointer"
                    >
                      <Feather className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Close Politely</span>
                      <span className="sm:hidden">Close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable Shared Prompt Recap */}
              <AnimatePresence initial={false}>
                {showPromptRecap && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-[#FAF8F5] hairline-b px-5 py-4 space-y-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#161615]">
                        Q1. {selectedThread.sharedPrompts.q1}
                      </p>
                      <p className="text-[#6B6863] mt-1">
                        <span className="font-medium text-[#B8502D]">You:</span>{" "}
                        {selectedThread.sharedPrompts.myA1}
                      </p>
                      <p className="text-[#6B6863] mt-0.5">
                        <span className="font-medium text-[#2F5E4E]">
                          {selectedThread.matchName.split(" ")[0]}:
                        </span>{" "}
                        {selectedThread.sharedPrompts.theirA1}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="flex-1 p-5 space-y-3.5 overflow-y-auto max-h-[420px] bg-[#FAF8F5]/40">
                {selectedThread.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="text-center py-1">
                        <span className="inline-block text-[11px] text-[#6B6863] bg-white hairline px-3 py-1 rounded-full">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isMe ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isMe
                            ? "bg-[#161615] text-[#FAF8F5] rounded-br-sm"
                            : "bg-white text-[#161615] hairline rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-[#9A9690] mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Composer */}
              {selectedThread.status === "active" ? (
                <form
                  onSubmit={handleSend}
                  className="p-4 hairline-t bg-white flex items-center gap-2.5"
                >
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Write to ${selectedThread.matchName.split(" ")[0]}...`}
                    className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] hairline text-sm text-[#161615] placeholder:text-[#9A9690] focus:outline-none focus:border-[#161615]/30"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#B8502D] hover:bg-[#9E4223] disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 hairline-t bg-[#FAF8F5] text-center text-xs text-[#6B6863]">
                  This conversation was closed politely on{" "}
                  {selectedThread.closedAt}. Your active chat slot has been
                  freed.
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-10 text-center text-sm text-[#6B6863]">
              Select a conversation to begin.
            </div>
          )}
        </section>
      </div>

      {/* Close Politely Modal */}
      <AnimatePresence>
        {closureModalOpen && selectedThread && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClosureModalOpen(false)}
              className="absolute inset-0 bg-[#161615]/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-2xl hairline editorial-shadow p-6 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#161615]">
                    Close politely with{" "}
                    {selectedThread.matchName.split(" ")[0]}
                  </h3>
                  <p className="text-xs text-[#6B6863] mt-1">
                    Choose a respectful one-tap note. The thread will be
                    archived and your active chat slot will open immediately.
                  </p>
                </div>
                <button
                  onClick={() => setClosureModalOpen(false)}
                  className="p-1.5 rounded-full text-[#6B6863] hover:text-[#161615] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                {CLOSURE_NOTES.map((note, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedClosureIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl text-xs leading-relaxed transition-all cursor-pointer ${
                      selectedClosureIdx === idx
                        ? "bg-[#FAF8F5] border border-[#B8502D] text-[#161615]"
                        : "bg-white hairline text-[#6B6863] hover:bg-[#FAF8F5]/70"
                    }`}
                  >
                    “{note}”
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 hairline-t">
                <button
                  type="button"
                  onClick={() => setClosureModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#6B6863] hover:text-[#161615] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClose}
                  className="px-5 py-2.5 rounded-full bg-[#161615] hover:bg-[#2a2a28] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Send Note &amp; Free Slot
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
