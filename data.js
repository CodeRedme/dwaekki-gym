/* ===================== DWAEKKI GYM — DATA ===================== */

const APP_VERSION = "1.10.0";

const EXERCISES = {
  none: {
    strength: ["Bodyweight squats — 3 x 12", "Wall push-ups (or floor push-ups) — 3 x 10", "Glute bridges — 3 x 15", "Standing lunges — 3 x 10 each leg", "Plank hold — 3 x 20 sec"],
    cardio: ["Marching in place — 2 min", "Jumping jacks (or step jacks) — 3 x 30 sec", "High knees — 3 x 30 sec", "Butt kicks — 3 x 30 sec", "Fast-paced walking on the spot — 2 min"],
    mobility: ["Neck rolls — 5 each way", "Cat-cow stretch — 8 reps", "Standing side bends — 8 each side", "Hip circles — 8 each way", "Ankle rolls — 8 each foot"],
    energy: ["Jumping jacks — 3 x 20", "Arm circles — 2 x 20", "Standing march with arm swings — 2 min", "Bodyweight squats — 2 x 10"],
    general: ["Squats — 3 x 12", "Push-ups — 3 x 8", "Plank — 3 x 20 sec", "Marching in place — 2 min", "Standing stretch — 1 min"],
    posture: ["Wall angels — 2 x 10", "Chin tucks — 2 x 10", "Standing rows with a towel — 2 x 12", "Chest opener stretch — 3 x 20 sec"],
    music: ["Freestyle dance — 3 min", "Step-touch to the beat — 2 min", "Arm groove + squat combo — 2 min"],
    beginner: ["Chair-assisted squats — 2 x 8", "Wall push-ups — 2 x 8", "Standing marches — 2 min", "Gentle side stretch — 2 x 20 sec"],
    gentle: ["Seated deep breathing — 2 min", "Gentle neck stretch — 5 each side", "Slow cat-cow — 6 reps", "Standing forward fold — 3 x 15 sec"]
  },
  basic: {
    strength: ["Chair squats — 3 x 12", "Push-ups (knee or full) — 3 x 10", "Towel rows (looped on a door) — 3 x 12", "Step-ups on a stair — 3 x 10 each leg", "Plank — 3 x 25 sec"],
    cardio: ["Stair step-ups — 3 x 30 sec", "Jumping jacks — 3 x 30 sec", "Shadow boxing — 2 min", "Fast marching — 2 min"],
    mobility: ["Wall-assisted hamstring stretch — 3 x 20 sec", "Doorway chest stretch — 3 x 20 sec", "Seated spinal twist — 6 each side"],
    energy: ["Chair squat pulses — 2 x 15", "Jumping jacks — 3 x 20", "Arm circles — 2 x 20"],
    general: ["Chair squats — 3 x 12", "Push-ups — 3 x 8", "Stair step-ups — 3 x 30 sec", "Plank — 3 x 25 sec"],
    posture: ["Wall angels — 2 x 10", "Towel pull-aparts — 2 x 12", "Doorway chest stretch — 3 x 20 sec"],
    music: ["Freestyle dance — 3 min", "Step combo to a beat — 2 min"],
    beginner: ["Chair squats — 2 x 8", "Wall push-ups — 2 x 8", "Marching — 2 min"],
    gentle: ["Seated stretch flow — 3 min", "Slow breathing with arm raises — 2 min"]
  },
  some: {
    strength: ["Dumbbell/band squats — 3 x 12", "Dumbbell rows — 3 x 10 each side", "Band shoulder press — 3 x 12", "Kettlebell/dumbbell deadlifts — 3 x 10", "Band bicep curls — 3 x 12"],
    cardio: ["Skipping rope — 3 x 1 min", "Kettlebell swings — 3 x 12", "Bike sprint intervals — 5 x 1 min", "Jump rope + squat combo — 3 rounds"],
    mobility: ["Band-assisted shoulder stretch — 3 x 20 sec", "Foam-roll style self massage on mat — 3 min", "Band hip openers — 8 each side"],
    energy: ["Kettlebell swings — 3 x 10", "Skipping rope — 2 x 1 min", "Band rows — 2 x 12"],
    general: ["Dumbbell squats — 3 x 12", "Band rows — 3 x 12", "Skipping rope — 3 x 1 min", "Plank on mat — 3 x 30 sec"],
    posture: ["Band pull-aparts — 3 x 15", "Dumbbell rows — 3 x 12", "Doorway chest stretch — 3 x 20 sec"],
    music: ["Dumbbell groove combo — 3 min", "Skipping to the beat — 2 min"],
    beginner: ["Light dumbbell squats — 2 x 10", "Band rows — 2 x 10", "Mat stretch — 2 min"],
    gentle: ["Mat-based stretch flow — 4 min", "Light band mobility — 3 min"]
  },
  full: {
    strength: ["Pull-ups (assisted if needed) — 3 x 6", "Dumbbell/kettlebell squats — 4 x 10", "Bench/floor press with dumbbells — 3 x 10", "Kettlebell deadlifts — 3 x 10", "Dumbbell rows — 3 x 12"],
    cardio: ["Treadmill intervals — 5 x 1 min fast / 1 min easy", "Bike sprints — 5 x 1 min", "Skipping rope — 4 x 1 min", "Kettlebell swings — 4 x 15"],
    mobility: ["Full-body mat stretch flow — 6 min", "Band shoulder mobility — 3 x 20 sec", "Pigeon pose stretch — 3 x 20 sec each side"],
    energy: ["Kettlebell swings — 3 x 12", "Skipping rope — 3 x 1 min", "Treadmill fast walk incline — 3 min"],
    general: ["Squats — 4 x 10", "Dumbbell rows — 3 x 12", "Treadmill/bike — 5 min", "Plank — 3 x 30 sec"],
    posture: ["Pull-ups or band rows — 3 x 8", "Face pulls with band — 3 x 12", "Chest stretch — 3 x 20 sec"],
    music: ["Kettlebell + dance groove combo — 3 min", "Treadmill dance-walk — 3 min"],
    beginner: ["Dumbbell squats (light) — 2 x 10", "Bike — 3 min easy pace", "Mat stretch — 2 min"],
    gentle: ["Full mat stretch flow — 6 min", "Slow bike spin — 3 min easy"]
  }
};

