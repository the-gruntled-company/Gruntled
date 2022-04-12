const yt_vid = document.getElementsByClassName(
    "video-stream html5-main-video"
)[0];

// aria-label="Pause (k)"
// title="Pause (k)" || "Play (k)"
const yt_play_button = document.getElementsByClassName("ytp-play-button")[0];

let play = () => {
    if (yt_play_button.title == "Play (k)") {
        yt_play_button.click();
    }
};

let pause = () => {
    if (yt_play_button.title == "Pause (k)") {
        yt_play_button.click();
    }
};
