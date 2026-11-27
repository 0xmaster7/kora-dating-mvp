"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Lock,
  Plus,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";

const SUGGESTED_DOMAINS = [
  "@flipkart.com",
  "@amazon.com",
  "@google.com",
  "@atlassian.com",
  "@razorpay.com",
  "@stripe.com",
];

const SUGGESTED_COLLEGES = [
  "NIT Surathkal",
  "IIIT Hyderabad",
  "BITS Pilani",
  "COEP Pune",
  "IIT Kharagpur",
];

export function OnboardingFlow() {
  const {
    state,
    setOnboardingStep,
    completeElitmusVerification,
    updateDpdpConsent,
    addShieldedDomain,
    removeShieldedDomain,
    addShieldedCollege,
    removeShieldedCollege,
    finishOnboarding,
  } = useKora();

  const [elitmusInput, setElitmusInput] = useState(
    state.account?.elitmusId || "EL-2021-88412"
  );
  const [verifying, setVerifying] = useState(false);
  const [domainInput, setDomainInput] = useState("");
  const [collegeInput, setCollegeInput] = useState("");

  const step = state.onboardingStep;

  const handleVerifyElitmus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elitmusInput.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      completeElitmusVerification(elitmusInput.trim().toUpperCase());
      setVerifying(false);
    }, 650);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    addShieldedDomain(domainInput);
    setDomainInput("");
  };

  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeInput.trim()) return;
    addShieldedCollege(collegeInput);
    setCollegeInput("");
  };

  return (
    <div className="min-h-screen bg-[#FFF7F2] text-[#261428] flex flex-col">
      {/* Top Bar */}
      <header className="hairline-b bg-[#FFF7F2]/95 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-2xl tracking-tight">
            Kora<span className="text-[#E84A5F]">.</span>
          </span>
          <div className="flex items-center gap-3 text-xs text-[#6E586B]">
            <span>Step {step} of 3</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step
                      ? "w-6 bg-[#E84A5F]"
                      : s < step
                      ? "w-3 bg-[#1E8E72]"
                      : "w-3 bg-[#261428]/12"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 pt-10 sm:pt-14 pb-28">
        <AnimatePresence mode="wait">
          {/* STEP 1: Verify Alumni Status */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1E8E72]">
                  Step 01 · Verified Alumni Trust Layer
                </span>
                <h1 className="font-display font-bold text-4xl sm:text-[42px] leading-tight text-[#261428]">
                  Verify your alumni status via eLitmus
                </h1>
                <p className="text-sm text-[#6E586B] leading-relaxed">
                  Kora uses eLitmus strictly as a lightweight graduation-year
                  check for 2020–2023 cohorts. We never import or store your pH
                  score, percentile, or job applications.
                </p>
              </div>

              <div className="bg-white rounded-3xl hairline editorial-shadow p-6 sm:p-7 space-y-6">
                <form onSubmit={handleVerifyElitmus} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="elitmus-id"
                      className="text-xs font-medium text-[#261428]"
                    >
                      eLitmus Candidate ID
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        id="elitmus-id"
                        type="text"
                        value={elitmusInput}
                        onChange={(e) => setElitmusInput(e.target.value)}
                        placeholder="e.g. EL-2021-88412"
                        className="flex-1 px-4 py-3 rounded-xl bg-[#FFF7F2] hairline text-sm font-mono tracking-wide text-[#261428] focus:outline-none focus:border-[#261428]/30"
                      />
                      <button
                        type="submit"
                        disabled={verifying}
                        className="px-5 py-3 rounded-xl bg-[#261428] hover:bg-[#3D2240] disabled:opacity-60 text-[#FFF7F2] text-sm font-medium transition-colors cursor-pointer shrink-0"
                      >
                        {verifying ? "Checking..." : "Lookup Alumni Status"}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Explicit privacy boundary */}
                <div className="rounded-xl bg-[#FFF7F2] hairline p-4 flex items-start gap-3">
                  <Lock className="h-4 w-4 text-[#1E8E72] mt-0.5 shrink-0" />
                  <div className="text-xs text-[#6E586B] leading-relaxed">
                    <span className="font-semibold text-[#261428]">
                      Strict data minimization:
                    </span>{" "}
                    Only two fields are read from eLitmus —{" "}
                    <span className="text-[#261428]">Grad Year (2020–2023)</span>{" "}
                    and{" "}
                    <span className="text-[#261428]">Verified Graduate status</span>
                    . Your pH score is explicitly excluded at the API boundary.
                  </div>
                </div>

                {/* Verification Result Card */}
                {state.verifiedElitmus && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-[#1E8E72]/[0.07] border border-[#1E8E72]/20 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1E8E72]">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Verified Graduate Badge Issued</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#1E8E72]">
                        {elitmusInput}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1E8E72]/15 text-xs">
                      <div>
                        <span className="text-[#6E586B] block">
                          Graduation Cohort
                        </span>
                        <span className="font-semibold text-[#261428]">
                          Class of {state.account?.gradYear ?? 2021}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6E586B] block">
                          pH Score Imported
                        </span>
                        <span className="font-semibold text-[#1E8E72]">
                          None (Blocked by Design)
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    if (!state.verifiedElitmus) {
                      completeElitmusVerification(
                        elitmusInput.trim().toUpperCase() || "EL-2021-88412"
                      );
                    }
                    setOnboardingStep(2);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Continue to DPDP Consent</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Standalone DPDP Act Consent */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#E84A5F]">
                  Step 02 · India DPDP Act, 2023
                </span>
                <h1 className="font-display font-bold text-4xl sm:text-[42px] leading-tight text-[#261428]">
                  Clear, itemized data consent
                </h1>
                <p className="text-sm text-[#6E586B] leading-relaxed">
                  Under India’s Digital Personal Data Protection Act, you
                  control every purpose your data is used for—and can withdraw
                  consent or erase everything in one click at any time.
                </p>
              </div>

              <div className="bg-white rounded-3xl hairline editorial-shadow divide-y divide-[#261428]/[0.08]">
                {/* Toggle 1 */}
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#261428]">
                      Curated Matching Profile
                    </h3>
                    <p className="text-xs text-[#6E586B] leading-relaxed">
                      Use your city, relocation openness, and prompt answers to
                      assemble your 3 weekly Thursday Drop matches.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={state.dpdpConsent.matchingProfile}
                    onClick={() =>
                      updateDpdpConsent(
                        { matchingProfile: !state.dpdpConsent.matchingProfile },
                        `Matching Profile consent set to ${!state.dpdpConsent.matchingProfile}`
                      )
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      state.dpdpConsent.matchingProfile
                        ? "bg-[#1E8E72]"
                        : "bg-[#261428]/15"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.dpdpConsent.matchingProfile
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#261428]">
                      Display Verified Graduate Badge
                    </h3>
                    <p className="text-xs text-[#6E586B] leading-relaxed">
                      Show “Verified ’{String(state.account?.gradYear ?? 2021).slice(-2)} Grad” on your card. Your eLitmus ID and test history are never visible.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={state.dpdpConsent.verifiedAlumniBadge}
                    onClick={() =>
                      updateDpdpConsent(
                        {
                          verifiedAlumniBadge:
                            !state.dpdpConsent.verifiedAlumniBadge,
                        },
                        `Verified Alumni Badge visibility set to ${!state.dpdpConsent.verifiedAlumniBadge}`
                      )
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      state.dpdpConsent.verifiedAlumniBadge
                        ? "bg-[#1E8E72]"
                        : "bg-[#261428]/15"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.dpdpConsent.verifiedAlumniBadge
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Guarantee 3 */}
                <div className="p-5 sm:p-6 bg-[#1E8E72]/[0.04] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#261428]">
                        No Ads &amp; Zero Job-Portal Data Crossover
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E8E72]/15 text-[#1E8E72]">
                        Guaranteed
                      </span>
                    </div>
                    <p className="text-xs text-[#6E586B] leading-relaxed">
                      Your Kora dating profile, chats, and preferences are
                      legally and technically isolated from eLitmus recruiters,
                      employers, and third-party ad networks.
                    </p>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#1E8E72] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setOnboardingStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm text-[#6E586B] hover:text-[#261428] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => {
                    updateDpdpConsent(
                      { ...state.dpdpConsent },
                      "Confirmed itemized DPDP Act consent during onboarding"
                    );
                    setOnboardingStep(3);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Accept &amp; Configure Shield</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Workplace & Batchmate Shield */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#261428]">
                  Step 03 · Discretion First
                </span>
                <h1 className="font-display font-bold text-4xl sm:text-[42px] leading-tight text-[#261428]">
                  Workplace &amp; batchmate shield
                </h1>
                <p className="text-sm text-[#6E586B] leading-relaxed">
                  Hide your profile from colleagues at specific company domains
                  or classmates from your college. Mutual invisibility—neither
                  side sees the other in Thursday Drops.
                </p>
              </div>

              <div className="bg-white rounded-3xl hairline editorial-shadow p-6 sm:p-7 space-y-6">
                {/* Company Domain Shield */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#261428]">
                    <Building2 className="h-4 w-4 text-[#E84A5F]" />
                    <span>Block Company Email Domains</span>
                  </div>

                  <form onSubmit={handleAddDomain} className="flex gap-2">
                    <input
                      type="text"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="e.g. @flipkart.com or @amazon.com"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFF7F2] hairline text-sm text-[#261428] focus:outline-none focus:border-[#261428]/30"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#261428] text-white text-xs font-medium hover:bg-[#3D2240] transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </form>

                  {/* Active Domain Chips */}
                  <div className="flex flex-wrap gap-2">
                    {state.shieldedDomains.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#261428] text-[#FFF7F2] text-xs font-medium"
                      >
                        <Shield className="h-3 w-3 text-[#E84A5F]" />
                        <span>{d}</span>
                        <button
                          type="button"
                          onClick={() => removeShieldedDomain(d)}
                          className="hover:text-[#E84A5F] transition-colors cursor-pointer"
                          aria-label={`Remove ${d}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {state.shieldedDomains.length === 0 && (
                      <span className="text-xs text-[#9D889A]">
                        No company domains blocked yet.
                      </span>
                    )}
                  </div>

                  {/* Quick Suggestions */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-[#9D889A] mr-1">
                      Quick add:
                    </span>
                    {SUGGESTED_DOMAINS.filter(
                      (d) => !state.shieldedDomains.includes(d)
                    )
                      .slice(0, 4)
                      .map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => addShieldedDomain(d)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-[#FFF7F2] hover:bg-[#FFEFE6] hairline text-[#6E586B] hover:text-[#261428] transition-colors cursor-pointer"
                        >
                          + {d}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="hairline-t" />

                {/* College Shield */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#261428]">
                    <GraduationCap className="h-4 w-4 text-[#1E8E72]" />
                    <span>Block College / Batchmates (Optional)</span>
                  </div>

                  <form onSubmit={handleAddCollege} className="flex gap-2">
                    <input
                      type="text"
                      value={collegeInput}
                      onChange={(e) => setCollegeInput(e.target.value)}
                      placeholder="e.g. NIT Surathkal, BITS Pilani"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFF7F2] hairline text-sm text-[#261428] focus:outline-none focus:border-[#261428]/30"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#261428] text-white text-xs font-medium hover:bg-[#3D2240] transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-2">
                    {state.shieldedColleges.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E8E72] text-[#FFF7F2] text-xs font-medium"
                      >
                        <span>{c}</span>
                        <button
                          type="button"
                          onClick={() => removeShieldedCollege(c)}
                          className="hover:opacity-75 cursor-pointer"
                          aria-label={`Remove ${c}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-[#9D889A] mr-1">
                      Quick add:
                    </span>
                    {SUGGESTED_COLLEGES.filter(
                      (c) => !state.shieldedColleges.includes(c)
                    )
                      .slice(0, 3)
                      .map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => addShieldedCollege(c)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-[#FFF7F2] hover:bg-[#FFEFE6] hairline text-[#6E586B] hover:text-[#261428] transition-colors cursor-pointer"
                        >
                          + {c}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setOnboardingStep(2)}
                  className="inline-flex items-center gap-1.5 text-sm text-[#6E586B] hover:text-[#261428] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={finishOnboarding}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-sm font-medium transition-colors editorial-shadow cursor-pointer"
                >
                  <span>Enter Thursday Drop</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
