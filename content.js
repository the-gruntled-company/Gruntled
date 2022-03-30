console.log("content.js loaded"); // pls load

// Open New port for communication
var port = chrome.runtime.connect({ name: "content-bkg" });

// Send message
port.postMessage({ status: "connected", data: "content port opened" });

// Set up listener
port.onMessage.addListener(function (msg) {
    console.log(msg);
    if (msg.data === "background response") {
        port.postMessage({ data: "content handshake established" });
        console.log("content sent confirm handshake");
    } else if (msg.data === "background handshake established") {
        console.log("handshake confirmed");
    } else if (msg.data === "start webcam") {
        console.log("inject vid");

        window.onload = () => {
        setTimeout(() => {
            let container = document.querySelectorAll(
                "#info h1.ytd-video-primary-info-renderer"
            )[0];
    
            let btn = document.createElement("button");
            btn.id = "downloadVideo";
            btn.setAttribute("role", "button");
            btn.innerText = "PLEASE WORK";
    
            container.appendChild(btn);
        }, 5000)
    }
        console.log("Download button appended");
    }
});


// window.onload = () => {
// 	console.log("Loaded");
// 	setTimeout(() => {
// 		let btn = document.createElement("button");
// 		btn.id = "downloadVideo";
// 		btn.setAttribute("role", "button");
// 		btn.innerText = "Download";
// 	}, 5000)
// }

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log("background.js got a message")
//         console.log(request);
//         console.log(sender);
//         sendResponse("bar");
//     }
// );