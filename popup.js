//id=close: close popup
const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', function() {
  window.close();
});

//id=start: start webcam
const startButton = document.querySelector('#start');
startButton.addEventListener('click', function(){
  chrome.tabs.create({
    url: chrome.extension.getURL('webcam.html'),
    active: true
  });
  chrome.runtime.getBackgroundPage(function(backgroundPage) {
		backgroundPage.setupWebcam();
	})
});

//id=title: get youtube title
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  let title = tabs[0].title;   //title
  document.querySelector('#title').innerHTML = title;
});

'use strict';

/* globals MediaRecorder */
let mediaRecorder;
let recordedBlobs;

const codecPreferences = document.querySelector('#codecPreferences');
const recordedVideo = document.querySelector('video#recorded');

const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
  }
});

function startRecording() {
  recordedBlobs = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(window.stream);
  } catch (e) {
    console.error(e);
    document.querySelector('#status').innerHTML = e.toString();
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  codecPreferences.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function stopRecording() {
  mediaRecorder.stop();
  recordButton.textContent = 'Start Recording';
  playButton.disabled = false;
  downloadButton.disabled = false;
  codecPreferences.disabled = false;
}

playButton.addEventListener('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});


