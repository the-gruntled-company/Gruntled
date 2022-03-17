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
        inject_script(msg.url, "body");
        console.log("inject vid");
    }
});
