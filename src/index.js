document.addEventListener("DOMContentLoaded", () => {
  // card options
  const cardArray = [
    {
      name: "fries",
      img: "src/images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "src/images/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "src/images/hotdog.png",
    },
    {
      name: "milkshake",
      img: "src/images/milkshake.png",
    },
    {
      name: "pizza",
      img: "src/images/pizza.png",
    },
    {
      name: "ice-cream",
      img: "src/images/ice-cream.png",
    },
    {
      name: "fries",
      img: "src/images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "src/images/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "src/images/hotdog.png",
    },
    {
      name: "milkshake",
      img: "src/images/milkshake.png",
    },
    {
      name: "pizza",
      img: "src/images/pizza.png",
    },
    {
      name: "ice-cream",
      img: "src/images/ice-cream.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());
  console.log(cardArray);

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");

  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "src/images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      card.classList.add("card");
      grid.appendChild(card);
    }
  }

  let timerStarted = false;
  let timerDOM = document.getElementById("timer")

  let sec = 0;
  function handleTimer() {
    sec++;
    timerDOM.innerHTML = sec;
  }

  timer = setInterval(handleTimer, 1000);

  function flipCard() {
    if (timerStarted === false) {
      timerStarted = true;
      handleTimer()
    }

    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);

    //after a time, if 2 cards chosen correctly, take off the board, otherwise flip back over.
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
    console.log(cardsChosenIds);
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    let optionOneId = cardsChosenIds[0];
    let optionTwoId = cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
      alert("You have clicked the same image");
      cards[optionOneId].setAttribute("src", "src/images/blank.png");
      cards[optionTwoId].setAttribute("src", "src/images/blank.png");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("You have found a match!");
      cards[optionOneId].setAttribute("src", "src/images/white.png");
      cards[optionTwoId].setAttribute("src", "src/images/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "src/images/blank.png");
      cards[optionTwoId].setAttribute("src", "src/images/blank.png");
      alert("Sorry, try again!");
    }

    cardsChosen = [];
    cardsChosenIds = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations! You have won!";
      clearInterval(timer);

    }

    console.log(cardsWon);
    console.log(cardsChosen);
  }

  createBoard();
});
