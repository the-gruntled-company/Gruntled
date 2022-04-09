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
            new_vid.style.zIndex = "100";

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

setupWebcam();
