// ===================== DWAEKKI GYM APP LOGIC =====================
// Everything runs on-device. localStorage is the only "database".

const LS = {
  name: "dwaekki_name",
  lang: "dwaekki_lang",
  points: "dwaekki_points",
  missionDate: "dwaekki_mission_date",
  missionIndex: "dwaekki_mission_index",
  missionDone: "dwaekki_mission_done",
  week: "dwaekki_week",
  hydration: "dwaekki_hydration_on",
  equipment: "dwaekki_equipment",
  gameBest: "dwaekki_game_best",
};

let state = {
  lang: localStorage.getItem(LS.lang) || "en",
  equipment: JSON.parse(localStorage.getItem(LS.equipment) || "[]"),
  nothingFilter: "all",
  equipmentFilter: "all",
  libraryFilter: "all",
  foodRegion: "south-asian",
  foodDiet: "veg",
  builderPicks: {},
};

// ---------- helpers ----------
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function dayOfYear() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}
function t(en, hi) {
  return state.lang === "hi" ? hi : en;
}
function applyLangToDOM() {
  document.querySelectorAll("[data-en]").forEach((el) => {
    const val = state.lang === "hi" ? el.getAttribute("data-hi") : el.getAttribute("data-en");
    if (val) el.textContent = val;
  });
  document.querySelectorAll("[data-en-ph]").forEach((el) => {
    const val = state.lang === "hi" ? el.getAttribute("data-hi-ph") : el.getAttribute("data-en-ph");
    if (val) el.placeholder = val;
  });
}

// ---------- name gate ----------
function initNameGate() {
  const savedName = localStorage.getItem(LS.name);
  if (savedName) {
    document.getElementById("nameGate").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("greetName").textContent = t("Hi", "Hi") + " " + savedName;
    return;
  }
  document.getElementById("nameSubmit").addEventListener("click", () => {
    const val = document.getElementById("nameInput").value.trim();
    const name = val || (state.lang === "hi" ? "STAY" : "STAY");
    localStorage.setItem(LS.name, name);
    document.getElementById("nameGate").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("greetName").textContent = t("Hi", "Hi") + " " + name;
  });
}

// ---------- navigation ----------
function navigateTo(viewId) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const target = document.getElementById("view-" + viewId);
  if (target) target.classList.add("active");
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  const tabMap = { home: "home", library: "library", time: "library", nothing: "library", equipment: "library", lowenergy: "home", game: "home", food: "food", ai: "ai", week: "home", about: "about" };
  const tabBtn = document.querySelector(`.tab-btn[data-nav="${tabMap[viewId] || viewId}"]`);
  if (tabBtn) tabBtn.classList.add("active");
  if (viewId === "lowenergy") renderLowEnergy();
  if (viewId !== "game") stopGame();
  window.scrollTo(0, 0);
}
function initNav() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => navigateTo(el.getAttribute("data-nav")));
  });
}

// ---------- language toggle ----------
function initLangToggle() {
  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "hi" : "en";
    localStorage.setItem(LS.lang, state.lang);
    applyLangToDOM();
    renderAll();
  });
}

