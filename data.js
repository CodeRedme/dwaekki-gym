/* ===================== DWAEKKI GYM — DATA ===================== */

const APP_VERSION = "1.4.0";

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

const MEALS = {
  indian: {
    veg: ["Dal + rice + sabzi", "Khichdi + curd", "Roti + dal + vegetables", "Chana + rice", "Vegetable pulao + raita"],
    eggitarian: ["Egg curry + rice", "Egg bhurji + roti", "Egg fried rice + vegetables"],
    nonveg: ["Chicken curry + rice", "Fish curry + rice", "Chicken + roti + salad"]
  },
  korean: {
    veg: ["Bibimbap (veg version) + rice", "Tofu + kimchi + rice", "Doenjang jjigae (soybean stew) + rice"],
    eggitarian: ["Gyeran-jjim (steamed egg) + rice", "Egg + kimchi fried rice"],
    nonveg: ["Bulgogi + rice", "Kimchi jjigae with pork + rice", "Grilled chicken + rice + banchan"]
  },
  japanese: {
    veg: ["Miso soup + rice + vegetables", "Tofu don (rice bowl)", "Vegetable yakisoba"],
    eggitarian: ["Tamago (egg) rice bowl", "Oyakodon-style egg + rice (veg swap)"],
    nonveg: ["Teriyaki chicken + rice", "Salmon + rice + miso soup", "Chicken katsu + rice"]
  },
  filipino: {
    veg: ["Ginisang gulay (sautéed vegetables) + rice", "Tofu sinigang + rice"],
    eggitarian: ["Tortang talong (eggplant omelette) + rice"],
    nonveg: ["Chicken adobo + rice", "Sinigang na baboy + rice", "Tinolang manok + rice"]
  },
  thai: {
    veg: ["Vegetable pad see ew", "Tofu green curry + rice", "Som tam (papaya salad) + rice"],
    eggitarian: ["Thai omelette + rice"],
    nonveg: ["Chicken pad thai", "Chicken green curry + rice"]
  },
  indonesian: {
    veg: ["Gado-gado (veg salad + peanut sauce)", "Tempeh + rice + vegetables"],
    eggitarian: ["Nasi goreng with egg"],
    nonveg: ["Chicken satay + rice", "Rendang + rice"]
  },
  american: {
    veg: ["Bean burrito bowl", "Veggie stir-fry + rice", "Grilled cheese + tomato soup"],
    eggitarian: ["Scrambled eggs + toast + fruit"],
    nonveg: ["Grilled chicken + rice + veggies", "Turkey sandwich + salad"]
  },
  european: {
    veg: ["Pasta with tomato + vegetables", "Lentil soup + bread", "Vegetable risotto"],
    eggitarian: ["Spanish omelette (tortilla) + salad"],
    nonveg: ["Grilled chicken + potatoes + veg", "Baked fish + vegetables"]
  },
  other: {
    veg: ["Rice + beans + whatever veggies you have", "Noodles + stir-fried vegetables"],
    eggitarian: ["Fried rice with egg + vegetables"],
    nonveg: ["Any protein + rice/noodles + vegetables"]
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
