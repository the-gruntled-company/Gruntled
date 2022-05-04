console.log("webcam Script Loaded");

let to_inline_style = (style) => {
    let output_str = "";
    for (let [key, entry] of Object.entries(style)) {
        console.log(`${key}: ${entry}`);
        output_str += `${key}:${entry};`;

        // output_str && output_str += "t"
        // output_str ? output_str += "t" : output_str = "t"
    }
    return output_str;
};

const recording_indicator = (data) => {
    style = {
        color: "red",
        padding: "1rem 2rem",
        "border-radius": "15px",
    };

    return `
    <div class="recording-indicator" style=${to_inline_style(style)} ></div>
    `;
};

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
