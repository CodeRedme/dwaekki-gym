/* ===================== DWAEKKI AI — rule-based wellness helper =====================
   No API key, no external model call: this is a keyword + intent matcher tuned to the
   exact kinds of questions Dwaekki Gym expects (time, equipment, substitution, food,
   missed days). It always redirects real medical / injury / eating concerns to a
   qualified professional instead of trying to answer them. */

const MEDICAL_RED_FLAGS = [
  "pain","injury","injured","hurt","hurts","fainting","faint","dizzy","dizziness",
  "breathing","chest pain","bleeding","broken","sprain","sprained","eating disorder",
  "throw up","vomit","medication","medicine","diagnos","doctor","sick","illness",
  "pregnant","period pain","cramps severe","can't breathe","numb","injury"
];

const DWAEKKI_INTENTS = [
  {
    test: t => /\b(10|15|5|few)\s*min/.test(t) || (t.includes("short") && t.includes("time")) || t.includes("no time") || t.includes("quick workout"),
    reply: () => "Totally doable! Here's a 10-minute mini version: 3 rounds of — 30 sec squats, 30 sec push-ups (knee is fine), 30 sec plank, 30 sec rest. Short doesn't mean it doesn't count. 🐷💪 Want me to add it to your Today's Move?"
  },
  {
    test: t => t.includes("shorter") || t.includes("make it shorter") || t.includes("cut it down"),
    reply: () => "Easy — just do the first half of the exercise list, or drop it from 3 sets to 2. A shorter workout you actually finish beats a long one you skip. 🐷"
  },
  {
    test: t => (t.includes("dumbbell") || t.includes("resistance band") || t.includes("band")) && !t.includes("no equipment"),
    reply: () => "Nice, dumbbells + a band is a great combo! Try: band squats x12, dumbbell rows x10 each side, band shoulder press x12, dumbbell deadlifts x10. Head to the Workout Hub and pick '🔵 Some equipment' to get a full plan built around exactly that. 🐷🏋️"
  },
  {
    test: t => t.includes("substitut") && (t.includes("exercise") || t.includes("move")),
    reply: () => "Depends what you're swapping! General rule: squats ↔ lunges, push-ups ↔ wall push-ups, plank ↔ glute bridge, jumping jacks ↔ marching in place (if you need low-impact). Tell me the exact exercise and what you have and I'll suggest a direct swap."
  },
  {
    test: t => t.includes("egg") && (t.includes("don't have") || t.includes("dont have") || t.includes("substitute") || t.includes("instead")),
    reply: () => "No eggs, no problem — swap in tofu, paneer, yogurt, or a handful of beans/dal for the protein instead. All good options for a balanced plate. 🍚"
  },
  {
    test: t => t.includes("rice") && t.includes("dal") && (t.includes("make") || t.includes("vegetables")),
    reply: () => "That's basically a full meal already! Cook the dal with a bit of turmeric + salt, sauté the vegetables lightly, serve over rice. Add a squeeze of lemon if you have one. Budget-friendly and balanced. 🍚🌱"
  },
  {
    test: t => t.includes("travel") && !t.includes("equipment"),
    reply: () => "Travel workouts are all about bodyweight moves that need zero space: squats, push-ups, lunges, planks, and marching in place all work great in a hotel room. Want a quick travel-friendly routine?"
  },
  {
    test: t => t.includes("no equipment") || (t.includes("don't have") && t.includes("equipment")) || (t.includes("dont have") && t.includes("equipment")),
    reply: () => "All good — bodyweight is a full workout on its own! Try: squats, push-ups, glute bridges, lunges, and a plank hold. Head to the Workout Hub and pick '🟢 Nothing' for a whole plan built around that."
  },
  {
    test: t => t.includes("missed") && (t.includes("yesterday") || t.includes("today") || t.includes("day")),
    reply: () => "Aishhh, it's okay! We'll continue today — one missed day changes nothing about who you are. Just pick back up with whatever feels doable right now. No streak-shaming here. 🐷💗"
  },
  {
    test: t => t.includes("don't feel like") || t.includes("dont feel like") || t.includes("not motivated") || t.includes("lazy"),
    reply: () => "That's really okay — some days are like that. Even 2 minutes of gentle movement counts, or you can take a full rest day guilt-free. Want a super gentle option instead?"
  },
  {
    test: t => t.includes("explain") || (t.includes("what does") && t.includes("mean")) || t.includes("how does") || t.includes("what is a"),
    reply: () => "Tell me the exact exercise or term and I'll break it down simply — I've got explanations for most moves and fitness terms in Dwaekki School too. 📚"
  },
  {
    test: t => t.includes("fun workout") || t.includes("music workout") || t.includes("dance"),
    reply: () => "Ooh yes — try a 3-minute freestyle dance session, or step-touch to your favorite beat for 2 minutes. Check the '🎵 Music workout' option in the Workout Hub for more!"
  },
  {
    test: t => t.includes("budget") || t.includes("cheap") || t.includes("no money") || t.includes("afford"),
    reply: () => "The Food section has a whole '💸 Budget-friendly' filter — think dal + rice, khichdi, egg fried rice, chana + rice. All filling, all affordable. Want a few ideas right now?"
  },
];

