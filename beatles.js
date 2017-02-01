$(document).ready(function() {
  startAudioEventListener();
  stopAudioEventListener();
  mainContainerEventListener();
  $(window).on('keyup', handleControls);
  bubbleAnimationEventListener();
});

let timeChecker; // Var for interval checker
let bubbleInterval;
const audio = document.querySelector("#main-audio");
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
const standing = $("#standing");
const friendBed = $("#friend-text");


const keyFrames = {
  "one": tableImage.bind(john1, numsTable, true),
  "two": tableImage.bind(ringo2),
  "three": tableImage.bind(george3),
  "four": tableImage.bind(paul4),
  "little more": showImage.bind(littleMore, {}, true),
  "five": slideInPortraits.bind(johnHead, {left: "-102px"}, true),
  "six": slideInPortraits.bind(paulHead, {right: "-102px"}),
  "seven": slideInPortraits.bind(georgeHead, {top: "-102px"}),
  "eight": slideInPortraits.bind(ringoHead, {bottom: "-102px"}),
  "ten": iLoveYou,
  "a": tableImage.bind(aPaul, alphaTable, true),
  "b": tableImage.bind(bJohn),
  "c": tableImage.bind(cRingo),
  "d": tableImage.bind(dGeorge),
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
  "black": showImage.bind(standing, {addClass: "blackbg"}, true),
  "white": showImage.bind(standing, {addClass: "whitebg"}, true),
  "green": showImage.bind(standing, {addClass: "greenbg"}, true),
  "red": showImage.bind(standing, {addClass: "redbg"}, true),
  "friend to bed": showImage.bind(friendBed, {}, true)
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
  "27.2": "h",
  "27.6": "i",
  "28.0": "j",
  "28.7": "ten",
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
  "42.6": "bubbles",
  "53.0": "clearBubbles",
  "53.3": "black",
  "54.0": "white",
  "54.6": "green",
  "55.2": "red",
  "55.9": "friend to bed"
};

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

function tableImage(tableName, hide=false) {
  if(hide) {
    assets.children().hide();
  }
  if(tableName) {
    tableName.show();
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
  bubbleInterval = setInterval(cloneBubbles, 1000);
}

function stopBubbleCloner() {
  clearInterval(bubbleInterval);
}

// Clone bubble, randomize scale, left, and animation duration 
function cloneBubbles() {
  $.each(bubbles, function(i, bubble) {
    let jbubble = $(bubble);
    // Important to copy event handler!
    let clone = jbubble.clone(true);
    let randomLeft = getRandom(-10, 90);
    let randomSec = getRandom(5, 15);
    // clone.css('transform', `scale(${randomDec})`);
    clone.css('left', `${randomLeft}%`);
    clone.css('animation', `float ${randomSec}s linear forwards, bubbleRotate 2.5s linear forwards infinite`);
    clone.appendTo("#assets");
  });
}

// Removes bubble when offscreen
const bubbleAnimationEventListener = function() {
  $(".bubble").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    this.remove();
    console.log("REMOVED!");
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
    console.log('args.addClass', args.addClass);
    this.addClass(args.addClass);
  }
}

function handleControls(e, click=false) {
  // Space, enter, or click
  if (click || e.keyCode === 32 || e.keyCode === 13) {
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
    handleControls(e, click=true);
  });
};

// Start with all the assets hidden
assets.children().hide();
// $(".bubble").show();
// DEBUG!
// audio.currentTime = 53.0;
audio.currentTime = 10;
