"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KoraProvider, useKora } from "@/context/KoraContext";
import { LandingScreen } from "@/components/LandingScreen";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { AppShell } from "@/components/AppShell";
import { GoogleAccountModal } from "@/components/GoogleAccountModal";
import { FocusCapModal } from "@/components/FocusCapModal";
import { MobileAppSheet } from "@/components/MobileAppSheet";
import { DemoControls } from "@/components/DemoControls";

function KoraRouter() {
  const { state, hydrated, toast } = useKora();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#FFF7F2] flex items-center justify-center">
        <span className="font-display font-bold text-3xl text-[#261428]">
          Kora<span className="text-[#E84A5F]">.</span>
        </span>
      </div>
    );
  }

  return (
    <>
      {state.view === "landing" && <LandingScreen />}
      {state.view === "onboarding" && <OnboardingFlow />}
      {state.view === "app" && <AppShell />}

      {/* Global Modals & Sheets */}
      <GoogleAccountModal />
      <FocusCapModal />
      <MobileAppSheet />

      {/* Subtle Evaluator Demo Controls */}
      <DemoControls />

      {/* Calm Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#261428] text-[#FFF7F2] text-xs font-medium editorial-shadow whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomePage() {
  return (
    <KoraProvider>
      <KoraRouter />
    </KoraProvider>
  );
}
