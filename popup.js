'use strict';

let mediaRecorder;
let recordedBlobs;

function setupTabs (){
  document.querySelectorAll('.tab-btn').forEach(button=>{
    button.addEventListener('click', ()=>{
      
      const sidebar = button.parentElement;
      const tabs = sidebar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabActivate = tabs.querySelector(`.tab-content[data-tab="${tabNumber}"]`)
      
      sidebar.querySelectorAll('.tab-btn').forEach(button=>{
        button.classList.remove('tab-btn-active')
      })
       tabs.querySelectorAll('.tab-content').forEach(tab=>{
        tab.classList.remove('tab-content-active')
      })
      button.classList.add('tab-btn-active')
      tabActivate.classList.add('tab-content-active')
    })
  })
}

//id=close: close popup
const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', function() {
  window.close();
});

//id=start: start webcam
const startButton = document.querySelector('#start');
startButton.addEventListener('click', function(){
  chrome.tabs.create({
    url: chrome.extension.getURL('welcome.html'),
    active: true
  });
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
		backgroundPage.setupWebcam();
	})
});

const recordButton = document.querySelector('#record');
const playButton = document.querySelector('#play');
const downloadButton = document.querySelector('#download');

recordButton.addEventListener('click', ()=> {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
});

function startRecording() {
  //start
  recordedBlobs = [];

  try {
    mediaRecorder = new MediaRecorder(window.stream);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  //end

  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  
  //start
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
  //end
}

function stopRecording() {
  // mediaRecorder.stop();
}
//id=record: restart video and record
//src=https://stackoverflow.com/questions/39098532/restart-html-video-with-javascript
// var recordButton = document.querySelector('.closeButton');
// closeButton.addEventListener('click', function() {
//   var video = document.getElementById('vidId');
//   video.pause();
//   video.currentTime = 0;
//   video.load();
// });


//On load
document.addEventListener('DOMContentLoaded',()=>{
    setupTabs();
})