// ---------- Daily mission / points ----------
function initMission() {
  const doy = dayOfYear();
  const savedDate = localStorage.getItem(LS.missionDate);
  let missionIndex;
  if (savedDate === String(doy)) {
    missionIndex = parseInt(localStorage.getItem(LS.missionIndex) || "0", 10);
  } else {
    missionIndex = doy % DAILY_MISSIONS.length;
    localStorage.setItem(LS.missionDate, String(doy));
    localStorage.setItem(LS.missionIndex, String(missionIndex));
    localStorage.setItem(LS.missionDone, "false");
  }
  const mission = DAILY_MISSIONS[missionIndex];
  document.getElementById("missionText").textContent = t(mission.en, mission.hi);

  const points = parseInt(localStorage.getItem(LS.points) || "0", 10);
  document.getElementById("pointsCount").textContent = points;

  const done = localStorage.getItem(LS.missionDone) === "true";
  const btn = document.getElementById("missionBtn");
  updateMissionBtn(btn, done);

  btn.addEventListener("click", () => {
    const currentlyDone = localStorage.getItem(LS.missionDone) === "true";
    if (currentlyDone) return;
    localStorage.setItem(LS.missionDone, "true");
    const newPoints = parseInt(localStorage.getItem(LS.points) || "0", 10) + 5;
    localStorage.setItem(LS.points, String(newPoints));
    document.getElementById("pointsCount").textContent = newPoints;
    updateMissionBtn(btn, true);
  });
}
function updateMissionBtn(btn, done) {
  if (done) {
    btn.textContent = t("Done for today ✓", "Aaj ke liye done ✓");
    btn.classList.add("done");
  } else {
    btn.textContent = t("Done for today ✓", "Aaj ke liye done ✓");
    btn.classList.remove("done");
  }
}

// ---------- Home "missed a day" gentle note ----------
function initHomeMissedNote() {
  const week = JSON.parse(localStorage.getItem(LS.week) || "{}");
  const d = new Date();
  const yesterday = new Date(d);
  yesterday.setDate(d.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
  const note = document.getElementById("homeMissedNote");
  if (week[yKey] === false || (week.hasOwnProperty(yKey) === false && Object.keys(week).length > 0)) {
    note.textContent = t("You missed yesterday? It's okay. We continue today.", "Kal miss ho gaya? Koi baat nahi. Aaj se dobara shuru.");
    note.classList.remove("hidden");
  } else {
    note.classList.add("hidden");
  }
}

// ---------- Hydration ----------
let hydrationTimer = null;
function initHydration() {
  const toggle = document.getElementById("hydrationToggle");
  toggle.checked = localStorage.getItem(LS.hydration) === "true";
  if (toggle.checked) startHydration();

  toggle.addEventListener("change", () => {
    localStorage.setItem(LS.hydration, String(toggle.checked));
    if (toggle.checked) startHydration();
    else stopHydration();
  });
}
function startHydration() {
  stopHydration();
  showToast(t("💧 Hydration reminders are on — Dwaekki will nudge you while this tab stays open.", "💧 Hydration reminders on hain — jab tak yeh tab khula hai, Dwaekki tumhe yaad dilata rahega."));
  hydrationTimer = setInterval(() => {
    showToast(t("💧 Quick sip of water?", "💧 Thoda paani pi lo?"));
  }, 45 * 60 * 1000); // every 45 min while tab open
}
function stopHydration() {
  if (hydrationTimer) clearInterval(hydrationTimer);
  hydrationTimer = null;
}
function showToast(msg) {
  const toast = document.getElementById("hydrationToast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 4000);
}

// ---------- Time finder ----------
function initTimeFinder() {
  document.querySelectorAll(".time-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".time-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const mins = parseInt(chip.getAttribute("data-mins"), 10);
      renderTimeResult(mins);
    });
  });
}
function renderTimeResult(mins) {
  const panel = document.getElementById("timeResult");
  let budget = mins;
  const pool = EXERCISES.filter((e) => e.equipment === "none" || e.equipment === "wall" || e.equipment === "mat")
    .sort(() => 0.5 - seededRandom());
  const picks = [];
  for (const ex of pool) {
    if (budget - ex.minutes < 0 && picks.length > 0) continue;
    picks.push(ex);
    budget -= ex.minutes;
    if (budget <= 0) break;
  }
  panel.innerHTML = `<p style="margin:0 0 10px;font-weight:700;color:var(--pink-hot)">${t("Dwaekki found a workout for you:", "Dwaekki ne tumhare liye workout dhoond liya:")}</p>` +
    picks.map((e) => `<div class="exercise-card" style="margin-bottom:10px;">
      <h4>${e.name}</h4>
      <div class="exercise-meta">${e.sets}</div>
      <p style="font-size:0.82rem;color:var(--ink-soft);margin:0;">${e.form}</p>
    </div>`).join("");
}
function seededRandom() {
  return Math.random();
}

