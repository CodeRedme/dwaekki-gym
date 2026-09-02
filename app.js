/* ===================== DWAEKKI GYM — APP LOGIC ===================== */

const STORAGE_KEY = "dwaekkiGymState";

function loadState(){
  const def = {
    workouts:0, minutes:0, streak:0, weeksActive:1, mobility:0, meals:0, restDays:0,
    cuisinesTried:[], eqTypesTried:[], gamesPlayed:[], unlocked:[], weekLog:{},
    coins:0, energy:0, foodPoints:0, carePoints:0,
    missionDate:"", missionsDone:{}, fedToday:0, fedFoods:[],
    ownedWallpapers:["default"], activeWallpaper:"default"
  };
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? Object.assign(def, saved) : def;
  }catch(e){ return def; }
}
let state = loadState();
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function todayStr(){ return new Date().toISOString().slice(0,10); }
function checkDailyReset(){
  const t = todayStr();
  if(state.missionDate !== t){
    state.missionDate = t;
    state.missionsDone = {};
    state.fedToday = 0;
    saveState();
  }
}
checkDailyReset();

/* ---------- Navigation ---------- */
function goTo(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById("view-"+view).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.nav===view));
  document.querySelectorAll(".bottom-btn").forEach(b=>b.classList.toggle("active", b.dataset.nav===view));
  window.scrollTo({top:0, behavior:"smooth"});
}
document.querySelectorAll("[data-nav]").forEach(btn=>{
  btn.addEventListener("click", ()=> goTo(btn.dataset.nav));
});

/* ---------- Name onboarding + personalized greeting ---------- */
const NAME_KEY = "dwaekkiUserName";
function getUserName(){ return localStorage.getItem(NAME_KEY) || ""; }
function applyGreeting(){
  const name = getUserName();
  const el = document.getElementById("userNameDisplay");
  if(el) el.textContent = name || "STAY";
}
function initNameOnboarding(){
  const name = getUserName();
  applyGreeting();
  if(name) return;
  const modal = document.getElementById("nameModal");
  modal.classList.remove("hidden");
  const input = document.getElementById("nameInput");
  const submit = () => {
    const val = input.value.trim();
    if(!val) { input.focus(); return; }
    localStorage.setItem(NAME_KEY, val);
    applyGreeting();
    modal.classList.add("hidden");
  };
  document.getElementById("nameSubmitBtn").addEventListener("click", submit);
  input.addEventListener("keydown", e => { if(e.key === "Enter") submit(); });
  setTimeout(()=> input.focus(), 200);
}
initNameOnboarding();

/* ---------- Home quick-action pills (equipment / goal shortcuts) ---------- */
document.querySelectorAll("[data-quick-eq]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    goTo("workout");
    const eqBtn = document.querySelector(`#equipmentChoice [data-eq="${btn.dataset.quickEq}"]`);
    if(eqBtn) eqBtn.click();
  });
});
document.querySelectorAll("[data-quick-goal]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    goTo("workout");
    const goalBtn = document.querySelector(`#goalChoice [data-goal="${btn.dataset.quickGoal}"]`);
    if(goalBtn) goalBtn.click();
  });
});

/* ---------- Hydration reminders (gentle, in-app only) ---------- */
const HYDRO_KEY = "dwaekkiHydration";
let hydrationTimer = null;
function startHydration(){
  if(hydrationTimer) clearInterval(hydrationTimer);
  hydrationTimer = setInterval(()=>{
    if(document.getElementById("hydrationToggle").checked){
      document.getElementById("greetSub").textContent = "💧 Gentle nudge from Dwaekki: maybe a sip of water?";
      setTimeout(()=>{
        document.getElementById("greetSub").textContent = "Small movement counts. Dwaekki isn't keeping score against you.";
      }, 8000);
    }
  }, 90*60*1000);
}
const hydroToggle = document.getElementById("hydrationToggle");
hydroToggle.checked = localStorage.getItem(HYDRO_KEY) === "on";
document.getElementById("hydrationNote").classList.toggle("hidden", !hydroToggle.checked);
if(hydroToggle.checked) startHydration();
hydroToggle.addEventListener("change", ()=>{
  localStorage.setItem(HYDRO_KEY, hydroToggle.checked ? "on" : "off");
  document.getElementById("hydrationNote").classList.toggle("hidden", !hydroToggle.checked);
  if(hydroToggle.checked) startHydration(); else if(hydrationTimer) clearInterval(hydrationTimer);
});

