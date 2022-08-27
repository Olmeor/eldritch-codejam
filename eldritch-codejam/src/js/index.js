import '../css/style.css';
import ancientsList from '../assets/Ancients/index';
import Ancients from '../data/ancients';
import Green from '../data/mythicCards/green/index';
import Blue from '../data/mythicCards/blue/index';
import Brown from '../data/mythicCards/brown/index';

function setAncients() {
  const ancientCards = document.querySelector('.ancients');
  ancientCards.children[0].style.backgroundImage = `url(${ancientsList.azathoth})`;
  ancientCards.children[1].style.backgroundImage = `url(${ancientsList.cthulhu})`;
  ancientCards.children[2].style.backgroundImage = `url(${ancientsList.iogSothoth})`;
  ancientCards.children[3].style.backgroundImage = `url(${ancientsList.shubNiggurath})`;
}
setAncients();

const ancients = document.querySelector('.ancients');
const ancientsItem = document.querySelectorAll('.ancient-card');
const difficulty = document.querySelector('.difficulty-container');
const difficultyItems = document.querySelectorAll('.difficulty');
const button = document.querySelector('.button');
const cards = document.querySelector('.card-wrapper');

ancients.addEventListener('click', function (event) {
  if (event.target.classList.contains('ancient-card')) {
    for (let item of ancientsItem) {
      if (item !== event.target) {
        item.classList.remove('active');
      }
    }
    event.target.classList.add('active');
  }
});

difficulty.addEventListener('click', function (event) {
  if (event.target.classList.contains('difficulty')) {
    for (let item of difficultyItems) {
      if (item !== event.target) {
        item.classList.remove('active');
      }
    }
    event.target.classList.add('active');
  }
});

const cardsDeckImg = document.querySelector('.card-back');
const openCardImg = document.querySelector('.card-open');

button.addEventListener('click', function(event){
  cardsDeckImg.style.display = 'block';
  // openCardImg.style.display = 'none';
  cards.style.display = 'block';
  button.style.display = 'none';
})

let activeAncient;
let activeLevel;
let customDeck = {
  green: {
    amount: 0,
    cards: [],
  },
  brown: {
    amount: 0,
    cards: [],
  },
  blue: {
    amount: 0,
    cards: [],
  },
};


function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function setActiveAncient() {
  let activeItem = ancients.querySelector('.ancient-card.active').dataset.ancient;
  activeAncient = Ancients.find((item) => item.name == activeItem);
}

function setActiveLevel() {
  activeLevel = difficulty.querySelector('.difficulty.active').dataset.level;
}

ancients.addEventListener('click', function () {
  setActiveAncient();
});
difficulty.addEventListener('click', setActiveLevel);

function selectDifficulty() {
  switch(activeLevel) {
    case 'very easy':
      selectCards(Green, 'green', ['easy'], 'normal');
      selectCards(Blue, 'blue', ['easy'], 'normal');
      selectCards(Brown, 'brown', ['easy'], 'normal');
    break;

    case 'easy':
      selectCards(Green, 'green', ['normal', 'easy']);
      selectCards(Blue, 'blue', ['normal', 'easy']);
      selectCards(Brown, 'brown', ['normal', 'easy']);
    break;

    case 'normal':
      selectCards(Green, 'green', ['normal', 'easy', 'hard']);
      selectCards(Blue, 'blue', ['normal', 'easy', 'hard']);
      selectCards(Brown, 'brown', ['normal', 'easy', 'hard']);
    break;

    case 'hard':
      selectCards(Green, 'green', ['normal', 'hard']);
      selectCards(Blue, 'blue', ['normal', 'hard']);
      selectCards(Brown, 'brown', ['normal', 'hard']);
    break;

    case 'very hard':
      selectCards(Green, 'green', ['hard'], 'normal');
      selectCards(Blue, 'blue', ['hard'], 'normal');
      selectCards(Brown, 'brown', ['hard'], 'normal');
    break;
  }
}

function setAmountCard() {
  customDeck.green.amount =
    activeAncient.firstStage.greenCards +
    activeAncient.secondStage.greenCards +
    activeAncient.thirdStage.greenCards;
  customDeck.brown.amount =
    activeAncient.firstStage.brownCards +
    activeAncient.secondStage.brownCards +
    activeAncient.thirdStage.brownCards;
  customDeck.blue.amount =
    activeAncient.firstStage.blueCards +
    activeAncient.secondStage.blueCards +
    activeAncient.thirdStage.blueCards;
}

