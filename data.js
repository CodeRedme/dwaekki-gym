// ===================== DWAEKKI GYM DATA =====================

const GOALS = [
  { id: "endurance", en: "Endurance", hi: "Endurance" },
  { id: "strength", en: "Strength", hi: "Strength" },
  { id: "mobility", en: "Mobility", hi: "Mobility" },
  { id: "sports", en: "Sports support", hi: "Sports support" },
  { id: "general", en: "General health", hi: "General health" },
  { id: "gentle", en: "Gentle movement", hi: "Gentle movement" },
  { id: "habit", en: "Fitness habit", hi: "Fitness habit" },
];

const BODY_PARTS = [
  { id: "lower", en: "🦵 Lower Body", hi: "🦵 Lower Body" },
  { id: "upper", en: "💪 Upper Body", hi: "💪 Upper Body" },
  { id: "full", en: "🧍 Full Body", hi: "🧍 Full Body" },
  { id: "core", en: "🌀 Core", hi: "🌀 Core" },
  { id: "cardio", en: "🫀 Cardio", hi: "🫀 Cardio" },
];

const SAFETY_BANNER = {
  en: "⚠️ Use only stable, appropriate equipment and surroundings — never an unstable chair or unsafe anchor point. Start at Easier if you're new to a move, and only go Harder once it feels comfortable.",
  hi: "⚠️ Sirf stable, sahi equipment aur surroundings use karo — koi unstable chair ya unsafe anchor point nahi. Agar move naya hai toh Easier se shuru karo, aur Harder tabhi try karo jab comfortable lage.",
};

const AI_DISCLAIMER = {
  en: "Dwaekki AI is a wellness assistant with a built-in knowledge base. It isn't a doctor, dietitian, or trainer.",
  hi: "Dwaekki AI ek wellness assistant hai jiska apna built-in knowledge base hai. Yeh doctor, dietitian, ya trainer nahi hai.",
};

const EQUIPMENT_OPTIONS = [
  { id: "none", en: "No equipment", hi: "Koi equipment nahi" },
  { id: "dumbbells", en: "Dumbbells", hi: "Dumbbells" },
  { id: "band", en: "Resistance band", hi: "Resistance band" },
  { id: "chair", en: "A chair", hi: "Ek chair" },
  { id: "mat", en: "Mat / floor space", hi: "Mat / floor space" },
  { id: "wall", en: "Wall space", hi: "Wall space" },
  { id: "bottles", en: "Water bottles (as light weights)", hi: "Paani ki bottles (light weight ke liye)" },
];

