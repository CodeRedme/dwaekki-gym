/* ===================== DWAEKKI MUSIC — YOUTUBE CONNECT (Google Sign-In, no backend needed) =====================
   How to turn this on:
   1. Go to https://console.cloud.google.com/apis/credentials, create an OAuth 2.0 Client ID
      of type "Web application"
   2. Add this site's exact URL (e.g. https://dwaekki-gym.vercel.app) under "Authorized JavaScript origins"
   3. Enable the "YouTube Data API v3" for that project (APIs & Services → Library)
   4. Paste the Client ID below
   Until a Client ID is added, the button will politely say it's not connected yet — everything else
   in Dwaekki Music (platform picker, paste-a-link) keeps working as normal.
   Note: the sign-in token Google gives a plain frontend like this lasts about an hour — that's a
   Google limit, not a bug. Just tap "Sign in with YouTube" again if it logs out.
=================================================================================================================== */

const GOOGLE_CLIENT_ID = "96852406307-a0loeq0p03bmvs7boitop57f34cs8uoh.apps.googleusercontent.com";
const GOOGLE_SCOPES = "https://www.googleapis.com/auth/youtube.readonly";
const YT_TOKEN_KEY = "dwaekkiYoutubeToken";

let gTokenClient = null;

function ytGetToken(){
  try{
    const saved = JSON.parse(sessionStorage.getItem(YT_TOKEN_KEY));
    if(saved && saved.expires > Date.now()) return saved.token;
  }catch(e){}
  return null;
}
function ytSaveToken(token, expiresInSec){
  sessionStorage.setItem(YT_TOKEN_KEY, JSON.stringify({ token, expires: Date.now() + (expiresInSec * 1000) }));
}
function ytLogout(){
  sessionStorage.removeItem(YT_TOKEN_KEY);
  updateYoutubeUI();
}

function ytLogin(){
  if(!GOOGLE_CLIENT_ID){
    alert("YouTube sign-in isn't switched on yet — Dwaekki's dev still needs to register the app with Google. Try the platform picker below, or paste a YouTube link! 🐷");
    return;
  }
  if(!gTokenClient){
    gTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: GOOGLE_SCOPES,
      callback: (resp) => {
        if(resp && resp.access_token){
          ytSaveToken(resp.access_token, resp.expires_in || 3500);
          updateYoutubeUI();
        }
      }
    });
  }
  gTokenClient.requestAccessToken();
}

async function ytApi(path){
  const token = ytGetToken();
  if(!token) return null;
  try{
    const res = await fetch(`https://www.googleapis.com/youtube/v3/${path}`, {
      headers: { Authorization: "Bearer " + token }
    });
    if(!res.ok) return null;
    return await res.json();
  }catch(e){ return null; }
}

async function ytFetchLikedVideos(){
  const data = await ytApi("playlistItems?part=snippet&playlistId=LL&maxResults=15");
  return (data && data.items) || [];
}
async function ytFetchMyPlaylists(){
  const data = await ytApi("playlists?part=snippet&mine=true&maxResults=25");
  return (data && data.items) || [];
}
async function ytFetchPlaylistItems(playlistId){
  const data = await ytApi(`playlistItems?part=snippet&playlistId=${playlistId}&maxResults=25`);
  return (data && data.items) || [];
}

function renderYoutubeVideoList(items){
  const list = document.getElementById("youtubeResults");
  if(!list) return;
  list.innerHTML = "";
  if(!items.length){
    list.innerHTML = `<p class="muted">Nothing here yet.</p>`;
    return;
  }
  items.forEach(item=>{
    const sn = item.snippet;
    const videoId = sn.resourceId ? sn.resourceId.videoId : null;
    if(!videoId) return;
    const thumb = sn.thumbnails && (sn.thumbnails.default || sn.thumbnails.medium);
    const row = document.createElement("button");
    row.className = "track-row youtube-track-row";
    row.innerHTML = `
      ${thumb ? `<img src="${thumb.url}" alt="" class="track-art" />` : ""}
      <div class="track-info">
        <div class="track-name">${sn.title}</div>
        <div class="track-artist muted">${sn.videoOwnerChannelTitle || sn.channelTitle || ""}</div>
      </div>
    `;
    row.addEventListener("click", ()=>{
      goTo("music");
      playYoutubeVideoId(videoId, `🎧 Playing "${sn.title}"`);
    });
    list.appendChild(row);
  });
}

async function loadYoutubePlaylistPicker(){
  const select = document.getElementById("youtubePlaylistSelect");
  if(!select) return;
  const playlists = await ytFetchMyPlaylists();
  select.innerHTML = `<option value="LL">❤️ Liked videos</option>` +
    playlists.map(p => `<option value="${p.id}">${p.snippet.title}</option>`).join("");
}

async function updateYoutubeUI(){
  const statusEl = document.getElementById("youtubeStatus");
  const browseWrap = document.getElementById("youtubeBrowseWrap");
  const loginBtn = document.getElementById("youtubeLoginBtn");
  const logoutBtn = document.getElementById("youtubeLogoutBtn");
  if(!statusEl) return;
  const token = ytGetToken();
  if(token){
    statusEl.textContent = "🟢 Connected to YouTube";
    browseWrap.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    await loadYoutubePlaylistPicker();
    renderYoutubeVideoList(await ytFetchLikedVideos());
  } else {
    statusEl.textContent = GOOGLE_CLIENT_ID ? "Not connected" : "🚧 Coming soon!";
    browseWrap.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("youtubeLoginBtn");
  const logoutBtn = document.getElementById("youtubeLogoutBtn");
  const select = document.getElementById("youtubePlaylistSelect");
  if(loginBtn) loginBtn.addEventListener("click", ytLogin);
  if(logoutBtn) logoutBtn.addEventListener("click", ytLogout);
  if(select){
    select.addEventListener("change", async ()=>{
      const items = select.value === "LL" ? await ytFetchLikedVideos() : await ytFetchPlaylistItems(select.value);
      renderYoutubeVideoList(items);
    });
  }
  updateYoutubeUI();
});