// ---------- Exercise rendering ----------
function goalLabel(id) {
  const g = GOALS.find((x) => x.id === id);
  return g ? t(g.en, g.hi) : id;
}
function renderGoalFilters(containerId, onSelect, activeVal) {
  const container = document.getElementById(containerId);
  const all = [{ id: "all", en: "All", hi: "Sab" }, ...GOALS];
  container.innerHTML = all.map((g) =>
    `<button class="filter-chip ${g.id === activeVal ? "active" : ""}" data-goal="${g.id}">${t(g.en, g.hi)}</button>`
  ).join("");
  container.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => onSelect(chip.getAttribute("data-goal")));
  });
}
function renderBodyFilters(containerId, onSelect, activeVal) {
  const container = document.getElementById(containerId);
  const all = [{ id: "all", en: "All", hi: "Sab" }, ...BODY_PARTS];
  container.innerHTML = all.map((b) =>
    `<button class="filter-chip ${b.id === activeVal ? "active" : ""}" data-body="${b.id}">${t(b.en, b.hi)}</button>`
  ).join("");
  container.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => onSelect(chip.getAttribute("data-body")));
  });
}
function renderSafetyBanners() {
  document.querySelectorAll(".safety-banner").forEach((el) => {
    el.textContent = t(SAFETY_BANNER.en, SAFETY_BANNER.hi);
  });
}
function exerciseCardHTML(e) {
  return `<div class="exercise-card">
    <h4>${e.name}</h4>
    <div class="exercise-meta">${e.sets}</div>
    <details>
      <summary>${t("Form tips, safety & variations", "Form tips, safety aur variations")}</summary>
      <ul>
        <li><strong>${t("Form:", "Form:")}</strong> ${e.form}</li>
        <li><strong>${t("Safety:", "Safety:")}</strong> ${e.safety}</li>
        <li><strong>${t("Beginner (easier):", "Beginner (easier):")}</strong> ${e.easier}</li>
        <li><strong>${t("Standard:", "Standard:")}</strong> ${e.sets}</li>
        <li><strong>${t("Advanced (harder):", "Advanced (harder):")}</strong> ${e.harder}</li>
      </ul>
      <p class="progression-note">${t("New to this move? Start at Beginner. Only try Advanced once Standard feels easy.", "Yeh move naya hai? Beginner se shuru karo. Advanced tabhi try karo jab Standard easy lagne lage.")}</p>
    </details>
    <div class="tag-row">${e.goals.map((g) => `<span class="tag">${goalLabel(g)}</span>`).join("")}${e.bed ? `<span class="tag">${t("Bed-friendly", "Bed-friendly")}</span>` : ""}</div>
  </div>`;
}

function renderNothing() {
  renderGoalFilters("nothingGoalFilter", (g) => { state.nothingFilter = g; renderNothing(); }, state.nothingFilter);
  const list = EXERCISES.filter((e) => e.equipment === "none" || e.equipment === "wall");
  const filtered = state.nothingFilter === "all" ? list : list.filter((e) => e.goals.includes(state.nothingFilter));
  const container = document.getElementById("nothingList");
  container.innerHTML = filtered.length ? filtered.map(exerciseCardHTML).join("") : `<p class="empty-msg">${t("No exercises match — try a different goal.", "Koi exercise match nahi hui — dusra goal try karo.")}</p>`;
}

function renderLowEnergy() {
  document.getElementById("lowEnergyMessage").textContent = t(LOW_ENERGY_MESSAGE.en, LOW_ENERGY_MESSAGE.hi);
  const list = EXERCISES.filter((e) => e.bed || e.goals.includes("gentle"));
  document.getElementById("lowEnergyList").innerHTML = list.map(exerciseCardHTML).join("");
}

