console.log("Service Worker Loaded - background.js");

let startTab = () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('playback.html'),
        active: true
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received: " + message);

    // 2. A page requested user data, respond with a copy of `user`
    if (message === 'startTab') {
        startTab();
    }
});