// Every exercise: minutes ~ rough time cost for the time-finder algorithm
const EXERCISES = [
  {
    id: "march-in-place", name: "March in place", equipment: "none", minutes: 3,
    goals: ["endurance", "general", "habit", "gentle"], bed: false, body: "cardio",
    sets: "2–3 min, steady pace",
    form: "Lift knees comfortably, swing arms naturally, keep breathing easy.",
    safety: "Hold a wall or chair nearby if you feel unsteady.",
    easier: "March slower, smaller knee lift.",
    harder: "Add a light jog-in-place pace.",
  },
  {
    id: "wall-pushups", name: "Wall push-ups", equipment: "wall", minutes: 4,
    goals: ["strength", "general", "habit"], bed: false, body: "upper",
    sets: "2 sets of 10–12",
    form: "Hands shoulder-width on wall, body in a straight line, elbows bend to ~45°.",
    safety: "Stand close to the wall if your wrists feel strained.",
    easier: "Stand closer to the wall for less resistance.",
    harder: "Step feet further back, or try on a countertop instead of a wall.",
  },
  {
    id: "bodyweight-squats", name: "Bodyweight squats", equipment: "none", minutes: 4,
    goals: ["strength", "sports", "general"], bed: false, body: "lower",
    sets: "2–3 sets of 10",
    form: "Feet hip-width, sit hips back like sitting in a chair, chest up.",
    safety: "Only go as low as feels comfortable — no need to go deep.",
    easier: "Squat to a chair seat and stand back up.",
    harder: "Add a small pause at the bottom, or slow the tempo down.",
  },
  {
    id: "chair-squats", name: "Chair sit-to-stand", equipment: "chair", minutes: 4,
    goals: ["strength", "mobility", "gentle", "general"], bed: false, body: "lower",
    sets: "2 sets of 8–10",
    form: "Sit tall, stand up without using hands if possible, sit back down slowly.",
    safety: "Use a sturdy chair against a wall, and use your hands to assist if needed.",
    easier: "Use hands on the armrests to help push up.",
    harder: "Hold a light water bottle in each hand.",
  },
  {
    id: "standing-cat-cow", name: "Standing cat-cow", equipment: "none", minutes: 3,
    goals: ["mobility", "gentle", "general"], bed: false, body: "full",
    sets: "8–10 slow reps",
    form: "Hands on thighs, round the spine on exhale, arch gently on inhale.",
    safety: "Keep movements small and slow — this should never hurt.",
    easier: "Make the range of motion tiny.",
    harder: "Add a slight knee bend to deepen the stretch.",
  },
  {
    id: "bed-ankle-circles", name: "Ankle circles (in bed)", equipment: "none", minutes: 2,
    goals: ["gentle", "mobility", "habit"], bed: true, body: "lower",
    sets: "10 circles each direction, both feet",
    form: "Lie back, lift one foot slightly, rotate the ankle slowly.",
    safety: "Keep it slow — this is a warm-up, not a workout.",
    easier: "Smaller circles.",
    harder: "Add gentle resistance with a hand.",
  },
  {
    id: "bed-glute-bridge", name: "Glute bridge (in bed)", equipment: "none", minutes: 3,
    goals: ["gentle", "strength", "habit"], bed: true, body: "lower",
    sets: "2 sets of 10",
    form: "Lie on back, knees bent, feet flat, lift hips gently, squeeze, lower slowly.",
    safety: "Stop if you feel lower-back strain — the lift should come from the glutes.",
    easier: "Lift just an inch or two.",
    harder: "Pause 2 seconds at the top.",
  },
  {
    id: "bed-arm-reaches", name: "Overhead arm reaches (in bed)", equipment: "none", minutes: 2,
    goals: ["gentle", "mobility", "habit"], bed: true, body: "upper",
    sets: "10 slow reaches",
    form: "Lying down, reach both arms slowly overhead and back down, like a gentle stretch.",
    safety: "Keep it slow and pain-free.",
    easier: "Reach only halfway up.",
    harder: "Hold a light water bottle in each hand.",
  },
  {
    id: "standing-side-bend", name: "Standing side bends", equipment: "none", minutes: 2,
    goals: ["mobility", "gentle"], bed: false, body: "full",
    sets: "8 per side",
    form: "Feet hip-width, reach one arm overhead and lean gently to the side.",
    safety: "Small controlled range — don't force the stretch.",
    easier: "Reduce the lean.",
    harder: "Hold the stretch 3–5 seconds each side.",
  },
  {
    id: "incline-pushups-chair", name: "Incline push-ups (on a chair)", equipment: "chair", minutes: 4,
    goals: ["strength", "sports"], bed: false, body: "upper",
    sets: "2–3 sets of 8–10",
    form: "Hands on a sturdy chair seat, body straight, lower chest toward the chair.",
    safety: "Make sure the chair won't slide — place it against a wall.",
    easier: "Use a higher surface like a countertop.",
    harder: "Use a lower surface, or move toward floor push-ups.",
  },
  {
    id: "standing-knee-raises", name: "Standing knee raises", equipment: "none", minutes: 3,
    goals: ["endurance", "general", "sports"], bed: false, body: "cardio",
    sets: "2 sets of 12 per side",
    form: "Stand tall, lift one knee to hip height, lower with control, alternate.",
    safety: "Hold a wall for balance if needed.",
    easier: "Lift the knee lower.",
    harder: "Add a small hop as you switch sides.",
  },
  {
    id: "plank-knees", name: "Plank on knees", equipment: "mat", minutes: 3,
    goals: ["strength", "general"], bed: false, body: "core",
    sets: "2–3 holds of 15–20 sec",
    form: "Forearms and knees on the mat, body straight from head to knees, core gently braced.",
    safety: "Stop if lower back sags — shorten the hold instead.",
    easier: "Hold for 10 seconds, rest, repeat.",
    harder: "Full plank on toes instead of knees.",
  },
  {
    id: "band-rows", name: "Resistance band rows", equipment: "band", minutes: 4,
    goals: ["strength", "sports"], bed: false, body: "upper",
    sets: "2–3 sets of 12",
    form: "Anchor the band (door or feet), pull elbows straight back, squeeze shoulder blades.",
    safety: "Check the band for wear before pulling hard.",
    easier: "Use less band tension (hold closer to anchor).",
    harder: "Slow the release down to 3 seconds.",
  },
  {
    id: "band-squats", name: "Resistance band squats", equipment: "band", minutes: 4,
    goals: ["strength", "sports"], bed: false, body: "lower",
    sets: "2–3 sets of 12",
    form: "Band under feet, handles at shoulders, squat as usual, keeping tension steady.",
    safety: "Start with light tension until the movement feels familiar.",
    easier: "Remove the band, just do bodyweight squats.",
    harder: "Add a pause at the bottom of each rep.",
  },
  {
    id: "dumbbell-bicep-curl", name: "Dumbbell bicep curls", equipment: "dumbbells", minutes: 3,
    goals: ["strength"], bed: false, body: "upper",
    sets: "2–3 sets of 10–12",
    form: "Elbows close to your sides, curl up with control, lower slowly.",
    safety: "Choose a weight you can lift with clean form for all reps.",
    easier: "Use a lighter dumbbell or water bottle.",
    harder: "Slow the lowering phase to 3 seconds.",
  },
  {
    id: "dumbbell-shoulder-press", name: "Dumbbell shoulder press", equipment: "dumbbells", minutes: 4,
    goals: ["strength", "sports"], bed: false, body: "upper",
    sets: "2–3 sets of 10",
    form: "Seated or standing, press weights overhead, avoid arching your lower back.",
    safety: "Keep the weight light until your shoulders feel confident with the motion.",
    easier: "Press only to eye level instead of full overhead.",
    harder: "Add a 1-second pause at the top.",
  },
  {
    id: "bottle-lateral-raise", name: "Water bottle lateral raises", equipment: "bottles", minutes: 3,
    goals: ["strength", "habit"], bed: false, body: "upper",
    sets: "2 sets of 12",
    form: "Bottles in hand, raise arms out to shoulder height, lower slowly.",
    safety: "Slightly bend the elbows and avoid shrugging the shoulders up.",
    easier: "Raise only to hip height.",
    harder: "Fill bottles fuller, or slow the tempo.",
  },
  {
    id: "standing-calf-raise", name: "Standing calf raises", equipment: "none", minutes: 2,
    goals: ["strength", "general", "habit"], bed: false, body: "lower",
    sets: "2 sets of 15",
    form: "Rise onto your toes slowly, hold a second, lower with control.",
    safety: "Hold a wall or chair for balance.",
    easier: "Smaller range of motion.",
    harder: "Do it on one leg at a time.",
  },
  {
    id: "seated-torso-twist", name: "Seated torso twists", equipment: "chair", minutes: 2,
    goals: ["mobility", "gentle"], bed: false, body: "core",
    sets: "10 per side, slow",
    form: "Sit tall, cross arms over chest, rotate gently from the waist.",
    safety: "Small range, no jerking — this is meant to feel easy.",
    easier: "Rotate even less.",
    harder: "Hold each twist for 3 seconds.",
  },
  {
    id: "walking-in-place-fast", name: "Brisk march / light jog in place", equipment: "none", minutes: 5,
    goals: ["endurance", "sports", "general"], bed: false, body: "cardio",
    sets: "5 min continuous, or 30 sec on / 30 sec rest",
    form: "Pump arms, land softly, breathe steadily.",
    safety: "Ease off the pace if you get out of breath fast — that's a sign to slow down.",
    easier: "Slow march instead of jog.",
    harder: "Add high knees for 20 seconds at a time.",
  },
  {
    id: "child-pose-stretch", name: "Child's pose stretch", equipment: "mat", minutes: 2,
    goals: ["gentle", "mobility"], bed: false, body: "full",
    sets: "Hold 30–45 sec",
    form: "Kneel, sit back toward heels, stretch arms forward, relax the shoulders.",
    safety: "Skip if it strains your knees — try the bed stretch version instead.",
    easier: "Place a pillow under your hips for support.",
    harder: "Walk hands further forward for a deeper stretch.",
  },
  {
    id: "band-bicep-curl", name: "Resistance band bicep curls", equipment: "band", minutes: 3,
    goals: ["strength"], bed: false, body: "upper",
    sets: "2–3 sets of 12",
    form: "Stand on the band, curl handles up with elbows tucked in.",
    safety: "Check band anchoring is secure before each set.",
    easier: "Stand with feet closer together for less tension.",
    harder: "Stand with feet wider apart for more tension.",
  },
  {
    id: "dead-bug", name: "Dead bug (core)", equipment: "mat", minutes: 3,
    goals: ["strength", "general", "sports"], bed: false, body: "core",
    sets: "2 sets of 8 per side",
    form: "Lie on back, arms up, knees bent 90°. Lower opposite arm and leg slowly, keeping back flat.",
    safety: "Stop if your lower back lifts off the floor — that means to shrink the range.",
    easier: "Move only the legs, keep arms still.",
    harder: "Slow it down and hold the extended position for 2 seconds.",
  },
  {
    id: "gentle-neck-rolls", name: "Gentle neck rolls", equipment: "none", minutes: 1,
    goals: ["gentle", "mobility", "habit"], bed: true, body: "full",
    sets: "5 slow circles each way",
    form: "Slowly tilt the head in a circle, staying relaxed.",
    safety: "Keep it slow and pain-free; skip if you have neck issues.",
    easier: "Half circles (ear to ear) instead of full rotation.",
    harder: "Hold each side position 3 seconds.",
  },
];

