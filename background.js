console.log("Service Worker Loaded - background.js");

var video = "";
var youtubeID = "";

let startTab = () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('page.html'),
        active: true
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background received: " + request.msg);
    if (request.msg === 'startTab') {
        startTab();

        video = request.data;
        youtubeID = request.videoID;

        console.log(video);
        console.log(youtubeID);
    }
    else if(request.msg === 'get-user-data') {
        sendResponse(video);
    }
    else if(request.msg === 'get-youtube-data') {
        sendResponse(youtubeID);
    }
    return true; // Required to keep message port open
});