/* ---------- Dashboard / level display ---------- */
function currentLevel(){
  let lvl = DWAEKKI_LEVELS[0];
  for(const l of DWAEKKI_LEVELS){ if(state.workouts >= l.min) lvl = l; }
  return lvl;
}
function refreshDashboard(){
  const lvl = currentLevel();
  const idx = DWAEKKI_LEVELS.indexOf(lvl);
  const next = DWAEKKI_LEVELS[idx+1];
  const pct = next ? Math.min(100, ((state.workouts-lvl.min)/(next.min-lvl.min))*100) : 100;

  document.getElementById("levelLabel2").textContent = `Level ${idx+1} · ${lvl.emoji} ${lvl.name}`;
  document.getElementById("levelBar2").style.width = pct+"%";

  document.getElementById("statWorkouts").textContent = state.workouts;
  document.getElementById("statMinutes").textContent = state.minutes;
  document.getElementById("statStreak").textContent = state.streak;
  document.getElementById("statMobility").textContent = state.mobility;
  document.getElementById("statMeals").textContent = state.meals;
  document.getElementById("statRest").textContent = state.restDays;

  // week strip
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const todayIdx = (new Date().getDay()+6)%7;
  document.getElementById("weekStrip").innerHTML = days.map((d,i)=>{
    const done = state.weekLog[d];
    return `<span class="week-chip ${done?'done':''} ${i===todayIdx?'today':''}" title="${d}">${d[0]}</span>`;
  }).join("");

  refreshAchievements();
}

function refreshAchievements(){
  const grid = document.getElementById("achieveGrid");
  grid.innerHTML = ACHIEVEMENTS.map(a=>{
    const unlocked = a.check(state);
    if(unlocked && !state.unlocked.includes(a.id)) state.unlocked.push(a.id);
    return `<div class="achieve-card ${unlocked?'unlocked':''}">
      <div class="emoji">${a.emoji}</div><h5>${a.name}</h5><p>${a.desc}</p>
    </div>`;
  }).join("");
  saveState();
}

/* ---------- Economy: coins / points / currency strip ---------- */
function grantReward(reward){
  if(reward.type === "coins") state.coins += reward.amount;
  else if(reward.type === "energy") state.energy += reward.amount;
  else if(reward.type === "foodPoints") state.foodPoints += reward.amount;
  else if(reward.type === "carePoints") state.carePoints += reward.amount;
}
function refreshCurrencyStrip(){
  const strip = document.getElementById("currencyStrip");
  if(!strip) return;
  strip.innerHTML = `
    <span class="currency-chip">🪙 ${state.coins}</span>
    <span class="currency-chip">🥕 ${state.foodPoints}</span>
    <span class="currency-chip">💗 ${state.carePoints}</span>
    <span class="currency-chip">💧 ${state.energy}</span>
  `;
}

/* ---------- Daily Missions ---------- */
function completeMission(id){
  if(state.missionsDone[id]) return;
  const m = MISSIONS.find(x=>x.id===id);
  if(!m) return;
  state.missionsDone[id] = true;
  grantReward(m.reward);
  saveState();
  renderMissions();
  refreshCurrencyStrip();
  refreshDwaekkiMood();
}
function renderMissions(){
  const box = document.getElementById("missionsList");
  if(!box) return;
  const done = MISSIONS.filter(m=>state.missionsDone[m.id]).length;
  box.innerHTML = MISSIONS.map(m=>{
    const isDone = !!state.missionsDone[m.id];
    return `<label class="mission-row ${isDone?'done':''}">
      <input type="checkbox" ${isDone?'checked disabled':''} data-mission="${m.id}" ${m.auto?'disabled':''} />
      <span>${m.emoji} ${m.label} <span class="muted">(+${m.reward.amount} ${rewardEmoji(m.reward.type)})</span></span>
    </label>`;
  }).join("");
  document.getElementById("missionsCount").textContent = `${done}/${MISSIONS.length} completed today`;
  box.querySelectorAll("input[data-mission]").forEach(cb=>{
    cb.addEventListener("change", ()=> completeMission(cb.dataset.mission));
  });
}
function rewardEmoji(type){
  return {coins:"🪙", energy:"💧", foodPoints:"🥕", carePoints:"💗"}[type] || "";
}