function renderEquipmentTicks() {
  const container = document.getElementById("equipmentTicks");
  container.innerHTML = EQUIPMENT_OPTIONS.map((opt) => `
    <label class="tick-item">
      <input type="checkbox" data-equip="${opt.id}" ${state.equipment.includes(opt.id) ? "checked" : ""} />
      <span>${t(opt.en, opt.hi)}</span>
    </label>
  `).join("");
  container.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = cb.getAttribute("data-equip");
      if (cb.checked) state.equipment.push(id);
      else state.equipment = state.equipment.filter((x) => x !== id);
      localStorage.setItem(LS.equipment, JSON.stringify(state.equipment));
      renderEquipmentList();
    });
  });
}
function renderEquipmentList() {
  renderGoalFilters("equipmentGoalFilter", (g) => { state.equipmentFilter = g; renderEquipmentList(); }, state.equipmentFilter);
  let list;
  if (state.equipment.length === 0) {
    list = EXERCISES; // show everything until they tick something
  } else {
    list = EXERCISES.filter((e) => e.equipment === "none" || state.equipment.includes(e.equipment));
  }
  const filtered = state.equipmentFilter === "all" ? list : list.filter((e) => e.goals.includes(state.equipmentFilter));
  const container = document.getElementById("equipmentList");
  container.innerHTML = filtered.length ? filtered.map(exerciseCardHTML).join("") : `<p class="empty-msg">${t("No exercises match yet — tick what you have above.", "Abhi koi exercise match nahi hui — upar jo hai woh tick karo.")}</p>`;
}

function renderLibrary() {
  renderGoalFilters("libraryGoalFilter", (g) => { state.libraryFilter = g; renderLibrary(); }, state.libraryFilter);
  renderBodyFilters("libraryBodyFilter", (b) => { state.libraryBodyFilter = b; renderLibrary(); }, state.libraryBodyFilter || "all");
  let filtered = state.libraryFilter === "all" ? EXERCISES : EXERCISES.filter((e) => e.goals.includes(state.libraryFilter));
  const bodyFilter = state.libraryBodyFilter || "all";
  if (bodyFilter !== "all") filtered = filtered.filter((e) => e.body === bodyFilter);
  document.getElementById("libraryList").innerHTML = filtered.length ? filtered.map(exerciseCardHTML).join("") : `<p class="empty-msg">${t("No exercises match — try different filters.", "Koi exercise match nahi hui — alag filters try karo.")}</p>`;
}

