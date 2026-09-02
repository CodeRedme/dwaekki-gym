# 🐷 Dwaekki Gym

A free, installable home-workout + balanced-food + cozy-arcade site for STAYs everywhere —
no gym, no money, no pressure required. A STAY project by Tulika Soni.

## What's inside
- **Home Workout Hub** — pick your equipment (nothing → full home gym) and your goal, get a real plan
- **Food section** — Veg / Eggitarian / Non-Veg, across 9 world cuisines, plus a no-guilt "Build My Plate" tool and a budget-friendly filter
- **Ask Dwaekki** — a small rule-based wellness chatbot (no API key needed) that always redirects real medical/injury/eating concerns to a qualified professional
- **Arcade** — all 12 mini-games from the blueprint (Café Rush, Garden, Picnic, Memory Match, Puzzle Room, Dress-Up, Room Designer, Beat Tap, Cloud Hop, Bunny Catch, Cleanup, Color Studio)
- **Progress** — workouts, minutes, consistency, meals explored, rest days respected, and a Dwaekki Level (Baby → Legendary) — **no weight or body tracking, ever**
- **Achievements**, **Dwaekki School** (mini fitness-science lessons), and a **Safety Center**
- **Installable PWA** with offline support (service worker caches the whole app)
- **Language toggle** via the free Google Website Translator widget in the top bar (translates every page on the fly — no separate translation files to maintain)

## How Dwaekki AI actually works (hybrid: real AI online, rule-based brain offline)
Dwaekki AI now runs in **hybrid mode**, using [Puter.js](https://js.puter.com/v2/) —
a free, keyless client-side library that gives real access to models like GPT and Claude.
Puter uses a "User-Pays" model: each visitor covers their own tiny usage through a free
Puter account (a sign-in popup appears the first time they chat), so **hosting this costs
Tuli $0 forever**, with no API key to manage.

- **Online + Puter loaded** → Dwaekki sends the question to a real LLM (`js/ai.js`,
  `dwaekkiRespondHybrid()`), wrapped in a system prompt that keeps Dwaekki's persona and
  boundaries (no diagnosing, no prescriptions, no extreme diets).
- **Offline, or Puter fails/times out** → falls straight back to the original rule-based
  `dwaekkiRespond()` engine — same one as before, still fully functional with zero internet.
- **Either way**, the medical/injury/eating-concern safety check runs **locally first,
  every time**, before any online call is even attempted — so no model response can ever
  skip that redirect-to-a-professional rule.

Each chat reply shows a small `🌐 online AI` or `📴 offline brain` badge so it's always
clear which one answered. The Ask Dwaekki page also shows a live connection status line.

## Running it locally
No build step — it's plain HTML/CSS/JS. From this folder:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Deploying (same flow as Binnie Clinic)
1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), "New Project," import the repo.
3. Framework preset: **Other** (it's static — no build command needed).
4. Deploy. Vercel gives you a `dwaekki-gym.vercel.app`-style URL.
5. Visit on your phone → browser menu → "Add to Home Screen" to install it like an app.

## File map
```
index.html          all page sections (single-page app, tab-based nav)
css/style.css        theme (soft blue/pink, Baloo 2 + Quicksand)
js/data.js           exercises, meals, school content, achievements, arcade list
js/ai.js             Dwaekki AI rule engine
js/games.js          all 12 arcade mini-games
js/app.js            navigation, state (localStorage), all the wiring
manifest.json, sw.js  PWA install + offline support + auto-update system
icons/               your logo, icon, and background pattern
```

## Versioning & auto-updates
- The version lives in **one place**: `APP_VERSION` at the top of `js/data.js` (currently `1.0.0`), shown in the footer and used to name the service-worker cache.
- To ship an update: change files as needed, bump `APP_VERSION` (e.g. `"1.0.1"`), redeploy.
- Because the cache name includes the version, the browser detects the new service worker automatically. Instead of silently swapping files under someone's feet, it shows a cute **"🐷 A new Dwaekki update is ready!"** toast with an **Update now** button — tapping it activates the new version and reloads the page. If they tap "Later," they keep using the current version until they refresh naturally.

## Notes / next steps
- Progress, achievements, and arcade unlocks are saved in the browser's `localStorage` —
  per-device, no account needed (same approach as Binnie Clinic).
- The Google Translate widget is the fastest honest way to cover "every language" without
  hand-translating 16 sections — if you want a few languages to be hand-translated and
  extra-polished later (like Korean, given STAY's audience), that's a good v2 step.
- Feel free to swap in more exercises/meals in `js/data.js` — no other file needs to change.
