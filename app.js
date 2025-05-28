const playBtn = document.querySelector("#play");
const audio = document.querySelector("audio");
const voiceRange = document.querySelector("#voice");
const voiceValue = document.querySelector("#voice-value");
const container = document.querySelector(".container");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");
const cover = document.querySelector("#cover");
const progress = document.querySelector("#progress");
const trackName = document.querySelector("#track-name");

const music = [
  "The Weeknd - Save Your Tears",
  "The Weeknd - Blinding Lights",
  "Shawn Mendes - There s Nothing Holdin  Me Back",
];

let curreentMusic = 0;

function changeMusic(index) {
  const title = music[index];
  cover.src = `./music-cover/images/${title}.jpg`;
  cover.alt = title;
  audio.src = `./music-cover/music/${title}.mp3`;
  document.querySelector("#song-title").textContent = music[curreentMusic];

  trackName.textContent = title;
}

changeMusic(curreentMusic);

audio.volume = 0.5;
voiceValue.textContent = 50;

function play() {
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

forward.addEventListener("click", () => {
  if (music.length - 1 > curreentMusic) {
    curreentMusic++;
  } else {
    curreentMusic = 0;
  }
  changeMusic(curreentMusic);
  play();
});

backward.addEventListener("click", () => {
  if (curreentMusic !== 0) {
    curreentMusic--;
  } else {
    curreentMusic = music.length - 1;
  }
  changeMusic(curreentMusic);
  play();
});

playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");

  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

voiceRange.addEventListener("input", () => {
  audio.volume = voiceRange.value / 100;
  voiceValue.textContent = voiceRange.value;
});

audio.addEventListener("timeupdate", () => {
  progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

audio.addEventListener("ended", () => {
  forward.click();
});
