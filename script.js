document.addEventListener("DOMContentLoaded", function () {
  const questionInput = document.getElementById("questionInput");
  const askButton = document.getElementById("askButton");
  const answerBox = document.getElementById("answerBox");

  const subjectButtons = document.querySelectorAll("[data-subject]");
  const difficultyButtons = document.querySelectorAll("[data-difficulty]");

  let selectedSubject = "General";
  let selectedDifficulty = "Easy";

  // Display a message in the answer area.
  function showAnswer(message) {
    if (answerBox) {
      answerBox.textContent = message;
    } else {
      alert("Missing answer area. Check index.html for id='answerBox'.");
    }
  }

  // Select a school subject.
  subjectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedSubject = button.dataset.subject;
      showAnswer("You selected " + selectedSubject +
        ". Enter your question and click Ask Kaakyire.");
    });
  });

  // Select difficulty.
  difficultyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedDifficulty = button.dataset.difficulty;
      showAnswer("Difficulty selected: " + selectedDifficulty +
        ". Now enter your question.");
    });
  });

  // Give a basic response to the question.
  function answerQuestion(question) {
    const q = question.toLowerCase().trim();

    if (!q) {
      return "Please type a question first.";
    }

    if (/^(hello|hi|hey)\b/.test(q)) {
      return "Hello! Welcome to Kaakyire Learning AI. What would you like to learn today?";
    }

    if (/what is your name|who are you/.test(q)) {
      return "I am Kaakyire Learning AI, your friendly learning assistant.";
    }

    // Basic arithmetic: 12 + 5, 20 - 8, 4 x 3, 10 / 2
    const math = q.match(
      /(-?\d+(?:\.\d+)?)\s*([+\-*\/×÷])\s*(-?\d+(?:\.\d+)?)/
    );

    if (math && /math|calculate|solve|what is|\d/.test(q)) {
      const a = Number(math[1]);
      const op = math[2];
      const b = Number(math[3]);
      let result;

      if (op === "+") result = a + b;
      if (op === "-") result = a - b;
      if (op === "*") result = a * b;
      if (op === "×") result = a * b;
      if (op === "/") result = b === 0 ? null : a / b;
      if (op === "÷") result = b === 0 ? null : a / b;

      if (result === null) return "You cannot divide by zero.";
      if (Number.isFinite(result)) {
        return "Mathematics\n\n" + a + " " + op + " " + b +
          " = " + result +
          "\n\nStep 1: Identify the two numbers." +
          "\nStep 2: Apply the operation." +
          "\nStep 3: The answer is " + result + ".";
      }
    }

    if (/noun|verb|adjective|adverb|grammar|english|pronoun/.test(q)) {
      if (/noun/.test(q)) {
        return "English: A noun names a person, place, animal, or thing. Examples: teacher, school, dog, and book.";
      }
      if (/verb/.test(q)) {
        return "English: A verb expresses an action or state. Examples: run, read, write, is, and are.";
      }
      if (/adjective/.test(q)) {
        return "English: An adjective describes a noun. Example: The beautiful flower. 'Beautiful' is the adjective.";
      }
      if (/adverb/.test(q)) {
        return "English: An adverb can describe how an action happens. Example: She runs quickly. 'Quickly' is the adverb.";
      }
      return "English helps us develop reading, writing, spelling, and grammar skills. Please enter the exact word or sentence you want help with.";
    }

    if (/science|photosynthesis|plant|animal|gravity|energy|matter|water cycle|solar system|biology|chemistry|physics/.test(q)) {
      if (/photosynthesis/.test(q)) {
        return "Science: Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to make food. Oxygen is released during this process.";
      }
      if (/gravity/.test(q)) {
        return "Science: Gravity is a force that attracts objects toward one another. Earth's gravity keeps us on the ground and helps keep the Moon in orbit.";
      }
      if (/water cycle/.test(q)) {
        return "Science: The water cycle includes evaporation, condensation, precipitation, and collection. Water moves continuously between Earth's surface and the atmosphere.";
      }
      return "Science — " + selectedDifficulty + "\n\nYour topic is: " + question +
        "\n\nScience studies living things, matter, energy, Earth, and the universe. Please ask a specific question about your topic for a more focused explanation.";
    }

    if (/history|slavery|independence|ancient civilization|world war|historical event/.test(q)) {
      return "History — " + selectedDifficulty +
        "\n\nHistory is the study of past events and people. When studying an event, ask: Who was involved? What happened? When and where did it happen? Why was it important?\n\nYour topic: " + question +
        "\n\nThis basic version needs more detailed subject lessons to answer specific historical questions accurately.";
    }

    if (/geography|continent|ocean|river|mountain|capital|country|climate|map|landform/.test(q)) {
      if (/continent/.test(q)) {
        return "Geography: The seven commonly recognized continents are Africa, Antarctica, Asia, Europe, North America, Australia, and South America.";
      }
      if (/ocean/.test(q)) {
        return "Geography: The five commonly recognized oceans are the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.";
      }
      return "Geography — " + selectedDifficulty +
        "\n\nGeography studies places, maps, landforms, climate, people, and environments.\n\nYour question: " + question +
        "\n\nTry asking about a particular country, river, mountain, continent, or ocean.";
    }

    if (/social studies|government|citizen|citizenship|democracy|community|culture|rights|responsibilities/.test(q)) {
      return "Social Studies — " + selectedDifficulty +
        "\n\nSocial Studies helps us understand communities, cultures, government, history, geography, and citizenship.\n\nYour question: " + question +
        "\n\nPlease choose one specific idea so we can focus on explaining it.";
    }

    return "Welcome to Kaakyire Learning AI!\n\n" +
      "Subject: " + selectedSubject +
      "\nDifficulty: " + selectedDifficulty +
      "\nQuestion: " + question +
      "\n\nI can currently provide basic explanations and selected examples. I am not connected to an advanced AI service yet, so I cannot answer every school question.";
  }

  // Connect the Ask button.
  if (askButton) {
    askButton.addEventListener("click", function (event) {
      event.preventDefault();

      if (!questionInput) {
        showAnswer("The question box is missing. Check index.html for id='questionInput'.");
        return;
      }

      showAnswer(answerQuestion(questionInput.value));
    });
  } else {
    console.error("Ask button not found. Check index.html for id='askButton'.");
  }

  // Allow Enter to submit when using a single-line input.
  if (questionInput) {
    questionInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" &&
          questionInput.tagName.toLowerCase() !== "textarea") {
        event.preventDefault();
        if (askButton) askButton.click();
      }
    });
  } else {
    console.error("Question input not found. Check index.html for id='questionInput'.");
  }

  console.log("Kaakyire Learning AI is ready.");
});
