$(document).ready(function() {
  startAudioEventListener();
  stopAudioEventListener();
  $(window).on('keyup', keyboardControls);
});

let checker; // Var for interval checker
const audio = document.querySelector("#main-audio");
const assets = $("#assets");
const mainContainer = $("#main-container");
const words = $("#words");
const portrait = $("#portrait");
const littleMore = $("#little-more");
const johnHead = $("#john-head");
const paulHead = $("#paul-head");
const georgeHead = $("#george-head");
const ringoHead = $("#ringo-head");
const heart = $("#heart");
const loveYouText = $("#love-you-text");
const alphaTable = $("#alpha-table");
const aPaul = $("#a-paul");
const bJohn = $("#b-john");
const cRingo = $("#c-ringo");
const dGeorge = $("#d-george");
const friendTea = $("#friend-tea");
const beatlesOutside = $("#beatles-outside");
const waves = $("#waves");
const ship = $("#ship");
const meadow = $("#meadow");
const tree = $("#tree");
const lumberjack = $("#lumberjack");

const keyFrames = {
  "one": changeImgCrop.bind(null, {top: 0, right: 385, bottom: 381, left: 0}),
  "two": changeImgCrop.bind(null, {top: 0, right: 827, bottom: 381, left: 385}),
  "three": changeImgCrop.bind(null, {top: 387, right: 385, bottom: 762, left: 0}),
  "four": changeImgCrop.bind(null, {top: 387, right: 800, bottom: 762, left: 385}),
  "little more": displayText.bind(littleMore, ''),
  "five": slideInPortraits.bind(johnHead, {left: "-102px"}, true),
  "six": slideInPortraits.bind(paulHead, {right: "-102px"}),
  "seven": slideInPortraits.bind(georgeHead, {top: "-102px"}),
  "eight": slideInPortraits.bind(ringoHead, {bottom: "-102px"}),
  "ten": iLoveYou,
  "a": alphaImage.bind(aPaul),
  "b": alphaImage.bind(bJohn),
  "c": alphaImage.bind(cRingo),
  "d": alphaImage.bind(dGeorge),
  "friend to tea": displayText.bind(friendTea),
  "e": showImage.bind(beatlesOutside, {top: 69, left: 93}),
  "f": showImage.bind(beatlesOutside, {top: 69, left: 64}),
  "g": showImage.bind(beatlesOutside, {top: 69, left: 26}),
  "i": showImage.bind(beatlesOutside, {top: 69, left: 8}),
  "j": showImage.bind(beatlesOutside, {top: 50, left: 50, centered: true}),
  "waves": showImage.bind(waves, {}, false),
  "sky": showImage.bind(mainContainer, {class: "skyblue"}, false),
  "ship": showImage.bind(ship, {}, false),
  "meadow": showImage.bind(meadow, {}),
  "tree": showImage.bind(tree, {}, false),
  "lumberjack": showImage.bind(lumberjack, {}, false)
};

// Timings for keyframes
const timings = {
  "10.5": "one",
  "11.2": "two",
  "11.9": "three",
  "12.5": "four",
  "13.1": "little more",
  "15.7": "five",
  "16.2": "six",
  "16.9": "seven",
  "17.2": "eight",
  "18.3": "ten",
  "20.7": "a",
  "21.4": "b",
  "22.0": "c",
  "22.6": "d",
  "23.2": "friend to tea",
  "25.8": "e",
  "26.4": "f",
  "27.0": "g",
  "27.6": "i",
  "28.0": "j",
  "28.7": "ten",
  "30.9": "waves",
  "31.5": "sky",
  "32.0": "ship",
  "33.4": "meadow",
  "33.9": "sky",
  "34.0": "tree",
  "34.6": "lumberjack"
};

function changeImgCrop(args={}) {
  assets.children().hide();
  portrait.show();
  $('#portrait').css('clip', `rect(${args.top}px,${args.right}px,${args.bottom}px,${args.left}px)`);
}

function displayText() {
  assets.children().hide();
  this.show();
}

// If calling first image, hide everything else. Otherwise, keep the other images visible
function slideInPortraits(args={}, first=false) {
  if(first) {
    assets.children().hide();
  }
  this.show();
  this.animate(args, 300);
}

function iLoveYou() {
  assets.children().hide();
  loveYouText.css("left", "38%");
  loveYouText.show();
  heart.show();
}

function alphaImage() {
  assets.children().hide();
  alphaTable.show();
  this.css("opacity", "1");
}

function showImage(args={}, hide=true) {
  if(hide) {
    assets.children().hide();
  }
  this.show();
  if(args) {
    handleArgs.call(this, args);
  }
}

function handleArgs(args) {
  if(args.top || args.left) {
    this.css({'top': `${args.top}%`, 'left': `${args.left}%`});
  }
  if(args.centered) {
    this.css({'max-width': "100%", 'max-height': "100%"});
  }
  if(args.class) {
    this.addClass(args.class);
  }
}

function keyboardControls(e) {
  // Space or Enter
  if (e.keyCode === 32 || e.keyCode === 13) {
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

function timingChecker() {
  console.log(getCurrentAudioTime());
  if(currentTimeInTimings()) {
    let command = timings[getCurrentAudioTime()];
    console.log('command', command);
    keyFrames[command]();
  }
}

const startAudioEventListener = function() {
  $(audio).on('play', function() {
    console.log('starting');
    checker = setInterval(function() {
      timingChecker();
    }, 100);
  });
};

const stopAudioEventListener = function() {
  $(audio).on("pause", function() {
    console.log('clearing');
    clearInterval(checker);
  });
};

// Start with all the assets hidden
assets.children().hide();
// $(".chop").show();
// DEBUG!
audio.currentTime = 10;