const FOOD_REGIONS = [
  { id: "south-asian", en: "🇮🇳 South Asian", hi: "🇮🇳 South Asian" },
  { id: "korean", en: "🇰🇷 Korean", hi: "🇰🇷 Korean" },
  { id: "japanese", en: "🇯🇵 Japanese", hi: "🇯🇵 Japanese" },
  { id: "chinese", en: "🇨🇳 Chinese", hi: "🇨🇳 Chinese" },
  { id: "filipino", en: "🇵🇭 Filipino", hi: "🇵🇭 Filipino" },
  { id: "indonesian", en: "🇮🇩 Indonesian", hi: "🇮🇩 Indonesian" },
  { id: "thai", en: "🇹🇭 Thai", hi: "🇹🇭 Thai" },
  { id: "vietnamese", en: "🇻🇳 Vietnamese", hi: "🇻🇳 Vietnamese" },
  { id: "mexican", en: "🇲🇽 Mexican", hi: "🇲🇽 Mexican" },
  { id: "italian", en: "🇮🇹 Italian", hi: "🇮🇹 Italian" },
  { id: "mediterranean", en: "🌊 Mediterranean", hi: "🌊 Mediterranean" },
  { id: "american", en: "🇺🇸 American", hi: "🇺🇸 American" },
  { id: "british", en: "🇬🇧 British", hi: "🇬🇧 British" },
  { id: "african", en: "🌍 African-inspired", hi: "🌍 African-inspired" },
];

