console.log("popup.js Loaded");

// Buttons
const start_button = document.getElementById("start");
const record_button = document.getElementById("record");
const play_button = document.getElementById("play");
const download_button = document.getElementById("download");

// Video Containers
const gum_video = document.getElementById("gum");
const recorded_video = document.getElementById("recorded");

let addCustomEventListener = (ele, custom_func) => {
    ele.addEventListener("click", (e) => {
        custom_func && custom_func(); // if no custom func doesnt run it
    });
};

//setup tabs
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

//id=title: get youtube title
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let title = tabs[0].title; //title
    document.querySelector("#title").innerHTML = title;
});

// Can make it start when extension Icon is clicked
// async function getCurrentTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

console.log("test");
// But show only when start camera button is clicked
function setupWeb() {
    getCurrentTab().then((tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
        });
    });

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            chrome.storage.local.set(
                {
                    camAccess: true,
                },
                () => {}
            );
            start_button.disabled = true;
            record_button.disabled = false;
            window.stream = stream;

            // const gumVideo = document.querySelector("video#gum");
            gum_video.srcObject = stream;

            getSupportedMimeTypes().forEach((mimeType) => {
                const option = document.createElement("option");
                option.value = mimeType;
                option.innerText = option.value;
                codecPreferences.appendChild(option);
            });
            codecPreferences.disabled = false;
        })
        .catch((e) => {
            document.querySelector("#status").innerHTML = e.toString();
            console.error(e);
        });
}

// Setup Mime Types
function getSupportedMimeTypes() {
    const possibleTypes = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=h264,opus",
        "video/mp4;codecs=h264,aac",
    ];
    return possibleTypes.filter((mimeType) => {
        return MediaRecorder.isTypeSupported(mimeType);
    });
}

("use strict");

/* globals MediaRecorder */
let mediaRecorder;
let recordedBlobs;

const codecPreferences = document.querySelector("#codecPreferences");

// Functions
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let play = () => {
    console.log("Play/start");
    const yt_play_button =
        document.getElementsByClassName("ytp-play-button")[0];

    // Play
    if (yt_play_button.title == "Play (k)") {
        yt_play_button.click();
    }
};

let pause = () => {
    console.log("Pause");
    const yt_play_button =
        document.getElementsByClassName("ytp-play-button")[0];

    // Pause
    if (yt_play_button.title == "Pause (k)") {
        yt_play_button.click();
    }
};

let restart = () => {
    console.log("Restart");
};

let startRecording = () => {
    console.log("Start Recording");
    recordedBlobs = [];

    // Set Option
    const mimeType =
        codecPreferences.options[codecPreferences.selectedIndex].value;
    const options = { mimeType };

    // Try to get Media Recorder from Media Stream
    try {
        mediaRecorder = new MediaRecorder(window.stream);
    } catch (e) {
        console.error(e);
        document.querySelector("#status").innerHTML = e.toString();
        return;
    }

    // Show Result
    console.log(
        "Created MediaRecorder",
        mediaRecorder,
        "with options",
        options
    );

    // Update Record Button
    recordButton.textContent = "Stop Recording";

    // Update Other Buttons and inputs
    playButton.disabled = true;
    downloadButton.disabled = true;
    codecPreferences.disabled = true;

    // Set on stop event
    mediaRecorder.onstop = (event) => {
        console.log("Recorder stopped: ", event);
        console.log("Recorded Blobs: ", recordedBlobs);
    };

    // When data is available start recording and handle data
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();

    console.log("MediaRecorder started", mediaRecorder);
    console.log("Play Video");
};

function handleDataAvailable(event) {
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

let stopRecording = () => {
    console.log("Stop Recording");
    mediaRecorder.stop();
    recordButton.textContent = "Start Recording";
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;

    console.log("Pause Video");
};

let recordToggle = () => {
    if (recordButton.textContent === "Start Recording") {
        startRecording();
    } else {
        stopRecording();
    }
};

let startCamera = () => {
    console.log("Start Camera");

    getCurrentTab().then((tab) => {
        // Send script to start camera
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
        });
        // Pause Video
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: pause,
        });
    });
    console.log("Restart Video");
    console.log("Pause Video");
};

let playbackVideo = () => {
    console.log("Playback Video");
    const mimeType = codecPreferences.options[
        codecPreferences.selectedIndex
    ].value.split(";", 1)[0];

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

    console.log("Pause Video");
};

let downloadVideo = () => {
    console.log("Download Video");
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "test.webm";
    document.body.appendChild(a);
    a.click();
    chrome.alarms.create({ delayInMinutes: 1 });
    chrome.alarms.onAlarm.addListener(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
};

addCustomEventListener(play_button, playbackVideo);
addCustomEventListener(download_button, downloadVideo);
addCustomEventListener(record_button, recordToggle);
addCustomEventListener(start_button, startCamera);

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
});
