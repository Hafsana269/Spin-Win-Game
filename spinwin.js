const questions = [
  { text: "What does NaN stands for in JavaScript?", answer: "Not a Number" },
  { text: "What value represents the absensce of an object in JavaScript", answer: "null" },
  { text: "What is the keyword to define a function in python?", answer: "def" },
  { text: "What is the data type for key-value pairs in python?", answer: "Dictionary" }
];

const wheel = document.getElementById("wheel");
const questionBox = document.getElementById("questionBox");
const questionDisplay = document.getElementById("question");
const userAnswerInput = document.getElementById("userAnswer");
const resultDisplay = document.getElementById("result");
const label = document.getElementById("label");

let currentQuestion = null;

function spinWheel() {
  label.innerText = "Spinning...";
  resultDisplay.innerText = "";
  userAnswerInput.value = "";
  questionBox.style.display = "none";

  // Spin 4 full rounds + random 0-360 degree
  const randomDegree = Math.floor(Math.random() * 360);
  const totalRotation = 360 * 4 + randomDegree;

  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = `rotate(${totalRotation}deg)`;

  setTimeout(() => {
    wheel.style.transition = "none";
    // Normalize rotation between 0-360 to avoid large number for next spin
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Find which quarter the spinner landed on (each quarter is 90deg)
    const sector = Math.floor(((360 - randomDegree) % 360) / 90);

    currentQuestion = questions[sector];

    showQuestion(currentQuestion);
  }, 3100);
}

function showQuestion(q) {
  questionBox.style.display = "block";
  questionDisplay.innerText = q.text;
  userAnswerInput.value = "";
  userAnswerInput.disabled = false;
  resultDisplay.innerText = "";
  label.innerText = "Tap to Spin!";
}

function checkAnswer() {
  const userAns = userAnswerInput.value.trim().toLowerCase();

  if (currentQuestion.answer === null) {
    resultDisplay.innerText = "No right or wrong answer!";
    return;
  }

  if (userAns === currentQuestion.answer.toLowerCase()) {
    resultDisplay.style.color = "black";
    resultDisplay.innerText = "Correct! 🎉";
  } else {
    resultDisplay.style.color = "black";
    resultDisplay.innerText = `Wrong! Correct answer is: ${currentQuestion.answer}`;
  }
  userAnswerInput.disabled = true;
}

function resetQuiz() {
  questionBox.style.display = "none";
  resultDisplay.innerText = "";
  userAnswerInput.value = "";
}