const DWAEKKI_LEVELS = [
  {min:0, name:"Baby Dwaekki", emoji:"🐷"},
  {min:5, name:"Mini Dwaekki", emoji:"🐖"},
  {min:15, name:"Strong Dwaekki", emoji:"🐗"},
  {min:30, name:"Mega Dwaekki", emoji:"🦾🐷"},
  {min:50, name:"Legendary Dwaekki", emoji:"👑🐷"}
];

const ACHIEVEMENTS = [
  {id:"first_move", emoji:"🏆", name:"First Move", desc:"Completed your first workout", check:s=>s.workouts>=1},
  {id:"bunny_bounce", emoji:"🐰", name:"Bunny Bounce", desc:"Completed 5 sessions", check:s=>s.workouts>=5},
  {id:"dwaekki_mode", emoji:"🐷", name:"Dwaekki Mode", desc:"Completed 10 sessions", check:s=>s.workouts>=10},
  {id:"consistency_stay", emoji:"🌱", name:"Consistency STAY", desc:"Active across multiple weeks", check:s=>s.weeksActive>=2},
  {id:"food_explorer", emoji:"🍚", name:"Food Explorer", desc:"Tried meals from 3 cuisines", check:s=>s.cuisinesTried.length>=3},
  {id:"home_gym_hero", emoji:"🏠", name:"Home Gym Hero", desc:"Tried both equipment & no-equipment workouts", check:s=>s.eqTypesTried.length>=2},
  {id:"rest_matters", emoji:"💗", name:"Rest Matters", desc:"Respected a rest / recovery day", check:s=>s.restDays>=1},
  {id:"arcade_fan", emoji:"🎮", name:"Arcade Fan", desc:"Played 3 different arcade games", check:s=>s.gamesPlayed.length>=3}
];

const FOOD_REGIONS = [
  { id: "indian", label: "🇮🇳 South Asian" },
  { id: "korean", label: "🇰🇷 Korean" },
  { id: "japanese", label: "🇯🇵 Japanese" },
  { id: "chinese", label: "🇨🇳 Chinese" },
  { id: "filipino", label: "🇵🇭 Filipino" },
  { id: "indonesian", label: "🇮🇩 Indonesian" },
  { id: "thai", label: "🇹🇭 Thai" },
  { id: "vietnamese", label: "🇻🇳 Vietnamese" },
  { id: "mexican", label: "🇲🇽 Mexican" },
  { id: "italian", label: "🇮🇹 Italian" },
  { id: "mediterranean", label: "🌊 Mediterranean" },
  { id: "american", label: "🇺🇸 American" },
  { id: "british", label: "🇬🇧 British" },
  { id: "african", label: "🌍 African-inspired" }
];

