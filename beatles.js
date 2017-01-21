$(document).ready(function() {
  
});


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
// Live visual feedback to show what you are speaking
recognition.interimResults = true;

const assets = $("#assets");
const mainContent = $("#main-container");
const words = $("#words");
const portrait = $("#portrait");
const littleMore = $("#little-more");
const johnHead = $("#john-head");
const paulHead = $("#paul-head");
const georgeHead = $("#george-head");
const ringoHead = $("#ringo-head");
const altogether = $("#altogether");

const keyWords = {
  "one": changeImgCrop.bind(null, {top: 0, right: 385, bottom: 381, left: 0}),
  "two": changeImgCrop.bind(null, {top: 0, right: 827, bottom: 381, left: 385}),
  "three": changeImgCrop.bind(null, {top: 382, right: 385, bottom: 762, left: 0}),
  "for": changeImgCrop.bind(null, {top: 382, right: 800, bottom: 762, left: 385}, true),
  "five": slideInPortraits.bind(johnHead, {left: "-102px"}, true),
  "six": slideInPortraits.bind(paulHead, {right: "-102px"}),
  "seven": slideInPortraits.bind(georgeHead, {top: "-102px"}),
  "eight": slideInPortraits.bind(ringoHead, {bottom: "-102px"}),
  "nine": slideInPortraits.bind(altogether)

};

function changeImgCrop(args={}, lastImage=false) {
  assets.children().hide()
  portrait.show();
  $('#portrait').css('clip', `rect(${args.top}px,${args.right}px,${args.bottom}px,${args.left}px)`);
  if(lastImage) {
    setTimeout(aLittleMore, 1100);
  }
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


// Parse speech
function speechTranscript(e) {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript).join('')
    .trim()
    .toLowerCase();
    console.log(transcript);

    // Live transcription
    words.text(transcript);
    processCommand(transcript);
}

function processCommand(transcript) {
  if(keyWords[transcript]) {
    keyWords[transcript]();
  }
}

// Start with all the assets invisible
assets.children().hide();
// $("#altogether").show();

recognition.addEventListener("result", speechTranscript);
recognition.addEventListener("end", recognition.start);
recognition.start();