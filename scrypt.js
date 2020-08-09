/*
ToDo:
1. анимация игрока; -done
2. анимация мишеней;
3. реализация выстрелов; - done

*/

const player = document.querySelector('.player')
const enemy = document.querySelector('.enemy')
let lifes = 3
    //случайное число
function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand);
}

document.addEventListener('keydown', function(evt) {
    switch (evt.keyCode) {
        case 87: //нажали вверх
            if (player.offsetTop >= 0) {
                player.style.top = player.offsetTop - 25 + 'px'
            } else { player.style.top = 0 }
            break;
        case 83: //нажали вниз 
            player.style.top = player.offsetTop + 25 + 'px'
            break;
        case 68: //движение вправо   
            if (player.offsetLeft <= document.body.clientWidth - 200) { player.style.left = player.offsetLeft + 15 + 'px' } else { player.style.left = document.body.clientWidth - 200 }
            break;
        case 65: // движение влево
            if (player.offsetLeft >= 0) {
                player.style.left = player.offsetLeft - 15 + 'px'
            } else { player.style.left = 0 }
            break;
        case 32: //нажали пробел
            createBullet()
            break;
    }
})

createEnemy()

function createBullet() {
    let bullet = document.createElement('div');
    bullet.className = "bullet";
    bullet.style.top = player.offsetTop + 80 + 'px'
    bullet.style.left = player.offsetLeft + 200 + 'px'
    document.body.appendChild(bullet)
    bulletMove(bullet)
}

function bulletMove(bullet) {
    let timer = setInterval(function() {
        bullet.style.left = bullet.offsetLeft + 10 + 'px';
        shot(bullet)
        if (bullet.offsetLeft > document.body.clientWidth - 50) {
            bullet.remove();
            clearInterval(timer)
        }
    }, 10)

}

function shot(bullet, timer) {
    let bulletPos = bullet.offsetTop;
    let bulletRight = bullet.offsetLeft;
    let enemy = document.querySelector('.enemy')
    if (enemy != null) {
        let enemyTop = enemy.offsetTop;
        let enemyBottom = enemy.offsetTop + enemy.offsetHeight;
        let enemyLeft = enemy.offsetLeft;
        if (bulletPos >= enemyTop && bulletPos <= enemyBottom && bulletRight >= enemyLeft) {
            enemy.className = 'boom';
            enemy.style.top = enemyTop + 'px'
            enemy.style.left = enemyLeft + 'px'
            clearInterval(enemy.dataset.timer)
            setTimeout(function() {
                enemy.remove()
                createEnemy()
                clearInterval(timer)
            }, 1000)
        }
    }

}

function createEnemy() {
    let enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = document.body.clientWidth - 50 + 'px';
    enemy.style.top = getRandomInt(0, document.body.offsetHeight - 100) + 'px'
    document.body.appendChild(enemy);
    let timerId = setInterval(function() {
        enemy.style.left = enemy.offsetLeft - 5 + 'px'
        if (enemy.offsetLeft < 0) {
            enemy.remove();
            clearInterval(timerId)
            die()
            createEnemy()
            console.log(lifes)
        }
    }, 30)
    enemy.dataset.timer = timerId
}

function die() {
    lifes--;
    if (lifes != 0) {
        let lifesBlock = document.querySelector('.hearts')
        let heart = document.querySelector('.heart')
        lifesBlock.removeChild(heart)
    } else { endGame() }
}

function endGame() {
    document.body.innerHTML = '';
    document.body.classList.add('body__end')

}

function isDie() {

}