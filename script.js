/* ==========================================
   KAAKYIRE LEARNING AI
   Student Learning Assistant
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Find the question box in your webpage.
  const questionInput =
    document.querySelector("#questionInput") ||
    document.querySelector("#userQuestion") ||
    document.querySelector("#question") ||
    document.querySelector("#user-input") ||
    document.querySelector("#userInput") ||
    document.querySelector("textarea") ||
    document.querySelector('input[type="text"]');

  // Find the Ask button.
  const askButton =
    document.querySelector("#askButton") ||
    document.querySelector("#askBtn") ||
    document.querySelector("#submitQuestion") ||
    document.querySelector("#ask-kaakyire") ||
    document.querySelector("#sendButton") ||
    Array.from(document.querySelectorAll("button")).find(
      button => /ask kaakyire|ask question|submit question|^ask$|^send$/i
        .test(button.textContent.trim())
    );

  // Find the answer area.
  let answerArea =
    document.querySelector("#answerArea") ||
    document.querySelector("#answer") ||
    document.querySelector("#response") ||
    document.querySelector("#aiResponse") ||
    document.querySelector("#answer-box") ||
    document.querySelector("#result");

  // Create an answer area if one is missing.
  if (!answerArea) {
    answerArea = document.createElement("div");
    answerArea.id = "answerArea";
    answerArea.setAttribute("aria-live", "polite");
    answerArea.style.cssText =
      "margin-top:16px;padding:16px;border-radius:12px;" +
      "background:#f4f8ff;color:#172554;white-space:pre-wrap;" +
      "line-height:1.7;display:none;";

    const parent = questionInput?.parentElement ||
      document.querySelector("main") ||
      document.body;

    parent.appendChild(answerArea);
  }

  let selectedSubject = "General";
  let selectedDifficulty = "Medium";

  function showAnswer(message) {
    answerArea.textContent = message;
    answerArea.style.display = "block";
  }

  // Connect Easy, Medium, and Hard buttons.
  document.querySelectorAll(
    "[data-difficulty], .difficulty-btn, .difficulty-button"
  ).forEach(button => {
    button.addEventListener("click", function () {
      selectedDifficulty =
        button.dataset.difficulty ||
        button.textContent.trim();

      selectedDifficulty =
        selectedDifficulty.charAt(0).toUpperCase() +
        selectedDifficulty.slice(1).toLowerCase();

      showAnswer(
        "Difficulty selected: " + selectedDifficulty +
        ". Enter your school question and click Ask Kaakyire."
      );
    });
  });

  // Connect subject buttons.
  const subjects = [
    "Mathematics", "Math", "Science", "English",
    "History", "Social Studies", "Geography",
    "Biology", "Chemistry", "Physics", "Reading",
    "Writing", "Grammar", "Computer Science",
    "Art", "Music", "Economics", "Civics",
    "Health", "General Knowledge"
  ];

  document.querySelectorAll(
    "[data-subject], .subject-btn, .subject-button"
  ).forEach(button => {
    button.addEventListener("click", function () {
      selectedSubject =
        button.dataset.subject || button.textContent.trim();

      if (selectedSubject.toLowerCase() === "math") {
        selectedSubject = "Mathematics";
      }

      showAnswer(
        selectedSubject + " selected!\n\n" +
        "Type your question in the question box, then click Ask Kaakyire."
      );
    });
  });

  // Also recognize subject buttons that have no special class.
  document.querySelectorAll("button").forEach(button => {
    const label = button.textContent.trim();

    if (subjects.some(subject =>
      subject.toLowerCase() === label.toLowerCase()
    )) {
      button.addEventListener("click", function () {
        selectedSubject =
          label.toLowerCase() === "math" ? "Mathematics" : label;

        showAnswer(
          selectedSubject + " selected!\n\n" +
          "Enter your question to get started."
        );
      });
    }
  });

  // Simple math helper for arithmetic questions.
  function solveArithmetic(question) {
    const cleaned = question
      .replace(/,/g, "")
      .replace(/,/g, "")
      .replace(/what is|calculate|solve|find the answer to|evaluate/gi, "")
      .replace(/[?=$]/g, "")
      .trim();

    if (!/^[\d\s()+\-*/%.]+$/.test(cleaned)) {
      return null;
    }

    if (!/\d/.test(cleaned) ||
        !/[+\-*/%]/.test(cleaned)) {
      return null;
    }

    // Use a restricted arithmetic parser, not eval().
    const tokens = cleaned.match(
      /\d+(?:\.\d+)?|[()+\-*/%]/g
    );

    if (!tokens || tokens.join("") !== cleaned.replace(/\s/g, "")) {
      return null;
    }

    let position = 0;

    function expression() {
      let value = term();

      while (tokens[position] === "+" ||
             tokens[position] === "-") {
        const operator = tokens[position++];
        const right = term();
        value = operator === "+" ? value + right : value - right;
      }

      return value;
    }

    function term() {
      let value = factor();

      while (["*", "/", "%"].includes(tokens[position])) {
        const operator = tokens[position++];
        const right = factor();

        if ((operator === "/" || operator === "%") && right === 0) {
          throw new Error("Cannot divide by zero.");
        }

        if (operator === "*") value *= right;
        if (operator === "/") value /= right;
        if (operator === "%") value %= right;
      }

      return value;
    }

    function factor() {
      const token = tokens[position++];

      if (token === "-") return -factor();
      if (token === "+") return factor();

      if (token === "(") {
        const value = expression();

        if (tokens[position++] !== ")") {
          throw new Error("Please check your parentheses.");
        }

        return value;
      }

      const value = Number(token);

      if (!Number.isFinite(value)) {
        throw new Error("Please enter a valid math question.");
      }

      return value;
    }

    try {
      const answer = expression();

      if (position !== tokens.length || !Number.isFinite(answer)) {
        return null;
      }

      return "Let's solve it step by step.\n\n" +
        "Question: " + question + "\n\n" +
        "Answer: " + Number(answer.toFixed(8)) +
        "\n\nCheck each operation carefully to understand how we got the answer.";
    } catch (error) {
      if (error.message === "Cannot divide by zero.") {
        return "Division by zero is undefined. Please check the question.";
      }

      return null;
    }
  }

  // Built-in teaching responses for common school questions.
  function getTeachingAnswer(question) {
    const q = question.toLowerCase().trim();
    const subject = selectedSubject.toLowerCase();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q)) {
      return "Hello! Welcome to Kaakyire Learning AI.\n\n" +
        "I can help you learn Mathematics, Science, English, History, " +
        "Social Studies, Geography, and other school subjects.\n\n" +
        "What would you like to learn today?";
    }

    if (/who are you|what is kaakyire|what can you do/.test(q)) {
      return "I am Kaakyire Learning AI, your learning assistant.\n\n" +
        "I help students understand school subjects, practise skills, " +
        "and work through homework step by step.\n\n" +
        "Choose a subject and enter your question to begin.";
    }

    if (/^(thank you|thanks)\b/.test(q)) {
      return "You're welcome! Keep asking questions and practising. " +
        "Learning takes time, and every question is an opportunity to grow.";
    }

    if (/continent/.test(q)) {
      return "There are seven commonly recognized continents:\n\n" +
        "1. Africa\n2. Antarctica\n3. Asia\n4. Europe\n" +
        "5. North America\n6. South America\n7. Australia\n\n" +
        "A continent is one of Earth's large land areas.";
    }

    if (/capital of (ghana|ghana's)/.test(q)) {
      return "The capital of Ghana is Accra. Accra is an important " +
        "centre for government, business, education, and culture.";
    }

    if (/capital of (the )?united states|capital of america/.test(q)) {
      return "The capital of the United States is Washington, D.C. " +
        "It is where the White House, the U.S. Capitol, and many " +
        "federal government offices are located.";
    }

    if (/photosynthesis/.test(q)) {
      return "Photosynthesis is the process plants use to make food.\n\n" +
        "1. Roots absorb water from the soil.\n" +
        "2. Leaves take in carbon dioxide from the air.\n" +
        "3. Chlorophyll captures energy from sunlight.\n" +
        "4. The plant uses these materials to make glucose and releases oxygen.\n\n" +
        "Remember: sunlight, water, and carbon dioxide are essential " +
        "for photosynthesis.";
    }

    if (/water cycle/.test(q)) {
      return "The water cycle is the continuous movement of water " +
        "between Earth's surface and the atmosphere.\n\n" +
        "1. Evaporation: the Sun heats water and turns it into vapour.\n" +
        "2. Condensation: vapour cools and forms clouds.\n" +
        "3. Precipitation: water falls as rain, snow, sleet, or hail.\n" +
        "4. Collection: water gathers in rivers, lakes, oceans, and the ground.";
    }

    if (/gravity/.test(q)) {
      return "Gravity is a force of attraction between objects with mass.\n\n" +
        "Earth's gravity pulls objects toward its centre. This is why " +
        "a ball falls back to the ground when you throw it upward.";
    }

    if (/states of matter|solid liquid gas/.test(q)) {
      return "The three common states of matter are:\n\n" +
        "1. Solid: has a definite shape and volume, like ice.\n" +
        "2. Liquid: has a definite volume but takes the shape of its container, like water.\n" +
        "3. Gas: spreads out to fill its container, like water vapour.\n\n" +
        "Heating or cooling can change matter from one state to another.";
    }

    if (/human body|organs of the body/.test(q)) {
      return "The human body has many organs that work together.\n\n" +
        "The heart pumps blood, the lungs help us breathe, the brain " +
        "controls many activities, the stomach helps digest food, and " +
        "the kidneys filter waste from the blood.";
    }

    if (/planet|solar system/.test(q)) {
      return "Our solar system has eight recognized planets:\n\n" +
        "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.\n\n" +
        "They orbit the Sun. Earth is the planet where we live.";
    }

    if (/democracy/.test(q)) {
      return "Democracy is a system of government in which people have " +
        "a role in making decisions, often by voting for representatives. " +
        "Free elections, participation, and the rule of law are important " +
        "principles of a democratic system.";
    }

    if (/ghana|independence day/.test(q) && /history|independence|1957/.test(q)) {
      return "Ghana gained independence from British colonial rule on " +
        "March 6, 1957. Kwame Nkrumah became the country's first prime minister " +
        "after independence and later its first president.";
    }

    if (/noun/.test(q)) {
      return "A noun is a word that names a person, place, thing, or idea.\n\n" +
        "Examples:\n" +
        "- Person: teacher\n- Place: school\n- Thing: book\n- Idea: courage\n\n" +
        "Example sentence: The student reads a book. " +
        "Here, 'student' and 'book' are nouns.";
    }

    if (/verb/.test(q)) {
      return "A verb expresses an action or a state of being.\n\n" +
        "Examples: run, write, think, is, are.\n\n" +
        "In the sentence 'The girl reads a book,' the word 'reads' is the verb.";
    }

    if (/adjective/.test(q)) {
      return "An adjective describes a noun or pronoun.\n\n" +
        "Examples: a tall building, a blue sky, a kind teacher.\n\n" +
        "In 'The red ball bounced,' the word 'red' is an adjective.";
    }

    if (/adverb/.test(q)) {
      return "An adverb often describes a verb, adjective, or another adverb.\n\n" +
        "Examples: She ran quickly. He spoke softly. The test was very difficult.\n\n" +
        "'Quickly,' 'softly,' and 'very' are adverbs in these examples.";
    }

    if (/punctuation|comma|apostrophe/.test(q)) {
      return "Punctuation helps make writing clear.\n\n" +
        "- Period (.): ends a statement.\n" +
        "- Question mark (?): ends a direct question.\n" +
        "- Comma (,): separates items or parts of a sentence.\n" +
        "- Apostrophe ('): can show possession or missing letters.\n\n" +
        "Example: Ama's book is on the table.";
    }

    if (/mean|meaning|define|definition|what is|what are|explain/.test(q)) {
      if (subject.includes("geography")) {
        return "Geography is the study of Earth's places, environments, " +
          "landforms, people, and how they interact. It includes physical " +
          "geography, such as mountains and rivers, and human geography, " +
          "such as cities and population.";
      }

      if (subject.includes("history")) {
        return "History is the study of past events and people. " +
          "Historians use evidence such as documents, photographs, " +
          "artefacts, and oral accounts to understand the past.";
      }

      if (subject.includes("social")) {
        return "Social Studies explores people, communities, history, " +
          "geography, government, economics, and citizenship. It helps us " +
          "understand how societies work and how people interact.";
      }

      if (subject.includes("science") ||
          ["biology", "chemistry", "physics"].some(s => subject.includes(s))) {
        return "Science is the systematic study of the natural world. " +
          "Scientists ask questions, make observations, test ideas, " +
          "collect evidence, and use that evidence to develop explanations.\n\n" +
          "Please include the specific science topic so I can help you more.";
      }

      if (subject.includes("history")) {
        return "History helps us understand past people, events, " +
          "and changes over time. Please tell me the particular event " +
          "or person you are studying.";
      }
    }

    if (/^(\d+)\s*([+\-*/])\s*(\d+)\s*[?=]?$/.test(q) ||
        /^(what is|calculate|solve)\s+[\d\s()+\-*/%.]+[?=]?$/.test(q)) {
      const result = solveArithmetic(q);
      if (result) return result;
    }

    // Helpful subject introductions when a specific answer is not available.
    if (subject.includes("geography")) {
      return "Let's study Geography!\n\n" +
        "Geography covers continents, countries, capitals, maps, " +
        "climate, landforms, rivers, oceans, and population.\n\n" +
        "Please ask a specific question, such as 'What is the water cycle?' " +
        "or 'What is the capital of Ghana?'";
    }

    if (subject.includes("history")) {
      return "Let's explore History!\n\n" +
        "History covers past events, civilizations, leaders, independence, " +
        "and important changes in society.\n\n" +
        "Tell me the person, country, or historical event you are studying.";
    }

    if (subject.includes("science")) {
      return "Let's learn Science!\n\n" +
        "Science includes biology (living things), chemistry (materials " +
        "and how they change), and physics (forces, energy, and motion).\n\n" +
        "Please enter a specific science question so we can work through it.";
    }

    if (subject.includes("english") ||
        subject.includes("grammar") ||
        subject.includes("writing")) {
      return "Let's work on English!\n\n" +
        "I can help with grammar, nouns, verbs, punctuation, spelling, " +
        "reading comprehension, vocabulary, paragraphs, and essay structure.\n\n" +
        "Enter the word, sentence, passage, or assignment you need help with.";
    }

    if (subject.includes("social")) {
      return "Let's learn Social Studies!\n\n" +
        "We can explore communities, citizenship, government, culture, " +
        "history, geography, and economics.\n\n" +
        "Please ask a specific question about your lesson.";
    }

    if (subject.includes("math")) {
      return "Let's work on Mathematics!\n\n" +
        "I can calculate many arithmetic expressions and explain " +
        "basic operations. You can also ask about fractions, decimals, " +
        "percentages, algebra, geometry, and word problems.\n\n" +
        "For a word problem, type the full question.";
    }

    return "Thank you for asking Kaakyire Learning AI!\n\n" +
      "I don't have a reliable built-in answer for that particular question yet.\n\n" +
      "Try asking about a specific topic in Mathematics, Science, English, " +
      "History, Social Studies, or Geography. For a wide range of new " +
      "questions, we will need to connect an AI service.";
  }

  // Main question handler.
  function askKaakyire() {
    if (!questionInput) {
      showAnswer(
        "The question box could not be found.\n\n" +
        "Please check that index.html contains a question input or textarea."
      );
      return;
    }

    const question = questionInput.value.trim();

    if (!question) {
      showAnswer("Please type your school question first.");
      questionInput.focus();
      return;
    }

    showAnswer("Kaakyire is thinking...");

    window.setTimeout(function () {
      const answer = getTeachingAnswer(question);

      showAnswer(
        "KAAKYIRE LEARNING AI\n" +
        "Subject: " + selectedSubject + "\n" +
        "Difficulty: " + selectedDifficulty + "\n\n" +
        answer
      );
    }, 150);
  }

  if (askButton) {
    askButton.addEventListener("click", askKaakyire);
  }

  // Allow students to press Enter to ask.
  if (questionInput) {
    questionInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey &&
          questionInput.tagName !== "TEXTAREA") {
        event.preventDefault();
        askKaakyire();
      }
    });
  }

  // Support a form submission if the page uses a form.
  const questionForm = questionInput?.closest("form");

  if (questionForm) {
    questionForm.addEventListener("submit", function (event) {
      event.preventDefault();
      askKaakyire();
    });
  }

  // Show a useful message if the page's controls are not connected.
  if (!questionInput) {
    console.error(
      "Kaakyire Learning AI: No question input was found. " +
      "Check the input or textarea in index.html."
    );
  }

  if (!askButton && !questionForm) {
    console.error(
      "Kaakyire Learning AI: No Ask button or question form was found. " +
      "Check the button in index.html."
    );
  }

  console.log("Kaakyire Learning AI script loaded successfully.");
});