const DIETS = [
  { id: "veg", en: "Vegetarian", hi: "Vegetarian" },
  { id: "eggetarian", en: "Eggetarian", hi: "Eggetarian" },
  { id: "nonveg", en: "Non-vegetarian", hi: "Non-vegetarian" },
];

// meal ideas keyed by region -> diet -> array of {name, note}
// A STAY anywhere in the world should find something that feels like home.
const MEAL_IDEAS = {
  "south-asian": {
    veg: [
      { name: "Dal, rice & sautéed sabzi", note: "Lentils + a vegetable + whole grain — a classic balanced plate." },
      { name: "Vegetable khichdi with curd", note: "Rice + lentils cooked together, topped with yogurt for protein." },
      { name: "Chana chaat with roti", note: "Chickpeas, chopped veg, a squeeze of lemon, whole-wheat roti." },
    ],
    eggetarian: [
      { name: "Egg bhurji with roti & salad", note: "Scrambled eggs with onion-tomato, whole-wheat roti on the side." },
      { name: "Boiled egg + dal + rice", note: "Add a boiled egg to a regular dal-rice plate for extra protein." },
    ],
    nonveg: [
      { name: "Chicken curry with rice & salad", note: "Lean chicken, a grain, and something raw or lightly cooked veg." },
      { name: "Grilled fish with sabzi & roti", note: "Simple grilled or pan-cooked fish, a vegetable side, whole grain." },
    ],
  },
  korean: {
    veg: [
      { name: "Bibimbap with tofu", note: "Rice, sautéed veg, tofu, a little gochujang — mix it all together." },
      { name: "Doenjang-jjigae (soybean stew) with rice", note: "Soybean paste stew with vegetables and tofu, served with rice." },
    ],
    eggetarian: [
      { name: "Gyeran-bap (egg rice)", note: "Warm rice topped with a fried or mixed egg, sesame oil, and soy sauce." },
      { name: "Kimchi fried rice with a fried egg", note: "Quick, warming, and balanced with veg from the kimchi." },
    ],
    nonveg: [
      { name: "Bulgogi with rice & vegetables", note: "Thin-sliced marinated beef or chicken, grilled, with rice and a veg side." },
      { name: "Doenjang-jjigae with fish & rice", note: "Same stew base, with a lean fish added for protein." },
    ],
  },
  japanese: {
    veg: [
      { name: "Vegetable & tofu miso soup with rice", note: "Light broth, tofu, seasonal vegetables, steamed rice." },
      { name: "Vegetable yaki udon", note: "Stir-fried udon noodles with mixed vegetables and soy-based sauce." },
    ],
    eggetarian: [
      { name: "Tamagoyaki with rice & miso soup", note: "Japanese rolled omelette, rice, and a light soup." },
      { name: "Onigiri with a soft-boiled egg", note: "Rice balls plus an egg for extra protein." },
    ],
    nonveg: [
      { name: "Grilled salmon, rice & miso soup", note: "Simple pan-grilled fish, a grain, and a warm soup." },
      { name: "Chicken teriyaki with rice & greens", note: "Lean protein, a light sauce, and a vegetable side." },
    ],
  },
  chinese: {
    veg: [
      { name: "Mapo tofu (mild) with rice", note: "Tofu simmered in a light savory sauce, served over rice." },
      { name: "Vegetable fried rice", note: "Rice, mixed veg, soy sauce, a little garlic and ginger." },
    ],
    eggetarian: [
      { name: "Egg fried rice with vegetables", note: "Classic combo — egg for protein, veg for fiber and vitamins." },
      { name: "Tomato & egg stir-fry with rice", note: "A homestyle staple — soft scrambled eggs with tomato, over rice." },
    ],
    nonveg: [
      { name: "Chicken & vegetable stir-fry with rice", note: "Lean protein, colorful veg, light sauce, over rice." },
      { name: "Steamed fish with rice & greens", note: "Simple steamed fish, ginger-scallion, rice, and a vegetable side." },
    ],
  },
  filipino: {
    veg: [
      { name: "Ginisang gulay (sautéed mixed vegetables) with rice", note: "Mixed vegetables sautéed with garlic and onion, served with rice." },
      { name: "Tofu sinigang (sour tofu-vegetable soup) with rice", note: "Tangy tamarind-based soup with tofu and vegetables." },
    ],
    eggetarian: [
      { name: "Tortang talong (eggplant omelette) with rice", note: "Grilled eggplant dipped in egg and pan-fried, with rice." },
    ],
    nonveg: [
      { name: "Chicken tinola with rice", note: "Ginger-based chicken and vegetable soup, served with rice." },
      { name: "Grilled fish (inihaw) with rice & veg", note: "Simple grilled fish, rice, and a vegetable side." },
    ],
  },
  indonesian: {
    veg: [
      { name: "Gado-gado (veg salad with peanut dressing)", note: "Mixed vegetables and tofu/tempeh with a light peanut sauce." },
      { name: "Tempeh & vegetable stir-fry with rice", note: "Tempeh is a great plant protein here, with mixed veg." },
    ],
    eggetarian: [
      { name: "Nasi goreng with a fried egg", note: "Indonesian fried rice topped with a fried egg." },
    ],
    nonveg: [
      { name: "Chicken satay with rice & cucumber salad", note: "Grilled lean protein, grain, and fresh veg." },
    ],
  },
  thai: {
    veg: [
      { name: "Vegetable pad see ew with tofu", note: "Noodles, tofu, and greens — swap tofu in for meat easily." },
      { name: "Tofu green curry with rice", note: "Coconut-based curry with vegetables and tofu, milder spice optional." },
    ],
    eggetarian: [
      { name: "Thai fried rice with a fried egg on top", note: "A quick, balanced staple." },
    ],
    nonveg: [
      { name: "Chicken pad see ew", note: "Stir-fried noodles, lean chicken, and greens." },
    ],
  },
  vietnamese: {
    veg: [
      { name: "Vegetable & tofu pho", note: "Light broth noodle soup with tofu and fresh herbs/vegetables." },
      { name: "Vegetable spring rolls with rice", note: "Fresh veg wrapped in rice paper, light and balanced." },
    ],
    eggetarian: [
      { name: "Banh mi with fried egg & pickled veg", note: "Whole-grain bread, egg, fresh pickled vegetables." },
    ],
    nonveg: [
      { name: "Chicken pho", note: "Lean chicken, rice noodles, herbs, and broth." },
    ],
  },
  mexican: {
    veg: [
      { name: "Black bean & rice bowl with veg", note: "Beans + rice makes a complete plant protein, plus veg toppings." },
      { name: "Veggie tacos with beans", note: "Corn tortillas, beans, and whatever veg you have." },
    ],
    eggetarian: [
      { name: "Huevos rancheros", note: "Eggs over beans and tortilla with tomato salsa." },
    ],
    nonveg: [
      { name: "Grilled chicken tacos with salsa", note: "Lean protein, fresh toppings, corn or whole-wheat tortilla." },
    ],
  },
  italian: {
    veg: [
      { name: "Pasta with tomato sauce & veggies", note: "Whole-wheat pasta, tomato sauce, mixed vegetables tossed in." },
      { name: "Minestrone soup with bread", note: "Vegetable and bean soup, warm and filling." },
    ],
    eggetarian: [
      { name: "Vegetable frittata with bread", note: "Baked egg dish with mixed vegetables, whole-grain bread on the side." },
    ],
    nonveg: [
      { name: "Chicken & vegetable pasta", note: "Lean chicken, whole-wheat pasta, and veg tossed together." },
    ],
  },
  mediterranean: {
    veg: [
      { name: "Hummus, falafel & salad wrap", note: "Chickpea-based protein, fresh veg, whole-grain pita." },
      { name: "Lentil soup with pita", note: "Warm, filling, and protein-rich from the lentils." },
    ],
    eggetarian: [
      { name: "Shakshuka (eggs in tomato sauce)", note: "Eggs poached in a spiced tomato-pepper sauce, with bread." },
    ],
    nonveg: [
      { name: "Grilled chicken shawarma bowl", note: "Lean chicken, rice or salad base, veg toppings." },
    ],
  },
  american: {
    veg: [
      { name: "Bean & veggie wrap", note: "Beans for protein, mixed veg, whole-wheat wrap." },
      { name: "Loaded veggie & bean bowl", note: "Rice or quinoa base, beans, roasted veg." },
    ],
    eggetarian: [
      { name: "Veggie omelette with toast", note: "Eggs + chopped vegetables, whole-grain toast on the side." },
    ],
    nonveg: [
      { name: "Grilled chicken salad", note: "Lean chicken over greens with a light dressing." },
      { name: "Baked fish with roasted veg", note: "Simple oven bake — fish, olive oil, seasonal vegetables." },
    ],
  },
  british: {
    veg: [
      { name: "Baked beans on wholegrain toast with veg", note: "Simple, filling, and easy to make anywhere." },
    ],
    eggetarian: [
      { name: "Veggie scramble on toast", note: "Scrambled eggs with mixed vegetables, whole-grain toast." },
    ],
    nonveg: [
      { name: "Grilled chicken with roasted veg", note: "Lean protein and a colorful vegetable side." },
    ],
  },
  african: {
    veg: [
      { name: "Lentil stew with a whole grain", note: "Protein-rich lentils simmered with vegetables, served with rice or injera-style grain." },
    ],
    eggetarian: [
      { name: "Vegetable stew topped with a boiled egg", note: "Adds easy protein to a veg stew." },
    ],
    nonveg: [
      { name: "Grilled chicken with a grain & greens", note: "Simple lean protein, a grain, and cooked greens." },
    ],
  },
};

