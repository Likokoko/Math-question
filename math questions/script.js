const questionSelection = document.querySelectorAll(".question-selection");
const selections = document.querySelector(".selections");
const score = document.querySelector(".score");
const start = document.querySelector(".start");
const countdown = document.querySelector(".countdown");
const number = document.querySelector(".number");
const itemContainer = document.querySelector(".item-container");
const questions = document.querySelector(".questions");
const wrong = document.querySelector(".wrong");
const right = document.querySelector(".right");
const item = document.querySelector(".items");
const yourTime = document.querySelector(".your-time");
const baseTime = document.querySelector(".base-time");
const penalty = document.querySelector(".penalty");
const playAgain = document.querySelector("#playAgain");
let appendTimes = 0;
let questionValue = 0;
let correctText = 0;
let allQuestion = [];
let wrongText = 0;
let answer = [];
let isCorrect = true;

questionSelection.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("selected-label")) {
      alert("click the start button");
      answer = [];
    } else {
      item.classList.toggle("selected-label");
    }
  });
});

start.addEventListener("click", () => {
  questionSelection.forEach((item) => {
    if (item.classList.contains("selected-label")) {
      selections.classList.add("hidden");
      countdown.classList.remove("hidden");
      countDown();
    }
  });
});

function countDown() {
  number.textContent = "3";
  setTimeout(() => {
    number.textContent = "2";
  }, 1000);
  setTimeout(() => {
    number.textContent = "1";
  }, 2000);
  setTimeout(() => {
    number.textContent = "go!";
  }, 3000);
  setTimeout(() => {
    showitem();
  }, 4000);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

questionSelection.forEach((question) => {
  question.addEventListener("click", () => {
    questionValue = Number(question.innerText.split(" ")[0]);
    createEquations();
    console.log("questionValue:", questionValue);
  });
});

//correct ques
function createEquations() {
  correctText = getRandomInt(questionValue);
  wrongText = questionValue - correctText;
  console.log("correctText:", correctText, "wrongText:", wrongText);

  for (let i = 0; i < correctText; i++) {
    firstNum = getRandomInt(9);
    secondNum = getRandomInt(9);
    const correctInput = `${firstNum} X ${secondNum} = ${firstNum * secondNum}`;
    answer.push({
      math: correctInput,
      isCorrect: true,
    });
  }

  for (let i = 0; i < wrongText; i++) {
    firstNum = getRandomInt(9);
    secondNum = getRandomInt(9);
    const wrongInput = [
      `${firstNum - 1} X ${secondNum} = ${firstNum * secondNum}`,
      `${firstNum} X ${secondNum - 1} = ${firstNum * secondNum}`,
      `${firstNum} X ${secondNum} = ${firstNum * secondNum - 1}`,
    ];
    let getWrongText = wrongInput[getRandomInt(3)];
    answer.push({
      math: getWrongText,
      isCorrect: false,
    });
  }

  for (let i = answer.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [answer[i], answer[j]] = [answer[j], answer[i]];
  }
  console.log(answer);
}

let point = 0;
let isRight = true;
let isWrong = false;
let answerArr = [];
let QuestionAnswerArr = [];

function showitem() {
  selections.classList.add("hidden");
  countdown.classList.add("hidden");
  itemContainer.classList.remove("hidden");
  for (let i = 0; i < answer.length; i++) {
    let ques = document.createElement("h1");
    ques.innerHTML = answer[i].math;
    itemContainer.appendChild(ques);
    QuestionAnswerArr.push(answer[i].isCorrect);
  }
}

right.addEventListener("click", () => {
  if (answerArr.length === questionValue) {
    yourTime.classList.remove("hidden");
    getCorrect();
  } else {
    answerArr.push(isRight);
    console.log(answerArr);
  }
});
wrong.addEventListener("click", () => {
  if (answerArr.length === questionValue) {
    yourTime.classList.remove("hidden");
    getCorrect();
  }
  answerArr.push(isWrong);
  console.log(answerArr);
});

let finalArray = [];
function getCorrect() {
  for (let i = 0; i < answer.length; i++) {
    finalArray.push(answer[i].isCorrect);
  }
  if (answerArr === finalArray) {
    baseTime.innerText = "100!";
    penalty.innerText = "0";
  } else {
    baseTime.innerText = "here's the answer :" + finalArray;
    penalty.innerText = "here's yours! :" + answerArr;
  }
}

playAgain.addEventListener("click", () => {
  location.reload();
});
