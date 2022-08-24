// https://codejam-demo.netlify.app/
// https://codejam-demo.herokuapp.com/
import '../css/style.css'

import ancients from "../assets/Ancients/index";
import ancientsData from "../data/ancients.js"
import difficulties from "../data/difficulties.js"
import { brownCards, blueCards, greenCards } from "../data/mythicCards/index.js"
import bg from "../assets/home.jpg";
import cardBack from "../assets/mythicCardBackground.jpg"

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
  ancientCards.children[0].style.backgroundImage = `url(${ancients.azathoth})`;
  ancientCards.children[1].style.backgroundImage = `url(${ancients.cthulhu})`;
  ancientCards.children[2].style.backgroundImage = `url(${ancients.iogSothoth})`;
  ancientCards.children[3].style.backgroundImage = `url(${ancients.shubNiggurath})`;
}
setAncients();

const ancientCards = document.querySelectorAll('.ancient-card');
function choiceAncient(e) {
  const currentCard = e.currentTarget;
  ancientCards.forEach(card => {
    card.classList.remove('active');
  });
  currentCard.closest('.ancient-card').classList.add('active');
}
ancientCards.forEach(card => {
  card.addEventListener('click', choiceAncient);
});

const difficultyLevels = document.querySelectorAll('.difficulty');
function choiceDifficulty(e) {
  const currentDifficulty = e.currentTarget;

  difficultyLevels.forEach(level=> {
    level.classList.remove('active');
  });
  currentDifficulty.closest('.difficulty').classList.add('active');
}
difficultyLevels.forEach(level => {
  level.addEventListener('click', choiceDifficulty);
});

function getRandomNum(max){
  return Math.floor((Math.random() * max));
}