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

//id=link: youtube link
chrome.tabs.query({active: true, currentWindow : true}, tabs => {
  let url = tabs[0].url;
  document.querySelector('#link').innerHTML = "Link URL: " + url;
  // use `url` here inside the callback because it's asynchronous!
});