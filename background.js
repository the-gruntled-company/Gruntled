//Popup shows on youtube.com/watch
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains 'youtube.com/watch' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: "youtube.com/watch" },
                    }),
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowAction()],
            },
        ]);
    });
});

// Set up port listener and their respective on message listeners
// setup When another part of extension calls "connect()", this event is fired, along with the runtime.Port object you can use to send and receive messages through the connection.

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "content-bkg") {
        console.log(port.name);
        //window.content_port = port;

        // navigator.serviceWorker.controller.postMessage({
        //     data: 'background port opened'
        // });
        //port.postMessage({ data: "background port opened" });
        
        port.onMessage.addListener((msg) => {
            // console.log(msg);
            if (msg.data.type === "connected") {

                if ('serviceWorker' in navigator) {
                    if (navigator.serviceWorker.controller) {
                        console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
                    } else {
                        console.log('This page is not currently controlled by a service worker.');
                    }
                } else {
                    console.log('Service workers are not supported.');
                }

                navigator.serviceWorker.controller.postMessage({
                    data: 'background response'
                });
                //port.postMessage({ data: "background response" });
                console.log("bkg response sent");
            } else if (msg.data === "content handshake") {
                navigator.serviceWorker.controller.postMessage({
                    data: 'background handshake'
                });
                //port.postMessage({ data: "background handshake" });
                console.log("handshake confirmed");
            }
        });
    } else if (port.name === "popup-port") {
        console.log(port.name);
        // This might introduce a bug if window.content_port is not opened before the popup port,
        // but it shouldnt be a problem right because the content loads automatically first
        self.addEventListener('message', (msg) => {
        //port.onMessage.addListener((msg) => {
            //console.log(msg.data);
            if (msg.data.type === "connected") {

                if ('serviceWorker' in navigator) {
                    if (navigator.serviceWorker.controller) {
                        console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
                    } else {
                        console.log('This page is not currently controlled by a service worker.');
                    }
                } else {
                    console.log('Service workers are not supported.');
                }

                navigator.serviceWorker.controller.postMessage({
                    data: 'background response'
                });
                //port.postMessage({ data: "background response" });
                console.log("popup port opened");
            } else if (msg.data === "start video") {
                navigator.serviceWorker.controller.postMessage({
                    data: 'start video'
                });
                console.log("console: start video");
                //window.content_port.postMessage({ data: "start video" });
            } else if (msg.data === "stop video") {
                navigator.serviceWorker.controller.postMessage({
                    data: 'stop video'
                });
                console.log("console: stop video");
                //window.content_port.postMessage({ data: "stop video" });
            } else if (msg.data === "restart video") {
                navigator.serviceWorker.controller.postMessage({
                    data: 'restart video'
                });
                console.log("console: restart video");
                //window.content_port.postMessage({ data: "restart video" });
            }
        });
    }
});

("use strict");

function setupWebcam() {
    console.log("test webcam setup");
    // navigator.mediaDevices
    //     .getUserMedia({
    //         video: true,
    //         audio: true,
    //     })
    //     .then((stream) => {
    //         chrome.storage.local.set(
    //             {
    //                 camAccess: true,
    //             },
    //             () => {}
    //         );
    //         document.querySelector("button#start").disabled = true;
    //         document.querySelector("button#record").disabled = false;
    //         window.stream = stream;

    //         const gumVideo = document.querySelector("video#gum");
    //         gumVideo.srcObject = stream;

    //         getSupportedMimeTypes().forEach((mimeType) => {
    //             const option = document.createElement("option");
    //             option.value = mimeType;
    //             option.innerText = option.value;
    //             codecPreferences.appendChild(option);
    //         });
    //         codecPreferences.disabled = false;
    //     })
    //     .catch((e) => {
    //         document.querySelector("#status").innerHTML = e.toString();
    //         console.error(e);
    //     });

// function getSupportedMimeTypes() {
//     const possibleTypes = [
//         "video/webm;codecs=vp9,opus",
//         "video/webm;codecs=vp8,opus",
//         "video/webm;codecs=h264,opus",
//         "video/mp4;codecs=h264,aac",
//     ];
//     return possibleTypes.filter((mimeType) => {
//         return MediaRecorder.isTypeSupported(mimeType);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     setupWebcam();
// });
}
