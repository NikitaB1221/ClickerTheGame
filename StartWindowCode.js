"use strict";
let username, score = "";
let userDMG = 20;

const playButtonClick = () => {
    if (usenameTextArea.value === "" || usenameTextArea.value === " ") {
        postMessage("Username can't be empty!")
        return;
    }

    username = usenameTextArea.value;
    usenameTextArea.value = "";
    document.getElementById('playButton').style.display = "none";
    document.getElementById('usenameTextArea').style.display = "none";
    document.getElementById('startWindow').style.display = "none";
};

document.getElementById('playButton').addEventListener("click", playButtonClick);


const SaveResult = () => {
    localStorage.setItem(username, score);
};