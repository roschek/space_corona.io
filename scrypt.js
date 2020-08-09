/*
ToDo:
1. анимация игрока; -done
2. анимация мишеней;
3. реализация выстрелов; - done

*/

const player = document.querySelector('.player')
const enemy = document.querySelector('.enemy')
let counter = 0

let lifes = 3
    //случайное число
function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand);
}
// функции движения
function moveTop() {
    if (player.offsetTop >= 0) {
        player.style.top = player.offsetTop - 25 + 'px'
    } else { player.style.top = 0 }
}

function moveDown() {
    if (player.offsetTop <= document.body.offsetHeight) {
        player.style.top = player.offsetTop + 25 + 'px'
    } else { player.style.top = `${document.body.offsetHeight}px` }
}

function moveRight() {
    if (player.offsetLeft <= document.body.clientWidth - 200) { player.style.left = player.offsetLeft + 15 + 'px' } else { player.style.left = document.body.clientWidth - 200 }
}

function moveLeft() {
    if (player.offsetLeft >= 0) {
        player.style.left = player.offsetLeft - 15 + 'px'
    } else { player.style.left = 0 }
}

//слушатели движения персонажа
document.addEventListener('keydown', function(evt) {
    switch (evt.keyCode) {
        case 87: //нажали вверх
            moveTop()
            break;
        case 83: //нажали вниз 
            moveDown()
            break;
        case 68: //движение вправо   
            moveRight()
            break;
        case 65: // движение влево
            moveLeft()
            break;
        case 32: //нажали пробел
            createBullet()
            break;
    }
})
document.querySelector('.arrow-top-1').addEventListener('mousedown', moveTop)
document.querySelector('.arrow-right-1').addEventListener('mousedown', moveRight)
document.querySelector('.arrow-bottom-1').addEventListener('mousedown', moveDown)
document.querySelector('.arrow-left-1').addEventListener('mousedown', moveLeft)
document.querySelector('.fire').addEventListener('mousedown', createBullet)

setInterval(createEnemy, 1500)

document.querySelector('.score').textContent = `ваш счет: ${counter}`

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
    let enemys = document.querySelectorAll('.enemy')
    enemys.forEach((enemy) => {
        if (enemy != null) {
            let enemyTop = enemy.offsetTop;
            let enemyBottom = enemy.offsetTop + enemy.offsetHeight;
            let enemyLeft = enemy.offsetLeft;
            if (bulletPos >= enemyTop && bulletPos <= enemyBottom && bulletRight >= enemyLeft) {
                enemy.className = 'boom';
                enemy.style.top = enemyTop + 'px'
                enemy.style.left = enemyLeft + 'px'
                counter++;
                clearInterval(enemy.dataset.timer)
                setTimeout(function() {
                    enemy.remove()
                    clearInterval(timer)

                    document.querySelector('.score').textContent = `ваш счет: ${counter}`
                }, 1000)
            }
        }
    })

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
        }
        isDie()
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
    alert(`Игра окончена, займись дипломом, твой счет:${counter} несчастных вирусов`)
}

function isDie() {
    let enemy = document.querySelector('.enemy')
    if (enemy.offsetTop > player.offsetTop && enemy.offsetTop < player.offsetTop + player.offsetHeight && enemy.offsetLeft <= player.offsetLeft + player.offsetWidth) {
        console.log('boom')
        enemy.className = 'boom';
        enemy.style.top = (player.offsetTop + 50) + 'px'
        enemy.style.left = (player.offsetLeft + 50) + 'px'
        clearInterval(enemy.dataset.timer)
        setTimeout(function() {
            enemy.remove()
            createEnemy()
        }, 500)
        die();
    }

}