var cards = document.querySelectorAll('.card');

var hasFlippedCard = false;
var lockboard = false;
var firstCard, secondCard;
var firstImage, secondImage;

function flipCard() {
  if (lockboard) return;
  //handle double clicking bug
  if (this === firstCard) return;
  console.log(this);
  this.classList.add('flip');

  //get the front face image and show it, add a little bit timeout for effect
  let cardImage = this.querySelector(".front-face")
  setTimeout(function () {
    cardImage.classList.add('d-block');
    cardImage.classList.remove("d-none")
  }, 100)


  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    firstImage = cardImage;
    pauseSong();
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;
  secondImage = cardImage;
  checkMatch();
}


cards.forEach(card => card.addEventListener('click', flipCard));

console.log(cards);

function checkMatch() {
  if (firstCard.dataset.album === secondCard.dataset.album) {
    playSong();
    disableCards();
  } else {
    unflipCards();
  }
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockboard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    //reset images
    firstImage.classList.add('d-none');
    firstImage.classList.remove("d-block")
    secondImage.classList.add('d-none');
    secondImage.classList.remove("d-block")
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockboard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//shuffle cards IIFE
(function shuffle() {
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

//audio functions
function playSong() {
  const audio = secondCard.querySelector('audio');
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

function pauseSong() {
  const songs = document.querySelectorAll('audio');
  if (!songs || songs === null) return;
  let audio = Array.from(songs);
  for (let song of audio) {
    song.pause();
  }
}