// ---------- Food ----------
function initFood() {
  const regionSelect = document.getElementById("regionSelect");
  regionSelect.innerHTML = FOOD_REGIONS.map((r) => `<option value="${r.id}">${t(r.en, r.hi)}</option>`).join("");
  regionSelect.value = state.foodRegion;
  regionSelect.addEventListener("change", () => { state.foodRegion = regionSelect.value; renderMeals(); });

  const dietToggle = document.getElementById("dietToggle");
  dietToggle.innerHTML = DIETS.map((d) => `<button class="diet-btn ${d.id === state.foodDiet ? "active" : ""}" data-diet="${d.id}">${t(d.en, d.hi)}</button>`).join("");
  dietToggle.querySelectorAll(".diet-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.foodDiet = btn.getAttribute("data-diet");
      dietToggle.querySelectorAll(".diet-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMeals();
    });
  });

  renderMeals();
  renderMealBuilder();
  initIngredientTool();
}
function renderMeals() {
  const ideas = (MEAL_IDEAS[state.foodRegion] && MEAL_IDEAS[state.foodRegion][state.foodDiet]) || [];
  const container = document.getElementById("mealIdeas");
  container.innerHTML = ideas.length ? ideas.map((m) => `<div class="meal-card"><h4>${m.name}</h4><p>${m.note}</p></div>`).join("") :
    `<p class="empty-msg">${t("More ideas coming soon for this combo!", "Iske liye jald hi aur ideas aayenge!")}</p>`;
}
function renderMealBuilder() {
  const container = document.getElementById("mealBuilder");
  const steps = [
    { key: "energy", en: "1. Pick an energy food", hi: "1. Ek energy food chuno" },
    { key: "protein", en: "2. Pick a protein food", hi: "2. Ek protein food chuno" },
    { key: "veg", en: "3. Add vegetables or fruit", hi: "3. Vegetables ya fruit add karo" },
    { key: "extra", en: "4. Add another nourishing food if needed", hi: "4. Zaroorat ho toh aur kuch nourishing add karo" },
  ];
  container.innerHTML = steps.map((s) => `
    <div class="builder-step">
      <label>${t(s.en, s.hi)}</label>
      <div class="builder-options">
        ${BUILDER[s.key].map((opt) => `<button class="opt-chip" data-key="${s.key}" data-val="${opt}">${opt}</button>`).join("")}
      </div>
    </div>
  `).join("");
  container.querySelectorAll(".opt-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const key = chip.getAttribute("data-key");
      const val = chip.getAttribute("data-val");
      state.builderPicks[key] = val;
      container.querySelectorAll(`.opt-chip[data-key="${key}"]`).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      showMealBuilderResult();
    });
  });
}
function showMealBuilderResult() {
  const picks = state.builderPicks;
  const parts = [picks.energy, picks.protein, picks.veg, picks.extra].filter(Boolean);
  const panel = document.getElementById("mealBuilderResult");
  if (parts.length === 0) { panel.classList.add("hidden"); return; }
  panel.classList.remove("hidden");
  panel.innerHTML = `<p style="margin:0;font-weight:700;color:var(--pink-hot);">${t("Your balanced plate:", "Tumhari balanced plate:")}</p><p style="margin:6px 0 0;">${parts.join(" + ")}</p>`;
}

// ---------- Use What I Already Have ----------
function initIngredientTool() {
  document.getElementById("ingredientBtn").addEventListener("click", handleIngredientSearch);
  document.getElementById("ingredientInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleIngredientSearch(); }
  });
}
function handleIngredientSearch() {
  const raw = document.getElementById("ingredientInput").value.toLowerCase();
  const panel = document.getElementById("ingredientResult");
  if (!raw.trim()) { panel.classList.add("hidden"); return; }
  const typed = raw.split(",").map((s) => s.trim()).filter(Boolean);

  const matches = INGREDIENT_DISHES.filter((dish) =>
    dish.need.every((needed) => typed.some((word) => word.includes(needed) || needed.includes(word)))
  );

  panel.classList.remove("hidden");
  if (matches.length === 0) {
    panel.innerHTML = `<p style="margin:0;font-weight:700;color:var(--pink-hot);">${t("Dwaekki couldn't match a full dish yet —", "Dwaekki abhi ek pura dish match nahi kar paya —")}</p>
      <p style="margin:6px 0 0;font-size:0.85rem;color:var(--ink-soft);">${t("try adding one more staple like rice, egg, dal, or bread, and Dwaekki will try again!", "rice, egg, dal, ya bread jaisa ek aur staple add karke try karo, Dwaekki dobara try karega!")}</p>`;
    return;
  }
  panel.innerHTML = `<p style="margin:0 0 10px;font-weight:700;color:var(--pink-hot);">${t("🐷 You can make:", "🐷 Yeh bana sakte ho:")}</p>` +
    matches.slice(0, 4).map((d) => `<div style="margin-bottom:10px;"><strong>${d.name}</strong><br/><span style="font-size:0.82rem;color:var(--ink-soft);">${d.note}</span></div>`).join("") +
    `<p style="margin:6px 0 0;font-size:0.78rem;font-style:italic;color:var(--ink-soft);">${t("No grocery shopping required. We work with what you've got.", "Koi grocery shopping zaroori nahi. Jo hai usi se kaam chalate hain.")}</p>`;
}

// ---------- Ask Dwaekki (AI chat) ----------
// Safety keywords are always checked first, offline and instantly.
// Everything else tries a real AI (via Puter.js — no API key needed) when
// online, and quietly falls back to the built-in offline brain otherwise.

