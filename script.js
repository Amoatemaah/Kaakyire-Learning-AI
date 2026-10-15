


 
/* =====================================
   KAAKYIRE LEARNING AI
   Student Learning Assistant
   ===================================== */

const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const answerArea = document.getElementById("answer");

const subjectButtons = document.querySelectorAll("[data-subject]");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");

let selectedSubject = "General";
let selectedDifficulty = "Easy";

// Display answers and messages
function showAnswer(message) {
  if (answerArea) {
    answerArea.textContent = message;
  }
}

// Choose a school subject
subjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSubject =
      button.dataset.subject || button.textContent.trim();

    showAnswer(
      "You selected " + selectedSubject +
      ". Now type your school question."
    );
  });
});

// Choose the difficulty level
difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDifficulty =
      button.dataset.difficulty || button.textContent.trim();

    showAnswer(
      "You selected " + selectedDifficulty +
      " difficulty. Now ask your question."
    );
  });
});

// Process the student's question
function answerQuestion() {
  if (!questionInput || !answerArea) {
    console.error(
      "Check index.html: question and answer elements are missing."
    );
    return;
  }

  const question = questionInput.value.trim();

  if (!question) {
    showAnswer("Please type a school question first.");
    questionInput.focus();
    return;
  }

  const text = question.toLowerCase();

  if (text === "hi" || text === "hello") {
    showAnswer(
      "Hello! Welcome to Kaakyire Learning AI. " +
      "What would you like to learn today?"
    );
    return;
  }

  if (
    text.includes("2 + 2") ||
    text.includes("2+2")
  ) {
    showAnswer(
      "Mathematics: 2 + 2 = 4.\n\n" +
      "Step 1: Start with 2.\n" +
      "Step 2: Add 2 more.\n" +
      "Step 3: Count 1, 2, 3, 4. The answer is 4."
    );
    return;
  }

  showAnswer(
    "Welcome to Kaakyire Learning AI!\n\n" +
    "Subject: " + selectedSubject + "\n" +
    "Difficulty: " + selectedDifficulty + "\n\n" +
    "Your question: " + question + "\n\n" +
    "Your question has been received. To explain other " +
    "school questions accurately, we still need to connect " +
    "a real AI service."
  );
}

// Connect the Ask button
if (askButton) {
  askButton.addEventListener("click", answerQuestion);
}

// Allow Enter to submit a question
if (questionInput) {
  questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      answerQuestion();
    }
  });
}

console.log("Kaakyire Learning AI is ready!");