// Build-a-meal builder options
const BUILDER = {
  energy: ["Rice", "Roti / whole wheat bread", "Noodles", "Oats", "Potatoes", "Quinoa"],
  protein: ["Dal / lentils", "Eggs", "Tofu / paneer", "Chickpeas / beans", "Chicken", "Fish", "Yogurt / curd"],
  veg: ["Leafy greens", "Tomato & onion", "Mixed vegetables", "Carrot & cucumber", "Seasonal fruit"],
  extra: ["A handful of nuts", "A spoon of ghee/oil", "Extra veg portion", "A glass of milk or buttermilk", "None, this is enough"],
};

// ===================== "USE WHAT I ALREADY HAVE" =====================
// Simple keyword matcher — no grocery run required. Each entry lists the
// ingredients it needs (matched loosely against what the user typed) and
// the dish it becomes. Order matters a little: more-specific combos first.
const INGREDIENT_DISHES = [
  { need: ["rice", "egg"], name: "🍳 Egg fried rice", note: "Rice + egg, scrambled together with whatever veg you've got." },
  { need: ["potato", "egg"], name: "🥔 Potato & egg bowl", note: "Pan-fried potato cubes with scrambled egg on top." },
  { need: ["rice", "dal"], name: "🍚 Simple dal-rice", note: "Lentils simmered soft, served over rice." },
  { need: ["rice", "lentil"], name: "🍚 Simple dal-rice", note: "Lentils simmered soft, served over rice." },
  { need: ["rice", "vegetable"], name: "🥕 Vegetable pulao", note: "Rice cooked with whatever chopped vegetables you have." },
  { need: ["rice", "tomato", "onion"], name: "🍚 Tomato-onion rice", note: "Rice tossed with a quick tomato-onion sauté." },
  { need: ["pasta", "tomato"], name: "🍝 Simple tomato pasta", note: "Pasta with a tomato-based sauce, any veg tossed in." },
  { need: ["bread", "egg"], name: "🍞 Egg toast", note: "Fried or scrambled egg on toasted bread." },
  { need: ["oats", "banana"], name: "🍌 Banana oats", note: "Oats cooked soft with mashed banana stirred in." },
  { need: ["potato", "onion"], name: "🥔 Potato-onion sabzi", note: "Cubed potato sautéed with onion and light spices." },
  { need: ["chickpea", "tomato"], name: "🫘 Simple chickpea curry", note: "Chickpeas simmered in a tomato-onion base." },
  { need: ["bean", "rice"], name: "🍚 Bean & rice bowl", note: "Beans and rice together — a complete plant protein plate." },
  { need: ["tofu", "vegetable"], name: "🥢 Tofu & veg stir-fry", note: "Tofu cubes stir-fried with whatever vegetables you have." },
  { need: ["yogurt", "vegetable"], name: "🥗 Yogurt-veg salad", note: "Chopped veg mixed into yogurt with a pinch of salt/spice." },
  { need: ["noodle", "vegetable"], name: "🍜 Vegetable noodles", note: "Noodles stir-fried or boiled with whatever veg you have." },
];

