console.log("webcam Script Loaded");

let createNewVideoElement = () => {
    const new_vid = document.createElement("video");

    new_vid.playsInline = true;
    new_vid.autoplay = true;
    new_vid.muted = true;

    new_vid.style.height = "200px";
    new_vid.style.width = "200px";
    new_vid.style.position = "absolute";

    return new_vid;
};

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
            const web_vid = createNewVideoElement();
            web_vid.srcObject = stream;

            window.stream = stream;
            console.log(stream);
            console.log(web_vid);
            console.log(yt_frame);

            yt_frame.appendChild(web_vid);
            // const gumVideo = document.querySelector("video#gum");
            // gum_video.srcObject = stream;
        })
        .catch((e) => {
            console.error(e);
        });
};

setupWebcam();
