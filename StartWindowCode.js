"use strict";
let username, score = "";
let userDMG = 20;
let lvlCount = 0;

const palyButtonClick = () =>{
    if(usenameTextArea.value === "" || usenameTextArea.value === " ") {
        alert("Username can't be empty!");
        return; }
    
    username = usenameTextArea.value;   
    usenameTextArea.value = "";

    usenameTextArea.style.display = "none";
    playButton.style.display = "none";
    startWindow.style.display = "none";

    document.body.addEventListener('click', WeaponAnim);
    IsNewLevel();
}

var pB = document.getElementById('playButton');

pB.addEventListener('click', function(event) {
    palyButtonClick();
  });


const SaveResult = () =>{
    localStorage.setItem(username, score);
};

