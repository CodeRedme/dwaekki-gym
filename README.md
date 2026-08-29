# Dwaekki Gym 🐷🏋️‍♀️

A free, install-anywhere workout + balanced-meal companion — built for STAYs
who don't have money or gear to spare, and don't want pressure either.

## What's inside
- **Home** — daily mission, points, hydration reminders, quick links
- **Workout Library** — filter by goal (Endurance, Strength, Mobility, Sports
  support, General health, Gentle movement, Fitness habit) AND by body part
  (Lower Body, Upper Body, Full Body, Core, Cardio). Every exercise card
  shows Form, Safety, Beginner (easier), Standard, and Advanced (harder) —
  plus a general safety banner on every workout screen.
- **I have Nothing** — bodyweight-only, safe-in-a-small-space moves, including
  bed-friendly exercises for lazy/rest days
- **I have Equipment** — tick what you own (dumbbells, band, chair, mat, wall,
  water bottles) and the library filters itself
- **Low-Energy Day** — a gentler, no-pressure filtered view for days you
  genuinely don't have much in the tank
- **How much time do you have?** — 5/10/15/20/30 min quick routines
- **Food** — 14 regions worldwide (South Asian, Korean, Japanese, Chinese,
  Filipino, Indonesian, Thai, Vietnamese, Mexican, Italian, Mediterranean,
  American, British, African-inspired) × veg / eggetarian / non-veg — no
  strict diets, plus:
  - **Use What I Already Have** — type your ingredients, Dwaekki suggests
    dishes. No grocery run required.
  - **Build-a-Meal** — step-by-step balanced plate builder
- **Ask Dwaekki** — a real AI chatbot (via [Puter.js](https://puter.com), free,
  no API key needed) when the person is online, with an offline rule-based
  brain as automatic backup. Medical/pain/injury keywords are always caught
  instantly and offline, before any AI call, and redirected to "talk to a
  qualified healthcare professional" — this check never depends on the AI.
  A fixed disclaimer chip always reads: "Dwaekki AI is a wellness assistant
  with a built-in knowledge base. It isn't a doctor, dietitian, or trainer."
- **My Week** — a non-punishing weekly tracker
- **🎮 Dwaekki Dash** — a tiny offline mini-game! Tap/Space to jump Dwaekki
  over 💥, collect 💧🥕⭐❤️. Pure fun, score is never tied to calories or
  weight.
- **Safety Center** — wellness disclaimer + privacy info + Clear My Data
  button (asks "Are you sure?", then confirms once it's actually cleared)
- **Languages** — a hand-written EN/हिं toggle for the app's own text, plus a
  🌐 Google Translate widget in the top bar (free, no key) covering ~100+
  other languages by machine translation

## Installing / running it
This is a static site — no build step, no backend, no accounts.

**Quickest — open it locally:**
Just double-click `index.html`. (The "install to home screen" prompt only
shows up when served over `http`/`https`, not `file://`, so for the full
installable experience, use one of the options below.)

**Deploy for free (recommended — works great with Vercel, like Code RED):**
1. Create a new GitHub repo and push this whole folder to it.
2. Go to vercel.com → New Project → import the repo → Deploy.
   No config needed, it's plain HTML/CSS/JS.
3. Open the Vercel link on your phone → your browser will offer
   "Add to Home Screen" / "Install app".

**Or just drag-and-drop:** vercel.com and netlify.com both let you drag this
folder straight into the browser to get a live link in seconds.

## Notes
- All progress (name, points, week, equipment ticks) is saved in the
  browser's local storage on that one device — nothing is sent anywhere.
- Once opened once, the whole app (workouts, food ideas, and Ask Dwaekki's
  offline brain) keeps working with no internet connection.
- **Ask Dwaekki's real AI** needs internet, and the first time someone uses
  it online, Puter.js may pop up a quick free sign-in (this is Puter's own
  "user pays" model — it's how they offer AI for free with no API key from
  you. No password from your app, no data shared with Dwaekki Gym itself).
  If that popup gets blocked or skipped, or there's no internet, Ask Dwaekki
  automatically drops back to its own built-in offline brain — the chat
  never breaks either way.
- **Google Translate** is Google's own widget loaded from their servers —
  it needs internet the first time on a device, and translations are
  machine-generated (not reviewed by a person), so treat other-language text
  as "close enough," especially for the safety/medical wording.
- Not affiliated with JYP Entertainment — an original fan-made project.

Made with 💗 for Tulika Soni × STAY Project.
