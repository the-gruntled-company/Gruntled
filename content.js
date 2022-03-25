console.log("content.js loaded"); // pls load

// Outsourced
// Source: https://stackoverflow.com/a/7513356
// function callPlayer(frame_id, func, args) {
//     var iframe = document.getElementById(frame_id);

//     // When the player is not ready
//     if (!iframe) {
//         // DOM is ready and iframe does not exist. Log a message
//         window.console &&
//             console.log("callPlayer: Frame not found; id=" + frame_id);
//     } else if (func === "listening") {
//         // Sending the "listener" message to the frame, to request status updates
//         if (iframe && iframe.contentWindow) {
//             func =
//                 '{"event":"listening","id":' +
//                 JSON.stringify("" + frame_id) +
//                 "}";
//             iframe.contentWindow.postMessage(func, "*");
//         }
//     } else if (iframe && iframe.contentWindow) {
//         // When a function is supplied, just call it (like "onYouTubePlayerReady")
//         if (func.call) return func();
//         // Frame exists, send message
//         iframe.contentWindow.postMessage(
//             JSON.stringify({
//                 event: "command",
//                 func: func,
//                 args: args || [],
//                 id: frame_id,
//             }),
//             "*"
//         );
//     }
//     /* IE8 does not support addEventListener... */
//     function messageEvent(add, listener) {
//         var w3 = add ? window.addEventListener : window.removeEventListener;
//         w3
//             ? w3("message", listener, !1)
//             : (add ? window.attachEvent : window.detachEvent)(
//                   "onmessage",
//                   listener
//               );
//     }
// }

// To get around waiting for it to load
// setTimeout(() => {
//     var yt_vid = document.getElementById("movie_player");
//     console.log(yt_vid);
// }, 1000);

// var yt_vid = document.getElementsByClassName("video-stream html5-main-video");
// console.log(yt_vid);
// yt_vid.settAttribute("controls_list", "download");

// Open New port for communication
var port = chrome.runtime.connect({ name: "content-bkg" });

// Youtube Api Setup
// var tag = document.createElement("script");
// tag.id = "iframe-demo";
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName("script")[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player("movie_player", {
//         events: {
//             onReady: onPlayerReady,
//             onStateChange: onPlayerStateChange,
//         },
//     });
// }
// function onPlayerReady(event) {
//     console.log("done yt load");
//     yt_vid = document.getElementById("movie_player");
// }

// My attempts
// document.getElementById("movie_player");
var yt_vid = document.getElementsByClassName(
    "video-stream html5-main-video"
)[0];
var yt_play_button = document.getElementsByClassName("ytp-play-button")[0];

// aria-label="Pause (k)"
// title="Pause (k)" || "Play (k)"

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

// function onYouTubeIframeAPIReady() {
//     isReady = true;
//     let handle_play = () => {
//         yt_vid.playVideo();
//     };
//     let handle_stop = () => {
//         yt_vid.pauseVideo();
//     };
// }

// Send message
port.postMessage({ status: "connected", data: "content port opened" });

// Set up listener
port.onMessage.addListener((msg) => {
    // console.log(msg);
    if (msg.data === "background response") {
        port.postMessage({ data: "content handshake" });
        // console.log("content sent confirm handshake");
    } else if (msg.data === "background handshake") {
        console.log("handshake confirmed");
    } else if (msg.data === "start video") {
        console.log(yt_vid);
        // callPlayer("movie_player", "playVideo");
        // handle_play();
        console.log("play clicked");
        // console.log(yt_play_button);
        play(yt_play_button);
        // yt_play_button.click();
        // yt_vid.playVideo();
    } else if (msg.data === "stop video") {
        console.log(yt_vid);
        // callPlayer("movie_player", "pauseVideo");
        // handle_stop();
        console.log("pause clicked");
        pause(yt_play_button);
        // yt_vid.pauseVideo();
    } else if (msg.data === "restart video") {
        console.log("restart");
        // yt_vid.pause();
        yt_vid.currentTime = 0;
        yt_vid.play();

        // console.log(yt_vid);
        // callPlayer("movie_player", "seekTo", [0, true]);
        // callPlayer("movie_player", "pauseVideo");
        // yt_vid.seekTo(0, true);
        // yt_vid.pauseVideo();
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
