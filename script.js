/* ==========================================
   KAAKYIRE LEARNING AI
   Frontend learning assistant
   ========================================== */

"use strict";

// Connect JavaScript to the HTML elements.
const questionForm = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const answerArea = document.getElementById("answer");
const difficultySelect = document.getElementById("difficulty");
const statusArea = document.getElementById("status");
const subjectButtons = document.querySelectorAll("[data-subject]");

// Remember the student's choices.
let selectedSubject = "Mathematics";

// Select a subject.
subjectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedSubject = button.dataset.subject;

    subjectButtons.forEach(function (item) {
      item.classList.toggle("selected", item === button);
    });

    statusArea.textContent = "Selected subject: " + selectedSubject;
    questionInput.focus();
  });
});

// Display an answer safely as plain text.
function showAnswer(message) {
  answerArea.textContent = message;
}

// Give the student a clear learning explanation.
function getLearningAnswer(question, subject, difficulty) {
  const text = question.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon)[!. ]*$/.test(text)) {
    return "Hello! Welcome to Kaakyire Learning AI.\n\n" +
      "Choose a school subject and tell me what you would like to learn.";
  }

  // Mathematics: common addition example
  if (
    subject === "Mathematics" &&
    /^(what is )?2\s*\+\s*2\s*\??$/.test(text)
  ) {
    return "MATHEMATICS: ADDITION\n\n" +
      "Question: 2 + 2\n\n" +
      "Step 1: Start with 2.\n" +
      "Step 2: Add 2 more.\n" +
      "Step 3: Count 1, 2, 3, 4.\n\n" +
      "Answer: 4\n\n" +
      "Addition means putting quantities together.";
  }

  // Mathematics: common multiplication example
  if (
    subject === "Mathematics" &&
    /^(what is )?12\s*(\*|x|×)\s*8\s*\??$/.test(text)
  ) {
    return "MATHEMATICS: MULTIPLICATION\n\n" +
      "Question: 12 × 8\n\n" +
      "Step 1: Multiply 10 × 8 = 80.\n" +
      "Step 2: Multiply 2 × 8 = 16.\n" +
      "Step 3: Add 80 + 16 = 96.\n\n" +
      "Answer: 96";
  }

  // English
  if (subject === "English") {
    if (text.includes("noun")) {
      return "ENGLISH: NOUNS\n\n" +
        "A noun is a word that names a person, place, animal, " +
        "or thing.\n\n" +
        "Examples:\n" +
        "• Person: teacher\n" +
        "• Place: school\n" +
        "• Animal: dog\n" +
        "• Thing: book\n\n" +
        "Example sentence: The student reads a book.\n" +
        "Student and book are nouns.";
    }

    if (text.includes("verb")) {
      return "ENGLISH: VERBS\n\n" +
        "A verb is a word that expresses an action or a state.\n\n" +
        "Examples: run, read, write, think, is.\n\n" +
        "Example sentence: Ama reads a book.\n" +
        "The word 'reads' is the verb.";
    }

    if (text.includes("adjective")) {
      return "ENGLISH: ADJECTIVES\n\n" +
        "An adjective describes a noun.\n\n" +
        "Examples: tall, happy, blue, beautiful.\n\n" +
        "Example: The tall girl has a blue bag.\n" +
        "Tall describes the girl. Blue describes the bag.";
    }
  }

  // Science
  if (subject === "Science") {
    if (text.includes("photosynthesis")) {
      return "SCIENCE: PHOTOSYNTHESIS\n\n" +
        "Photosynthesis is the process plants use to make " +
        "their own food.\n\n" +
        "Plants need:\n" +
        "1. Sunlight\n" +
        "2. Water\n" +
        "3. Carbon dioxide from the air\n\n" +
        "The leaves use these ingredients to make sugar " +
        "and release oxygen.\n\n" +
        "Remember: sunlight + water + carbon dioxide help " +
        "plants make food.";
    }

    if (text.includes("water cycle")) {
      return "SCIENCE: THE WATER CYCLE\n\n" +
        "The water cycle is the continuous movement of water " +
        "between Earth's surface and the atmosphere.\n\n" +
        "1. Evaporation: the Sun heats water, turning it into vapor.\n" +
        "2. Condensation: vapor cools and forms clouds.\n" +
        "3. Precipitation: water falls as rain, snow, or hail.\n" +
        "4. Collection: water gathers in rivers, lakes, and oceans.";
    }

    if (text.includes("gravity")) {
      return "SCIENCE: GRAVITY\n\n" +
        "Gravity is a force of attraction between objects that " +
        "have mass.\n\n" +
        "Earth's gravity pulls objects toward the ground.\n\n" +
        "Example: When you drop a pencil, it falls toward Earth " +
        "because of gravity.";
    }
  }

  // History
  if (subject === "History") {
    if (text.includes("history")) {
      return "HISTORY: UNDERSTANDING THE PAST\n\n" +
        "History is the study of people, events, and societies " +
        "from the past.\n\n" +
        "Historians learn from sources such as letters, " +
        "photographs, artifacts, records, and oral accounts.\n\n" +
        "To study an event, ask:\n" +
        "1. What happened?\n" +
        "2. When and where did it happen?\n" +
        "3. Who was involved?\n" +
        "4. What caused it?\n" +
        "5. What were its effects?";
    }
  }

  // Geography
  if (subject === "Geography") {
    if (text.includes("continent") || text.includes("continents")) {
      return "GEOGRAPHY: THE CONTINENTS\n\n" +
        "In the commonly taught seven-continent model, the " +
        "continents are:\n\n" +
        "1. Africa\n" +
        "2. Antarctica\n" +
        "3. Asia\n" +
        "4. Europe\n" +
        "5. North America\n" +
        "6. South America\n" +
        "7. Australia\n\n" +
        "Geography studies places, Earth's features, people, " +
        "and the environment.";
    }

    if (text.includes("equator")) {
      return "GEOGRAPHY: THE EQUATOR\n\n" +
        "The Equator is an imaginary line around the middle " +
        "of Earth at 0 degrees latitude.\n\n" +
        "It divides Earth into the Northern and Southern Hemispheres.";
    }
  }

  // Social Studies
  if (subject === "Social Studies") {
    if (text.includes("community")) {
      return "SOCIAL STUDIES: COMMUNITY\n\n" +
        "A community is a group of people who live in the " +
        "same area or share common interests.\n\n" +
        "Community members may work together to keep their " +
        "neighborhood clean, safe, and welcoming.\n\n" +
        "Examples of community services include schools, " +
        "libraries, hospitals, and fire services.";
    }

    if (text.includes("government")) {
      return "SOCIAL STUDIES: GOVERNMENT\n\n" +
        "A government is the system or group of people " +
        "responsible for leading a country or community.\n\n" +
        "Governments make and enforce laws, provide public " +
        "services, and make decisions for society.\n\n" +
        "Government systems differ from country to country.";
    }
  }

  // General fallback for questions not covered above.
  return "Thank you for your question!\n\n" +
    "Subject: " + subject + "\n" +
    "Learning level: " + difficulty + "\n\n" +
    "Your question: " + question + "\n\n" +
    "This version of Kaakyire can demonstrate a few prepared " +
    "examples, but it is not yet connected to a real AI model. " +
    "It cannot reliably answer every question yet.\n\n" +
    "Our next step is to connect a secure AI service so Kaakyire " +
    "can generate explanations for many different school topics.";
}

// Process a submitted question.
function answerQuestion(event) {
  event.preventDefault();

  const question = questionInput.value.trim();
  const difficulty = difficultySelect.value;

  if (!question) {
    showAnswer("Please type your question before asking Kaakyire.");
    questionInput.focus();
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Preparing response...";
  statusArea.textContent = "Your question has been submitted.";

  try {
    const response = getLearningAnswer(
      question,
      selectedSubject,
      difficulty
    );

    showAnswer(response);
    statusArea.textContent = "Response ready.";
  } catch (error) {
    console.error("Kaakyire error:", error);
    showAnswer(
      "Sorry, something went wrong. Please refresh the page and try again."
    );
    statusArea.textContent = "Please try again.";
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Ask Kaakyire";
  }
}

// Connect the form to the answer function.
if (questionForm) {
  questionForm.addEventListener("submit", answerQuestion);
} else {
  console.error("Could not find the question form in index.html.");
}

console.log("Kaakyire Learning AI JavaScript loaded successfully.");



3. Test your website
