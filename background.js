//Popup shows on youtube.com/watch
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([ {
            // That fires when a page's URL contains 'youtube.com/watch' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { urlContains: 'youtube.com/watch' },
                })
            ],
            // And shows the extension's page action.
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});

"use strict";

function setupWebcam() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        chrome.storage.local.set({
            'camAccess': true
        }, () => {});
        document.querySelector('button#start').disabled = true;
        document.querySelector('button#record').disabled = false;
        window.stream = stream;
  
        const gumVideo = document.querySelector('video#gum');
        gumVideo.srcObject = stream;
      
        getSupportedMimeTypes().forEach(mimeType => {
          const option = document.createElement('option');
          option.value = mimeType;
          option.innerText = option.value;
          codecPreferences.appendChild(option);
        });
        codecPreferences.disabled = false;
    })
    .catch((e) => {
        document.querySelector('#status').innerHTML = e.toString();
        console.error(e);
    });
}

function getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    setupWebcam();
});

//Request webcam access from user upon installation
//Implement stopWebcam()