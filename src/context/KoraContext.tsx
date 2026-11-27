"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppTab,
  ChatThread,
  DemoAccount,
  DPDPConsent,
  KoraState,
  MatchProfile,
} from "@/types/kora";
import {
  createInitialState,
  createInitialThreads,
  DEMO_ACCOUNTS,
  MATCH_POOL,
} from "@/data/seed";

const STORAGE_KEY = "kora_mvp_state_v1";
const MAX_ACTIVE_CHATS = 3;

interface KoraContextValue {
  state: KoraState;
  hydrated: boolean;
  activeThreads: ChatThread[];
  closedThreads: ChatThread[];
  curatedDrop: MatchProfile[];
  isAtChatCap: boolean;
  toast: string | null;
  showToast: (msg: string) => void;
  // Modals controlled globally
  focusCapOpen: boolean;
  setFocusCapOpen: (open: boolean) => void;
  mobileSheetOpen: boolean;
  setMobileSheetOpen: (open: boolean) => void;
  googleModalOpen: boolean;
  setGoogleModalOpen: (open: boolean) => void;
  // Actions
  signInWithDemoAccount: (account: DemoAccount, skipOnboarding?: boolean) => void;
  setOnboardingStep: (step: 1 | 2 | 3) => void;
  completeElitmusVerification: (elitmusId: string) => void;
  updateDpdpConsent: (patch: Partial<DPDPConsent>, logDetail?: string) => void;
  addShieldedDomain: (domain: string) => void;
  removeShieldedDomain: (domain: string) => void;
  addShieldedCollege: (college: string) => void;
  removeShieldedCollege: (college: string) => void;
  finishOnboarding: () => void;
  setActiveTab: (tab: AppTab) => void;
  passMatch: (matchId: string) => void;
  unlockMatchWithPrompt: (
    match: MatchProfile,
    myA1: string,
    myA2: string
  ) => { ok: boolean; threadId?: string; reason?: "cap" };
  selectThread: (threadId: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  closeThreadPolitely: (threadId: string, closureNote: string) => void;
  togglePro: () => void;
  toggleMixerRsvp: (mixerId: string) => void;
  withdrawConsentAndErase: () => void;
  dismissErasedBanner: () => void;
  // Demo Controls
  triggerFreshDrop: () => void;
  fillChatsToCap: () => void;
  replayAuthAndOnboarding: () => void;
  resetAllDemoState: () => void;
}

const KoraContext = createContext<KoraContextValue | null>(null);

function nowStamp(): string {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function KoraProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<KoraState>(() => createInitialState());
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [focusCapOpen, setFocusCapOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as KoraState;
        if (parsed && typeof parsed === "object" && "view" in parsed) {
          setState(parsed);
        }
      }
    } catch {
      // Ignore corrupt localStorage
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state, hydrated]);

  const activeThreads = useMemo(
    () => state.threads.filter((t) => t.status === "active"),
    [state.threads]
  );

  const closedThreads = useMemo(
    () => state.threads.filter((t) => t.status === "closed"),
    [state.threads]
  );

  const isAtChatCap = activeThreads.length >= MAX_ACTIVE_CHATS;

  // Curated 3 matches respecting Workplace & Batchmate Shield + passed/unlocked
  const curatedDrop = useMemo(() => {
    const blockedDomains = state.shieldedDomains.map((d) =>
      d.toLowerCase().trim()
    );
    const blockedColleges = state.shieldedColleges.map((c) =>
      c.toLowerCase().trim()
    );

    const eligible = MATCH_POOL.filter((m) => {
      if (state.passedMatchIds.includes(m.id)) return false;
      if (state.unlockedMatchIds.includes(m.id)) return false;
      if (blockedDomains.includes(m.companyDomain.toLowerCase())) return false;
      if (
        blockedColleges.some((bc) => m.college.toLowerCase().includes(bc))
      ) {
        return false;
      }
      return true;
    });

    if (eligible.length === 0) return [];
    const offset = state.dropBatchOffset % eligible.length;
    const rotated = [...eligible.slice(offset), ...eligible.slice(0, offset)];
    return rotated.slice(0, 3);
  }, [
    state.passedMatchIds,
    state.unlockedMatchIds,
    state.shieldedDomains,
    state.shieldedColleges,
    state.dropBatchOffset,
  ]);

  const signInWithDemoAccount = useCallback(
    (account: DemoAccount, skipOnboarding = false) => {
      const ts = `Today, ${nowStamp()}`;
      setState((prev) => ({
        ...prev,
        account,
        erasedBanner: false,
        view: skipOnboarding ? "app" : "onboarding",
        onboardingStep: 1,
        verifiedElitmus: skipOnboarding ? true : false,
        verifiedAt: skipOnboarding ? ts : null,
        shieldedDomains: [account.companyDomain],
        consentLog: [
          {
            id: `log-signin-${Date.now()}`,
            timestamp: ts,
            action: "Google OAuth Sign-In",
            detail: `Authenticated as ${account.name} (${account.email}).`,
          },
          ...prev.consentLog,
        ],
      }));
      setGoogleModalOpen(false);
      showToast(
        skipOnboarding
          ? `Welcome back, ${account.name.split(" ")[0]}`
          : `Signed in as ${account.name}`
      );
    },
    [showToast]
  );

  const setOnboardingStep = useCallback((step: 1 | 2 | 3) => {
    setState((prev) => ({ ...prev, onboardingStep: step }));
  }, []);

  const completeElitmusVerification = useCallback(
    (elitmusId: string) => {
      const ts = `Today, ${nowStamp()}`;
      setState((prev) => ({
        ...prev,
        verifiedElitmus: true,
        verifiedAt: ts,
        account: prev.account
          ? { ...prev.account, elitmusId }
          : DEMO_ACCOUNTS[0],
        consentLog: [
          {
            id: `log-elitmus-${Date.now()}`,
            timestamp: ts,
            action: "eLitmus Alumni Verification",
            detail: `Verified Grad Year (${prev.account?.gradYear ?? 2021}) via ${elitmusId}. Zero pH score imported.`,
          },
          ...prev.consentLog,
        ],
      }));
      showToast("Alumni status verified via eLitmus");
    },
    [showToast]
  );

  const updateDpdpConsent = useCallback(
    (patch: Partial<DPDPConsent>, logDetail?: string) => {
      const ts = `Today, ${nowStamp()}`;
      setState((prev) => ({
        ...prev,
        dpdpConsent: {
          ...prev.dpdpConsent,
          ...patch,
          updatedAt: ts,
        },
        consentLog: [
          {
            id: `log-dpdp-${Date.now()}`,
            timestamp: ts,
            action: "DPDP Consent Updated",
            detail:
              logDetail ||
              `Updated preferences: ${Object.entries(patch)
                .map(([k, v]) => `${k}=${String(v)}`)
                .join(", ")}`,
          },
          ...prev.consentLog,
        ],
      }));
    },
    []
  );

  const addShieldedDomain = useCallback((raw: string) => {
    const cleaned = raw.trim().toLowerCase();
    if (!cleaned) return;
    const normalized = cleaned.startsWith("@") ? cleaned : `@${cleaned}`;
    setState((prev) => {
      if (prev.shieldedDomains.includes(normalized)) return prev;
      return {
        ...prev,
        shieldedDomains: [...prev.shieldedDomains, normalized],
      };
    });
  }, []);

  const removeShieldedDomain = useCallback((domain: string) => {
    setState((prev) => ({
      ...prev,
      shieldedDomains: prev.shieldedDomains.filter((d) => d !== domain),
    }));
  }, []);

  const addShieldedCollege = useCallback((raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;
    setState((prev) => {
      if (
        prev.shieldedColleges.some(
          (c) => c.toLowerCase() === cleaned.toLowerCase()
        )
      ) {
        return prev;
      }
      return {
        ...prev,
        shieldedColleges: [...prev.shieldedColleges, cleaned],
      };
    });
  }, []);

  const removeShieldedCollege = useCallback((college: string) => {
    setState((prev) => ({
      ...prev,
      shieldedColleges: prev.shieldedColleges.filter((c) => c !== college),
    }));
  }, []);

  const finishOnboarding = useCallback(() => {
    const ts = `Today, ${nowStamp()}`;
    setState((prev) => ({
      ...prev,
      view: "app",
      activeTab: "drop",
      consentLog: [
        {
          id: `log-onboard-${Date.now()}`,
          timestamp: ts,
          action: "Onboarding Completed",
          detail: `Shielded ${prev.shieldedDomains.length} workplace domain(s) and ${prev.shieldedColleges.length} college(s).`,
        },
        ...prev.consentLog,
      ],
    }));
    showToast("Your Thursday Drop is ready");
  }, [showToast]);

  const setActiveTab = useCallback((tab: AppTab) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const passMatch = useCallback(
    (matchId: string) => {
      setState((prev) => ({
        ...prev,
        passedMatchIds: [...prev.passedMatchIds, matchId],
      }));
      showToast("Profile passed quietly");
    },
    [showToast]
  );

  const unlockMatchWithPrompt = useCallback(
    (
      match: MatchProfile,
      myA1: string,
      myA2: string
    ): { ok: boolean; threadId?: string; reason?: "cap" } => {
      const currentActiveCount = state.threads.filter(
        (t) => t.status === "active"
      ).length;
      if (currentActiveCount >= MAX_ACTIVE_CHATS) {
        setFocusCapOpen(true);
        return { ok: false, reason: "cap" };
      }

      const ts = `Today · ${nowStamp()}`;
      const newThreadId = `thread-${match.id}-${Date.now()}`;
      const newThread: ChatThread = {
        id: newThreadId,
        matchId: match.id,
        matchName: match.name,
        matchRole: match.role,
        matchCity: match.city,
        matchGradYear: match.gradYear,
        matchPhotoUrl: match.photoUrl,
        status: "active",
        unlockedAt: ts,
        sharedPrompts: {
          q1: match.prompts.q1,
          myA1,
          theirA1: match.prompts.q1Answer,
          q2: match.prompts.q2,
          myA2,
          theirA2: match.prompts.q2Answer,
        },
        messages: [
          {
            id: `sys-${Date.now()}`,
            sender: "system",
            text: "Shared prompt completed · Photos unblurred for both of you.",
            timestamp: ts,
          },
          {
            id: `m-open-${Date.now() + 1}`,
            sender: "match",
            text: match.sampleReplies[0],
            timestamp: ts,
          },
        ],
      };

      setState((prev) => ({
        ...prev,
        unlockedMatchIds: [...prev.unlockedMatchIds, match.id],
        threads: [newThread, ...prev.threads],
        selectedThreadId: newThreadId,
      }));

      return { ok: true, threadId: newThreadId };
    },
    [state.threads]
  );

  const selectThread = useCallback((threadId: string | null) => {
    setState((prev) => ({ ...prev, selectedThreadId: threadId }));
  }, []);

  const sendMessage = useCallback((threadId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const ts = `Today · ${nowStamp()}`;
    const msgId = `msg-${Date.now()}`;

    setState((prev) => ({
      ...prev,
      threads: prev.threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { id: msgId, sender: "me", text: trimmed, timestamp: ts },
              ],
            }
          : t
      ),
    }));

    // Simulate a thoughtful reply after a brief pause
    setTimeout(() => {
      setState((prev) => {
        const target = prev.threads.find((t) => t.id === threadId);
        if (!target || target.status !== "active") return prev;
        const matchObj = MATCH_POOL.find((m) => m.id === target.matchId);
        const replyPool = matchObj?.sampleReplies ?? [
          "That makes a lot of sense—tell me more about that.",
        ];
        const matchMsgCount = target.messages.filter(
          (m) => m.sender === "match"
        ).length;
        const replyText =
          replyPool[matchMsgCount % replyPool.length] ||
          "Really appreciate you sharing that. Free for coffee this weekend?";

        return {
          ...prev,
          threads: prev.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [
                    ...t.messages,
                    {
                      id: `reply-${Date.now()}`,
                      sender: "match",
                      text: replyText,
                      timestamp: `Today · ${nowStamp()}`,
                    },
                  ],
                }
              : t
          ),
        };
      });
    }, 900);
  }, []);

  const closeThreadPolitely = useCallback(
    (threadId: string, closureNote: string) => {
      const ts = `Today · ${nowStamp()}`;
      setState((prev) => {
        const updatedThreads = prev.threads.map((t) =>
          t.id === threadId
            ? {
                ...t,
                status: "closed" as const,
                closedReason: closureNote,
                closedAt: ts,
                messages: [
                  ...t.messages,
                  {
                    id: `close-${Date.now()}`,
                    sender: "me" as const,
                    text: closureNote,
                    timestamp: ts,
                  },
                  {
                    id: `close-sys-${Date.now() + 1}`,
                    sender: "system" as const,
                    text: "Conversation closed respectfully · 1 active chat slot freed.",
                    timestamp: ts,
                  },
                ],
              }
            : t
        );
        const nextActive = updatedThreads.find((t) => t.status === "active");
        return {
          ...prev,
          threads: updatedThreads,
          selectedThreadId: nextActive ? nextActive.id : null,
        };
      });
      showToast("Closed politely · 1 active slot freed");
    },
    [showToast]
  );

  const togglePro = useCallback(() => {
    setState((prev) => {
      const next = !prev.isPro;
      showToast(next ? "Kora Pro activated (Demo)" : "Switched to Kora Free");
      return { ...prev, isPro: next };
    });
  }, [showToast]);

  const toggleMixerRsvp = useCallback(
    (mixerId: string) => {
      setState((prev) => {
        const exists = prev.rsvpedMixerIds.includes(mixerId);
        showToast(
          exists ? "Mixer RSVP cancelled" : "Seat reserved for Verified Mixer"
        );
        return {
          ...prev,
          rsvpedMixerIds: exists
            ? prev.rsvpedMixerIds.filter((id) => id !== mixerId)
            : [...prev.rsvpedMixerIds, mixerId],
        };
      });
    },
    [showToast]
  );

  const withdrawConsentAndErase = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    const fresh = createInitialState();
    fresh.erasedBanner = true;
    setState(fresh);
    showToast("Consent withdrawn & local account data erased");
  }, [showToast]);

  const dismissErasedBanner = useCallback(() => {
    setState((prev) => ({ ...prev, erasedBanner: false }));
  }, []);

  // Evaluator Demo Controls
  const triggerFreshDrop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: prev.account ? "app" : "app",
      account: prev.account ?? DEMO_ACCOUNTS[0],
      verifiedElitmus: true,
      activeTab: "drop",
      passedMatchIds: [],
      dropBatchOffset: prev.dropBatchOffset + 3,
    }));
    showToast("Fresh Thursday Drop delivered (3 curated matches)");
  }, [showToast]);

  const fillChatsToCap = useCallback(() => {
    setState((prev) => {
      const existingActive = prev.threads.filter((t) => t.status === "active");
      if (existingActive.length >= MAX_ACTIVE_CHATS) {
        return {
          ...prev,
          view: "app",
          account: prev.account ?? DEMO_ACCOUNTS[0],
          verifiedElitmus: true,
        };
      }
      const needed = MAX_ACTIVE_CHATS - existingActive.length;
      const existingIds = new Set(prev.threads.map((t) => t.matchId));
      const candidates = MATCH_POOL.filter((m) => !existingIds.has(m.id)).slice(
        0,
        needed
      );
      const ts = `Today · ${nowStamp()}`;
      const extraThreads: ChatThread[] = candidates.map((m) => ({
        id: `thread-demo-${m.id}-${Date.now()}`,
        matchId: m.id,
        matchName: m.name,
        matchRole: m.role,
        matchCity: m.city,
        matchGradYear: m.gradYear,
        matchPhotoUrl: m.photoUrl,
        status: "active",
        unlockedAt: ts,
        sharedPrompts: {
          q1: m.prompts.q1,
          myA1: "Staying in India—family and quality of life win out.",
          theirA1: m.prompts.q1Answer,
          q2: m.prompts.q2,
          myA2: "Slow Sunday mornings with good coffee.",
          theirA2: m.prompts.q2Answer,
        },
        messages: [
          {
            id: `sys-cap-${m.id}`,
            sender: "system",
            text: "Shared prompt completed · Photos unblurred for both of you.",
            timestamp: ts,
          },
          {
            id: `msg-cap-${m.id}`,
            sender: "match",
            text: m.sampleReplies[0],
            timestamp: ts,
          },
        ],
      }));

      const nextThreads = [...extraThreads, ...prev.threads];
      return {
        ...prev,
        view: "app",
        account: prev.account ?? DEMO_ACCOUNTS[0],
        verifiedElitmus: true,
        unlockedMatchIds: [
          ...prev.unlockedMatchIds,
          ...candidates.map((c) => c.id),
        ],
        threads: nextThreads,
        selectedThreadId: nextThreads[0]?.id ?? prev.selectedThreadId,
      };
    });
    showToast("Active Chats filled to 3 / 3 — try connecting to test cap");
  }, [showToast]);

  const replayAuthAndOnboarding = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: "landing",
      onboardingStep: 1,
      verifiedElitmus: false,
      erasedBanner: false,
    }));
    setGoogleModalOpen(true);
  }, []);

  const resetAllDemoState = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    const fresh = createInitialState();
    fresh.threads = createInitialThreads();
    setState(fresh);
    showToast("Demo state reset to fresh start");
  }, [showToast]);

  const value: KoraContextValue = {
    state,
    hydrated,
    activeThreads,
    closedThreads,
    curatedDrop,
    isAtChatCap,
    toast,
    showToast,
    focusCapOpen,
    setFocusCapOpen,
    mobileSheetOpen,
    setMobileSheetOpen,
    googleModalOpen,
    setGoogleModalOpen,
    signInWithDemoAccount,
    setOnboardingStep,
    completeElitmusVerification,
    updateDpdpConsent,
    addShieldedDomain,
    removeShieldedDomain,
    addShieldedCollege,
    removeShieldedCollege,
    finishOnboarding,
    setActiveTab,
    passMatch,
    unlockMatchWithPrompt,
    selectThread,
    sendMessage,
    closeThreadPolitely,
    togglePro,
    toggleMixerRsvp,
    withdrawConsentAndErase,
    dismissErasedBanner,
    triggerFreshDrop,
    fillChatsToCap,
    replayAuthAndOnboarding,
    resetAllDemoState,
  };

  return <KoraContext.Provider value={value}>{children}</KoraContext.Provider>;
}

export function useKora() {
  const ctx = useContext(KoraContext);
  if (!ctx) throw new Error("useKora must be used inside KoraProvider");
  return ctx;
}
