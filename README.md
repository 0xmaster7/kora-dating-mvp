# Kora

- Anti-swipe, verification-first dating prototype for 2020–2023 Indian tech & engineering graduates, using eLitmus strictly as a verified alumni trust layer.

## Quickstart (1-Command Local Run)

- Zero `.env` or external database required (client-side state persisted in `localStorage`):

```bash
./start.sh
```

- Or with npm directly:

```bash
npm install && npm run dev
```

- Open `http://localhost:3000`.

## Key Features & Differentiators

- **Google Sign-In (OAuth-Ready)**: 1-click Demo Account Chooser (Demo User A / Demo User B) with optional `.env` hooks (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`).
- **eLitmus Verified Alumni Layer**: Pulls only Grad Year (2020–2023) and Verified Graduate Badge — explicitly excludes pH scores and recruiter data.
- **DPDP Act, 2023 Compliance**: Standalone itemized consent toggles, live Consent Audit Log, Grievance Officer details, and working one-click **Withdraw Consent & Permanently Erase Account**.
- **Workplace & Batchmate Shield**: Chip-based blocking of company email domains (e.g., `@flipkart.com`, `@amazon.com`) and college names that live-filter Thursday Drops.
- **Curated Thursday Drop (Anti-Swipe)**: 3 curated matches with countdown timer, transparent **Why You Matched** compatibility bars, and frosted portraits (`blur-md`).
- **Shared Prompt & Progressive Reveal**: 2-question scenario prompt unlocks side-by-side answer reveal and smooth photo unblur.
- **Active Chats (Max-3 Focus Cap + Polite Closure)**: Enforced `Active Conversations: X / 3` limit with a Focus Cap modal at `3/3`, interactive chat, and 3 one-tap respectful closure notes that archive threads and free a slot.
- **Kora Pro & Verified City Mixers**: Free vs. ₹599/mo Pro comparison plus RSVP-ready 8-person Bengaluru, Pune, and Hyderabad dinners.

## Evaluator Testing Guide

- Click **Continue with Google** on the landing screen to pick **Demo User A (Aarav)** or **Demo User B (Meera)** and run the 3-step onboarding (or toggle skip-onboarding to jump straight to Thursday Drop).
- Use the floating **Demo Controls** pill (bottom-right) at any time to:
  - **Switch Account / Replay Auth & Onboarding**
  - **Trigger Fresh Match Drop** (cycles through 8 seeded Bengaluru/Hyderabad/Pune/NCR profiles)
  - **Fill Active Chats to 3/3 (Test Cap)** (then click *Answer Prompt to Connect* on any Drop card to trigger the Focus Cap modal)
  - **Reset All Demo State** (wipes `localStorage` back to a clean start)

## Mobile PWA & Android APK (Capacitor)

- Installable PWA via `public/manifest.json` (iOS Safari *Add to Home Screen* / Android Chrome *Install app*).
- Capacitor `/android` project is initialized and synced against Next.js static export (`out/`).
- Build a debug `.apk` on any machine with Java + Android SDK installed:

```bash
npm run build && npx cap sync android && cd android && ./gradlew assembleDebug
```

- Output APK path:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Tech Stack

- Next.js (App Router, `output: "export"`) + TypeScript
- Tailwind CSS v4 + Framer Motion + Lucide React
- `Instrument Serif` + `Plus Jakarta Sans` (`next/font/google`)
- Capacitor (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`) + PWA
