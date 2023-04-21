"use strict";
let username, score = "";
let userDMG = 20;


const palyButtonClick = () =>{
    if(usenameTextArea.value === "" || usenameTextArea.value === " ") {
        postMessage("Username can't be empty!")
        return; }
    
    username = usenameTextArea.value;   
    usenameTextArea.value = "";
}

const SaveResult = () =>{
    localStorage.setItem(username, score);
};