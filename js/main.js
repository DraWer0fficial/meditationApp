'use strict';

// カプセル化 要素の取得
const app = (() => {
  const audio = document.querySelector('audio');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const sounds = document.querySelector('.sound_pick button');
  const timeDisplay = document.querySelector('.time_display');
  const timeSelects = document.querySelector('.time_select button');

    play.addEventListener('click', (e) => {
    e.stopPropagation();
    checkPlaying(audio);
    }, {
      capture: false,
      once: false
  });

  const checkPlaying = (audio) => {
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      play.src = './image/pause.svg';
    } else {
      audio.pause();
      play.src = './image/play.svg';
    }
  }

  let fakeDuration = 180;
  // 演習の長さを取得
  const outlineLength = outline.getTotalLength();

  // 点線の長さを全周の長さと一緒に
  outline.style.strokeDasharray = outlineLength;
  // 全周の長さ分左に移動
  outline.style.strokeDashoffset = outlineLength;

  audio.ontimeupdate = function () {
    let currentTime = audio.currentTime;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.round(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    if (seconds == 60) {
      seconds = 59;
    }
    timeDisplay.textContent = `${minutes} : ${('0' + seconds).slice(-2)}`;
    if (currentTime >= fakeDuration) {
      audio.pause();
      outline.style.strokeDashoffset = 0;
      play.src = './image/play.svg';
      timeDisplay.textContent = `0:00`;
    }
  }

    //再生時間の再設定
  timeSelects.forEach(timeSelect => {
    timeSelect.onclick = function (e) {
    audio.currentTime = 0;
    fakeDuration = this.dataset.time;
    let seconds = Math.round(fakeDuration % 60);
    let minutes = Math.floor(fakeDuration / 60);
    timeDisplay = `${minutes}:${('0' + secondes).slice(-2)}`;
    checkPlaying(audio);
  }
  });

  sounds.forEach(sound => {
    sound.onclick = function() {
      audio.src = this.dataset.sound;
      checkPlaying(audio);
  };
  }); 

})();