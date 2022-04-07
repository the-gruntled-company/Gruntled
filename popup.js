// Open New port for communication
var port = chrome.runtime.connect({ name: "popup-port" });

// Send message
// port.postMessage({ status: "connected", data: "content port opened" });

//id=close: close popup
const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", function () {
    window.close();
});

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

// async function getCurrentTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

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

// Can make it start when extension Icon is clicked
function startupWeb() {
    return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
}

let already_started = startupWeb();
console.log(already_started);
// But show only when start camera button is clicked
function setupWeb() {
    // navigator.mediaDevices
    //     .getUserMedia({
    //         video: true,
    //         audio: true,
    //     })

    already_started
        .then((stream) => {
            chrome.storage.local.set(
                {
                    camAccess: true,
                },
                () => {}
            );
            document.querySelector("button#start").disabled = true;
            document.querySelector("button#record").disabled = false;
            window.stream = stream;

            const gumVideo = document.querySelector("video#gum");
            gumVideo.srcObject = stream;

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

//id=start: start webcam
const startButton = document.querySelector("#start");
startButton.addEventListener("click", function () {
    navigator.serviceWorker.controller.postMessage({
        data: 'stop video'
    });
    //port.postMessage({ data: "stop video" });
    // port.postMessage({ data: "Start Webcam" });

    setupWeb();
    // let new_tab = getCurrentTab();
    // new_tab.scripting.executeScript("inject-webcam.js");

    // chrome.tabs.create({
    //     url: chrome.extension.getURL("webcam.html"),
    //     active: true,
    // });
    // chrome.runtime.getBackgroundPage(function (backgroundPage) {
    //     backgroundPage.setupWebcam();
    // });
});

//id=title: get youtube title
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let title = tabs[0].title; //title
    document.querySelector("#title").innerHTML = title;
});

("use strict");

/* globals MediaRecorder */
let mediaRecorder;
let recordedBlobs;

const codecPreferences = document.querySelector("#codecPreferences");
const recordedVideo = document.querySelector("video#recorded");

const recordButton = document.querySelector("button#record");
const playButton = document.querySelector("button#play");
const downloadButton = document.querySelector("button#download");

recordButton.addEventListener("click", () => {
    if (recordButton.textContent === "Start Recording") {
        startRecording();
        navigator.serviceWorker.controller.postMessage({
            data: 'restart video'
        });
        //port.postMessage({ data: "restart video" });
    } else {
        console.log("stop record event");
        stopRecording();
        navigator.serviceWorker.controller.postMessage({
            data: 'stop video'
        });
        //window.port.postMessage({ data: "stop video" });
    }
});

function startRecording() {
    recordedBlobs = [];
    const mimeType =
        codecPreferences.options[codecPreferences.selectedIndex].value;
    const options = { mimeType };

    try {
        mediaRecorder = new MediaRecorder(window.stream);
    } catch (e) {
        console.error(e);
        document.querySelector("#status").innerHTML = e.toString();
        return;
    }

    console.log(
        "Created MediaRecorder",
        mediaRecorder,
        "with options",
        options
    );
    recordButton.textContent = "Stop Recording";
    playButton.disabled = true;
    downloadButton.disabled = true;
    codecPreferences.disabled = true;
    mediaRecorder.onstop = (event) => {
        console.log("Recorder stopped: ", event);
        console.log("Recorded Blobs: ", recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log("MediaRecorder started", mediaRecorder);
}

function restartVideo() {
    navigator.serviceWorker.controller.postMessage({
        data: 'restart video'
    });
    //port.postMessage({ data: "restart video" });
}

function handleDataAvailable(event) {
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function stopRecording() {
    mediaRecorder.stop();
    recordButton.textContent = "Start Recording";
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;
}

playButton.addEventListener("click", () => {
    const mimeType = codecPreferences.options[
        codecPreferences.selectedIndex
    ].value.split(";", 1)[0];

    const superBuffer = new Blob(recordedBlobs, { type: mimeType });
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    navigator.serviceWorker.controller.postMessage({
        data: 'restart video'
    });
    //port.postMessage({ data: "restart video" });
    recordedVideo.play();
});

downloadButton.addEventListener("click", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
});
