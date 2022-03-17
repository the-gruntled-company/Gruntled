/*all tabs*/
console.log("loaded popup.js");

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

/*tab1*/

//id=start: start webcam
const startButton = document.querySelector("#start");
startButton.addEventListener("click", function () {
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
const saveButton = document.querySelector("button#save");

recordButton.addEventListener("click", () => {
    if (recordButton.textContent === "Start Recording") {
        startRecording();
    } else {
        stopRecording();
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
    //TODO
    restartVideo();
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
    restartVideo();
    console.log("MediaRecorder started", mediaRecorder);
}

function restartVideo() {
    //TODO
    // Select Main Video Element, might have to make this run in the content script, use background script to coordinate
    const video_element = document.getElementById("movie_player");

    video_element.seekTo(0);
    video_element.playVideo();
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
    saveButton.disabled = false;
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
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
});

saveButton.addEventListener("click", () => {
    var key = "Red Cat 5";
    var value = "A nice kitty";

    chrome.storage.sync.set({ key: value }, function () {
        console.log("Value is set to " + value);
    });

    chrome.storage.sync.get(["key"], function (result) {
        console.log("Value currently is " + result.key);
    });
});

/*tab 2*/

function displayLocalStorage() {
    chrome.storage.local.get(null, function (items) {
        for (key in items) {
            console.log(key);
        }
    });
}

// function clearLocalStorage(){
//   chrome.storage.local.clear(function() {
//     var error = chrome.runtime.lastError;
//       if (error) {
//         console.error(error);
//       }
//    })
//  }

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    displayLocalStorage();
});
