// navigator.mediaDevices
//     .getUserMedia({
//         video: true,
//         audio: true,
//     })
//     .then((stream) => {
//         window.stream = stream;
//     })
//     .catch((e) => {
//         console.error(e);
//     });

// setTimeout(() => {
//     console.log("doc loaded");
//     let ifr = document.createElement("video");
//     ifr.autoplay = true;
//     ifr.muted = true;
//     ifr.playsInline = true;
//     ifr.style.position = "absolute";
//     ifr.style.width = "300px";
//     ifr.style.height = "225px";
//     ifr.style.background = "white";
//     ifr.style.top = "0";

//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: true,
//         })
//         .then((stream) => {
//             window.stream = stream;
//             ifr.srcObject = stream;
//             document.body.appendChild(ifr);

//             console.log(ifr.style);
//         })
//         .catch((e) => {
//             console.error(e);
//         });
// }, 1000);

// Might need to add this
// {
//      "matches": ["https://www.youtube.com/watch*"],
//      "js": ["inject-webcam.js"],
//      "run_at": "document_end"
// }
