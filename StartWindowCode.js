"use strict";
let username, score = "";
let userDMG = 20;
let lvlCount = 0;
let audio = document.getElementById('background-music');

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

    audio.volume = 0.010;
    audio.play();
}

var pB = document.getElementById('playButton');

pB.addEventListener('click',   palyButtonClick);


const SaveResult = () =>{
    localStorage.setItem(username, score);
};

