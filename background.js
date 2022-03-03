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
        video: true
    }).then(stream => {
        chrome.storage.local.set({
            'camAccess': true
        }, () => {});
        document.querySelector('#webcam').srcObject = stream;
        document.querySelector('#start').disabled = true;
        document.querySelector('#record').disabled = false;
    })
    .catch((error) => {
        document.querySelector('#status').innerHTML = error.toString();
        console.warn(error);
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    setupWebcam();
});

//Request webcam access from user upon installation
//Implement stopWebcam()