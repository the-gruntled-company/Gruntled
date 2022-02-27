"use strict";

function setupWebcam() {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        chrome.storage.local.set({
            'camAccess': true
        }, () => {});
        document.querySelector('#webcamVideo').srcObject = stream;
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
