const ship = document.querySelector('.ship');
const body = document.querySelector('body');
const div = document.querySelector('div');
const meteor = document.querySelector('meteor');

let moveLeft = 0;
let moveDown = 0;


//получаем случайное число 

function randomInteger(min,max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

 // функция добавления  коронавируса 
function createMeteor() {
  const createMeteorit = document.createElement('img');
  createMeteorit.setAttribute('src','images/coronavirus_PNG39.png');
  createMeteorit.classList.add('meteor');
  createMeteorit.style.top = `${randomInteger(0,550)+'px'}`;
  div.appendChild(createMeteorit);
  
};

setInterval(createMeteor, 3000);


// управление кораблем
document.onkeydown = function (event) {

  if (event.key == 'ArrowRight') {
    if (moveLeft < (window.innerWidth - 100)) {
      ship.style.left = moveLeft + 'px';
      moveLeft = moveLeft + 10;
    }
    else {
      ship.style.left = moveLeft + 'px';
      moveLeft = moveLeft - 10;
    }

  }
  if (event.key == 'ArrowLeft') {
    if (moveLeft >= 0) {
      ship.style.left = (moveLeft - 10) + 'px';
      moveLeft = moveLeft - 10;
    }
    else {
      ship.style.left = moveLeft + 'px';
      moveLeft = moveLeft + 10;
    }
  }
  if (event.key == 'ArrowDown') {
    if (moveDown < (window.innerHeight - 100)) {
      ship.style.top = moveDown + 'px';
      moveDown = moveDown + 10;
    }
    else {
      ship.style.top = (moveDown - 10) + 'px';
      moveDown = moveDown - 10;
    }
  }
  if (event.key == 'ArrowUp') {
    if (moveDown > 0) {
      ship.style.top = (moveDown - 10) + 'px';
      moveDown = moveDown - 10;
    }
    else {
      ship.style.top = moveDown + 'px';
      moveDown = moveDown + 10;
    }
  }
}

if ((position("ship")-position("meteor")>0 && position("ship")-position("meteor")<50)){
  const createMeteorit = document.createElement('img');
  createMeteorit.setAttribute('src','images/coronavirus_PNG39.png');
  createMeteorit.style.top = `${250+'px'}`;
  div.appendChild(createMeteorit);
};
