$(document).ready(function() {
  startAudioEventListener();
  stopAudioEventListener();
  mainContainerEventListener();
  mainContainerMouseEventListener();
  $(window).on('keyup', handleControls);
  bubbleClickEventListener();
  bubbleAnimationEventListener();
  displayPlaybackControls();
});

// Need to fix submarine animation

let timeChecker; // Var for interval checker
let bubbleInterval;
const audio = document.querySelector("#main-audio");
const playBtn = $("#play-btn");
const pauseBtn = $("#pause-btn");
const pop = document.querySelector("#pop");
const assets = $("#assets");
const mainContainer = $("#main-container");
const words = $("#words");
const numsTable = $("#nums-table");
const john1 = $("#1-john");
const ringo2 = $("#2-ringo");
const george3 = $("#3-george");
const paul4 = $("#4-paul");
const littleMore = $("#little-more");
const johnHead = $("#john-head");
const paulHead = $("#paul-head");
const georgeHead = $("#george-head");
const ringoHead = $("#ringo-head");
const heart = $("#heart");
const loveClass = $(".love");
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
const bird = $("#bird");
const sidewalk = $("#sidewalk");
const treeTrunk = $("#tree-trunk");
const jumpRope = $("#jump-rope");
const school = $("#school");
const sub = $("#sub");
const meList = $("#me-list");
const mePaul = $("#me-paul");
const meJohn = $("#me-john");
const meGeorge = $("#me-george");
const meRingo = $("#me-ringo");
const clownFish = $("#clownfish");
const bubbles = $(".bubble");
const colorsDiv = $("#colors-container");
const blackAlbum = $("#black-album");
const whiteAlbum = $("#white-album");
const greenAlbum = $("#green-album");
const redAlbum = $("#red-album");
const friendBed = $("#friend-text");
const mosaic = $("#mosaic");

