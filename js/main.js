'use strict';

// 定数の定義部分
const audio = document.querySelector('audio');
const outline = document.querySelector('.moving-outline circle');


playbtn.onclick = () => {
  audio.currentTime = 0;
  audio.play();
}
pausebtn.onclick = () => {
  audio.pause();
}

let fakeDuration = 5;

// let currentTime = audio.currentTime;;

audio.ontimeupdate = function () {
  let currentTime = audio.currentTime;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  if (currentTime >= fakeDuration) {
    audio.pause();

    outline.style.strokeDashoffset = 0;
  }
}

// サークルアニメーション用
// 演習の長さを取得
const outlineLength = outline.getTotalLength();
console.log(outlineLength);

// 点線の長さを全周の長さと一緒に
outline.style.strokeDasharray = outlineLength;
// 全周の長さ分左に移動
outline.style.strokeDashoffset = outlineLength;

// 経過時間に応じて変化
// let currentTime = audio.currentTime;