/* ---------- Dwaekki's mood (just a cute vibe, not a health score) ---------- */
function refreshDwaekkiMood(){
  const el = document.getElementById("dwaekkiMood");
  if(!el) return;
  const done = MISSIONS.filter(m=>state.missionsDone[m.id]).length;
  let mood;
  if(state.fedToday === 0) mood = {emoji:"🍽️", label:"Hungry", note:"Dwaekki is thinking about snacks…"};
  else if(done >= 4) mood = {emoji:"🎉", label:"Excited", note:"Dwaekki unlocked something!"};
  else if(done === 0) mood = {emoji:"😴", label:"Sleepy", note:"Dwaekki wants a cozy break…"};
  else mood = {emoji:"🌸", label:"Happy", note:"Dwaekki is having a lovely day!"};
  el.innerHTML = `<span class="mood-emoji">${mood.emoji}</span> <strong>${mood.label}</strong><br/><span class="muted">"${mood.note}"</span>`;
}

/* ---------- Dwaekki's Food Box (feed with coins) ---------- */
function renderFoodBox(){
  const grid = document.getElementById("foodShopGrid");
  if(!grid) return;
  grid.innerHTML = FOOD_SHOP.map(f=>`
    <button class="food-btn" data-food="${f.id}" ${state.coins < f.cost ? 'disabled' : ''}>
      <span class="food-emoji">${f.emoji}</span><span>${f.name}</span><span class="muted">${f.cost} 🪙</span>
    </button>
  `).join("");
  grid.querySelectorAll("[data-food]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const f = FOOD_SHOP.find(x=>x.id===btn.dataset.food);
      if(!f || state.coins < f.cost) return;
      state.coins -= f.cost;
      state.fedToday++;
      state.fedFoods.unshift(f.emoji);
      state.fedFoods = state.fedFoods.slice(0, 12);
      saveState();
      renderFoodBox(); refreshCurrencyStrip(); refreshDwaekkiMood();
      const reaction = DWAEKKI_REACTIONS[Math.floor(Math.random()*DWAEKKI_REACTIONS.length)];
      document.getElementById("foodBoxReaction").textContent = reaction;
    });
  });
  document.getElementById("foodBoxHistory").textContent = state.fedFoods.length
    ? "Dwaekki ate: " + state.fedFoods.join(" ")
    : "Empty for now — complete a mission to earn Dwaekki's first snack!";
}

/* ---------- Wallpaper Shop ---------- */
function applyWallpaper(){
  const wp = WALLPAPERS.find(w=>w.id===state.activeWallpaper) || WALLPAPERS[0];
  document.body.style.backgroundImage = `url('${wp.file}')`;
}
function renderWallpaperShop(){
  const grid = document.getElementById("wallpaperGrid");
  if(!grid) return;
  grid.innerHTML = WALLPAPERS.map(w=>{
    const owned = state.ownedWallpapers.includes(w.id);
    const active = state.activeWallpaper === w.id;
    return `<div class="wallpaper-card ${active?'active':''}">
      <div class="wallpaper-thumb" style="background-image:url('${w.file}')"></div>
      <p>${w.name}</p>
      ${active ? `<span class="muted">✓ Equipped</span>`
        : owned ? `<button class="btn-small" data-equip="${w.id}">Equip</button>`
        : `<button class="btn-small" data-buy="${w.id}" ${state.coins < w.cost ? 'disabled':''}>Buy — ${w.cost} 🪙</button>`}
    </div>`;
  }).join("");
  grid.querySelectorAll("[data-equip]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.activeWallpaper = btn.dataset.equip; saveState(); applyWallpaper(); renderWallpaperShop(); });
  });
  grid.querySelectorAll("[data-buy]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const w = WALLPAPERS.find(x=>x.id===btn.dataset.buy);
      if(!w || state.coins < w.cost) return;
      state.coins -= w.cost;
      state.ownedWallpapers.push(w.id);
      state.activeWallpaper = w.id;
      saveState();
      applyWallpaper(); renderWallpaperShop(); refreshCurrencyStrip();
    });
  });
}