function selectCards(
  cardsData,
  colorCards,
  arrayOptions,
  additionalOption = ''
) {
  setAmountCard();
  let cardsForSelection = [];

  for (let i = 0; i < arrayOptions.length; i++) {
    let temp = cardsData.filter((elem) => elem.difficulty == arrayOptions[i]);
    for (let elem of temp) {
      cardsForSelection.push(elem);
    }
  }

  for (let i = 0; i < customDeck[colorCards].amount; i++) {
    if (cardsForSelection.length == 0) {
      break;
    }
    let randomNum = getRandomNum(cardsForSelection.length);
    customDeck[colorCards].cards.push(cardsForSelection[randomNum]);
    cardsForSelection.splice(randomNum, 1);
  }

  let difference = customDeck[colorCards].amount - customDeck[colorCards].cards.length;
  if (additionalOption !== '' && difference !== 0) {
    let moreCards = cardsData.filter(
      (elem) => elem.difficulty == additionalOption
    );
    for (let i = 0; i < difference; i++) {
      let randomNum = getRandomNum(moreCards.length);
      customDeck[colorCards].cards.push(moreCards[randomNum]);
      moreCards.splice(randomNum, 1);
    }
  }

  shuffleArray(customDeck[colorCards].cards);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function discardCard(colorCard, number) {
  customDeck[colorCard].cards.splice(number, 1);
  customDeck[colorCard].amount--;
}

let stages = {
  stage1: {},
  stage2: {},
  stage3: {},
};

function selectCardsForStage(stage) {
  for (let i = 0; i < stage.greenNumber; i++) {
    let randomNum = getRandomNum(customDeck.green.amount);
    stage.cards.push(customDeck.green.cards[randomNum]);
    discardCard('green', randomNum);
  }
  for (let i = 0; i < stage.brownNumber; i++) {
    let randomNum = getRandomNum(customDeck.brown.amount);
    stage.cards.push(customDeck.brown.cards[randomNum]);
    discardCard('brown', randomNum);
  }
  for (let i = 0; i < stage.blueNumber; i++) {
    let randomNum = getRandomNum(customDeck.blue.amount);
    stage.cards.push(customDeck.blue.cards[randomNum]);
    discardCard('blue', randomNum);
  }
  shuffleArray(stage.cards);
}

function fillDeck() {
  stages.stage1 = {
    greenNumber: activeAncient.firstStage.greenCards,
    brownNumber: activeAncient.firstStage.brownCards,
    blueNumber: activeAncient.firstStage.blueCards,
    cards: [],
  };

  stages.stage2 = {
    greenNumber: activeAncient.secondStage.greenCards,
    brownNumber: activeAncient.secondStage.brownCards,
    blueNumber: activeAncient.secondStage.blueCards,
    cards: [],
  };

  stages.stage3 = {
    greenNumber: activeAncient.thirdStage.greenCards,
    brownNumber: activeAncient.thirdStage.brownCards,
    blueNumber: activeAncient.thirdStage.blueCards,
    cards: [],
  };

  selectCardsForStage(stages.stage1);
  selectCardsForStage(stages.stage2);
  selectCardsForStage(stages.stage3);
}

let finalDeck = [];

function fillFinalDeck() {
  for (let card of stages.stage3.cards) {
    finalDeck.push(card);
  }

  for (let card of stages.stage2.cards) {
    finalDeck.push(card);
  }

  for (let card of stages.stage1.cards) {
    finalDeck.push(card);
  }
}

const outputStage = document.querySelectorAll('.stage');

function outputDeck() {
  for (let i = 0; i < outputStage.length; i++) {
    outputStage[i].querySelector('.green').textContent =
      stages[`stage${i + 1}`].greenNumber;
    outputStage[i].querySelector('.brown').textContent =
      stages[`stage${i + 1}`].brownNumber;
    outputStage[i].querySelector('.blue').textContent =
      stages[`stage${i + 1}`].blueNumber;
  }
}

button.addEventListener('click', selectDifficulty);
button.addEventListener('click', fillDeck);
button.addEventListener('click', outputDeck);
button.addEventListener('click', fillFinalDeck);

const cardDeckImg = document.querySelector('.card-back');

function getTopCard() {
  let top = finalDeck.pop();
  deleteCard(top);

  return top;
}

function showOpenCard() {
  if (finalDeck.length !== 0) {
    let top = getTopCard();
    openCardImg.style.backgroundImage = `url(${top.cardFace})`;
    openCardImg.onload = function () {
      openCardImg.style.display = 'block';
    };
  }
}

function deleteCard(elem) {
  for (let stage in stages) {
    for (let card of stages[stage].cards) {
      if (card.id == elem.id) {
        stages[stage].cards.pop();
        stages[stage][`${elem.color}Number`]--;
      }
    }
  }
}

function showEndCards() {
  cardDeckImg.style.display = 'none';
  button.style.display = 'block';
}

cardDeckImg.addEventListener('click', function () {
  showOpenCard();
  outputDeck();
  if (finalDeck.length == 0) {
    showEndCards();
  }
});
