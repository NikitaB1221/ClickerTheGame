"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function CreateEnemy1(){
    let randomPosY = Math.random()*1000 % 10;

    let PosX = "top: " +  Math.floor(Math.random()*100 % 50) + "%;";
    let PosY = "right: " +  Math.floor(Math.random()*100 % 50) + "%;";
    let MoveSet = "EntityMoveSet" + Math.floor(Math.random()*10 % 2 + 1);
    let AnimData = "animation: "+Math.floor((Math.random()*100 % 6) + 1) + "s " + MoveSet + " infinite alternate;";

    const enemyContainer = document.createElement('div');
    enemyContainer.classList.add('entityContainer');
    enemyContainer.style=PosX;
    enemyContainer.style=PosY;
    enemyContainer.style=AnimData;
    document.body.append(enemyContainer);

    const prBar = document.createElement('progress');
    prBar.setAttribute('max','100');
    prBar.setAttribute('value','100');
    enemyContainer.append(prBar);

    const entity = document.createElement('div');
    entity.classList.add('Entity');
    enemyContainer.append(entity);
}

for(let i = 0; i < Math.floor(Math.random()*100 % 5 + 1); i++){
    CreateEnemy1();
}