let selectedEquipment = null, selectedGoal = null, selectedAccess = new Set(), selectedEquipList = new Set();

document.getElementById("equipmentChoice").addEventListener("click", e=>{
  const btn = e.target.closest(".choice-pill"); if(!btn) return;
  document.querySelectorAll("#equipmentChoice .choice-pill").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedEquipment = btn.dataset.eq;
  document.getElementById("equipmentList").classList.toggle("hidden", !(selectedEquipment==="some"||selectedEquipment==="full"));
  updateTodaysMove();
});
document.getElementById("goalChoice").addEventListener("click", e=>{
  const btn = e.target.closest(".choice-pill"); if(!btn) return;
  document.querySelectorAll("#goalChoice .choice-pill").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedGoal = btn.dataset.goal;
  updateTodaysMove();
});
document.getElementById("accessChoice").addEventListener("click", e=>{
  const btn = e.target.closest(".choice-pill"); if(!btn) return;
  btn.classList.toggle("selected");
  const acc = btn.dataset.acc;
  if(selectedAccess.has(acc)) selectedAccess.delete(acc); else selectedAccess.add(acc);
});

function updateTodaysMove(){
  const label = document.getElementById("todaysMoveLabel");
  if(label && selectedEquipment && selectedGoal){
    label.textContent = `${selectedGoal[0].toUpperCase()+selectedGoal.slice(1)} workout, ready to build`;
  }
}

document.getElementById("generateWorkoutBtn").addEventListener("click", ()=>{
  if(!selectedEquipment || !selectedGoal){
    alert("Pick what you have and what you want to do first! 🐷");
    return;
  }
  let list = (EXERCISES[selectedEquipment] && EXERCISES[selectedEquipment][selectedGoal]) || EXERCISES.none.general;
  list = [...list];
  if(selectedAccess.has("nojump")){
    list = list.map(x => x.toLowerCase().includes("jump") ? "Marching in place — 2 min (low-impact swap)" : x);
  }
  if(selectedAccess.has("seated")){
    list = list.map(x => "Seated version: " + x);
  }
  document.getElementById("workoutTitle").textContent = `${cap(selectedGoal)} · ${cap(selectedEquipment)} equipment`;
  document.getElementById("workoutList").innerHTML = list.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("workoutResult").classList.remove("hidden");
  document.getElementById("dwaekkiSays").textContent = "";
});
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

document.getElementById("completeWorkoutBtn").addEventListener("click", ()=>{
  state.workouts++; state.minutes += 15; state.streak++;
  if(selectedGoal === "mobility" || selectedGoal === "gentle") state.mobility++;
  if(selectedEquipment && !state.eqTypesTried.includes(selectedEquipment)) state.eqTypesTried.push(selectedEquipment);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const today = days[(new Date().getDay()+6)%7];
  state.weekLog[today] = true;
  saveState(); refreshDashboard();
  completeMission("workout");
  document.getElementById("dwaekkiSays").textContent = "🐷 \"You did it! So proud of you, STAY!\" 🎉";
});
document.getElementById("missedDayBtn").addEventListener("click", ()=>{
  state.restDays++;
  saveState(); refreshDashboard();
  document.getElementById("dwaekkiSays").textContent = "🐷 \"Aishhh, it's okay! We'll continue today.\" 💗";
});

/* ---------- Food ---------- */
let selectedDiet = "veg", selectedRegion = "indian";
document.getElementById("dietChoice").addEventListener("click", e=>{
  const btn = e.target.closest(".choice-pill"); if(!btn) return;
  document.querySelectorAll("#dietChoice .choice-pill").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected"); selectedDiet = btn.dataset.diet;
});
document.getElementById("regionChoice").addEventListener("click", e=>{
  const btn = e.target.closest(".choice-pill"); if(!btn) return;
  document.querySelectorAll("#regionChoice .choice-pill").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected"); selectedRegion = btn.dataset.region;
});
document.getElementById("showMealsBtn").addEventListener("click", ()=>{
  const budget = document.getElementById("budgetToggle").checked;
  let meals = (MEALS[selectedRegion] && MEALS[selectedRegion][selectedDiet]) || [];
  if(budget) meals = BUDGET_MEALS;
  document.getElementById("mealResults").innerHTML = meals.map(m=>`<div class="meal-card"><h4>🍽️</h4><p>${m}</p></div>`).join("") || "<p>Try another combination!</p>";
  state.meals += meals.length ? 1 : 0;
  if(!state.cuisinesTried.includes(selectedRegion)) state.cuisinesTried.push(selectedRegion);
  saveState(); refreshDashboard();
  if(meals.length) completeMission("meal");
});

