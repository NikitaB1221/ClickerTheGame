"use strict";
{
    let timer = 0;
    let shieldUp = false;
    let animCount = 0;
    let username = ""
    let score = 0;
    let playerDMG = 20;
    let lvlCount = 0;
    let audio = document.getElementById('background-music');
    let loose = false;

    document.getElementById('weapon').hidden = true;
    document.getElementById('shield').hidden = true;




    const palyButtonClick = () => {
        if (usenameTextArea.value === "" || usenameTextArea.value === " ") {
            alert("Username can't be empty!");
            return;
        }

        username = usenameTextArea.value;
        usenameTextArea.value = "";

        usenameTextArea.style.display = "none";
        playButton.style.display = "none";
        startWindow.style.display = "none";
        audio.volume = 0.010;
        audio.play();

        document.getElementById('weapon').hidden = false;
        document.getElementById('shield').hidden = false;
        IsNewLevel();
    }

    document.getElementById('playButton').addEventListener('click', palyButtonClick);


    const SaveResult = () => {
        localStorage.setItem(username, score);
    };

    const attackTimer = setInterval(AttackTime, 1000);
    document.body.addEventListener('click', WeaponAnim);

    // New level
    function IsNewLevel() {
        if (document.body.querySelectorAll('.entityContainer').length === 0 && loose === false) {

            lvlCount++;
            let hpRegen = 20;
            if (document.getElementById('userHpBar').value < 50) hpRegen += 50 - document.getElementById('userHpBar').value;
            document.getElementById('userHpBar').value += hpRegen;
            document.getElementById('userStaminaBar').value = 100;
            if (lvlCount > 3) lvlCount = 1;

            switch (lvlCount) {
                case 1:
                    document.body.style.backgroundImage = 'url(bg1.jpg)';
                    break;
                case 2:
                    document.body.style.backgroundImage = 'url(bg2.jpg)';
                    break;
                case 3:
                    document.body.style.backgroundImage = 'url(bg3.png)';
                    break;
            }

            for (let i = 0; i < Math.floor(Math.random() * 100 % 3 + 4); i++) {
                if ((Math.floor(Math.random() * 10 % 6)) === 1) new Enemy2().Create();
                else new Enemy1().Create();
            }
        }
    }




    // Enemy spawn
    function CreateAnim() {
        animCount++;

        const anim = `@keyframes anim_${animCount} {
            0% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
            20% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
            40% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
            60% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
            80% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
            100% { left: ${Math.floor(Math.random() * 100 % 70 + 10)}%; top: ${Math.floor(Math.random() * 100 % 50 + 5)}%; }
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
            enemyContainer.setAttribute('atDm', Math.floor(Math.random() * 100 % 10 + 20));
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

    class Enemy2 {
        Create() {
            let PosX = "top: " + Math.floor(Math.random() * 100 % 50) + "%;";
            let PosY = "right: " + Math.floor(Math.random() * 100 % 50) + "%;";

            let AnimData = "animation: " + Math.floor((Math.random() * 100 % 4) + 10) + "s " + CreateAnim() + " infinite alternate;";

            const enemyContainer = document.createElement('div');
            enemyContainer.classList.add('entityContainer');
            enemyContainer.style = PosX;
            enemyContainer.style = PosY;
            enemyContainer.style = AnimData;
            enemyContainer.addEventListener('click', EnemyDamage);
            enemyContainer.setAttribute('atCd', Math.floor(Math.random() * 10 % 3 + 6));
            enemyContainer.setAttribute('atDm', Math.floor(Math.random() * 100 % 60 + 40));
            document.body.append(enemyContainer);

            const prBar = document.createElement('progress');
            prBar.setAttribute('max', '600');
            prBar.setAttribute('value', '600');
            prBar.id = 'prBar';
            enemyContainer.append(prBar);

            const entity = document.createElement('div');
            entity.classList.add('Entity2');
            entity.style.backgroundImage = 'url(en2.gif)';
            entity.style.backgroundSize = 'contain';

            let color = Math.floor(Math.random() * 1000 % 100);

            let colorString = 'hue-rotate(' + color + 'deg)';
            enemyContainer.setAttribute('color', color);
            entity.style.filter = colorString;
            enemyContainer.append(entity);
            entity.addEventListener('click', PlayerDamage);
        }
    }




    // Enemy attack
    function EnemyDamage() {
        if (shieldUp === false){ 
            this.childNodes[0].setAttribute('value', this.childNodes[0].getAttribute('value') - 20);

            let UserAtack = new Audio('UserAtack.mp3');
            UserAtack.volume = 0.020;
            UserAtack.play();
        }
        if (this.childNodes[0].getAttribute('value') < 1) {
            if (this.childNodes[1].className === "Entity2") document.getElementById('userHpBar').value += 20;
            this.remove();
        }
        IsNewLevel();
    }

    function RemoveRS(){
        for(let i = 0; i< document.body.getElementsByClassName('dmgScreen').length; i++){
            document.body.getElementsByClassName('dmgScreen')[i].remove();
        }
    }

    function RedScreen(){
        const rScreen = document.createElement('img');
        rScreen.style.height = '100%';
        rScreen.style.width = "100%";
        rScreen.style.backgroundImage = 'url(Damage.png)';
        rScreen.style.position='absolute';
        rScreen.className='dmgScreen';
        rScreen.zIndex='25';
        rScreen.style.opacity='0.4';

        document.body.append(rScreen);

        let UserGotHit = new Audio('UserHit.mp3');
        UserGotHit.volume = 0.020;
        UserGotHit.play();
        
        setTimeout(RemoveRS, 400);
    }

    function PlayerDamage(dmg) {
        document.getElementById('userHpBar').value-=Math.floor(dmg);
        
        RedScreen();
        
        if(document.getElementById('userHpBar').value < 1) {
            loose = true;
            document.getElementById('weapon').hidden = true;
            document.getElementById('shield').hidden = true;
            document.getElementById('userStaminaBar').hidden = true;
            document.getElementById('userHpBar').hidden = true;
            document.body.style.backgroundImage ='none';
            document.body.style.backgroundColor ='black';
            let enemyList = document.body.querySelectorAll('.entityContainer');
            for (let i = 0; i < enemyList.length; i++) {
                enemyList[i].remove();
            }
        }
    }

    function ShieldDamage(dmg) {
        document.getElementById('userStaminaBar').value -= dmg;

        let ShieldBlock = new Audio('ShieldBlock.mp3');
        ShieldBlock.volume = 0.020;
        ShieldBlock.play();

        if (document.getElementById('userStaminaBar').value < 1) {
            RedScreen();
            document.getElementById('userStaminaBar').value += 50;
            document.getElementById('userHpBar').value -= 20;
        }
    }

    function AttackTime() {
        timer++;

        if (document.getElementById('userStaminaBar').value < 100 && shieldUp === false) document.getElementById('userStaminaBar').value += 5;

        let enemyList = document.body.querySelectorAll('.entityContainer');
        for (let i = 0; i < enemyList.length; i++) {
            if (timer % enemyList[i].getAttribute('atCd') === 0) {

                const attackMarker = document.createElement('img');

                if (enemyList[i].childNodes[1].className === "Entity") {
                    attackMarker.style.height = '200px';
                    attackMarker.style.width = '300px';
                    attackMarker.style.backgroundImage = 'url(at1.png)';
                }
                else {
                    attackMarker.style.height = '250px';
                    attackMarker.style.width = '250px';
                    attackMarker.style.backgroundImage = 'url(at2.png)';
                }

                attackMarker.style.position = 'absolute';
                attackMarker.style.zIndex = '20';
                attackMarker.style.backgroundSize = 'contain';
                attackMarker.style.clipPath = 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)';
                attackMarker.style.filter = `hue-rotate(${360 - enemyList[i].getAttribute('color')}deg)`;

                enemyList[i].childNodes[1].append(attackMarker);
            }
            else if (enemyList[i].getAttribute('atCd') % timer !== 0 && enemyList[i].childNodes[1].childNodes.length > 0) {
                enemyList[i].childNodes[1].removeChild(enemyList[i].childNodes[1].lastChild);
                if (shieldUp === false) PlayerDamage(enemyList[i].getAttribute('atDm'));
                else (ShieldDamage(enemyList[i].getAttribute('atDm') / 2));
            }
        }
    }





    // Animations
    document.body.addEventListener('keydown', function (event) {
        let shield = document.getElementById('shield');
        if (event.code === 'ShiftLeft' && loose === false) {
            shield.src = 'ws2.png';
            shield.style.left = '25%';
            document.getElementById('weapon').hidden = true;
            shieldUp = true;
        }
    });

    document.body.addEventListener('keyup', function (event) {
        let shield = document.getElementById('shield');
        if (event.code === 'ShiftLeft' && loose === false) {
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


}