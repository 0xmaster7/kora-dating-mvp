"use client";

import React from "react";
import {
  Calendar,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { CITY_MIXERS } from "@/data/seed";

export function ProView() {
  const { state, togglePro, toggleMixerRsvp } = useKora();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="pb-6 hairline-b space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#E84A5F]">
          Membership &amp; Offline Gatherings
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-[44px] leading-tight text-[#261428]">
          Kora Pro &amp; City Mixers
        </h1>
        <p className="text-sm text-[#6E586B] max-w-xl leading-relaxed">
          Kora never sells pay-to-win boosts or super-likes. Membership funds
          better curation, deeper compatibility filters, and intimate offline
          suppers.
        </p>
      </header>

      {/* Free vs Pro Comparison */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Tier */}
        <div className="bg-white rounded-2xl hairline p-6 sm:p-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display font-bold text-3xl text-[#261428]">Kora Free</h2>
              <span className="text-sm font-medium text-[#6E586B]">₹0 / mo</span>
            </div>
            <p className="text-xs text-[#6E586B] leading-relaxed">
              Everything required for thoughtful, unhurried dating—always
              ad-free.
            </p>
            <ul className="space-y-2.5 pt-2 text-xs text-[#261428]">
              {[
                "3 curated Thursday Drop matches every week",
                "Verified profile checkmark",
                "Workplace & batchmate shield (up to 3 domains)",
                "Progressive photo reveal & Max-3 active chat cap",
                "Full DPDP consent controls & instant erasure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#1E8E72] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 hairline-t">
            <span className="inline-block text-xs font-medium text-[#6E586B]">
              {state.isPro ? "Included in your plan" : "Your current plan"}
            </span>
          </div>
        </div>

        {/* Pro Tier */}
        <div className="bg-[#331832] text-[#FFF7F2] rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 editorial-shadow">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-3xl text-[#FFF7F2]">Kora Pro</h2>
                {state.isPro && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E8E72] text-white">
                    Active
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-[#FFF7F2]">
                  ₹599
                </span>
                <span className="text-xs text-[#9D889A]"> / mo</span>
              </div>
            </div>
            <p className="text-xs text-[#FFF7F2]/70 leading-relaxed">
              For alumni who want relocation filters, unlimited workplace
              shielding, and priority seats at City Mixers.
            </p>
            <ul className="space-y-2.5 pt-2 text-xs text-[#FFF7F2]/90">
              {[
                "Everything in Kora Free",
                "Relocation & long-term city preference filters",
                "Unlimited company domains & college shield rules",
                "Detailed 3-axis compatibility notes before connecting",
                "Priority access & ₹300 off Verified City Mixers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#E84A5F] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={togglePro}
              className={`w-full py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                state.isPro
                  ? "bg-white/10 hover:bg-white/15 text-[#FFF7F2]"
                  : "bg-[#E84A5F] hover:bg-[#D2374C] text-white"
              }`}
            >
              {state.isPro
                ? "Switch back to Free (Demo)"
                : "Activate Kora Pro — ₹599/mo"}
            </button>
          </div>
        </div>
      </section>

      {/* Verified City Mixers */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-3xl text-[#261428]">
              Verified City Mixers
            </h2>
            <p className="text-xs text-[#6E586B] mt-1">
              Curated 8-person dinners &amp; coffee tables hosted in quiet
              neighbourhoods. Strictly verified members, zero awkward
              name-tag speed dating.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1E8E72] shrink-0">
            <ShieldCheck className="h-3.5 w-3.5" />
            Balanced 4:4 seating
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CITY_MIXERS.map((mixer) => {
            const rsvped = state.rsvpedMixerIds.includes(mixer.id);
            const effectivePrice = state.isPro
              ? Math.max(0, mixer.priceInr - 300)
              : mixer.priceInr;
            return (
              <div
                key={mixer.id}
                className="bg-white rounded-3xl hairline editorial-shadow p-5 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[#E84A5F]">
                      {mixer.city}
                    </span>
                    <span className="text-[#6E586B]">
                      {rsvped
                        ? `${mixer.seatsRemaining - 1} left`
                        : `${mixer.seatsRemaining} of ${mixer.seatsTotal} seats left`}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-2xl text-[#261428] leading-snug">
                      {mixer.title}
                    </h3>
                    <div className="mt-2 space-y-1 text-xs text-[#6E586B]">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#9D889A]" />
                        {mixer.neighborhood}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#9D889A]" />
                        {mixer.dateLabel}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-[#9D889A]" />
                        {mixer.cohorts}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 hairline-t flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-semibold text-[#261428]">
                      ₹{effectivePrice}
                    </span>
                    {state.isPro && (
                      <span className="ml-1.5 text-[11px] line-through text-[#9D889A]">
                        ₹{mixer.priceInr}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleMixerRsvp(mixer.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      rsvped
                        ? "bg-[#1E8E72] text-white hover:bg-[#17735C]"
                        : "bg-[#FFF7F2] hover:bg-[#261428] text-[#261428] hover:text-white hairline"
                    }`}
                  >
                    {rsvped ? "Seat Reserved ✓" : "Request Seat"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
