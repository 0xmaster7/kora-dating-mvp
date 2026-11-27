"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  Check,
  FileClock,
  GraduationCap,
  Mail,
  Plus,
  Shield,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";

export function PrivacySettingsView() {
  const {
    state,
    updateDpdpConsent,
    addShieldedDomain,
    removeShieldedDomain,
    addShieldedCollege,
    removeShieldedCollege,
    withdrawConsentAndErase,
  } = useKora();

  const [domainInput, setDomainInput] = useState("");
  const [collegeInput, setCollegeInput] = useState("");
  const [confirmEraseOpen, setConfirmEraseOpen] = useState(false);

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
    <div className="space-y-8">
      {/* Header */}
      <header className="pb-6 hairline-b space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1E8E72]">
          DPDP Act, 2023 · User Rights &amp; Discretion
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-[44px] leading-tight text-[#261428]">
          Privacy &amp; Consent
        </h1>
        <p className="text-sm text-[#6E586B] leading-relaxed">
          Manage your workplace shields, inspect every consent event, or
          permanently erase your Kora account in one step.
        </p>
      </header>

      {/* Workplace & Batchmate Shield */}
      <section className="bg-white rounded-3xl hairline editorial-shadow p-6 space-y-5">
        <div>
          <h2 className="font-display font-bold text-2xl text-[#261428]">
            Workplace &amp; Batchmate Shield
          </h2>
          <p className="text-xs text-[#6E586B] mt-1">
            Blocked domains and colleges are immediately filtered out of your
            Thursday Drops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domains */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#261428]">
              <Building2 className="h-3.5 w-3.5 text-[#E84A5F]" />
              <span>Blocked Company Domains</span>
            </div>
            <form onSubmit={handleAddDomain} className="flex gap-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="@stripe.com"
                className="flex-1 px-3 py-2 rounded-xl bg-[#FFF7F2] hairline text-xs text-[#261428] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#261428] text-white text-xs font-medium cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5">
              {state.shieldedDomains.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#261428] text-[#FFF7F2] text-[11px]"
                >
                  <Shield className="h-3 w-3 text-[#E84A5F]" />
                  {d}
                  <button
                    onClick={() => removeShieldedDomain(d)}
                    className="hover:text-[#E84A5F] cursor-pointer"
                    aria-label={`Remove ${d}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Colleges */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#261428]">
              <GraduationCap className="h-3.5 w-3.5 text-[#1E8E72]" />
              <span>Blocked Colleges</span>
            </div>
            <form onSubmit={handleAddCollege} className="flex gap-2">
              <input
                type="text"
                value={collegeInput}
                onChange={(e) => setCollegeInput(e.target.value)}
                placeholder="e.g. COEP Pune"
                className="flex-1 px-3 py-2 rounded-xl bg-[#FFF7F2] hairline text-xs text-[#261428] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#261428] text-white text-xs font-medium cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5">
              {state.shieldedColleges.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E8E72] text-[#FFF7F2] text-[11px]"
                >
                  {c}
                  <button
                    onClick={() => removeShieldedCollege(c)}
                    className="hover:opacity-75 cursor-pointer"
                    aria-label={`Remove ${c}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {state.shieldedColleges.length === 0 && (
                <span className="text-[11px] text-[#9D889A]">
                  No colleges blocked
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DPDP Consent Toggles */}
      <section className="bg-white rounded-3xl hairline editorial-shadow divide-y divide-[#261428]/[0.08]">
        <div className="p-6">
          <h2 className="font-display font-bold text-2xl text-[#261428]">
            Active DPDP Consents
          </h2>
          <p className="text-xs text-[#6E586B] mt-1">
            Last updated: {state.dpdpConsent.updatedAt}
          </p>
        </div>

        <div className="p-5 sm:px-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#261428]">
              Curated Matching Profile
            </p>
            <p className="text-xs text-[#6E586B]">
              Include my profile in Thursday Drops for verified 2020–2023 grads.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state.dpdpConsent.matchingProfile}
            onClick={() =>
              updateDpdpConsent(
                { matchingProfile: !state.dpdpConsent.matchingProfile },
                `Matching Profile toggled ${!state.dpdpConsent.matchingProfile ? "ON" : "OFF"}`
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

        <div className="p-5 sm:px-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#261428]">
              Verified Alumni Badge
            </p>
            <p className="text-xs text-[#6E586B]">
              Display graduation year badge (pH score is never imported or
              stored).
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state.dpdpConsent.verifiedAlumniBadge}
            onClick={() =>
              updateDpdpConsent(
                { verifiedAlumniBadge: !state.dpdpConsent.verifiedAlumniBadge },
                `Verified Alumni Badge toggled ${!state.dpdpConsent.verifiedAlumniBadge ? "ON" : "OFF"}`
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

        <div className="p-5 sm:px-6 bg-[#1E8E72]/[0.04] flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#261428]">
              No Ads · Zero Job-Portal Data Crossover
            </p>
            <p className="text-xs text-[#6E586B]">
              Hard-enforced isolation from eLitmus recruiters and ad networks.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E8E72]">
            <Check className="h-4 w-4" /> Enforced
          </span>
        </div>
      </section>

      {/* Consent Log Viewer */}
      <section className="bg-white rounded-3xl hairline editorial-shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileClock className="h-4 w-4 text-[#6E586B]" />
            <h2 className="font-display font-bold text-2xl text-[#261428]">
              Consent Audit Log
            </h2>
          </div>
          <span className="text-[11px] text-[#9D889A]">
            {state.consentLog.length} recorded events
          </span>
        </div>

        <div className="divide-y divide-[#261428]/[0.06] max-h-60 overflow-y-auto pr-1">
          {state.consentLog.map((entry) => (
            <div
              key={entry.id}
              className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
            >
              <div>
                <span className="font-semibold text-[#261428]">
                  {entry.action}
                </span>
                <p className="text-[#6E586B] mt-0.5">{entry.detail}</p>
              </div>
              <span className="text-[11px] font-mono text-[#9D889A] shrink-0">
                {entry.timestamp}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Grievance Officer & Danger Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grievance Officer */}
        <section className="bg-white rounded-2xl hairline p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E8E72]">
            <ShieldCheck className="h-4 w-4" />
            <span>Data Protection &amp; Grievance Officer</span>
          </div>
          <div className="text-xs text-[#6E586B] space-y-1.5 leading-relaxed">
            <p className="font-semibold text-sm text-[#261428]">
              Anirudh Deshpande (DPO)
            </p>
            <p>Kora Social Technologies Pvt. Ltd. · Indiranagar, Bengaluru 560038</p>
            <p className="flex items-center gap-1.5 text-[#261428]">
              <Mail className="h-3.5 w-3.5 text-[#6E586B]" />
              <span>grievance@kora.in</span>
            </p>
            <p className="text-[11px] text-[#9D889A] pt-1">
              Statutory response SLA: within 48 hours under Section 13 of the
              DPDP Act, 2023.
            </p>
          </div>
        </section>

        {/* Withdraw Consent & Erase */}
        <section className="bg-white rounded-2xl border border-[#E84A5F]/25 p-6 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E84A5F]">
              <AlertTriangle className="h-4 w-4" />
              <span>Right to Erasure</span>
            </div>
            <p className="text-xs text-[#6E586B] leading-relaxed">
              Withdraw all DPDP consents and permanently wipe your profile,
              chats, and local state. No dark patterns or 30-day holdbacks.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmEraseOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#E84A5F]/10 hover:bg-[#E84A5F] text-[#E84A5F] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Withdraw Consent &amp; Permanently Erase Account</span>
          </button>
        </section>
      </div>

      {/* Erasure Confirmation Modal */}
      <AnimatePresence>
        {confirmEraseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmEraseOpen(false)}
              className="absolute inset-0 bg-[#261428]/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-3xl hairline editorial-shadow p-6 space-y-4"
            >
              <h3 className="font-display font-bold text-2xl text-[#261428]">
                Permanently erase your account?
              </h3>
              <p className="text-xs text-[#6E586B] leading-relaxed">
                This withdraws your DPDP consent immediately, clears all saved
                conversations and preferences from this device, and returns you
                to the welcome screen.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 hairline-t">
                <button
                  onClick={() => setConfirmEraseOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#6E586B] hover:text-[#261428] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConfirmEraseOpen(false);
                    withdrawConsentAndErase();
                  }}
                  className="px-5 py-2 rounded-full bg-[#E84A5F] hover:bg-[#D2374C] text-white text-xs font-semibold cursor-pointer"
                >
                  Erase Everything Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
