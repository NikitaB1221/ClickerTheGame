"use strict";

let timer = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function EnemyDamage() {
    this.childNodes[0].setAttribute('value', this.childNodes[0].getAttribute('value') - 20);
    if (this.childNodes[0].getAttribute('value') < 1) this.remove();
    IsNewLevel();
}

function IsNewLevel() {
    if (document.body.querySelectorAll('.entityContainer').length === 0) document.body.style.backgroundColor = 'red';
}

function PlayerDamage() {

}

function AttackTime() {
    timer++;
    let enemyList = document.body.querySelectorAll('.entityContainer');
    for (let i = 0; i < enemyList.length; i++) {
        if (timer % enemyList[i].getAttribute('atCd') === 0) {
            const attackMarker = document.createElement('div');
            attackMarker.style.height = '85px';
            attackMarker.style.width = '85px';
            attackMarker.style.transform = 'translate(-10px, -10px)';
            attackMarker.style.opacity = '0.8';
            attackMarker.style.backgroundColor = 'red';
            enemyList[i].childNodes[1].append(attackMarker);
        }
        else if(enemyList[i].getAttribute('atCd') % timer !== 0 && enemyList[i].childNodes[1].childNodes.length > 0){
            enemyList[i].childNodes[1].removeChild(enemyList[i].childNodes[1].lastChild)
        }
    }
}

const attackTimer = setInterval(AttackTime, 1000);


class Enemy1 {
    Create() {
        let PosX = "top: " + Math.floor(Math.random() * 100 % 50) + "%;";
        let PosY = "right: " + Math.floor(Math.random() * 100 % 50) + "%;";
        let MoveSet = "EntityMoveSet" + Math.floor(Math.random() * 10 % 2 + 1);
        let AnimData = "animation: " + Math.floor((Math.random() * 100 % 5) + 2) + "s " + MoveSet + " infinite alternate;";

        const enemyContainer = document.createElement('div');
        enemyContainer.classList.add('entityContainer');
        enemyContainer.style = PosX;
        enemyContainer.style = PosY;
        enemyContainer.style = AnimData;
        enemyContainer.addEventListener('click', EnemyDamage);
        enemyContainer.setAttribute('atCd', Math.floor(Math.random() * 10 % 8 + 2));
        document.body.append(enemyContainer);

        const prBar = document.createElement('progress');
        prBar.setAttribute('max', '100');
        prBar.setAttribute('value', '100');
        prBar.id = 'prBar';
        enemyContainer.append(prBar);

        const entity = document.createElement('div');
        entity.classList.add('Entity');
        enemyContainer.append(entity);
        entity.addEventListener('click', PlayerDamage);
    }
}

// function CreateEnemy1() {





// }

for (let i = 0; i < Math.floor(Math.random() * 100 % 5 + 1); i++) {
    new Enemy1().Create();
}