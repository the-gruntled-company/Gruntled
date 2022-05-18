console.log("playback.js loaded");

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  //chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  // ...and send a request for the DOM info...
  //chrome.tabs.sendMessage( tabs[0].id, {from: 'tab', subject: 'DOMInfo'}, setDOMInfo);
  chrome.runtime.sendMessage({msg: "get-user-data"}, (response) => {
    console.log('Received user data');
    
    const video = document.createElement('video');

    video.src = null;
    video.srcObject = null;

    video.autoplay = false;
    video.controls = true;
    video.muted = false;
    video.height = 240; //in px
    video.width = 320; //in px

    (async () => {
      const parsed = JSON.parse(response);
      const blob = await fetch(parsed.blob).then(res => res.blob());
      video.src = URL.createObjectURL(blob);
      video.play();
      box.appendChild(video);
    })();
  });
});




