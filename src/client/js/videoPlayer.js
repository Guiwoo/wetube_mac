const video = document.querySelector("video");
//Play
const playBtn = document.getElementById("play");
//Volume
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
//Time
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
//localstorage i can put it th default volume value

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleMeta = () => {
  console.log(video.readyState);
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
timeLine.addEventListener("input", handleTimeLineChange);
video.addEventListener("loadeddata", handleMeta);
video.addEventListener("timeupdate", handleTimeUpdate);
