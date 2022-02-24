'use strict';

//On click: Start recording
start.addEventListener('click', function(){
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
		backgroundPage.startRecord();
	})
});

function setupTabs (){
    document.querySelectorAll('.tab-btn').forEach(button=>{
      button.addEventListener('click', ()=>{
        
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

//On click: Close button
var closeButton = document.querySelector('.closeButton');
closeButton.addEventListener('click', function() {
  window.close();
});

//On load
document.addEventListener('DOMContentLoaded',()=>{
    setupTabs();
})