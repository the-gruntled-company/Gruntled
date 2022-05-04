// Functions
let create_btn = (btn_text, btn_id) => {
    let new_btn = document.createElement("button");
    new_btn.innerHTML = btn_text;
    new_btn.id = btn_id;

    return new_btn;
};

// Add CSS
const style = document.createElement("style");
style.innerHTML = `
            
            .disappear {
                opacity: 0;
                display: none;
            }

            .webcam-preview {
                position: relative;
                padding: 8px;

                width: 300px;
                height: 250px;

                display: flex;
                flex-direction: column;

                justify-content: space-between;

                background: rgba(167, 166, 166, 0.12);
            }

            .webcam-video {
                position: absolute;

                width: 300px;
                height: 250px;

                top: 0;
                left: 0;

                z-index: 98;
            }
            
            .recording-indicator {
                z-index: 99;

                width: 24px;
                height: 24px;

                display: flex;
                align-items: center;
                justify-content: end;

                background-color: #8d8d8dad;
                border-radius: 50%;
            }

            .active-recording {
                background-color: #32e282dd;
                animation: record-animation 3000ms linear 0ms infinite;
            }

            .recording-indicator:hover {
                padding: 0rem .5rem;
                width: fit-content;
                height: unset;
                
                border-radius: 50px;
            }

            .webcam-control-panel {
                    z-index: 99;
                
                    width: 100%;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #adadad82;
                    border-radius: 15px;
            }

            #record-btn {
                z-index: 99;
                
                padding: .25rem .75rem;
                color: #4d4d4d;
                background-color: #cdcdcd;
                border: 1px solid #4d4d4d;
                border-radius: 25px;
                box-shadow: -1px 2px 0px 0px #4d4d4d;
            }

            #record-btn:active {
                box-shadow: -1px 1px 0px 0px #4d4d4d;
                transform: translateY(1px);
            }

            #download-btn {
                text-decoration: none;
                cursor: pointer;
            }

            #download-btn,
            #playback-btn {
                z-index: 99;

                font-family: "open sans", arial;
                font-size: 14px;
                
                padding: .25rem .75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #4d4d4d;
                background-color: #cdcdcd;
                border: 1px solid #4d4d4d;
                border-radius: 25px;
                box-shadow: -2px 4px 0px 0px #4d4d4d;
            }

            #download-btn:active,
            #playback-btn:active {
                box-shadow: -1px 2px 0px 0px #4d4d4d;
                transform: translateX(-1px) translateY(2px);
            }

            @keyframes record-animation {
                0% {
                    background-color: #32e282ff;
                }
                10% {
                    background-color: #32e28200;
                }
                20% {
                    background-color: #32e282ff;
                }
                100% {
                    background-color: #32e282ff;
                }
            }
    `;
document.head.appendChild(style);

// Create Elements

// Webcam Preview
const webcam_preview = document.createElement("div");
webcam_preview.classList.add("webcam-preview");

// Webcam Video
const web_vid = document.createElement("video");
web_vid.playsInline = true;
web_vid.src = "assets/doggy.mp4";
web_vid.classList.add("webcam-video");
web_vid.classList.add("disappear");

// Recording Indicator
const r_indicator = document.createElement("div");
r_indicator.classList.add("recording-indicator");

// Control Panel
const panel = document.createElement("div");
panel.classList.add("webcam-control-panel");

// Recording Button
const record_id = "record-btn";
const record_btn = create_btn("Start Recording", record_id);
record_btn.classList.add("disappear");

// Play Button
const play_id = "playback-btn";
const play_btn = create_btn("Playback", play_id);

// Download Button
// const download_id = "download-btn";
// const download_btn = create_btn("Download", download_id);
const download_btn = document.createElement("a");
download_btn.innerHTML = "Download";
download_btn.id = "download-btn";
download_btn.href = "assets/doggy.mp4";

// Attach Event Listeners
// Play Button
play_btn.addEventListener("click", () => {
    // Make vid visible and play
    web_vid.classList.remove("disappear");
    web_vid.play();

    play_btn.innerHTML == "Playback" ? web_vid.play() : web_vid.pause();

    play_btn.innerHTML =
        play_btn.innerHTML == "Playback" ? "Stop Playing" : "Playback";
});

// Download Button
download_btn.addEventListener("click", () => {});

// Recording Indicator
// Click
record_btn.addEventListener("click", () => {
    // toggle recoridng indicators style, color and animation
    r_indicator.classList.toggle("active-recording");

    // Change button text
    // record_btn.innerHTML =
    //     record_btn.innerHTML == "Start Recording"
    //         ? "Stop Recording"
    //         : "Start Recording";

    let start_record = () => {
        record_btn.innerHTML = "Stop Recording";
        // Debug
        console.log("Start Recording");
    };

    let stop_record = () => {
        record_btn.innerHTML = "Start Recording";
        // Debug
        console.log("Stopped Recording");
    };

    record_btn.innerHTML === "Start Recording" ? start_record() : stop_record();
});

// MouseEnter, MouseLeave
r_indicator.addEventListener("mouseenter", () => {
    record_btn.classList.remove("disappear");
});
r_indicator.addEventListener("mouseleave", () => {
    record_btn.classList.add("disappear");
});

// Append to DOM
// Get Root container
const root_class = ".big-video";
const root = document.querySelector(root_class);

// Append Video element to preview window
webcam_preview.appendChild(web_vid);

// Append Buttons to control panel
panel.appendChild(play_btn);
panel.appendChild(download_btn);

// Append recording button to indicator container
r_indicator.appendChild(record_btn);

// Append [ indicator, panel ] to container
webcam_preview.appendChild(r_indicator);
webcam_preview.appendChild(panel);

// Append preview to root video container
root.appendChild(webcam_preview);
