// SoundWave music player demo — original audio samples are included in /assets.
// This is an educational front-end project, not an official Spotify application.

const tracks = [
  { id: 1, title: "Midnight Drive", artist: "SoundWave Studio", mood: "Chill", duration: "0:14", src: "assets/midnight-drive.wav", color: "#395c73", icon: "☾", description: "A mellow instrumental for late-night moments." },
  { id: 2, title: "Sunny Days", artist: "SoundWave Studio", mood: "Pop", duration: "0:14", src: "assets/sunny-days.wav", color: "#d38b42", icon: "☀", description: "Bright sounds to lift your mood." },
  { id: 3, title: "Focus Flow", artist: "SoundWave Studio", mood: "Focus", duration: "0:14", src: "assets/focus-flow.wav", color: "#587b68", icon: "✧", description: "A calm loop for study and work." },
  { id: 4, title: "After the Rain", artist: "SoundWave Studio", mood: "Chill", duration: "0:14", src: "assets/midnight-drive.wav", color: "#6e668d", icon: "☁", description: "Take a breath and slow things down." },
  { id: 5, title: "Little Celebration", artist: "SoundWave Studio", mood: "Pop", duration: "0:14", src: "assets/sunny-days.wav", color: "#a95f54", icon: "✦", description: "A cheerful soundtrack for small wins." },
  { id: 6, title: "Quiet Study", artist: "SoundWave Studio", mood: "Focus", duration: "0:14", src: "assets/focus-flow.wav", color: "#5b718c", icon: "⌁", description: "Stay focused, one task at a time." }
];

const audio = document.querySelector("#audioPlayer");
const searchInput = document.querySelector("#searchInput");
const trackList = document.querySelector("#trackList");
const featuredGrid = document.querySelector("#featuredGrid");
const quickGrid = document.querySelector("#quickGrid");
const resultMessage = document.querySelector("#resultMessage");
const emptyMessage = document.querySelector("#emptyMessage");
const playButton = document.querySelector("#playButton");
const progressBar = document.querySelector("#progressBar");
const toast = document.querySelector("#toast");

let currentTrackIndex = -1;
let activeFilter = "All";
let isShuffle = false;
let isRepeat = false;
let likedTracks = new Set();
let toastTimeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

function getCurrentTrack() {
  return tracks[currentTrackIndex] || null;
}

function renderQuickPicks() {
  const picks = tracks.slice(0, 3);
  quickGrid.innerHTML = picks.map((track) => `
    <article class="quick-card">
      <div class="quick-art" style="--art-bg:${track.color}" aria-hidden="true">${track.icon}</div>
      <strong>${track.title}</strong>
      <button class="quick-play" type="button" data-play="${track.id}" aria-label="Play ${track.title}">▶</button>
    </article>
  `).join("");
}

function renderFeatured() {
  featuredGrid.innerHTML = tracks.slice(0, 4).map((track) => `
    <article class="music-card">
      <div class="album-art" style="--art-bg:linear-gradient(145deg,${track.color},#202020)" aria-label="${track.mood} music artwork" role="img">
        <span aria-hidden="true">${track.icon}</span>
      </div>
      <h3>${track.title}</h3>
      <p>${track.description}</p>
      <button class="card-play" type="button" data-play="${track.id}" aria-label="Play ${track.title}">▶</button>
    </article>
  `).join("");
}

function renderTracks() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = tracks.filter((track) => {
    const matchesFilter = activeFilter === "All" || track.mood === activeFilter;
    const matchesSearch = `${track.title} ${track.artist} ${track.mood}`.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  trackList.innerHTML = filtered.map((track, index) => {
    const isPlaying = getCurrentTrack()?.id === track.id && !audio.paused;
    return `
      <article class="track-row ${isPlaying ? "playing" : ""}">
        <span class="track-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="track-main">
          <div class="track-thumb" style="--art-bg:${track.color}" aria-hidden="true">${track.icon}</div>
          <div><strong>${track.title}</strong><small>${track.artist}</small></div>
        </div>
        <span class="track-mood">${track.mood}</span>
        <span class="track-duration">${track.duration}</span>
        <button class="track-play" type="button" data-play="${track.id}" aria-label="Play ${track.title}">${isPlaying ? "Ⅱ" : "▶"}</button>
      </article>
    `;
  }).join("");

  resultMessage.textContent = `Showing ${filtered.length} of ${tracks.length} tracks`;
  emptyMessage.hidden = filtered.length > 0;
}

function updatePlayer() {
  const track = getCurrentTrack();
  if (!track) return;
  document.querySelector("#playerTitle").textContent = track.title;
  document.querySelector("#playerArtist").textContent = track.artist;
  document.querySelector("#playerCover").textContent = track.icon;
  document.querySelector("#playerCover").style.background = `linear-gradient(135deg,${track.color},#202020)`;
  document.querySelector("#likeButton").setAttribute("aria-pressed", String(likedTracks.has(track.id)));
  document.querySelector("#likeButton").textContent = likedTracks.has(track.id) ? "♥" : "♡";
  document.querySelector("#duration").textContent = track.duration;
  renderTracks();
}

function playTrack(trackId) {
  const index = tracks.findIndex((track) => track.id === trackId);
  if (index < 0) return;

  if (currentTrackIndex === index) {
    togglePlayback();
    return;
  }

  currentTrackIndex = index;
  audio.src = tracks[index].src;
  audio.load();
  audio.play().then(() => {
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause");
    updatePlayer();
  }).catch(() => {
    notify("Audio could not play. Try selecting the track again.");
  });
  updatePlayer();
}

function togglePlayback() {
  if (currentTrackIndex < 0) {
    playTrack(tracks[0].id);
    return;
  }
  if (audio.paused) {
    audio.play().then(() => {
      playButton.textContent = "Ⅱ";
      playButton.setAttribute("aria-label", "Pause");
      renderTracks();
    }).catch(() => notify("Press play again to start the demo audio."));
  } else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play");
    renderTracks();
  }
}

