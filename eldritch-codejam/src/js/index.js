import '../css/style.css';
import ancientsList from "../assets/Ancients/index";
import ancients from "../data/ancients.js"
import difficulties from "../data/difficulties.js"
import { brownCards, blueCards, greenCards } from "../data/mythicCards/index.js"
import bg from "../assets/home.jpg";
import cardBack from "../assets/mythicCardBackground.jpg"
// console.log(ancients)

// Верстка

function setBackground () {
  const body = document.body;
  body.style.backgroundImage = `url(${bg})`;
}
setBackground();

function setCardBack() {
  const cardBg = document.querySelector('.card-back');
  cardBg.style.backgroundImage = `url(${cardBack})`;
}
setCardBack();

function removeCardBack() {
  const cardBg = document.querySelector('.card-back');
  cardBg.style.backgroundImage = '';
}

function setAncients() {
  const ancientCards = document.querySelector('.ancients-container');
  ancientCards.children[0].style.backgroundImage = `url(${ancientsList.azathoth})`;
  ancientCards.children[1].style.backgroundImage = `url(${ancientsList.cthulhu})`;
  ancientCards.children[2].style.backgroundImage = `url(${ancientsList.iogSothoth})`;
  ancientCards.children[3].style.backgroundImage = `url(${ancientsList.shubNiggurath})`;
  console.log(Object.keys(ancientsList)[0])
}
setAncients();

// Настройка колоды

let activeAncient;
let activeDifficulty;

// Выбор древнего

const ancientCard = document.querySelectorAll('.ancient-card');

function choiceAncient(e) {
  const currentCard = e.currentTarget;
  ancientCard.forEach(card => {
    card.classList.remove('active');
  });
  currentCard.closest('.ancient-card').classList.add('active');
  setActiveAncient();
}

function setActiveAncient() {
  const ancientCards = document.querySelector('.ancients-container');
  let activeItem = ancientCards.querySelector('.ancient-card.active').dataset.ancient;
  activeAncient = ancients.find(item => item.name == activeItem);
  console.log('выбран древний -', activeAncient)
}

ancientCard.forEach(card => {
  card.addEventListener('click', choiceAncient);
});

// Выбор сложности

const difficultyLevels = document.querySelectorAll('.difficulty');

function choiceDifficulty(e) {
  const currentDifficulty = e.currentTarget;

  difficultyLevels.forEach(level=> {
    level.classList.remove('active');
  });
  currentDifficulty.closest('.difficulty').classList.add('active');
  setActiveDifficulty()
}

function setActiveDifficulty() {
  const allDifficulty = document.querySelector('.difficulty-container');
  activeDifficulty = allDifficulty.querySelector('.difficulty.active').dataset.difficulty;
  console.log('выбрана сложность -', activeDifficulty)
}

difficultyLevels.forEach(level => {
  level.addEventListener('click', choiceDifficulty);
});

// Замешиваем колоду

function getRandomNum(max){
  return Math.floor((Math.random() * max));
}