const DWAEKKI_SYSTEM_PROMPT = `You are Dwaekki, the small wellness mascot chatbot inside "Dwaekki Gym" — a free home-workout and balanced-meal app for STAYs (Stray Kids fans) who may have no money or equipment. Reply warmly, briefly (under ~80 words), casually, a little playful, with light emoji use (🐷💗). Give practical bodyweight/equipment workout ideas, form pointers, or balanced (not strict/extreme) meal ideas, tailored to whatever the user says they have. Never diagnose illness, never prescribe treatment, never create extreme or calorie-restrictive diets, never give calorie or weight targets. If the user mentions pain, injury, fainting, dizziness, breathing problems, disordered eating, or any medical concern, your ENTIRE reply must be close to: "This is something to discuss with a qualified healthcare professional." — do not add workout or food advice in that case.`;

let puterSignInAttempted = false;

function initChat() {
  const suggestionsEl = document.getElementById("chatSuggestions");
  suggestionsEl.innerHTML = AI_SUGGESTIONS.map((s) => `<button data-q="${s}">${s}</button>`).join("");
  suggestionsEl.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => handleChatMessage(b.getAttribute("data-q")));
  });

  const form = document.getElementById("chatForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const val = input.value.trim();
    if (!val) return;
    handleChatMessage(val);
    input.value = "";
  });

  if (document.getElementById("chatWindow").children.length === 0) {
    addChatBubble(t("Hi! I'm Dwaekki 🐷 Ask me about workouts, food swaps, or tap a suggestion below to start.", "Hi! Main Dwaekki hoon 🐷 Workout, khana swaps ke baare mein poocho, ya neeche suggestion pe tap karo."), "dwaekki");
  }
}

async function handleChatMessage(text) {
  addChatBubble(text, "user");

  // Safety keywords always short-circuit — instant, offline, never touches the AI.
  const lower = text.toLowerCase();
  const medicalRule = AI_RULES[0];
  if (medicalRule.keywords.some((k) => lower.includes(k))) {
    addChatBubble(medicalRule.respond(state.lang), "dwaekki");
    return;
  }

  const thinkingBubble = addChatBubble(t("Dwaekki is thinking...", "Dwaekki soch raha hai..."), "dwaekki");

  // Try the real online AI first (Puter.js — no API key required).
  if (navigator.onLine && typeof puter !== "undefined" && puter.ai && puter.ai.chat) {
    try {
      const response = await Promise.race([
        puter.ai.chat(`${DWAEKKI_SYSTEM_PROMPT}\n\nUser message: ${text}`),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 20000)),
      ]);
      const replyText = extractPuterText(response);
      if (replyText) {
        thinkingBubble.textContent = replyText;
        document.getElementById("chatWindow").scrollTop = document.getElementById("chatWindow").scrollHeight;
        return;
      }
    } catch (err) {
      // Sign-in popup closed, no internet mid-call, rate-limited, etc. — fall through to offline brain.
    }
  }

  // Offline / fallback brain.
  thinkingBubble.textContent = getDwaekkiReply(text);
  document.getElementById("chatWindow").scrollTop = document.getElementById("chatWindow").scrollHeight;
}

function extractPuterText(resp) {
  if (!resp) return "";
  if (typeof resp === "string") return resp.trim();
  if (resp.message && resp.message.content) {
    const c = resp.message.content;
    if (typeof c === "string") return c.trim();
    if (Array.isArray(c)) return c.map((p) => p.text || "").join(" ").trim();
  }
  if (resp.text) return String(resp.text).trim();
  return "";
}

function getDwaekkiReply(text) {
  const lower = text.toLowerCase();
  for (const rule of AI_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return rule.respond(state.lang);
    }
  }
  return t(AI_FALLBACK.en, AI_FALLBACK.hi);
}

