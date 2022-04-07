console.log("content.js loaded"); // pls load

// Open New port for communication
var port = chrome.runtime.connect({ name: "content-bkg" });

// My attempts
// document.getElementById("movie_player");

var yt_vid = document.getElementsByClassName(
    "video-stream html5-main-video"
)[0];

// aria-label="Pause (k)"
// title="Pause (k)" || "Play (k)"
var yt_play_button = document.getElementsByClassName("ytp-play-button")[0];

let play = (ele) => {
    if (ele.title == "Play (k)") {
        ele.click();
    }
};

let pause = (ele) => {
    if (ele.title == "Pause (k)") {
        ele.click();
    }
};

// Send message
navigator.serviceWorker.controller.postMessage({
    data: 'content port opened',
    type: 'connected'
});
//port.postMessage({ status: "connected", data: "content port opened" });

// Set up listener
self.addEventListener('message', (msg) => {
//port.onMessage.addListener((msg) => {
    // console.log(msg);
    if (msg.data === "background response") {
        navigator.serviceWorker.controller.postMessage({
            data: 'content handshake'
        });
        //port.postMessage({ data: "content handshake" });
        // console.log("content sent confirm handshake");
    } else if (msg.data === "background handshake") {
        console.log("handshake confirmed");
    } else if (msg.data === "start video") {
        console.log("play clicked");

        play(yt_play_button);
    } else if (msg.data === "stop video") {
        console.log(yt_vid);
        console.log("pause clicked");
        pause(yt_play_button);
    } else if (msg.data === "restart video") {
        console.log("restart");
        yt_vid.currentTime = 0;
        yt_vid.play();
    }
});

// Functions
// let inject_script = (file, tag) => {
//     var node = document.getElementsByTagName(tag)[0];
//     var script = document.createElement("script");

//     script.setAttribute("type", "text/javascript");
//     script.setAttribute("src", file);
//     node.appendChild(script);
// };

// inject_script(chrome.extension.getURL("inject-iframe.js"), "body");
