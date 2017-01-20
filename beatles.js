$(document).ready(function() {
  
});


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
// Live visual feedback to show what you are speaking
recognition.interimResults = true;

const keyWords = {
  "1": {top: 0, right: 385, bottom: 381, left: 0},
  "2": {top: 0, right: 827, bottom: 381, left: 385},
  "3": {top: 382, right: 385, bottom: 762, left: 0},
  "4": {top: 382, right: 800, bottom: 762, left: 385}
};

// 1st - rect(0px,385px,385px,0px)
// 2nd - rect(0px,827px,385px,384px)
// 3rd - rect(382px,385px,762px,0px)
// 4th - rect(382px,800px,762px,385px)
 
function changeImgCrop(args = {}) {
  $('#portrait').css('clip', `rect(${args.top}px,${args.right}px,${args.bottom}px,${args.left}px)`);
}

function speechTranscript(e) {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript).join('');
    console.log(transcript);

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