/* Build My Plate */
const plateChoices = {carb:null, protein:null, color:null, joy:null};
document.querySelectorAll("[data-plate]").forEach(row=>{
  row.addEventListener("click", e=>{
    const btn = e.target.closest(".choice-pill"); if(!btn) return;
    row.querySelectorAll(".choice-pill").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    plateChoices[row.dataset.plate] = btn.textContent;
    if(plateChoices.carb && plateChoices.protein && plateChoices.color){
      const box = document.getElementById("plateResult");
      box.classList.remove("hidden");
      box.innerHTML = `🍽️ Your plate: ${plateChoices.carb} + ${plateChoices.protein} + ${plateChoices.color}${plateChoices.joy? " + "+plateChoices.joy : ""}<br/><span class="dwaekki-says">🐷 "YES. You can enjoy food too. 💕"</span>`;
      state.meals++; saveState(); refreshDashboard();
    }
  });
});

/* Pantry -> Ask Dwaekki */
document.getElementById("pantryBtn").addEventListener("click", async ()=>{
  const val = document.getElementById("pantryInput").value.trim();
  if(!val){ return; }
  const box = document.getElementById("pantryResult");
  box.textContent = "🐷 thinking…";
  const { text } = await dwaekkiRespondHybrid(`What can I make with ${val}?`);
  box.textContent = text;
});