function changeTrack(direction) {
  if (isShuffle) {
    let next = currentTrackIndex;
    while (tracks.length > 1 && next === currentTrackIndex) next = Math.floor(Math.random() * tracks.length);
    playTrack(tracks[next].id);
    return;
  }
  const nextIndex = currentTrackIndex < 0
    ? 0
    : (currentTrackIndex + direction + tracks.length) % tracks.length;
  playTrack(tracks[nextIndex].id);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function setFilter(button) {
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".chip").forEach((chip) => {
    const active = chip === button;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderTracks();
}

document.addEventListener("click", (event) => {
  const playControl = event.target.closest("[data-play]");
  if (playControl) playTrack(Number(playControl.dataset.play));
});

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => setFilter(button));
});

searchInput.addEventListener("input", renderTracks);
playButton.addEventListener("click", togglePlayback);
document.querySelector("#previousButton").addEventListener("click", () => changeTrack(-1));
document.querySelector("#nextButton").addEventListener("click", () => changeTrack(1));

document.querySelector("#shuffleButton").addEventListener("click", (event) => {
  isShuffle = !isShuffle;
  event.currentTarget.setAttribute("aria-pressed", String(isShuffle));
  notify(isShuffle ? "Shuffle is on." : "Shuffle is off.");
});

document.querySelector("#repeatButton").addEventListener("click", (event) => {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;
  event.currentTarget.setAttribute("aria-pressed", String(isRepeat));
  notify(isRepeat ? "Repeat is on." : "Repeat is off.");
});

document.querySelector("#likeButton").addEventListener("click", () => {
  const track = getCurrentTrack();
  if (!track) {
    notify("Play a track first.");
    return;
  }
  if (likedTracks.has(track.id)) likedTracks.delete(track.id);
  else likedTracks.add(track.id);
  updatePlayer();
  notify(likedTracks.has(track.id) ? "Added to liked songs." : "Removed from liked songs.");
});

audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pause");
  renderTracks();
});
audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Play");
  renderTracks();
});
audio.addEventListener("timeupdate", () => {
  document.querySelector("#currentTime").textContent = formatTime(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});
audio.addEventListener("loadedmetadata", () => {
  document.querySelector("#duration").textContent = formatTime(audio.duration);
});
audio.addEventListener("ended", () => {
  if (!isRepeat) changeTrack(1);
});
progressBar.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(progressBar.value) / 100) * audio.duration;
  }
});
document.querySelector("#volumeBar").addEventListener("input", (event) => {
  audio.volume = Number(event.target.value);
});

const sidebar = document.querySelector("#sidebar");
const mobileMenu = document.querySelector("#mobileMenu");
mobileMenu.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  mobileMenu.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-label", open ? "Close sidebar" : "Open sidebar");
});
sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    mobileMenu.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#createPlaylist").addEventListener("click", () => {
  notify("Playlist creation is a demo feature for this project.");
});
document.querySelector("#profileButton").addEventListener("click", () => {
  notify("Welcome to your SoundWave demo profile.");
});
document.querySelector("#backButton").addEventListener("click", () => {
  if (history.length > 1) history.back();
  else notify("You are on the home page.");
});
document.querySelector("#forwardButton").addEventListener("click", () => {
  history.forward();
});

const hour = new Date().getHours();
document.querySelector("#greeting").textContent =
  hour < 12 ? "GOOD MORNING" : hour < 18 ? "GOOD AFTERNOON" : "GOOD EVENING";

renderQuickPicks();
renderFeatured();
renderTracks();
audio.volume = 0.75;
