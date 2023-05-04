"use strict";
let username, score = "";
let userDMG = 20;

const palyButtonClick = () =>{
    if(usenameTextArea.value === "" || usenameTextArea.value === " ") {
        postMessage("Username can't be empty!")
        return; }
    
    username = usenameTextArea.value;   
    usenameTextArea.value = "";

    usenameTextArea.style.display = "none";
    playButton.style.display = "none";
    startWindow.style.display = "none";
}

var pB = document.getElementById('playButton');

pB.addEventListener('click', function(event) {
    palyButtonClick();
  });


const SaveResult = () =>{
    localStorage.setItem(username, score);
};