const MEALS = {
  indian: {
    veg: [
      { name: "Dal, rice & sautéed sabzi", note: "Lentils + a vegetable + whole grain — a classic balanced plate." },
      { name: "Vegetable khichdi with curd", note: "Rice + lentils cooked together, topped with yogurt for protein." },
      { name: "Chana chaat with roti", note: "Chickpeas, chopped veg, a squeeze of lemon, whole-wheat roti." }
    ],
    eggitarian: [
      { name: "Egg bhurji with roti & salad", note: "Scrambled eggs with onion-tomato, whole-wheat roti on the side." },
      { name: "Boiled egg + dal + rice", note: "Add a boiled egg to a regular dal-rice plate for extra protein." }
    ],
    nonveg: [
      { name: "Chicken curry with rice & salad", note: "Lean chicken, a grain, and something raw or lightly cooked veg." },
      { name: "Grilled fish with sabzi & roti", note: "Simple grilled or pan-cooked fish, a vegetable side, whole grain." }
    ]
  },
  korean: {
    veg: [
      { name: "Bibimbap with tofu", note: "Rice, sautéed veg, tofu, a little gochujang — mix it all together." },
      { name: "Doenjang-jjigae (soybean stew) with rice", note: "Soybean paste stew with vegetables and tofu, served with rice." }
    ],
    eggitarian: [
      { name: "Gyeran-bap (egg rice)", note: "Warm rice topped with a fried or mixed egg, sesame oil, and soy sauce." },
      { name: "Kimchi fried rice with a fried egg", note: "Quick, warming, and balanced with veg from the kimchi." }
    ],
    nonveg: [
      { name: "Bulgogi with rice & vegetables", note: "Thin-sliced marinated beef or chicken, grilled, with rice and a veg side." },
      { name: "Doenjang-jjigae with fish & rice", note: "Same stew base, with a lean fish added for protein." }
    ]
  },
  japanese: {
    veg: [
      { name: "Vegetable & tofu miso soup with rice", note: "Light broth, tofu, seasonal vegetables, steamed rice." },
      { name: "Vegetable yaki udon", note: "Stir-fried udon noodles with mixed vegetables and soy-based sauce." }
    ],
    eggitarian: [
      { name: "Tamagoyaki with rice & miso soup", note: "Japanese rolled omelette, rice, and a light soup." },
      { name: "Onigiri with a soft-boiled egg", note: "Rice balls plus an egg for extra protein." }
    ],
    nonveg: [
      { name: "Grilled salmon, rice & miso soup", note: "Simple pan-grilled fish, a grain, and a warm soup." },
      { name: "Chicken teriyaki with rice & greens", note: "Lean protein, a light sauce, and a vegetable side." }
    ]
  },
  chinese: {
    veg: [
      { name: "Mapo tofu (mild) with rice", note: "Tofu simmered in a light savory sauce, served over rice." },
      { name: "Vegetable fried rice", note: "Rice, mixed veg, soy sauce, a little garlic and ginger." }
    ],
    eggitarian: [
      { name: "Egg fried rice with vegetables", note: "Classic combo — egg for protein, veg for fiber and vitamins." },
      { name: "Tomato & egg stir-fry with rice", note: "A homestyle staple — soft scrambled eggs with tomato, over rice." }
    ],
    nonveg: [
      { name: "Chicken & vegetable stir-fry with rice", note: "Lean protein, colorful veg, light sauce, over rice." },
      { name: "Steamed fish with rice & greens", note: "Simple steamed fish, ginger-scallion, rice, and a vegetable side." }
    ]
  },
  filipino: {
    veg: [
      { name: "Ginisang gulay (sautéed mixed vegetables) with rice", note: "Mixed vegetables sautéed with garlic and onion, served with rice." },
      { name: "Tofu sinigang (sour tofu-vegetable soup) with rice", note: "Tangy tamarind-based soup with tofu and vegetables." }
    ],
    eggitarian: [
      { name: "Tortang talong (eggplant omelette) with rice", note: "Grilled eggplant dipped in egg and pan-fried, with rice." }
    ],
    nonveg: [
      { name: "Chicken tinola with rice", note: "Ginger-based chicken and vegetable soup, served with rice." },
      { name: "Grilled fish (inihaw) with rice & veg", note: "Simple grilled fish, rice, and a vegetable side." }
    ]
  },
  indonesian: {
    veg: [
      { name: "Gado-gado (veg salad with peanut dressing)", note: "Mixed vegetables and tofu/tempeh with a light peanut sauce." },
      { name: "Tempeh & vegetable stir-fry with rice", note: "Tempeh is a great plant protein here, with mixed veg." }
    ],
    eggitarian: [
      { name: "Nasi goreng with a fried egg", note: "Indonesian fried rice topped with a fried egg." }
    ],
    nonveg: [
      { name: "Chicken satay with rice & cucumber salad", note: "Grilled lean protein, grain, and fresh veg." }
    ]
  },
  thai: {
    veg: [
      { name: "Vegetable pad see ew with tofu", note: "Noodles, tofu, and greens — swap tofu in for meat easily." },
      { name: "Tofu green curry with rice", note: "Coconut-based curry with vegetables and tofu, milder spice optional." }
    ],
    eggitarian: [
      { name: "Thai fried rice with a fried egg on top", note: "A quick, balanced staple." }
    ],
    nonveg: [
      { name: "Chicken pad see ew", note: "Stir-fried noodles, lean chicken, and greens." }
    ]
  },
  vietnamese: {
    veg: [
      { name: "Vegetable & tofu pho", note: "Light broth noodle soup with tofu and fresh herbs/vegetables." },
      { name: "Vegetable spring rolls with rice", note: "Fresh veg wrapped in rice paper, light and balanced." }
    ],
    eggitarian: [
      { name: "Banh mi with fried egg & pickled veg", note: "Whole-grain bread, egg, fresh pickled vegetables." }
    ],
    nonveg: [
      { name: "Chicken pho", note: "Lean chicken, rice noodles, herbs, and broth." }
    ]
  },
  mexican: {
    veg: [
      { name: "Black bean & rice bowl with veg", note: "Beans + rice makes a complete plant protein, plus veg toppings." },
      { name: "Veggie tacos with beans", note: "Corn tortillas, beans, and whatever veg you have." }
    ],
    eggitarian: [
      { name: "Huevos rancheros", note: "Eggs over beans and tortilla with tomato salsa." }
    ],
    nonveg: [
      { name: "Grilled chicken tacos with salsa", note: "Lean protein, fresh toppings, corn or whole-wheat tortilla." }
    ]
  },
  italian: {
    veg: [
      { name: "Pasta with tomato sauce & veggies", note: "Whole-wheat pasta, tomato sauce, mixed vegetables tossed in." },
      { name: "Minestrone soup with bread", note: "Vegetable and bean soup, warm and filling." }
    ],
    eggitarian: [
      { name: "Vegetable frittata with bread", note: "Baked egg dish with mixed vegetables, whole-grain bread on the side." }
    ],
    nonveg: [
      { name: "Chicken & vegetable pasta", note: "Lean chicken, whole-wheat pasta, and veg tossed together." }
    ]
  },
  mediterranean: {
    veg: [
      { name: "Hummus, falafel & salad wrap", note: "Chickpea-based protein, fresh veg, whole-grain pita." },
      { name: "Lentil soup with pita", note: "Warm, filling, and protein-rich from the lentils." }
    ],
    eggitarian: [
      { name: "Shakshuka (eggs in tomato sauce)", note: "Eggs poached in a spiced tomato-pepper sauce, with bread." }
    ],
    nonveg: [
      { name: "Grilled chicken shawarma bowl", note: "Lean chicken, rice or salad base, veg toppings." }
    ]
  },
  american: {
    veg: [
      { name: "Bean & veggie wrap", note: "Beans for protein, mixed veg, whole-wheat wrap." },
      { name: "Loaded veggie & bean bowl", note: "Rice or quinoa base, beans, roasted veg." }
    ],
    eggitarian: [
      { name: "Veggie omelette with toast", note: "Eggs + chopped vegetables, whole-grain toast on the side." }
    ],
    nonveg: [
      { name: "Grilled chicken salad", note: "Lean chicken over greens with a light dressing." },
      { name: "Baked fish with roasted veg", note: "Simple oven bake — fish, olive oil, seasonal vegetables." }
    ]
  },
  british: {
    veg: [
      { name: "Baked beans on wholegrain toast with veg", note: "Simple, filling, and easy to make anywhere." }
    ],
    eggitarian: [
      { name: "Veggie scramble on toast", note: "Scrambled eggs with mixed vegetables, whole-grain toast." }
    ],
    nonveg: [
      { name: "Grilled chicken with roasted veg", note: "Lean protein and a colorful vegetable side." }
    ]
  },
  african: {
    veg: [
      { name: "Lentil stew with a whole grain", note: "Protein-rich lentils simmered with vegetables, served with rice or an injera-style grain." }
    ],
    eggitarian: [
      { name: "Vegetable stew topped with a boiled egg", note: "Adds easy protein to a veg stew." }
    ],
    nonveg: [
      { name: "Grilled chicken with a grain & greens", note: "Simple lean protein, a grain, and cooked greens." }
    ]
  }
};

