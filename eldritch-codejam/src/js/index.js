// https://codejam-demo.netlify.app/
// https://codejam-demo.herokuapp.com/
import '../css/style.css'

import ancients from "../assets/Ancients/index";
import ancientsData from "../data/ancients.js"
import difficulties from "../data/difficulties.js"
import { brownCards, blueCards, greenCards } from "../data/mythicCards/index.js"
import bg from "../assets/home.jpg";

// console.log(ancients.azathoth);
console.log(ancientsData)
console.log(difficulties)
console.log(brownCards)
console.log(blueCards)
console.log(greenCards)


function setBackground () {
  const body = document.body;
  body.style.backgroundImage = `url(${bg})`;
}
setBackground();

function setAncients() {
  const ancientCards = document.querySelector('.ancients-container');
  ancientCards.children[0].style.backgroundImage = `url(${ancients.azathoth})`;
  ancientCards.children[1].style.backgroundImage = `url(${ancients.cthulhu})`;
  ancientCards.children[2].style.backgroundImage = `url(${ancients.iogSothoth})`;
  ancientCards.children[3].style.backgroundImage = `url(${ancients.shubNiggurath})`;
}
setAncients();

let chosenAncient = 0;
let isChosen = false;
function choiceAncient() {
  const ancientCards = document.querySelectorAll('.ancient-card');
  for (let i = 0; i < ancientCards.length; i++) {
    ancientCards[i].addEventListener('click', function() {
      if (i = chosenAncient && isChosen) {
        console.log(i, '--')
        isChosen = true;
      } else {
        ancientCards.forEach((card) => {
          card.classList.remove('active')
          console.log(card);
        })
        ancientCards[i].classList.add('active');
        chosenAncient= i;
        isChosen = false;
      }
    })
  }


  // for (let i = 0; i < playListItem.length; i++) {        
  //   playListItem[i].addEventListener('click', function() {
  //     if (i == playNum && isPlay) {
  //       isPlay = true;
  //       currentTimeValue = audio.currentTime;
  //       playAudio();
  //       addPauseButton();
  //     } else {
  //       if (i != playNum) currentTimeValue = 0;
  //       playListItem.forEach((item) => item.classList.remove('play-item-pause'))
  //       playListItem[i].classList.add('play-item-pause');
  //       playNum = i;
  //       isPlay = false;
  //       playAudio();
  //       addPauseButton();
  //     }
  //   })
  // }
}

choiceAncient();