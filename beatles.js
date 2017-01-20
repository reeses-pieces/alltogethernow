$(document).ready(function() {
  
});


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
// Live visual feedback to show what you are speaking
recognition.interimResults = true;

const mainContent = $("#main-container");
const words = $("#words");

const keyWords = {
  "one": changeImgCrop.bind(null, {top: 0, right: 385, bottom: 381, left: 0}),
  "two": changeImgCrop.bind(null, {top: 0, right: 827, bottom: 381, left: 385}),
  "three": changeImgCrop.bind(null, {top: 382, right: 385, bottom: 762, left: 0}),
  "for": changeImgCrop.bind(null, {top: 382, right: 800, bottom: 762, left: 385}, true),
};

function changeImgCrop(args={}, lastImage=false) {
  $('#portrait').css('clip', `rect(${args.top}px,${args.right}px,${args.bottom}px,${args.left}px)`);
  if(lastImage) {
    setTimeout(aLittleMore, 1000);
  }
}

function aLittleMore() {
  // $("#portrait").addClass("hidden");
  mainContent.html("<p>Can I have a little more?</p>");
}

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

recognition.addEventListener("result", speechTranscript);
recognition.addEventListener("end", recognition.start);
recognition.start();