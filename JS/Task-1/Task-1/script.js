const questions = [
  {
    question: "Which method is used to remove the last element from an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    correct: "pop()",
  },
  {
    question: "Which method is used to join all elements of an array into a string?",
    options: ["join()", "concat()", "slice()", "splice()"],
    correct: "join()",
  },
  {
    question: "Which method creates a new array with all elements that pass a test?",
    options: ["filter()", "map()", "reduce()", "forEach()"],
    correct: "filter()",
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    options: ["Number", "String", "Float", "Boolean"],
    correct: "Float",
  },
  {
    question: "What will the following code output: console.log(3 + '3')?",
    options: ["33", "6", "NaN", "Error"],
    correct: "33",
  },
];
let currentUser = null; 
let users = []; 
function displayQuiz() {
  const quizContainer = document.getElementById("container2");
  quizContainer.innerHTML = "";
  questions.forEach((q, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
      <h5>${index + 1}. ${q.question}</h5>
      ${q.options
        .map(
          (option, i) =>
            `<label>
              <input type="radio" name="question${index}" value="${option}" /> ${option}
            </label><br />`
        )
        .join("")}
    `;
    quizContainer.appendChild(questionElement);
  });
  document.getElementById("loginpage").style.display = "none";
  document.getElementById("quizpage").style.display = "block";
}
function answerSubmit() {
  const userAnswers = [];
  questions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    userAnswers.push(selected ? selected.value : null);
  });
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      score++;
    }
  });
  currentUser.score = Math.max(currentUser.score, score); 
  displayResults(userAnswers);
}
function displayResults(userAnswers) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = `
    <h2>Your Results</h2>
    ${questions
      .map(
        (q, index) => `
      <div>
        <p><strong>${index + 1}. ${q.question}</strong></p>
        <p>Correct Answer: ${q.correct}</p>
        <p>Your Answer: ${
          userAnswers[index] || "Not answered"
        }</p><hr />
      </div>
    `
      )
      .join("")}
  `;

  document.getElementById("quizpage").style.display = "none";
  document.getElementById("resultpage").style.display = "block";
}
function resultSubmit() {
  updateLeaderboard();
  document.getElementById("resultpage").style.display = "none";
  document.getElementById("dashboardpage").style.display = "block";
}
function updateLeaderboard() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  const sortedUsers = users.sort((a, b) => b.score - a.score);
  sortedUsers.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.score}</td>
      <td>${index + 1}</td>
    `;
    tbody.appendChild(row);
  });
}
function userDetails() {
  const email = document.getElementById("useremail").value.trim();
  const name = document.getElementById("username").value.trim();
  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");

  let valid = true;

  if (!email || !/[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/.test(email)) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
} else {
    emailError.textContent = "";
}

  if (!name || !/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(name)) {
    nameError.textContent = "Name must be start with uppercase.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  if (valid) {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      currentUser = existingUser;
    } else {
      currentUser = { name, email, score: 0 };
      users.push(currentUser);
    }

    displayQuiz();
  }
}
function relogin() {
  document.getElementById("dashboardpage").style.display = "none";
  document.getElementById("loginpage").style.display = "block";
}
