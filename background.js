/*Content script requests access to media devices
On success, content script notifies background script
On receipt of message, background script requests acccess to media devices; since content script has already succeeded, background script will now also succeed*/


"use strict";

function startRecord() {
    chrome.windows.getCurrent({}, function(e) {
        chrome.windows.create({
            url: "camera.html",
            type: "popup",
            width: 266,
            height: 200,
        }, function(e) {
            cameraWindowId = e.id, chrome.windows.onRemoved.addListener(function(e) {
                e == cameraWindowId && console.log("window closed")
            })
        })
    })
}