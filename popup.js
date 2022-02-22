function setupTabs (){
    document.querySelectorAll('.tab-btn').forEach(button=>{
      button.addEventListener('click',()=>{
        
        const sidebar = button.parentElement;
        const tabs = sidebar.parentElement;
        const tabNumber = button.dataset.forTab;
        const tabActivate = tabs.querySelector(`.tab-content[data-tab="${tabNumber}"]`)
        
        sidebar.querySelectorAll('.tab-btn').forEach(button=>{
          button.classList.remove('tab-btn-active')
        })
         tabs.querySelectorAll('.tab-content').forEach(tab=>{
          tab.classList.remove('tab-content-active')
        })
        button.classList.add('tab-btn-active')
        tabActivate.classList.add('tab-content-active')
      })
    })
}

const captureVideoButton = document.querySelector(
  "#cssfilters .capture-button"
);
const video = document.querySelector("#cssfilters video");
captureVideoButton.onclick = function () {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);
};
function handleSuccess(stream) {
  video.srcObject = stream;
}

document.addEventListener('DOMContentLoaded',()=>{
    setupTabs();
})