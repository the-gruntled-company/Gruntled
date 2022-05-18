console.log("Service Worker Loaded - background.js");

var video = "";

let startTab = () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('playback.html'),
        active: true
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background received: " + request.msg);
    if (request.msg === 'startTab') {
        startTab();
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
        //         if (response) {
        //             console.log("there is a response from playback.js to background.js");
        //         }
        //     })
        // })
        video = request.data;
        console.log(video);
    }
    else if(request.msg === 'get-user-data') {
        sendResponse(video);
    }
    return true; // Required to keep message port open
});