const BUDGET_MEALS = ["Dal + rice + curd", "Khichdi", "Egg + rice", "Rice + beans/chana", "Noodles + egg + vegetables", "Bread + peanut butter + banana", "Vegetable fried rice"];


const SCHOOL_TOPICS = [
  {q:"Why do I need protein?", a:"Protein helps repair and build muscle, skin, hair and more. It's especially important during teenage growth — sources include dal, beans, eggs, yogurt, chicken, fish and tofu."},
  {q:"What does cardio actually do?", a:"Cardio (like walking fast, skipping, or dancing) trains your heart and lungs to work more efficiently, which boosts energy and mood over time."},
  {q:"Why do muscles get tired?", a:"During exercise your muscles use up stored energy and produce byproducts like lactic acid, which is what causes that 'burn' feeling — it's temporary and normal."},
  {q:"Why is sleep important?", a:"Sleep is when your body actually repairs muscle and consolidates learning. Teens generally need around 8–10 hours for both recovery and focus."},
  {q:"What is recovery?", a:"Recovery is the rest time your body needs between workouts to rebuild stronger. Skipping recovery too often can lead to burnout or injury — it's not laziness."},
  {q:"Why do I need carbohydrates?", a:"Carbs are your body and brain's main fuel source — rice, bread, oats and fruit all give you the energy to move, think and study."},
  {q:"Can I exercise without equipment?", a:"Absolutely — bodyweight moves like squats, push-ups, lunges and planks build real strength with zero equipment needed."},
  {q:"What does progressive overload mean?", a:"It means gradually increasing the challenge over time (more reps, more sets, or slightly harder versions) so your body keeps adapting and getting stronger."}
];