const keyFrames = {
  "one": childImage.bind(john1, numsTable, true),
  "two": childImage.bind(ringo2),
  "three": childImage.bind(george3),
  "four": childImage.bind(paul4),
  "little more": showImage.bind(littleMore, {}, true),
  "five": animateObj.bind(johnHead, {left: "-102px"}, true),
  "six": animateObj.bind(paulHead, {right: "-102px"}),
  "seven": animateObj.bind(georgeHead, {top: "-102px"}),
  "eight": animateObj.bind(ringoHead, {bottom: "-102px"}),
  "love": showImage.bind(loveClass, {}, true),
  "a": childImage.bind(aPaul, alphaTable, true),
  "b": childImage.bind(bJohn),
  "c": childImage.bind(cRingo),
  "d": childImage.bind(dGeorge),
  "friend to tea": showImage.bind(friendTea, {}, true),
  "e": showImage.bind(beatlesOutside, {left: -1} , true),
  "f": showImage.bind(beatlesOutside, {left: -12}),
  "g": showImage.bind(beatlesOutside, {left: -24}),
  "h": showImage.bind(beatlesOutside, {left: -35}),
  "i": showImage.bind(beatlesOutside, {left: -49}),
  "j": showImage.bind(beatlesOutside, {left: 0.1, centered: true}, true),
  "waves": showImage.bind(waves, {}, true),
  "sky": showImage.bind(mainContainer, {addClass: "skyblue"}),
  "ship": showImage.bind(ship),
  "meadow": showImage.bind(meadow, {}, true),
  "tree": showImage.bind(tree),
  "lumberjack": showImage.bind(lumberjack),
  "bird": showImage.bind(bird),
  "sidewalk": showImage.bind(sidewalk, {}, true),
  "school": showImage.bind(school),
  "trunk": showImage.bind(treeTrunk),
  "skip": showImage.bind(jumpRope),
  "oceanblue": showImage.bind(mainContainer, {addClass: "oceanblue"}, true),
  "clownfish": showImage.bind(clownFish),
  "sub": showImage.bind(sub),
  "me-paul": meImage.bind(mePaul),
  "me-john": meImage.bind(meJohn),
  "me-george": meImage.bind(meGeorge),
  "me-ringo": meImage.bind(meRingo),
  "bubbles": startBubbleCloner.bind(null),
  "clearBubbles": stopBubbleCloner.bind(null),
  "black": childImage.bind(blackAlbum, colorsDiv, true),
  "white": childImage.bind(whiteAlbum, colorsDiv, true),
  "green": childImage.bind(greenAlbum, colorsDiv, true),
  "red": childImage.bind(redAlbum, colorsDiv, true),
  "friend to bed": showImage.bind(friendBed, {}, true),
  "pink": showImage.bind($(".tile"), {}, true),
  "brown": showImage.bind($("#slide"), {left: 57.4}),
  "yellow": showImage.bind($("#slide"), {left: 42}),
  "orange": showImage.bind($("#slide"), {left: 26.6}),
  "blue": showImage.bind($("#slide"), {left: 11}),
  "allTogether": showImage.bind($(".together")),
  "moveSub": moveAcrossScreen.bind($("#sub-two"))
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
  "18.3": "love",
  "20.7": "a",
  "21.4": "b",
  "22.0": "c",
  "22.6": "d",
  "23.2": "friend to tea",
  "25.8": "e",
  "26.4": "f",
  "27.0": "g",
  "27.2": "h",
  "27.6": "i",
  "28.0": "j",
  "28.7": "love",
  "30.9": "waves",
  "31.5": "sky",
  "32.0": "ship",
  "33.4": "meadow",
  "33.9": "sky",
  "34.0": "tree",
  "34.6": "lumberjack",
  "35.2": "bird",
  "35.9": "sidewalk",
  "36.0": "sky", //Not synced
  "36.3": "school",
  "36.5": "trunk",
  "37.0": "skip",
  "38.4": "oceanblue",
  "38.9": "clownfish",
  "39.0": "sub",
  "39.7": "me-paul",
  "40.5": "me-john",
  "41.3": "me-george",
  "42.3": "me-ringo",
  "42.4": "bubbles",
  "43.4": "allTogether",
  "53.0": "clearBubbles",
  "53.3": "black",
  "54.0": "white",
  "54.6": "green",
  "55.2": "red",
  "55.9": "friend to bed",
  "58.3": "pink",
  "58.9": "brown",
  "59.4": "yellow",
  "59.8": "orange",
  "60.2": "blue",
  "61.1": "love",
  "63.4": "oceanblue",
  "63.5": "bubbles",
  "63.6": "allTogether",
  "64.5": "moveSub",
  "70.5": "moveSub",
  "76.0": "moveSub",
  "82.0": "clearBubbles",
  "82.9": "waves",
  "83.4": "sky",
  "83.5": "ship",
  "85.3": "meadow",
  "85.8": "sky",
  "85.9": "tree",
  "86.4": "lumberjack",
  "87.0": "bird",
  "87.6": "sidewalk",
  "87.7": "sky",
  "88.1": "school",
  "88.2": "trunk",
  "88.8": "skip",
  "90.0": "oceanblue",
  "90.4": "clownfish",
  "90.6": "sub",
  "91.3": "me-paul",
  "92.0": "me-john",
  "93.0": "me-george",
  "93.8": "me-ringo",
  "94.0": "bubbles",
  "94.5": "allTogether",
  "98.0": "moveSub",
  "103.0": "moveSub",
  "110.0": "moveSub",
  "118.0": "clearBubbles",
};

// If calling first image, hide everything else. Otherwise, keep the other images visible
function animateObj(args={}, hide=false) {
  if(hide) {
    assets.children().hide();
  }
  this.show();
  this.animate(args, 300);
}

function childImage(parentName, hide=false) {
  if(hide) {
    assets.children().hide();
    mainContainer.removeClass().addClass("whitebg");
  }
  if(parentName) {
    parentName.show();
  }
  this.css("opacity", "1");
}