function dwaekkiRespond(rawText){
  const t = rawText.toLowerCase().trim();
  if(!t) return "Say something and I'll try to help! 🐷";

  for(const flag of MEDICAL_RED_FLAGS){
    if(t.includes(flag)){
      return "That's something to discuss with a qualified healthcare professional — a doctor, physiotherapist, or a parent/guardian. I'm only a small fitness & food helper, not a doctor, so I don't want to guess here. Please reach out to someone qualified. 💗";
    }
  }

  for(const intent of DWAEKKI_INTENTS){
    if(intent.test(t)) return intent.reply();
  }

  // gentle generic fallback that still tries to be useful
  if(t.includes("workout") || t.includes("exercise") || t.includes("gym")){
    return "I can help with that! Try the Workout Hub to build a plan around exactly what you have and want, or tell me more specifically what you're looking for (time you have, equipment, or a goal).";
  }
  if(t.includes("food") || t.includes("eat") || t.includes("meal") || t.includes("hungry")){
    return "Head to the Food section for balanced meal ideas by region and diet, or use 'Build My Plate' for a no-guilt way to put a meal together. Want a quick suggestion here instead?";
  }
  return "I'm still learning, but I'm best with questions about workouts, food ideas, or how you're feeling about today's movement. Try asking me something like the suggestions above! 🐷";
}

/* ===================== HYBRID MODE: real AI (online, via Puter.js) ===================== */
/* Puter.js (https://js.puter.com/v2/) gives free, keyless access to real LLMs client-side —
   each user covers their own tiny usage through a free Puter account ("User-Pays" model),
   so this costs Tuli nothing to host. The medical/injury safety check ALWAYS runs locally
   first, before any online call, so no model response can ever skip that boundary. */

const DWAEKKI_SYSTEM_PROMPT = `You are Dwaekki, the friendly pink pig mascot of Dwaekki Gym — a free home-workout and balanced-food app for teens/young adults worldwide (STAYs). Reply in 2-4 short, warm, encouraging sentences with light emoji use. You help with: home workouts (with or without equipment), exercise substitutions, and balanced, non-restrictive food ideas across world cuisines. You are NOT a doctor, dietitian, or therapist: never diagnose, never prescribe treatment or medication, never create calorie counts, weight-loss targets, or extreme/restrictive diet plans. If the user asks about pain, injury, fainting, breathing problems, disordered eating, or any medical concern, say this needs a qualified healthcare professional and stop there. Keep the tone cozy and judgment-free, never body- or weight-focused.`;

function extractPuterText(response){
  if(typeof response === "string") return response;
  if(response?.message?.content){
    const c = response.message.content;
    if(typeof c === "string") return c;
    if(Array.isArray(c)) return c.map(p=>p.text||"").join(" ").trim();
  }
  if(typeof response?.text === "string") return response.text;
  return null;
}

function withTimeout(promise, ms){
  return Promise.race([
    promise,
    new Promise((_,reject)=> setTimeout(()=> reject(new Error("timeout")), ms))
  ]);
}

// Main entry point the app should call — always async, always safe.
async function dwaekkiRespondHybrid(rawText){
  const t = rawText.toLowerCase().trim();

  // Safety net runs locally FIRST, no matter what — online or offline.
  for(const flag of MEDICAL_RED_FLAGS){
    if(t.includes(flag)){
      return { text: dwaekkiRespond(rawText), source: "offline" };
    }
  }

  const online = navigator.onLine && typeof window.puter !== "undefined";
  if(online){
    try{
      const prompt = `${DWAEKKI_SYSTEM_PROMPT}\n\nUser: ${rawText}`;
      const response = await withTimeout(window.puter.ai.chat(prompt), 12000);
      const text = extractPuterText(response);
      if(text) return { text, source: "online" };
    }catch(e){
      // fall through to offline brain below
    }
  }
  return { text: dwaekkiRespond(rawText), source: "offline" };
}