const ARCADE_GAMES = [
  {id:"memory", emoji:"🧠", name:"Memory Match", desc:"Flip cards and find every pair."},
  {id:"puzzle", emoji:"🧩", name:"Puzzle Room", desc:"Slide the tiles to save Dwaekki."},
  {id:"numberpuzzle", emoji:"🔢", name:"Dwaekki Number Puzzle", desc:"Cute visual logic & math puzzles."},
  {id:"sorting", emoji:"🗂️", name:"Dwaekki Sorting", desc:"Sort things into the right category."},
  {id:"logicgrid", emoji:"🕵️", name:"Dwaekki Logic Grid", desc:"Tiny deduction puzzles — who has what?"}
];

/* ===================== MISSIONS, ECONOMY & COMPANION DATA ===================== */

const MISSIONS = [
  {id:"hydrate",   group:"🌅 Morning",   emoji:"💧", label:"Drink some water",                reward:{type:"energy", amount:5}},
  {id:"morningBreak", group:"🌅 Morning", emoji:"🛏️", label:"Get ready / take a proper morning break", reward:{type:"coins", amount:5}},
  {id:"workout",   group:"🏃 Movement",  emoji:"🏋️", label:"Complete today's workout",         reward:{type:"coins", amount:10}, auto:true},
  {id:"movementBreak", group:"🏃 Movement", emoji:"🚶", label:"Take a movement break",          reward:{type:"coins", amount:5}},
  {id:"meal",      group:"🍚 Food",      emoji:"🥗", label:"Log / eat a balanced meal",         reward:{type:"foodPoints", amount:5}, auto:true},
  {id:"rest",      group:"🧠 Wellbeing", emoji:"😌", label:"Take 10 minutes to rest",           reward:{type:"carePoints", amount:5}}
];

const FOOD_SHOP = [
  {id:"apple",   emoji:"🍎", name:"Apple",     cost:5},
  {id:"carrot",  emoji:"🥕", name:"Carrot",    cost:5},
  {id:"berries", emoji:"🍓", name:"Berries",   cost:8},
  {id:"rice",    emoji:"🍚", name:"Rice Bowl", cost:10},
  {id:"salad",   emoji:"🥗", name:"Salad",     cost:12},
  {id:"egg",     emoji:"🍳", name:"Egg Meal",  cost:12},
  {id:"noodles", emoji:"🍜", name:"Noodles",   cost:15},
  {id:"fullmeal",emoji:"🍱", name:"Full Meal", cost:20}
];