// ===================== DWAEKKI AI (rule-based, on-device) =====================
// Each rule: array of trigger keywords + a response generator. Order matters — first match wins.

const MEDICAL_REDIRECT_EN = "This is something to discuss with a qualified healthcare professional. Dwaekki cares about you, but can't give medical advice. 💗";
const MEDICAL_REDIRECT_HI = "Yeh ek qualified healthcare professional se discuss karne wali baat hai. Dwaekki tumhara khayal rakhta hai, par medical advice nahi de sakta. 💗";

const AI_RULES = [
  {
    keywords: ["pain", "hurt", "injur", "injury", "faint", "dizzy", "breath", "chest", "eating disorder", "not eating", "vomit", "sick", "fever", "bleeding"],
    respond: (lang) => (lang === "hi" ? MEDICAL_REDIRECT_HI : MEDICAL_REDIRECT_EN),
  },
  {
    keywords: ["10 minutes", "10 min", "short on time", "little time"],
    respond: (lang) => quickRoutineText(10, lang),
  },
  {
    keywords: ["5 minutes", "5 min"],
    respond: (lang) => quickRoutineText(5, lang),
  },
  {
    keywords: ["dumbbell", "resistance band", "band and"],
    respond: (lang) => lang === "hi"
      ? "Nice! Dumbbells aur band ke saath tum strength-focused moves try kar sakte ho — Library ke 'Strength' tab mein dekho, ya 'I have equipment' section kholo aur tick karo jo tumhare paas hai."
      : "Nice! With dumbbells and a band, you've got great options for strength moves — check the 'Strength' filter in the Library, or open 'I have equipment' and tick what you've got.",
  },
  {
    keywords: ["substitute", "instead of this exercise", "alternative exercise", "swap this"],
    respond: (lang) => lang === "hi"
      ? "Har exercise card ke 'Variations' mein easier aur harder options hain — waha se ek dekho jo tumhare liye better fit ho. Ya mujhe bata do konsi exercise, main suggest karta hoon!"
      : "Every exercise card has 'easier' and 'harder' variations tucked under Variations — check those out. Or tell me which exercise, and I'll suggest a swap!",
  },
  {
    keywords: ["no eggs", "don't have eggs", "dont have eggs", "without eggs"],
    respond: () => "No eggs? Easy swap — try tofu, paneer, chickpeas, or a bit of yogurt/curd for protein instead. All work great in most recipes!",
  },
  {
    keywords: ["rice, dal", "rice dal", "rice and dal", "rice, and vegetables", "dal and vegetables", "rice dal vegetables"],
    respond: () => "That's a great base! Try: dal simmered with a little turmeric and cumin, rice steamed on the side, and vegetables lightly sautéed with garlic. That's a full balanced plate right there 🍚",
  },
  {
    keywords: ["travel", "traveling", "travelling", "hotel", "no equipment on"],
    respond: () => "Traveling STAYs, this one's for you — open 'I have Nothing' from the home screen. Everything there uses just your bodyweight, no gear needed, and most moves fit in a small hotel room.",
  },
  {
    keywords: ["shorter", "make it shorter", "less time"],
    respond: () => "Totally — cut your sets in half, or drop to just 2–3 exercises instead of the full list. A short workout you actually finish beats a long one you skip.",
  },
  {
    keywords: ["what does", "what is", "mean by", "how do i do", "how to do"],
    respond: () => "Tap on any exercise card in the Library to open its Form Tips, Safety Notes, and Variations — that usually clears it up! If you tell me the exercise name here, I can also give you a quick pointer.",
  },
  {
    keywords: ["missed yesterday", "missed a day", "skipped yesterday", "didn't workout"],
    respond: (lang) => lang === "hi"
      ? "Ek din miss kiya? Bilkul theek hai. Koi streak nahi toota, koi points nahi kate. Aaj se bas dobara shuru karte hain 🐷💗"
      : "Missed a day? Totally okay. Nothing resets, no points get taken away. Let's just pick back up today 🐷💗",
  },
  {
    keywords: ["diet", "lose weight", "weight loss", "extreme", "cut calories", "starve"],
    respond: () => "Dwaekki doesn't do extreme diets or weight-focused plans — just balanced meal ideas. Check the Food tab for region + diet-type meal ideas, or try Build-a-Meal to put together something balanced yourself!",
  },
  {
    keywords: ["hi", "hello", "hey", "annyeong", "hii", "helo"],
    respond: (lang) => lang === "hi"
      ? "Hiii! Main Dwaekki hoon 🐷 Aaj kis cheez mein help chahiye — workout, khana, ya bas motivation?"
      : "Hiii, Dwaekki here 🐷 What do you need today — a workout, a meal idea, or just a little motivation?",
  },
  {
    keywords: ["thank", "thanks", "gomawo", "thank you"],
    respond: () => "Anytime! Proud of you for showing up today 💗",
  },
];

