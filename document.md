# **Gruntled Documentation - Back-End**

This is a brief overview of the methods and variables contained in the Javascript files used to run the extension.

<br>

## **Table of Contents**

1. Webcam.js
2. Yt_controls.js
3. Popup.js

<br>

# **Webcam.js**

Contains functions to Setup the webcam as well as to handle the resulting MediaStream and MediaRecorder Object.

Injected into Youtube page upon clicking on extension icon.

### **_createNewVideoElement()_**

> Creates new html video element w/ custom styles applied.

### **_setupWebcam()_**

> Creates new video element w/ webcam as srcObject and appends it to youtube video container element.

<br>

# **Yt_controls.js**

The purpose of this script is to setup the webcam and handle the resulting MediaStream and MediaRecorder Object.

### **_play()_**

> Handle Youtube video Play

1. Grabs play/pause button from dom
2. If title matches play condition sends(fires?) click event

### **_pause()_**

> Handle Youtube video Pause

1. Grabs play/pause button from dom
2. If title matches pause condition sends(fires?) click event

### **_restart()_**

> Handle Youtube video Restart

<br>

# **Popup.js**

Responsible for handling control over extension and it currently controls:

-   Setting up and Recording Webcam video
-   Backend for popup.html

### **_addCustomEventListener_(html_element, custom_event_func)**

> Add custom function as click event to an html element

```javascript
let addCustomEventListener = (html_element, custom_event_func) => {
    html_element.addEventListener("click", (e) => {
        custom_event_func && custom_event_func(); // if no custom function is provided doesnt run it
    });
};
```

### **_setupTabs()_**

> Setup Popup Tab Functionality

```javascript
function setupTabs() {
    // Do Stuff ...
}
```

### **_setupWebcam()_ [ BROKEN ]**

> Setup Webcam Preview in popup window

### **_getSupportedMimeTypes()_**

> Filters for supported mimtypes

### **_getCurrentTab()_ [ async ]**

> Grabs current active tab from window

### **_startRecording()_ [ WEBCAM ]**

> Handle clicking of start recording button

1. Set MimeType Option
2. Try to create new media recorder using media stream
3. [debug] show result
4. Update record button text
5. Update other buttons/inputs
6. Set on stop event
7. When data is available start recording

### **_handleDataAvailable_(event) [ WEBCAM ]**

> if the data exist and it has a size > than 0 append it to the recoeded blobs array

### **_stopRecording()_ [ WEBCAM ]**

> Stops the MediaRecorder, then updates record, play and download buttons, updates codecPreferences

### **_recordToggle()_ [ WEBCAM ]**

> Toggle between running startRecording() and stopRecording() based off of recordButton text content (textContent)

### **_startCamera()_ [ WEBCAM ]**

> **MAYBE** injects start up webcam function/script into youtube page  
> **MAYBE** runs a setup webcam function that allows for it to play in the popup
> Also sends a message or function to play/pause/restart the youtube video

### **_playbackVideo()_**

> Convert recorded Blobs array into a new Blob object and then add it as a src to recordedVideo and start playing.

### **_downloadVideo()_**

> Downloads recordedBlobs

<br>

# **End of Document**
