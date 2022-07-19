const fullscreenbtn = document.getElementById("fullscreenbtn");
const playbtn = document.getElementById("playbtn");
const pausebtn = document.getElementById("pausebtn");
const video = document.querySelector("video");
const playbackRate = document.querySelector("#playbackrate");
const muteButton = document.querySelector("#mutebtn");
const currenttime = document.getElementById("currenttime");
const totallength = document.getElementById("totallength");
const seekbar = document.getElementById("seekbar");
const fo = document.getElementById("fo");
const re = document.getElementById("re");
const vv = document.getElementById("vv");
const pv = document.getElementById("pv");
re.addEventListener("click", function () {
  video.currentTime -= 10;

});
fo.addEventListener("click", function () {
  video.currentTime += 10;
});
muteButton.addEventListener("click", function () {
  if (video.muted === true) {
    video.muted = false;
    volumeBar.value = 1;
    muteButton.innerText = "MUTE";
  } else {
    video.muted = true;
    volumeBar.value = 0;
    muteButton.innerText = "UNMUTE";
  }
});
function fullscreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
function play_pause() {
  if (video.paused === true) {
    playbtn.style.display = 'none';
    pausebtn.style.display = 'block';
    video.play();
  } else {
    playbtn.style.display = 'block';
    pausebtn.style.display = 'none';
    video.pause();
  }
}

window.onload = function () {
  video.controls = false;
};


document.oncontextmenu = function (e) {
  e.preventDefault();
};
fullscreenbtn.addEventListener("click", function () {
  fullscreen();
});
video.addEventListener("click", function () {
  play_pause();

});
playbtn.addEventListener("click", function () {
  this.style.display = 'none';
  pausebtn.style.display = 'block';
  video.play();
});
pausebtn.addEventListener("click", function () {
  this.style.display = 'none';
  playbtn.style.display = 'block';
  video.pause();
});
playbackRate.addEventListener("change", function () {
  video.playbackRate = this.value;
  pv.innerText = "x" + video.playbackRate
});

volumeBar.addEventListener("change", function () {
  video.volume = volumeBar.value;
  vv.innerText = (video.volume * 100) + "%";
});
document.addEventListener("keypress", function (e) {
  e.preventDefault();
  // Spacebar for play/pause
  if (e.code === 32) {
    play_pause();
  }
  // 'F' or `F11` for fullscreen
  if (e.code === 102 || e.code === 122) {
    fullscreen();
  }
});
function totallen() {
  let minutes = parseInt(video.duration / 60, 10);
  let seconds = Math.round(video.duration % 60);
  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }
  totallength.innerHTML = minutes + ":" + seconds;
}
function currentim() {
  let minutes = parseInt(video.currentTime / 60, 10);
  let seconds = Math.round(video.currentTime % 60);
  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }
  currenttime.innerText = minutes + ":" + seconds;
}

video.addEventListener("timeupdate", function () {
  // Calculate and update the slider value
  seekbar.value = (100 / video.duration) * video.currentTime;
  if (video.readyState) {
    totallen();
    currentim();
  }
});
seekbar.addEventListener("change", function () {
  // Calculate and update the new time
  video.currentTime = video.duration * (seekbar.value / 100);
});

