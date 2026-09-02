/* ===================== DWAEKKI MUSIC — SPOTIFY CONNECT (PKCE, no backend needed) =====================
   How to turn this on:
   1. Create a free app at https://developer.spotify.com/dashboard
   2. Add this site's exact URL (e.g. https://dwaekki-gym.vercel.app/) as a Redirect URI in that app's settings
   3. Paste the app's Client ID below
   Until a Client ID is added, the Spotify button will politely say it's not connected yet —
   nothing breaks, the rest of Dwaekki Music (paste-a-link) keeps working as normal.
======================================================================================================= */

const SPOTIFY_CLIENT_ID = ""; // <-- put your Spotify app's Client ID here
const SPOTIFY_REDIRECT_URI = window.location.origin + window.location.pathname;
const SPOTIFY_SCOPES = "user-read-private user-read-email";
const SPOTIFY_TOKEN_KEY = "dwaekkiSpotifyToken";

function spotifyRandomString(len){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const values = crypto.getRandomValues(new Uint8Array(len));
  values.forEach(v => out += chars[v % chars.length]);
  return out;
}
async function spotifySha256(plain){
  return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(plain));
}
function spotifyBase64UrlEncode(buffer){
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function spotifyLogin(){
  if(!SPOTIFY_CLIENT_ID){
    alert("Spotify isn't connected yet — Dwaekki's dev still needs to add a Spotify Client ID. Paste a YouTube link below in the meantime! 🐷");
    return;
  }
  const verifier = spotifyRandomString(64);
  sessionStorage.setItem("spotify_verifier", verifier);
  const challenge = spotifyBase64UrlEncode(await spotifySha256(verifier));
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SPOTIFY_SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge
  });
  window.location.href = "https://accounts.spotify.com/authorize?" + params.toString();
}

async function spotifyExchangeToken(code){
  const verifier = sessionStorage.getItem("spotify_verifier");
  if(!verifier) return null;
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: verifier
  });
  try{
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    const data = await res.json();
    if(data.access_token){
      localStorage.setItem(SPOTIFY_TOKEN_KEY, JSON.stringify({
        token: data.access_token,
        expires: Date.now() + (data.expires_in * 1000)
      }));
    }
    return data;
  }catch(e){ return null; }
}

function spotifyGetToken(){
  try{
    const saved = JSON.parse(localStorage.getItem(SPOTIFY_TOKEN_KEY));
    if(saved && saved.expires > Date.now()) return saved.token;
  }catch(e){}
  return null;
}

function spotifyLogout(){
  localStorage.removeItem(SPOTIFY_TOKEN_KEY);
  updateSpotifyUI();
}

async function spotifyFetchProfile(){
  const token = spotifyGetToken();
  if(!token) return null;
  try{
    const res = await fetch("https://api.spotify.com/v1/me", { headers: { Authorization: "Bearer " + token } });
    if(!res.ok) return null;
    return await res.json();
  }catch(e){ return null; }
}

async function spotifySearch(query){
  const token = spotifyGetToken();
  if(!token || !query) return [];
  try{
    const res = await fetch("https://api.spotify.com/v1/search?type=track&limit=8&q=" + encodeURIComponent(query), {
      headers: { Authorization: "Bearer " + token }
    });
    if(!res.ok) return [];
    const data = await res.json();
    return (data.tracks && data.tracks.items) || [];
  }catch(e){ return []; }
}

function renderSpotifyResults(tracks){
  const list = document.getElementById("spotifyResults");
  if(!list) return;
  list.innerHTML = "";
  if(tracks.length === 0){
    list.innerHTML = `<p class="muted">No results yet — try a search above.</p>`;
    return;
  }
  tracks.forEach(t => {
    const art = (t.album && t.album.images && (t.album.images[2] || t.album.images[0])) ? (t.album.images[2] || t.album.images[0]).url : "";
    const row = document.createElement("div");
    row.className = "spotify-track-row";
    row.innerHTML = `
      ${art ? `<img src="${art}" alt="" class="spotify-track-art" />` : ""}
      <div class="spotify-track-info">
        <div class="spotify-track-name">${t.name}</div>
        <div class="spotify-track-artist muted">${t.artists.map(a => a.name).join(", ")}</div>
      </div>
      ${t.preview_url ? `<audio controls src="${t.preview_url}"></audio>` : `<span class="muted" style="font-size:.75rem;">No preview</span>`}
      <a href="${t.external_urls.spotify}" target="_blank" rel="noopener" class="btn-small">Open in Spotify</a>
    `;
    list.appendChild(row);
  });
}

async function updateSpotifyUI(){
  const statusEl = document.getElementById("spotifyStatus");
  const searchWrap = document.getElementById("spotifySearchWrap");
  const loginBtn = document.getElementById("spotifyLoginBtn");
  const logoutBtn = document.getElementById("spotifyLogoutBtn");
  if(!statusEl) return;
  const token = spotifyGetToken();
  if(token){
    statusEl.textContent = "🟢 Connecting…";
    const me = await spotifyFetchProfile();
    statusEl.textContent = me ? `🟢 Connected as ${me.display_name || "Spotify user"}` : "🟢 Connected";
    searchWrap.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    statusEl.textContent = SPOTIFY_CLIENT_ID ? "Not connected" : "Not connected yet — needs a Spotify Client ID from Dwaekki's dev.";
    searchWrap.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const loginBtn = document.getElementById("spotifyLoginBtn");
  const logoutBtn = document.getElementById("spotifyLogoutBtn");
  const searchForm = document.getElementById("spotifySearchForm");
  if(loginBtn) loginBtn.addEventListener("click", spotifyLogin);
  if(logoutBtn) logoutBtn.addEventListener("click", spotifyLogout);
  if(searchForm){
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = document.getElementById("spotifySearchInput").value.trim();
      if(!q) return;
      renderSpotifyResults(await spotifySearch(q));
    });
  }

  // Handle the redirect back from Spotify's login page
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if(code){
    await spotifyExchangeToken(code);
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  updateSpotifyUI();
});