function quickRoutineText(mins, lang) {
  const picks = EXERCISES.filter((e) => e.equipment === "none" || e.equipment === "wall")
    .sort((a, b) => a.minutes - b.minutes)
    .slice(0, mins <= 5 ? 2 : 3)
    .map((e) => e.name)
    .join(", ");
  return lang === "hi"
    ? `${mins} minute? Koi baat nahi! Try karo: ${picks}. Time Finder tab mein full details mil jayenge.`
    : `${mins} minutes? No problem! Try: ${picks}. Open the Time Finder tab for full details on each.`;
}

const AI_FALLBACK = {
  en: "I might not have a canned answer for that one, but here's what I'd try: check the Library for a matching move, or the Food tab for meal ideas. And remember — for anything medical, a real professional is always the better call than me. 💗",
  hi: "Uske liye shayad meri specific reply nahi hai, par yeh try karo: Library mein matching move dekho, ya Food tab mein meal ideas. Aur haan — kisi bhi medical cheez ke liye, ek real professional hamesha mujhse better hoga. 💗",
};

const AI_SUGGESTIONS = [
  "I only have 10 minutes today",
  "I have dumbbells and a resistance band",
  "I don't have eggs, what can I use instead?",
  "What can I make with rice, dal and vegetables?",
  "I'm travelling and don't have equipment",
  "Can you make my workout shorter?",
  "I missed yesterday, what should I do today?",
];