function addChatBubble(text, who) {
  const win = document.getElementById("chatWindow");
  const div = document.createElement("div");
  div.className = `chat-bubble ${who}`;
  div.textContent = text;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
  return div;
}

// ---------- My Week ----------
const WEEKDAY_LABELS = [
  { en: "Su", hi: "Ra" }, { en: "Mo", hi: "So" }, { en: "Tu", hi: "Ma" },
  { en: "We", hi: "Bu" }, { en: "Th", hi: "Gu" }, { en: "Fr", hi: "Shu" }, { en: "Sa", hi: "Sha" },
];
function initWeek() {
  renderWeek();
}
function weekKeysForThisWeek() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day);
  const keys = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    keys.push({ key: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`, isToday: d.toDateString() === now.toDateString(), isFuture: d > now });
  }
  return keys;
}
function renderWeek() {
  const week = JSON.parse(localStorage.getItem(LS.week) || "{}");
  const keys = weekKeysForThisWeek();
  const grid = document.getElementById("weekGrid");
  grid.innerHTML = keys.map((k, i) => {
    const done = week[k.key] === true;
    return `<button class="week-day ${done ? "done" : ""}" data-key="${k.key}" ${k.isFuture ? "disabled style='opacity:0.4;'" : ""}>
      <span class="dlabel">${t(WEEKDAY_LABELS[i].en, WEEKDAY_LABELS[i].hi)}</span>
      <span class="dcheck">${done ? "✓" : "·"}</span>
    </button>`;
  }).join("");
  grid.querySelectorAll(".week-day:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      const week = JSON.parse(localStorage.getItem(LS.week) || "{}");
      week[key] = !week[key];
      localStorage.setItem(LS.week, JSON.stringify(week));
      renderWeek();
      initHomeMissedNote();
    });
  });
  document.getElementById("weekMessage").textContent = t(
    "Tap a day to mark it moved. Missing one never breaks anything.",
    "Kisi din ko tap karo agar move kiya ho. Ek din miss karne se kuch nahi tootega."
  );
}

// ---------- Privacy: Clear My Data ----------
function initClearData() {
  document.getElementById("clearDataBtn").addEventListener("click", () => {
    const confirmMsg = t(
      "Are you sure? This clears your name, progress, points, week planner, and game high score from this device — permanently.",
      "Pakka? Yeh tumhara naam, progress, points, week planner, aur game high score is device se permanently hata dega."
    );
    if (!confirm(confirmMsg)) return;
    Object.values(LS).forEach((k) => localStorage.removeItem(k));
    showToast(t("🐷 Your local Dwaekki data has been cleared. 💗", "🐷 Tumhara local Dwaekki data clear ho gaya. 💗"));
    setTimeout(() => location.reload(), 1400);
  });
}

// ---------- Dwaekki Dash (mini game) ----------
// Simple offline canvas runner. Dwaekki jumps over 💥, collects 💧🥕⭐❤️.
// No calories, no weight — points here are just game points.
let gameLoopId = null;
let gameState = null;

function initGame() {
  const canvas = document.getElementById("gameCanvas");
  const startBtn = document.getElementById("gameStartBtn");
  const best = parseInt(localStorage.getItem(LS.gameBest) || "0", 10);
  document.getElementById("gameBest").textContent = best;

  startBtn.addEventListener("click", startGame);
  canvas.addEventListener("pointerdown", () => jumpDwaekki());
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && document.getElementById("view-game").classList.contains("active")) {
      e.preventDefault();
      jumpDwaekki();
    }
  });
}

function startGame() {
  stopGame();
  document.getElementById("gameOverMsg").classList.add("hidden");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const groundY = H - 30;

  gameState = {
    ctx, W, H, groundY,
    dwaekkiX: 40, dwaekkiY: groundY - 26, dwaekkiVY: 0, jumping: false,
    speed: 3.2, spawnTimer: 0, score: 0, items: [], running: true,
  };
  document.getElementById("gameScore").textContent = "0";
  document.getElementById("gameStartBtn").textContent = t("Restart", "Dobara Shuru");
  gameLoop();
}

function stopGame() {
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  gameLoopId = null;
  if (gameState) gameState.running = false;
}

function jumpDwaekki() {
  if (!gameState || !gameState.running) return;
  if (!gameState.jumping) {
    gameState.jumping = true;
    gameState.dwaekkiVY = -8.5;
  }
}

function gameLoop() {
  if (!gameState || !gameState.running) return;
  const s = gameState;
  const ctx = s.ctx;

  // physics
  if (s.jumping) {
    s.dwaekkiVY += 0.55; // gravity
    s.dwaekkiY += s.dwaekkiVY;
    if (s.dwaekkiY >= s.groundY - 26) {
      s.dwaekkiY = s.groundY - 26;
      s.jumping = false;
      s.dwaekkiVY = 0;
    }
  }

  // spawn items
  s.spawnTimer -= 1;
  if (s.spawnTimer <= 0) {
    s.spawnTimer = 55 + Math.floor(Math.random() * 40);
    const isBad = Math.random() < 0.3;
    if (isBad) {
      s.items.push({ x: s.W + 20, y: s.groundY - 22, symbol: GAME_ITEMS.bad.symbol, bad: true });
    } else {
      const good = GAME_ITEMS.good[Math.floor(Math.random() * GAME_ITEMS.good.length)];
      s.items.push({ x: s.W + 20, y: s.groundY - 20 - Math.floor(Math.random() * 40), symbol: good.symbol, points: good.points, bad: false });
    }
  }

  // move + collide
  const dwX = s.dwaekkiX, dwY = s.dwaekkiY;
  for (let i = s.items.length - 1; i >= 0; i--) {
    const it = s.items[i];
    it.x -= s.speed;
    if (it.x < -20) { s.items.splice(i, 1); continue; }
    const dx = Math.abs(it.x - (dwX + 13));
    const dy = Math.abs(it.y - (dwY + 13));
    if (dx < 22 && dy < 22) {
      if (it.bad) {
        endGame();
        return;
      } else {
        s.score += it.points;
        document.getElementById("gameScore").textContent = s.score;
        s.items.splice(i, 1);
      }
    }
  }
  s.speed = 3.2 + s.score * 0.03;

  // draw
  ctx.clearRect(0, 0, s.W, s.H);
  ctx.fillStyle = "#f3d7e2";
  ctx.fillRect(0, s.groundY, s.W, 2);
  ctx.font = "26px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("🐷", dwX, dwY);
  s.items.forEach((it) => ctx.fillText(it.symbol, it.x, it.y));

  gameLoopId = requestAnimationFrame(gameLoop);
}

function endGame() {
  if (!gameState) return;
  gameState.running = false;
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  const best = parseInt(localStorage.getItem(LS.gameBest) || "0", 10);
  if (gameState.score > best) {
    localStorage.setItem(LS.gameBest, String(gameState.score));
    document.getElementById("gameBest").textContent = gameState.score;
  }
  document.getElementById("gameOverMsg").classList.remove("hidden");
  document.getElementById("gameStartBtn").textContent = t("Start", "Shuru Karo");
}

// ---------- render everything (used after lang switch) ----------
function renderAll() {
  initMission();
  renderNothing();
  renderEquipmentTicks();
  renderEquipmentList();
  renderLibrary();
  initFood();
  renderWeek();
  initHomeMissedNote();
  renderSafetyBanners();
  if (document.getElementById("view-lowenergy").classList.contains("active")) renderLowEnergy();
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
  applyLangToDOM();
  initNameGate();
  initNav();
  initLangToggle();
  initMission();
  initHomeMissedNote();
  initHydration();
  initTimeFinder();
  renderNothing();
  renderEquipmentTicks();
  renderEquipmentList();
  renderLibrary();
  renderSafetyBanners();
  initFood();
  initChat();
  initWeek();
  initClearData();
  initGame();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
});