function meImage() {
  meList.show();
  this.css("opacity", "1");
  this.css("animation", "meFloat 15s linear forwards");
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Let the bubble cloning commence!
function startBubbleCloner() {
  startBubbleCloner.called = true;
  bubbleInterval = setInterval(cloneBubbles, 1000);
  stopBubbleCloner.called = false;
}

function stopBubbleCloner() {
  stopBubbleCloner.called = true;
  clearInterval(bubbleInterval);
  startBubbleCloner.called = false;
}

// Clone bubble, randomize scale, left, and animation duration 
function cloneBubbles() {
  $.each(bubbles, function(i, bubble) {
    let jbubble = $(bubble);
    // Important to copy event handler!
    let clone = jbubble.clone(true);
    let randomLeft = getRandom(-10, 90);
    let randomSec = getRandom(5, 15);
    clone.css('left', `${randomLeft}%`);
    clone.css('animation', `float ${randomSec}s linear forwards, bubbleRotate 2.5s linear forwards infinite`);
    clone.appendTo("#assets");
  });
}

function moveAcrossScreen() {
  // Need to work on conjunction with animation. Still needs tweaking.
  this.show();
  let currentLeft = this.css("left").replace(/px/gi, '');
  let targetLeft = currentLeft < 0 ? '100%' : "-100%";
  let targetTop  = getRandom(0, 60) + '%';
  let targetScale = getRandom(0.2, 1);
  this.css({"left": targetLeft, "top": targetTop, "transform": `scale(${targetScale})`});
  // If offscreen on right rotate to face proper direction
  if(targetLeft == "-100%") {
    this.css({"transform": `rotateY(180deg) scale(${targetScale})`});
  }

}

const bubbleClickEventListener = function() {
  $(".bubble").on("click", function() {
      pop.play();
      this.remove();
  });
};

// Removes bubble when offscreen
const bubbleAnimationEventListener = function() {
  $(".bubble").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    console.log('REMOVED BUBBLE!');
    this.remove();
  });
};

function showImage(args={}, hide=false) {
  if(hide) {
    assets.children().hide();
    mainContainer.removeClass().addClass("whitebg");
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
    this.css({'width': "100%", 'height': "100%"});
  }
  if(args.addClass) {
    this.addClass(args.addClass);
  }
}

function handleControls(e, click=false) {
  // Space or click
  if (click || e.keyCode === 32) {
    let command = audio.paused ? audio.play() : audio.pause();
    displayPlaybackControls();
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

function displayPlaybackControls() {
    if(audio.paused) {
      pauseBtn.hide();
      playBtn.show();
    } else {
      pauseBtn.show();
      playBtn.hide();
    }
}

function hidePlaybackControls() {
    $(".controls").fadeOut("slow");
}

const mainContainerMouseEventListener = function() {
  mainContainer.on("mouseenter", function() {
    displayPlaybackControls();
  });
  mainContainer.on("mouseleave", function() {
    hidePlaybackControls();
  });
};

const startAudioEventListener = function() {
  $(audio).on('play', function() {
    console.log('starting');
    timeChecker = setInterval(function() {
      timingChecker();
    }, 100);
  });
};

const stopAudioEventListener = function() {
  $(audio).on("pause", function() {
    console.log('clearing');
    clearInterval(timeChecker);
  });
};

// Control playback with mouse click
const mainContainerEventListener = function() {
  $(mainContainer).on("click", function(e) {
    // This is to allow bubble pops by clicking during all together now scene
    if(!startBubbleCloner.called || stopBubbleCloner.called) {
      handleControls(e, click=true);
    }
  });
};

// Start with all the assets hidden
assets.children().hide();
// $("#mosaic").show();
// $("#slide").show();
// DEBUG!
audio.currentTime = 10;
// audio.currentTime = 37;