const DAILY_MISSIONS = [
  { en: "Drink a glass of water before you check your phone.", hi: "Phone dekhne se pehle ek glass paani piyo." },
  { en: "Do 10 slow bodyweight squats, anywhere.", hi: "Kahin bhi 10 slow bodyweight squats karo." },
  { en: "Stretch your arms overhead for 30 seconds.", hi: "30 second ke liye apne haath overhead stretch karo." },
  { en: "Take a 3-minute walk, even indoors.", hi: "3 minute ki walk lo, ghar ke andar hi sahi." },
  { en: "Roll your shoulders back 10 times.", hi: "Apne shoulders ko 10 baar peeche roll karo." },
  { en: "Sit up straight and take 5 deep breaths.", hi: "Seedhe baitho aur 5 deep breaths lo." },
  { en: "Do a 20-second wall sit.", hi: "20 second ka wall sit karo." },
  { en: "March in place for 1 minute.", hi: "1 minute ke liye march in place karo." },
  { en: "Add one vegetable to your next meal.", hi: "Apne agle meal mein ek vegetable add karo." },
  { en: "Do 5 gentle neck rolls each side.", hi: "Har side 5 gentle neck rolls karo." },
];

const LOW_ENERGY_MESSAGE = {
  en: "Today doesn't have to be a big workout. Let's just move gently. 🐷💗",
  hi: "Aaj bade workout ki zaroorat nahi. Bas thoda gentle move karte hain. 🐷💗",
};

// ===================== TIMED WORKOUT SESSIONS =====================
const DEFAULT_WORK_SECONDS = 40;
const DEFAULT_REST_SECONDS = 20;
const REST_MESSAGES = [
  { en: "Rest, STAY. Take a little breather. You don't have to rush.", hi: "Rest karo, STAY. Thoda saans lo. Jaldi karne ki zaroorat nahi." },
  { en: "Nice work. A short pause is part of the workout too.", hi: "Bahut badhiya. Thoda rukna bhi workout ka hissa hai." },
  { en: "Shake it out. Dwaekki's got you.", hi: "Thoda shake out karo. Dwaekki tumhare saath hai." },
];

// ===================== DWAEKKI'S LITTLE DAY (gentle missions + food box) =====================
// Not every mission has to be exercise — wellbeing over workout count.
const GENTLE_MISSIONS = [
  { id: "workout", en: "Complete a workout", hi: "Ek workout complete karo" },
  { id: "movebreak", en: "Take a movement break", hi: "Ek movement break lo" },
  { id: "water", en: "Drink some water", hi: "Thoda paani piyo" },
  { id: "stretch", en: "Do a quick stretch", hi: "Thoda stretch karo" },
  { id: "screenbreak", en: "Take a screen break", hi: "Screen se thoda break lo" },
  { id: "rest", en: "Get a little rest", hi: "Thoda rest karo" },
  { id: "meal", en: "Eat a balanced meal", hi: "Ek balanced meal khao" },
];

// Random food reward pool — pure collectible fun, not nutrition scoring.
const FOOD_STICKERS = [
  { emoji: "🥕", en: "Carrot", hi: "Carrot" },
  { emoji: "🍎", en: "Apple", hi: "Seb" },
  { emoji: "🍓", en: "Strawberry", hi: "Strawberry" },
  { emoji: "🥚", en: "Egg", hi: "Anda" },
  { emoji: "🍚", en: "Rice bowl", hi: "Rice bowl" },
  { emoji: "🥬", en: "Greens", hi: "Greens" },
  { emoji: "🍌", en: "Banana", hi: "Kela" },
  { emoji: "🍊", en: "Orange", hi: "Santra" },
  { emoji: "🥦", en: "Broccoli", hi: "Broccoli" },
  { emoji: "🍙", en: "Onigiri", hi: "Onigiri" },
  { emoji: "🌮", en: "Taco", hi: "Taco" },
  { emoji: "🍝", en: "Pasta", hi: "Pasta" },
  { emoji: "🫘", en: "Beans", hi: "Beans" },
  { emoji: "🍞", en: "Bread", hi: "Bread" },
];

const DWAEKKI_MOODS = { normal: "🐷", happy: "🐷💗", eating: "🐷😋" };

// ===================== DWAEKKI DASH (mini game) =====================
// A tiny offline endless-runner. Collect good things, dodge the one unsafe
// obstacle type. No calories, no weight, no pressure — just a little fun.
const GAME_ITEMS = {
  good: [
    { symbol: "💧", label_en: "Water", label_hi: "Paani", points: 1 },
    { symbol: "🥕", label_en: "Food", label_hi: "Khana", points: 1 },
    { symbol: "⭐", label_en: "Star", label_hi: "Star", points: 3 },
    { symbol: "❤️", label_en: "Rest heart", label_hi: "Rest heart", points: 2 },
  ],
  bad: { symbol: "💥", label_en: "Unsafe obstacle", label_hi: "Unsafe obstacle" },
};
