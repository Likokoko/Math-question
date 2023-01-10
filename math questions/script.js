const questionSelection = document.querySelectorAll(".question-selection");
const selections = document.querySelector(".selections");
const score = document.querySelector(".score");
const start = document.querySelector(".start");
const countdown = document.querySelector(".countdown");
const number = document.querySelector(".number");
const itemContainer = document.querySelector(".item-container");
const questions = document.querySelector(".questions");
const ques = document.querySelector(".ques");

questionSelection.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("selected-label");
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
let appendTimes = 0;
let questionValue = 0;


questionSelection.forEach((question) => {
  question.addEventListener("click", () => {
    questionValue = Number(question.innerText.split(" ")[0]);
     createEquations();
    return questionValue
  });
});
console.log(questionValue)
//好像全域變數,function位置錯了

let correctText = 0;
function createEquations() {
  correctText = getRandomInt(questionValue);
  console.log(correctText);
  const wrongText = questionValue - correctText;
    console.log(wrongText);
  for (let i = 0; i < correctText; i++) {
    firstNum = getRandomInt(9);
    secondNum = getRandomInt(9);
    const correctInput = `${firstNum} X ${secondNum} = ${firstNum * secondNum}`;
    ques.textContent = correctInput;
 
    itemContainer.appendChild(ques);
  }
 const wrongInput = [`${firstNum - 1} X ${secondNum} = ${firstNum * secondNum}`, `${firstNum} X ${secondNum - 1} = ${firstNum * secondNum}`, `${firstNum} X ${secondNum} = ${firstNum * secondNum - 1}`]
  for (let i = 0; i < wrongText; i++) {
    firstNum = getRandomInt(9);
    secondNum = getRandomInt(9);
    ques.textContent = wrongInput[+1];
    console.log(wrongInput)
    itemContainer.appendChild(ques);
  }
}

function showitem() {
  selections.classList.add("hidden");
  countdown.classList.add("hidden");
  itemContainer.classList.remove("hidden");
}


