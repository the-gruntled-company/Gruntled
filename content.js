console.log("Content Script Loaded");

let setupWebcam = () => {
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
            const yt_frame = document.querySelector(".html5-video-container");
            const new_vid = document.createElement("video");
            new_vid.srcObject = stream;

            new_vid.playsInline = true;
            new_vid.autoplay = true;
            new_vid.muted = true;

            new_vid.style.height = "200px";
            new_vid.style.width = "200px";
            new_vid.style.position = "absolute";

            window.stream = stream;
            console.log(stream);
            console.log(new_vid);
            console.log(yt_frame);

            yt_frame.appendChild(new_vid);
            // const gumVideo = document.querySelector("video#gum");
            // gum_video.srcObject = stream;
        })
        .catch((e) => {
            console.error(e);
        });
};

<<<<<<< HEAD
let pause = (ele) => {
    if (ele.title == "Pause (k)") {
        ele.click();
    }
};

// Send message
// navigator.serviceWorker.controller.postMessage({
//     data: 'content port opened',
//     type: 'connected'
// });
port.postMessage({ status: "connected", data: "content port opened" });

// Set up listener
// self.addEventListener('message', (msg) => {
port.onMessage.addListener((msg) => {
    // console.log(msg);
    if (msg.data === "background response") {
        // navigator.serviceWorker.controller.postMessage({
        //     data: 'content handshake'
        // });
        port.postMessage({ data: "content handshake" });
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
=======
setupWebcam();
>>>>>>> rg_exp
