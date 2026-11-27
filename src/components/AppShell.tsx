"use client";

import React from "react";
import {
  MessageCircle,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
} from "lucide-react";
import { useKora } from "@/context/KoraContext";
import { AppTab } from "@/types/kora";
import { DropFeed } from "@/components/DropFeed";
import { ActiveChatsView } from "@/components/ActiveChatsView";
import { ProView } from "@/components/ProView";
import { PrivacySettingsView } from "@/components/PrivacySettingsView";

const NAV_ITEMS: { id: AppTab; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "drop", label: "Thursday Drop", shortLabel: "Drop", icon: Sun },
  { id: "chats", label: "Active Chats", shortLabel: "Chats", icon: MessageCircle },
  { id: "pro", label: "Kora Pro & Mixers", shortLabel: "Pro", icon: Sparkles },
  { id: "privacy", label: "Privacy & DPDP", shortLabel: "Privacy", icon: Shield },
];

export function AppShell() {
  const {
    state,
    activeThreads,
    setActiveTab,
    setMobileSheetOpen,
    replayAuthAndOnboarding,
  } = useKora();

  const account = state.account;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161615] flex flex-col lg:flex-row">
      {/* Desktop Left Rail */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#FAF8F5] hairline-r px-5 py-6 justify-between z-20">
        <div className="space-y-8">
          {/* Brand */}
          <div className="px-2">
            <span className="font-serif text-[30px] leading-none tracking-tight text-[#161615]">
              Kora<span className="text-[#B8502D]">.</span>
            </span>
            <p className="text-[11px] text-[#6B6863] mt-1">
              Verified Alumni · 2020–2023
            </p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = state.activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-white text-[#161615] font-semibold hairline shadow-[0_1px_2px_rgba(22,22,21,0.04)]"
                      : "text-[#6B6863] hover:text-[#161615] hover:bg-white/60"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 ${
                        active ? "text-[#B8502D]" : "text-[#9A9690]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>
                  {item.id === "chats" && (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        activeThreads.length >= 3
                          ? "bg-[#B8502D]/10 text-[#B8502D]"
                          : "bg-[#F3EFE9] text-[#6B6863]"
                      }`}
                    >
                      {activeThreads.length}/3
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Rail: Mobile App + User */}
        <div className="space-y-3">
          <button
            onClick={() => setMobileSheetOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hairline bg-white/80 hover:bg-white text-xs font-medium text-[#161615] transition-colors cursor-pointer"
          >
            <Smartphone className="h-4 w-4 text-[#2F5E4E]" />
            <span>Get Mobile App / APK</span>
          </button>

          {account && (
            <button
              onClick={replayAuthAndOnboarding}
              title="Switch Demo Account"
              className="w-full text-left p-2.5 rounded-xl hover:bg-white/70 transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src={account.avatarUrl}
                alt={account.name}
                className="h-9 w-9 rounded-full object-cover hairline shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#161615] truncate">
                  {account.name}
                </p>
                <p className="text-[11px] text-[#2F5E4E] flex items-center gap-1 truncate">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  <span>Verified ’{String(account.gradYear).slice(-2)}</span>
                </p>
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-sm hairline-b px-4 h-14 flex items-center justify-between">
        <span className="font-serif text-2xl leading-none">
          Kora<span className="text-[#B8502D]">.</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSheetOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full hairline bg-white text-[11px] font-medium text-[#161615]"
          >
            <Smartphone className="h-3.5 w-3.5 text-[#2F5E4E]" />
            <span>App</span>
          </button>
          {account && (
            <img
              src={account.avatarUrl}
              alt={account.name}
              onClick={replayAuthAndOnboarding}
              className="h-8 w-8 rounded-full object-cover hairline cursor-pointer"
            />
          )}
        </div>
      </header>

      {/* Centered Editorial Main Canvas */}
      <main className="flex-1 lg:pl-64 pb-28 lg:pb-24">
        <div
          className={`mx-auto px-4 sm:px-8 py-7 sm:py-10 ${
            state.activeTab === "chats" ? "max-w-5xl" : "max-w-[780px]"
          }`}
        >
          {state.activeTab === "drop" && <DropFeed />}
          {state.activeTab === "chats" && <ActiveChatsView />}
          {state.activeTab === "pro" && <ProView />}
          {state.activeTab === "privacy" && <PrivacySettingsView />}
        </div>
      </main>

      {/* Mobile Native-Feeling Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md hairline-t safe-pb">
        <div className="grid grid-cols-4 h-14">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = state.activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 text-[11px] transition-colors ${
                  active ? "text-[#B8502D] font-semibold" : "text-[#6B6863]"
                }`}
              >
                <div className="relative">
                  <Icon className="h-4.5 w-4.5" />
                  {item.id === "chats" && (
                    <span className="absolute -top-1.5 -right-3 text-[9px] font-semibold px-1 rounded-full bg-[#161615] text-white">
                      {activeThreads.length}/3
                    </span>
                  )}
                </div>
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
