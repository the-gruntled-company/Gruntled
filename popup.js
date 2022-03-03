//id=close: close popup
const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', function() {
  window.close();
});

//id=start: start webcam
const startButton = document.querySelector('#start');
startButton.addEventListener('click', function(){
  chrome.tabs.create({
    url: chrome.extension.getURL('webcam.html'),
    active: true
  });
  chrome.runtime.getBackgroundPage(function(backgroundPage) {
		backgroundPage.setupWebcam();
	})
});