/* ---------- Chat / Ask Dwaekki (hybrid: online real AI via Puter.js, offline rule-based brain) ---------- */
const chatWindow = document.getElementById("chatWindow");
function addChatMsg(text, who, source){
  const div = document.createElement("div");
  div.className = "chat-msg " + who;
  if(source){
    const badge = document.createElement("span");
    badge.className = "chat-badge";
    badge.textContent = source === "online" ? "🌐 online AI" : "📴 offline brain";
    div.appendChild(badge);
    div.appendChild(document.createElement("br"));
  }
  div.appendChild(document.createTextNode(text));
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
addChatMsg("Hi STAY! I'm Dwaekki 🐷 Ask me about workouts, food, or how today's going.", "dwaekki");

function updateAiModeNote(){
  const note = document.getElementById("aiModeNote");
  const online = navigator.onLine && typeof window.puter !== "undefined";
  note.textContent = online
    ? "🌐 Online right now — Dwaekki can use a real AI model for richer answers."
    : "📴 Offline (or AI still loading) — Dwaekki is using its built-in rule-based brain. Still safe, still helpful.";
}
updateAiModeNote();
window.addEventListener("online", updateAiModeNote);
window.addEventListener("offline", updateAiModeNote);
setTimeout(updateAiModeNote, 1500); // give puter.js a moment to finish loading

async function askDwaekki(text){
  addChatMsg(text, "user");
  const thinking = document.createElement("div");
  thinking.className = "chat-msg dwaekki thinking";
  thinking.textContent = "🐷 thinking…";
  chatWindow.appendChild(thinking);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  const { text: reply, source } = await dwaekkiRespondHybrid(text);
  thinking.remove();
  addChatMsg(reply, "dwaekki", source);
}

document.getElementById("chatForm").addEventListener("submit", e=>{
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const val = input.value.trim();
  if(!val) return;
  input.value = "";
  askDwaekki(val);
});
document.getElementById("chatSuggestions").addEventListener("click", e=>{
  if(e.target.tagName === "BUTTON") askDwaekki(e.target.textContent);
});

/* ---------- Arcade ---------- */
const arcadeGrid = document.getElementById("arcadeGrid");
arcadeGrid.innerHTML = ARCADE_GAMES.map(g=>`
  <div class="arcade-card">
    <div class="emoji">${g.emoji}</div>
    <h4>${g.name}</h4>
    <p>${g.desc}</p>
    <button class="btn-small" data-play="${g.id}">Play</button>
  </div>
`).join("");
arcadeGrid.addEventListener("click", e=>{
  const btn = e.target.closest("[data-play]"); if(!btn) return;
  const id = btn.dataset.play;
  const g = ARCADE_GAMES.find(x=>x.id===id);
  document.getElementById("gameStage").classList.remove("hidden");
  document.getElementById("gameStageTitle").textContent = g.emoji + " " + g.name;
  const body = document.getElementById("gameStageBody");
  body.innerHTML = "";
  Games[id](body);
  document.getElementById("gameStage").scrollIntoView({behavior:"smooth"});
});
document.getElementById("closeGameBtn").addEventListener("click", ()=>{
  document.getElementById("gameStage").classList.add("hidden");
  document.getElementById("gameStageBody").innerHTML = "";
});
window.onGamePlayed = function(id, coins){
  if(!state.gamesPlayed.includes(id)) state.gamesPlayed.push(id);
  if(coins){ state.coins += coins; refreshCurrencyStrip(); }
  saveState(); refreshAchievements();
};
window.onGameWon = function(id){ /* reserved for future celebratory hooks */ };

/* ---------- Workout Timer ---------- */
let timerSeconds = 30, timerRemaining = 30, timerInterval = null;
function formatTime(s){
  const m = Math.floor(s/60), sec = s%60;
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}
function renderTimer(){ document.getElementById("timerDisplay").textContent = formatTime(timerRemaining); }
document.querySelectorAll(".timer-presets button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    clearInterval(timerInterval); timerInterval = null;
    timerSeconds = parseInt(btn.dataset.secs, 10);
    timerRemaining = timerSeconds;
    renderTimer();
  });
});
document.getElementById("timerStartBtn").addEventListener("click", ()=>{
  if(timerInterval) return;
  if(timerRemaining <= 0) timerRemaining = timerSeconds;
  timerInterval = setInterval(()=>{
    timerRemaining--;
    renderTimer();
    if(timerRemaining <= 0){
      clearInterval(timerInterval); timerInterval = null;
      document.getElementById("timerDisplay").textContent = "🐷 Done!";
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
    }
  }, 1000);
});
document.getElementById("timerPauseBtn").addEventListener("click", ()=>{
  clearInterval(timerInterval); timerInterval = null;
});
document.getElementById("timerResetBtn").addEventListener("click", ()=>{
  clearInterval(timerInterval); timerInterval = null;
  timerRemaining = timerSeconds;
  renderTimer();
});
renderTimer();

