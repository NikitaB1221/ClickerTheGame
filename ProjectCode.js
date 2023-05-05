"use strict";
{
let timer = 0;
let shieldUp = false;
let animCount = 0;
let username, score = "";
let playerDMG = 20;
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
    audio.volume = 0.010;
    audio.play();
}

document.getElementById('playButton').addEventListener('click',   palyButtonClick);


const SaveResult = () =>{
    localStorage.setItem(username, score);
};

const attackTimer = setInterval(AttackTime, 1000);
document.body.addEventListener('click', WeaponAnim);

// New level
    function IsNewLevel() {
        if (document.body.querySelectorAll('.entityContainer').length === 0) {

            lvlCount++;
            if (lvlCount > 3) lvlCount = 1;
    
            switch (lvlCount) {
                case 1:
                    document.body.style.backgroundColor = 'forestgreen';
                    break;
                case 2:
                    document.body.style.backgroundColor = 'gray';
                    break;
                case 3:
                    document.body.style.backgroundColor = 'brown';
                    break;
            }
    
            for (let i = 0; i < Math.floor(Math.random() * 100 % 5 + 2); i++) {
                new Enemy1().Create();
            }
        }
    }




// Enemy spawn
    function CreateAnim() {
        animCount++;
    
        const anim = `@keyframes anim_${animCount} {
            0% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
            20% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
            40% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
            60% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
            80% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
            100% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 10)}%; }
          }`;
    
        var styleSheet = document.createElement("style");
        styleSheet.innerText = anim;
        document.head.appendChild(styleSheet);
    
    
        return `anim_${animCount}`;
    }

    class Enemy1 {
        Create() {
            let PosX = "top: " + Math.floor(Math.random() * 100 % 50) + "%;";
            let PosY = "right: " + Math.floor(Math.random() * 100 % 50) + "%;";
    
            let AnimData = "animation: " + Math.floor((Math.random() * 100 % 4) + 5) + "s " + CreateAnim() + " infinite alternate;";
    
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
            entity.style.backgroundImage = 'url(en1.gif)';
            entity.style.backgroundSize = 'contain';
    
            let color = Math.floor(Math.random() * 1000 % 361);
    
            let colorString = 'hue-rotate(' + color + 'deg)';
            enemyContainer.setAttribute('color', color);
            entity.style.filter = colorString;
            enemyContainer.append(entity);
            entity.addEventListener('click', PlayerDamage);
        }
    }




// Enemy attack
    function EnemyDamage() {
        if (shieldUp === false) this.childNodes[0].setAttribute('value', this.childNodes[0].getAttribute('value') - 20);
        if (this.childNodes[0].getAttribute('value') < 1) this.remove();
        IsNewLevel();
    }

    function PlayerDamage() {

    }

    function AttackTime() {
        timer++;
        let enemyList = document.body.querySelectorAll('.entityContainer');
        for (let i = 0; i < enemyList.length; i++) {
            if (timer % enemyList[i].getAttribute('atCd') === 0) {
    
                const attackMarker = document.createElement('img');
    
                if(enemyList[i].className==="entityContainer"){
                    attackMarker.style.height = '200px';
                    attackMarker.style.width = '300px';            
                    attackMarker.style.backgroundImage = 'url(at1.png)';
                }
    
                
                attackMarker.style.position = 'absolute';
                attackMarker.style.zIndex = '20';
                attackMarker.style.backgroundSize = 'contain';
                attackMarker.style.clipPath='polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)';
                attackMarker.style.filter=`hue-rotate(${360 - enemyList[i].getAttribute('color')}deg)`;
    
                
                
                
                
                enemyList[i].childNodes[1].append(attackMarker);
    
            }
            else if (enemyList[i].getAttribute('atCd') % timer !== 0 && enemyList[i].childNodes[1].childNodes.length > 0) {
                enemyList[i].childNodes[1].removeChild(enemyList[i].childNodes[1].lastChild)
            }
        }
    }





// Animations
document.body.addEventListener('keydown', function (event) {
    let shield = document.getElementById('shield');
    if (event.code === 'ShiftLeft') {
        shield.src = 'ws2.png';
        shield.style.left = '25%';
        document.getElementById('weapon').hidden = true;
        shieldUp = true;
    }
});

document.body.addEventListener('keyup', function (event) {
    let shield = document.getElementById('shield');
    if (event.code === 'ShiftLeft') {
        shield.src = 'ws1.png';
        shield.style.left = '5%';
        document.getElementById('weapon').hidden = false;
        shieldUp = false;
    }
});

function WeaponAnimCansel() {
    document.getElementById('weapon').src = 'w1.png';
}

function WeaponAnim() {
    document.getElementById('weapon').src = 'w1.gif';
    let tmpTimer = setTimeout(WeaponAnimCansel, 380);
}

IsNewLevel();

}