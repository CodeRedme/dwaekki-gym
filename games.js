/* ===================== DWAEKKI ARCADE ===================== */
/* Each game is a function(container) that renders itself into `container`.
   Games call window.onGamePlayed(id, coins) once meaningfully played/completed
   (coins is how many 🐷 Dwaekki Coins to award), and can call window.onGameWon(id)
   for achievement-relevant wins. Kept intentionally lightweight & dependency-free
   so the whole arcade works offline. */

const Games = {};

/* ---------- 1. Memory Match ---------- */
Games.memory = function(el){
  const ICONS = ["🐷","🐰","🍎","🥕","💧","⭐","🏋️","🌱"];
  let size = 8; // pairs
  function build(){
    const deck = ICONS.slice(0, size).concat(ICONS.slice(0,size)).sort(()=>Math.random()-0.5);
    let flipped = [], matched = [], lock = false, misses = 0;
    el.innerHTML = `<p>Find every pair! <button class="btn-ghost" id="moreCards">+ More cards</button></p><div class="memory-grid"></div>`;
    const grid = el.querySelector(".memory-grid");
    deck.forEach((icon, idx)=>{
      const card = document.createElement("button");
      card.className = "memory-card";
      card.dataset.icon = icon; card.dataset.idx = idx;
      card.textContent = "❓";
      grid.appendChild(card);
      card.onclick = ()=>{
        if(lock || card.classList.contains("matched") || flipped.includes(card)) return;
        card.textContent = icon; flipped.push(card);
        if(flipped.length === 2){
          lock = true;
          setTimeout(()=>{
            if(flipped[0].dataset.icon === flipped[1].dataset.icon){
              flipped.forEach(c=>c.classList.add("matched"));
              matched.push(...flipped);
              if(matched.length === deck.length){
                const perfect = misses === 0;
                el.insertAdjacentHTML("beforeend", `<p class="dwaekki-says">🎉 All matched!${perfect? " Perfect round!" : ""}</p>`);
                window.onGamePlayed && window.onGamePlayed("memory", perfect ? 5 : 3);
                window.onGameWon && window.onGameWon("memory");
              }
            } else {
              misses++;
              flipped.forEach(c=> c.textContent = "❓");
            }
            flipped = []; lock = false;
          }, 700);
        }
      };
    });
    el.querySelector("#moreCards").onclick = ()=>{ size = Math.min(size+2, ICONS.length); build(); };
  }
  build();
};

/* ---------- 2. Puzzle Room (sliding puzzle) ---------- */
Games.puzzle = function(el){
  let tiles = [1,2,3,4,5,6,7,8,0];
  function shuffle(){
    for(let i=0;i<200;i++){
      const blank = tiles.indexOf(0);
      const neighbors = validMoves(blank);
      const swap = neighbors[Math.floor(Math.random()*neighbors.length)];
      [tiles[blank], tiles[swap]] = [tiles[swap], tiles[blank]];
    }
    render();
  }
  function validMoves(blank){
    const moves = [];
    const r = Math.floor(blank/3), c = blank%3;
    if(r>0) moves.push(blank-3); if(r<2) moves.push(blank+3);
    if(c>0) moves.push(blank-1); if(c<2) moves.push(blank+1);
    return moves;
  }
  function render(){
    el.innerHTML = `<p>Slide tiles to put 1→8 in order and free Dwaekki!</p><div class="puzzle-grid"></div>`;
    const grid = el.querySelector(".puzzle-grid");
    tiles.forEach((t, idx)=>{
      const cell = document.createElement("button");
      cell.className = "puzzle-tile" + (t===0 ? " blank": "");
      cell.textContent = t===0 ? "" : t;
      cell.onclick = ()=>{
        const blank = tiles.indexOf(0);
        if(validMoves(blank).includes(idx)){
          [tiles[blank], tiles[idx]] = [tiles[idx], tiles[blank]];
          render();
          if(tiles.slice(0,8).every((v,i)=>v===i+1)){
            el.insertAdjacentHTML("beforeend", `<p class="dwaekki-says">🐷 "YOU SAVED DWAEKKI!!" 🎉</p>`);
            window.onGamePlayed && window.onGamePlayed("puzzle", 5);
            window.onGameWon && window.onGameWon("puzzle");
          }
        }
      };
      grid.appendChild(cell);
    });
  }
  shuffle();
};