/* ---------- Dwaekki Music ---------- */
function youtubeIdFromUrl(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if(u.searchParams.get("v")) return u.searchParams.get("v");
    if(u.pathname.startsWith("/playlist")) return null; // handled separately
  }catch(e){ return null; }
  return null;
}
document.getElementById("musicPlayBtn").addEventListener("click", ()=>{
  const val = document.getElementById("musicInput").value.trim();
  const note = document.getElementById("musicNote");
  const wrap = document.getElementById("musicEmbedWrap");
  const frame = document.getElementById("musicEmbed");
  if(!val){ note.textContent = "Paste a YouTube link first! 🐷"; return; }
  let embedSrc = null;
  try{
    const u = new URL(val);
    const listId = u.searchParams.get("list");
    const videoId = youtubeIdFromUrl(val);
    if(videoId) embedSrc = `https://www.youtube.com/embed/${videoId}${listId ? "?list="+listId : "?autoplay=1"}`;
    else if(listId) embedSrc = `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }catch(e){ /* invalid URL */ }
  if(!embedSrc){
    note.textContent = "That doesn't look like a YouTube link — try pasting a full youtube.com or youtu.be URL.";
    wrap.classList.add("hidden");
    return;
  }
  frame.src = embedSrc;
  wrap.classList.remove("hidden");
  note.textContent = "🎧 Playing! Head back to Workout to keep the vibe going.";
});
document.querySelectorAll(".music-suggest").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(btn.dataset.q), "_blank");
  });
});

/* ---------- School accordion ---------- */
document.getElementById("schoolAccordion").innerHTML = SCHOOL_TOPICS.map((t,i)=>`
  <div class="accordion-item" id="acc-${i}">
    <button class="accordion-q">${t.q} <span>+</span></button>
    <div class="accordion-a"><p>${t.a}</p></div>
  </div>
`).join("");
document.querySelectorAll(".accordion-q").forEach(btn=>{
  btn.addEventListener("click", ()=> btn.parentElement.classList.toggle("open"));
});

/* ---------- PWA install ---------- */
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e=>{
  e.preventDefault(); deferredPrompt = e;
  document.getElementById("installBtn").classList.remove("hidden");
});
document.getElementById("installBtn").addEventListener("click", async ()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById("installBtn").classList.add("hidden");
});
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("sw.js").then(reg=>{
      // A new SW version was found and finished installing → it's waiting to activate
      reg.addEventListener("updatefound", ()=>{
        const newWorker = reg.installing;
        if(!newWorker) return;
        newWorker.addEventListener("statechange", ()=>{
          if(newWorker.state === "installed" && navigator.serviceWorker.controller){
            showUpdateToast(reg);
          }
        });
      });
      // In case an update was already waiting from a previous visit
      if(reg.waiting && navigator.serviceWorker.controller){
        showUpdateToast(reg);
      }
      // Check for a new version every time the app is opened
      reg.update().catch(()=>{});
    }).catch(()=>{});

    // Once the new worker takes control, reload so the page picks up the fresh files
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", ()=>{
      if(refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

function showUpdateToast(reg){
  const toast = document.getElementById("updateToast");
  toast.classList.remove("hidden");
  document.getElementById("updateNowBtn").onclick = ()=>{
    if(reg.waiting) reg.waiting.postMessage("SKIP_WAITING");
    toast.classList.add("hidden");
  };
  document.getElementById("updateLaterBtn").onclick = ()=>{
    toast.classList.add("hidden");
  };
}

/* ---------- Version tag ---------- */
document.getElementById("versionTag").textContent = "Dwaekki Gym v" + APP_VERSION;

/* ---------- Google Translate widget ---------- */
function googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage:'en', autoDisplay:false}, 'google_translate_element');
}
(function(){
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
})();

/* ---------- Settings dropdown ---------- */
(function(){
  const btn = document.getElementById("settingsBtn");
  const panel = document.getElementById("settingsPanel");
  if(!btn || !panel) return;
  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    const willShow = panel.classList.contains("hidden");
    panel.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(willShow));
  });
  document.addEventListener("click", (e)=>{
    if(!panel.classList.contains("hidden") && !panel.contains(e.target) && e.target !== btn){
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ---------- Workout Library (browse-only) ---------- */
let libEq = "none", libGoal = "strength";
function renderLibrary(){
  const listEl = document.getElementById("libraryList");
  const titleEl = document.getElementById("libraryListTitle");
  if(!listEl || !titleEl) return;
  const moves = (EXERCISES[libEq] && EXERCISES[libEq][libGoal]) || [];
  titleEl.textContent = `${cap(libGoal)} · ${libEq === "none" ? "Nothing needed" : cap(libEq) + " equipment"}`;
  listEl.innerHTML = "";
  moves.forEach(m=>{
    const li = document.createElement("li");
    li.textContent = m;
    listEl.appendChild(li);
  });
}
const libEqRow = document.getElementById("libEquipmentChoice");
if(libEqRow){
  libEqRow.addEventListener("click", e=>{
    const b = e.target.closest(".choice-pill"); if(!b) return;
    libEqRow.querySelectorAll(".choice-pill").forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
    libEq = b.dataset.libEq;
    renderLibrary();
  });
}
const libGoalRow = document.getElementById("libGoalChoice");
if(libGoalRow){
  libGoalRow.addEventListener("click", e=>{
    const b = e.target.closest(".choice-pill"); if(!b) return;
    libGoalRow.querySelectorAll(".choice-pill").forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
    libGoal = b.dataset.libGoal;
    renderLibrary();
  });
}
renderLibrary();

/* ---------- init ---------- */
refreshDashboard();
renderMissions();
renderFoodBox();
renderWallpaperShop();
refreshCurrencyStrip();
refreshDwaekkiMood();
applyWallpaper();
