$(document).ready(function() {
  $(audio).on('timeupdate', handleAnimation());
  $(audio).on("paused", stopAudioChecker());
  $(window).on('keyup', keyboardControls);
});

const audio = document.querySelector("#main-audio");
const assets = $("#assets");
const mainContent = $("#main-container");
const words = $("#words");
const portrait = $("#portrait");
const littleMore = $("#little-more");
const johnHead = $("#john-head");
const paulHead = $("#paul-head");
const georgeHead = $("#george-head");
const ringoHead = $("#ringo-head");
const altogether = $("#altogether"); // Not used
const heart = $("#heart");
const loveYouText = $("#love-you-text");

const keyWords = {
  "one": changeImgCrop.bind(null, {top: 0, right: 385, bottom: 381, left: 0}),
  "two": changeImgCrop.bind(null, {top: 0, right: 827, bottom: 381, left: 385}),
  "three": changeImgCrop.bind(null, {top: 387, right: 385, bottom: 762, left: 0}),
  "four": changeImgCrop.bind(null, {top: 387, right: 800, bottom: 762, left: 385}),
  "can i have a little more": aLittleMore,
  "five": slideInPortraits.bind(johnHead, {left: "-102px"}, true),
  "six": slideInPortraits.bind(paulHead, {right: "-102px"}),
  "seven": slideInPortraits.bind(georgeHead, {top: "-102px"}),
  "eight": slideInPortraits.bind(ringoHead, {bottom: "-102px"}),
  "ten": iLoveYou
};

// Alternates for common transcriptions
const timings = {
  "10.5": "one",
  "11.2": "two",
  "11.9": "three",
  "12.5": "four",
  "13.1": "can i have a little more",
  "15.7": "five",
  "16.2": "six",
  "16.9": "seven",
  "17.2": "eight",
  "18.3": "ten"
};

function changeImgCrop(args={}) {
  assets.children().hide();
  portrait.show();
  $('#portrait').css('clip', `rect(${args.top}px,${args.right}px,${args.bottom}px,${args.left}px)`);
}

function aLittleMore() {
  assets.children().hide();
  littleMore.show();
}

// If calling first image, hide everything else. Otherwise, keep the other images visible
function slideInPortraits(args={}, first=false) {
  if(first) {
    assets.children().hide();
  }
  this.show();
  this.animate(args, 500);
}

function iLoveYou() {
  assets.children().hide();
  loveYouText.css("left", "38%");
  loveYouText.show();
  heart.show();
}

function keyboardControls(e) {
  if (e.keyCode === 32) {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

// Get current time
function getCurrentAudioTime() {
  return audio.currentTime.toFixed(1);
}

function currentTimeInTimings() {
  return timings[getCurrentAudioTime()];
}

function audioChecker() {
  console.log(getCurrentAudioTime());
  if(currentTimeInTimings()) {
    let command = timings[getCurrentAudioTime()];
    console.log('command', command);
    keyWords[command]();
  }
}

function stopAudioChecker() {

}

function handleAnimation() {
// Using timeupdate event on audio is not responsive enough. Therefore, a
// manual interval check was set up for every 100 ms
  setInterval(function() {
    audioChecker();
  }, 100);
}

// Start with all the assets invisible
assets.children().hide();
// $("#alpha-table").show();
// DEBUG!
audio.currentTime = 9;