/* ---------- 3. Dwaekki Number Puzzle (cute visual logic/math, not exam-y) ---------- */
Games.numberpuzzle = function(el){
  let round = 0, score = 0;
  const order = [...NUMBER_PUZZLES].sort(()=>Math.random()-0.5);
  function render(){
    if(round >= order.length){
      el.innerHTML = `<p class="dwaekki-says">🎉 All puzzles solved! Score: ${score}</p>`;
      window.onGamePlayed && window.onGamePlayed("numberpuzzle", 5);
      window.onGameWon && window.onGameWon("numberpuzzle");
      return;
    }
    const p = order[round];
    el.innerHTML = `
      <p class="muted">Round ${round+1} / ${order.length} · Score: ${score}</p>
      <div class="card" style="background:var(--sky);">
        ${p.clues.map(c=>`<p style="font-size:1.15rem;font-weight:700;margin:4px 0;">${c}</p>`).join("")}
      </div>
      <p style="font-size:1.2rem;font-weight:800;margin-top:14px;">${p.q}</p>
      <div class="choice-row" id="npOptions">
        ${p.options.map(o=>`<button class="choice-pill" data-o="${o}">${o}</button>`).join("")}
      </div>
      <p id="npFeedback" class="dwaekki-says"></p>
    `;
    el.querySelectorAll("#npOptions button").forEach(btn=>{
      btn.onclick = ()=>{
        const val = isNaN(btn.dataset.o) ? btn.dataset.o : Number(btn.dataset.o);
        const fb = el.querySelector("#npFeedback");
        if(val === p.answer){
          score++;
          fb.textContent = "🐷 \"Yes!! You found Dwaekki's answer!\" ✨";
          round++;
          setTimeout(render, 900);
        } else {
          fb.textContent = "🤔 Not quite — try another one!";
        }
      };
    });
  }
  render();
};

/* ---------- 4. Dwaekki Sorting ---------- */
Games.sorting = function(el){
  const items = [...SORTING_ITEMS].sort(()=>Math.random()-0.5);
  const bins = ["FOOD","GYM","STUDY","CLOTHES"];
  let idx = 0, correct = 0;
  function render(){
    if(idx >= items.length){
      const perfect = correct === items.length;
      el.innerHTML = `<p class="dwaekki-says">✨ Sorted ${correct}/${items.length}! ${perfect ? "Perfect sorting!" : "Nice work!"}</p>`;
      window.onGamePlayed && window.onGamePlayed("sorting", perfect ? 6 : 3);
      window.onGameWon && window.onGameWon("sorting");
      return;
    }
    const item = items[idx];
    el.innerHTML = `
      <p class="muted">${idx} / ${items.length} sorted</p>
      <p style="font-size:2.4rem;text-align:center;">${item.e}</p>
      <p style="text-align:center;font-weight:700;">Which category does this belong to?</p>
      <div class="choice-row" style="justify-content:center;">
        ${bins.map(b=>`<button class="choice-pill" data-bin="${b}">${b}</button>`).join("")}
      </div>
      <p id="sortFeedback" class="dwaekki-says"></p>
    `;
    el.querySelectorAll("[data-bin]").forEach(btn=>{
      btn.onclick = ()=>{
        const fb = el.querySelector("#sortFeedback");
        if(btn.dataset.bin === item.bin){
          correct++; fb.textContent = "✅ Correct!";
        } else {
          fb.textContent = `❌ Dwaekki would put that in ${item.bin}.`;
        }
        idx++;
        setTimeout(render, 700);
      };
    });
  }
  render();
};

/* ---------- 5. Dwaekki Logic Grid (tiny deduction puzzles) ---------- */
Games.logicgrid = function(el){
  let round = 0, score = 0;
  const order = [...LOGIC_PUZZLES].sort(()=>Math.random()-0.5);
  function render(){
    if(round >= order.length){
      el.innerHTML = `<p class="dwaekki-says">🕵️ Case closed! Score: ${score}/${order.length}</p>`;
      window.onGamePlayed && window.onGamePlayed("logicgrid", 5);
      window.onGameWon && window.onGameWon("logicgrid");
      return;
    }
    const p = order[round];
    el.innerHTML = `
      <p class="muted">Round ${round+1} / ${order.length} · Score: ${score}</p>
      <div class="card" style="background:var(--sky);">
        ${p.clues.map(c=>`<p style="margin:4px 0;">🔎 ${c}</p>`).join("")}
      </div>
      <p style="font-size:1.15rem;font-weight:800;margin-top:14px;">${p.q}</p>
      <div class="choice-row" id="lgOptions" style="justify-content:center;">
        ${p.options.map(o=>`<button class="choice-pill" data-o="${o}" style="font-size:1.5rem;">${o}</button>`).join("")}
      </div>
      <p id="lgFeedback" class="dwaekki-says"></p>
    `;
    el.querySelectorAll("#lgOptions button").forEach(btn=>{
      btn.onclick = ()=>{
        const fb = el.querySelector("#lgFeedback");
        if(btn.dataset.o === p.answer){
          score++; fb.textContent = "🐷 \"You cracked it!\" 🎉";
          round++;
          setTimeout(render, 900);
        } else {
          fb.textContent = "🤔 Look at the clues again!";
        }
      };
    });
  }
  render();
};
