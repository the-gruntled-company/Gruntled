console.log("popup.js Loaded");

//Buttons
const startButton = document.getElementById("start");

//Video Containers
const recordedVideo = document.getElementById("recorded");

let addCustomEventListener = (html_element, custom_event_func) => {
    html_element.addEventListener("click", (e) => {
        custom_event_func && custom_event_func(); // if no custom function is provided doesnt run it
    });
};

("use strict");
/* globals MediaRecorder */
let mediaRecorder;
let recordedBlobs;

// Functions
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let startCamera = () => {
    console.log("Start camera START");

    getCurrentTab().then((tab) => {
        // Send script to start camera
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["final_final_index.js"],
        });
    });
};

// let startRecording = () => {
//     console.log("Start recording START");
//     recordedBlobs = [];

//     // Set Option
//     const mimeType = 'video/mp4';
//     const options = { mimeType };

//     // Try to get Media Recorder from Media Stream
//     try {
//         mediaRecorder = new MediaRecorder(window.stream);
//     } catch (e) {
//         console.error(e);
//         return;
//     }

//     // Show Result
//     console.log("Created MediaRecorder", mediaRecorder, "with options", options);

//     // Update Record Button
//     recordButton.textContent = "Stop Recording";

//     // Update Other Buttons and inputs
//     playButton.disabled = true;

//     // Set on stop event
//     mediaRecorder.onstop = (event) => {
//         console.log("Recorder stopped: ", event);
//         console.log("Recorded Blobs: ", recordedBlobs);
//     };

//     // When data is available start recording and handle data
//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.start();

//     console.log("MediaRecorder started", mediaRecorder);
//     console.log("Play Video");
    
//     // Restart Video
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: restart
//     });
//     console.log("Start recording END");
// };

// function handleDataAvailable(event) {
//     console.log("handleDataAvailable", event);
//     if (event.data && event.data.size > 0) {
//         recordedBlobs.push(event.data);
//     }
// }

// let stopRecording = () => {
//     console.log("Stop Recording START");
//     mediaRecorder.stop();
//     recordButton.textContent = "Start Recording";
//     playButton.disabled = false;
//     console.log("Stop Recording END");
// };

let playbackVideo = () => {
    console.log("Playback Video");
    const mimeType = 'video/mp4';

    const superBuffer = new Blob(recordedBlobs, { type: mimeType });
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    navigator.serviceWorker.controller.postMessage({
        data: "restart video",
    });
    //port.postMessage({ data: "restart video" });
    recordedVideo.play();
};

// Attach buttons to functions
// addCustomEventListener(playButton, playbackVideo);
// addCustomEventListener(recordButton, recordToggle);
addCustomEventListener(startButton, startCamera);

// Setup tabs
function setupTabs() {
    document.querySelectorAll(".tab-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const sidebar = button.parentElement;
            const tabs = sidebar.parentElement;
            const tabNumber = button.dataset.forTab;
            const tabActivate = tabs.querySelector(
                `.tab-content[data-tab="${tabNumber}"]`
            );

            sidebar.querySelectorAll(".tab-btn").forEach((button) => {
                button.classList.remove("tab-btn-active");
            });
            tabs.querySelectorAll(".tab-content").forEach((tab) => {
                tab.classList.remove("tab-content-active");
            });
            button.classList.add("tab-btn-active");
            tabActivate.classList.add("tab-content-active");
        });
    });
}

// When DOM loads
document.addEventListener("DOMContentLoaded", () => {
    // onStartUp();
    setupTabs();
});