const DWAEKKI_REACTIONS = [
  "🐷 \"Mmm!! Thank you STAY!!\"",
  "🐷 \"Yummy yummy, my favorite!\"",
  "💗 \"You always know what I like!\"",
  "🐷 \"Best snack ever, no notes!\"",
  "✨ \"Dwaekki feels so loved right now!\""
];

const WALLPAPERS = [
  {id:"default",  name:"Bunny & Roses (default)", cost:0,  file:"bg-pattern.png"},
  {id:"heart",    name:"Soft Heart Glow",   cost:200, file:"wallpaper-heart.jpg"},
  {id:"teddy",    name:"Dream Land Teddies",cost:280, file:"wallpaper-teddy.jpg"},
  {id:"chick",    name:"Sunny Chick Gingham",cost:360, file:"wallpaper-chick.jpg"},
  {id:"straykids",name:"STAY Gingham Cat",  cost:440, file:"wallpaper-straykids.jpg"},
  {id:"bunnylilac",name:"Sassy Lilac Bunnies",cost:520, file:"wallpaper-bunnylilac.jpg"},
  {id:"bunnypink",name:"Pink Bunny Pile",   cost:600, file:"wallpaper-bunnypink.jpg"}
];

const NUMBER_PUZZLES = [
  {clues:["🍎 + 🍎 = 10","🍎 + 🥕 = 15","🥕 + 🥕 = 20"], q:"🥕 + 🍎 = ?", options:[10,12,15,18], answer:15},
  {clues:["🍩 = 4","🍩 + 🍩 = 8"], q:"🍩 + 🍩 + 🍩 = ?", options:[8,10,12,16], answer:12},
  {clues:["2 → 4 → 8 → 16 → ?"], q:"What comes next?", options:[20,24,32,36], answer:32},
  {clues:["🍓 + 🍓 + 🍓 = 9"], q:"🍓 = ?", options:[2,3,4,5], answer:3},
  {clues:["🐷 = 5","🐷 + 🐰 = 12"], q:"🐰 = ?", options:[5,6,7,8], answer:7},
  {clues:["3 → 6 → 12 → 24 → ?"], q:"What comes next?", options:[36,42,48,30], answer:48},
  {clues:["🥕 + 🥕 + 🥕 = 18"], q:"🥕 = ?", options:[4,5,6,7], answer:6},
  {clues:["1 → 1 → 2 → 3 → 5 → ?"], q:"What comes next? (hint: add the last two!)", options:[6,7,8,9], answer:8}
];

const SORTING_ITEMS = [
  {e:"🍎", bin:"FOOD"}, {e:"🥕", bin:"FOOD"}, {e:"🍌", bin:"FOOD"},
  {e:"🏋️", bin:"GYM"}, {e:"🤸", bin:"GYM"},
  {e:"📚", bin:"STUDY"}, {e:"✏️", bin:"STUDY"},
  {e:"👕", bin:"CLOTHES"}, {e:"🎀", bin:"CLOTHES"}, {e:"👟", bin:"CLOTHES"}
];

const LOGIC_PUZZLES = [
  {
    clues:["🐷 has the apple 🍎.", "🐰 doesn't have the carrot 🥕.", "🐱 has neither apple nor banana 🍌."],
    q:"Who has the carrot?", options:["🐷","🐰","🐱"], answer:"🐱"
  },
  {
    clues:["🐰 loves pink 💗.", "🐷 doesn't like blue 💙.", "🐱 has the blue toy."],
    q:"Who has the blue toy?", options:["🐷","🐰","🐱"], answer:"🐱"
  },
  {
    clues:["Three friends finished workouts: 🐷 finished before 🐰.", "🐱 finished after 🐰.", "Nobody tied."],
    q:"Who finished last?", options:["🐷","🐰","🐱"], answer:"🐱"
  },
  {
    clues:["🐷, 🐰 and 🐱 each ate one snack: 🍎, 🥕, 🍓.", "🐷 didn't eat the carrot or the berries.", "🐰 didn't eat the apple."],
    q:"What did 🐷 eat?", options:["🍎","🥕","🍓"], answer:"🍎"
  },
  {
    clues:["🐷 lives above 🐰.", "🐱 lives below 🐰.", "There are 3 floors: top, middle, bottom."],
    q:"Who lives on the bottom floor?", options:["🐷","🐰","🐱"], answer:"🐱"
  }
];
