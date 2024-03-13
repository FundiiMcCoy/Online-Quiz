const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ]
  }, {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Artica", correct: false },
      { text: "Africa", correct: false },
    ]
  }, {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQIndex = 0;
let score = 0;

//function to start quize
function startQuiz() {
  currentQIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
//function to show question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQIndex];
  let questionNo = currentQIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  // code to display answers
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    //code for button to select the answer
    button.addEventListener("click", selectAnswer);
  });
}
//function to clear/reset screen
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
//function to show the correct and incorrect answers
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
  //code to limit user selecting one answer
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function handleNextButton() {
}

//function to display score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

//Function for nextbutton
function handleNextButton() {
  currentQIndex++;
  if (currentQIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
//eventlistener for the next button 
nextButton.addEventListener("click", () => {
  if (currentQIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

