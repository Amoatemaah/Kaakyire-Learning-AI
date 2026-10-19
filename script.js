"use strict";
/* =====================================================
   KAAKYIRE LEARNING AI
   K–12 Learning Engine
   Subjects: Mathematics, English, Science, History,
   Geography and Social Studies
   ===================================================== */

const Kaakyire = (() => {
  const elements = {};
  const state = {
    subject: "Mathematics",
    level: "Easy",
    grade: "Grade 6",
    questionCount: 0
  };

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Social Studies"
  ];

  function initialize() {
    elements.form = document.getElementById("question-form");
    elements.input = document.getElementById("question");
    elements.ask = document.getElementById("ask-button");
    elements.answer = document.getElementById("answer");
    elements.status = document.getElementById("status");
    elements.difficulty = document.getElementById("difficulty");
    elements.subjectButtons =
      document.querySelectorAll("[data-subject]");

    if (!elements.form || !elements.input ||
        !elements.ask || !elements.answer) {
      console.error(
        "Kaakyire could not find required HTML elements. " +
        "Check index.html IDs and the script.js link."
      );
      return;
    }

    elements.subjectButtons.forEach(button => {
      button.addEventListener("click", () => {
        const selected = button.dataset.subject;
        if (!subjects.includes(selected)) return;

        state.subject = selected;

        elements.subjectButtons.forEach(item => {
          item.classList.toggle("selected", item === button);
          item.setAttribute(
            "aria-pressed",
            String(item === button)
          );
        });

        setStatus("Subject selected: " + selected);
        elements.input.focus();
      });
    });

    elements.form.addEventListener("submit", handleSubmit);

    setStatus("Kaakyire is ready to help you learn.");
    console.log("Kaakyire Learning AI initialized.");
  }

  function setStatus(message) {
    if (elements.status) {
      elements.status.textContent = message;
    }
  }

  function display(message) {
    elements.answer.textContent = message;
  }

  function normalize(value) {
    return value
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }

  function containsAny(text, terms) {
    return terms.some(term => text.includes(term));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const question = elements.input.value.trim();
    state.level = elements.difficulty
      ? elements.difficulty.value
      : "Easy";

    if (!question) {
      display("Please enter a school question first.");
      elements.input.focus();
      return;
    }

    state.questionCount += 1;
    elements.ask.disabled = true;
    elements.ask.textContent = "Working...";

    try {
      const response = solve(question);

      display(response);
      setStatus(
        "Question " + state.questionCount +
        " processed. Subject: " + state.subject + "."
      );
    } catch (error) {
      console.error("Kaakyire processing error:", error);
      display(
        "Sorry, an unexpected error occurred. " +
        "Please try your question again."
      );
      setStatus("An error occurred.");
    } finally {
      elements.ask.disabled = false;
      elements.ask.textContent = "Ask Kaakyire";
    }
  }

  function solve(question) {
    const text = normalize(question);

    if (/^(hi|hello|hey|good morning|good afternoon)[!. ]*$/.test(text)) {
      return "Hello! Welcome to Kaakyire Learning AI.\n\n" +
        "I can help you practise school topics, understand " +
        "examples and build your confidence.\n\n" +
        "Choose a subject and ask your question.";
    }

    const result = solveMath(text);
    if (result) return result;

    const subjectHandlers = {
      "Mathematics": answerMathConcept,
      "English": answerEnglish,
      "Science": answerScience,
      "History": answerHistory,
      "Geography": answerGeography,
      "Social Studies": answerSocialStudies
    };

    const handler = subjectHandlers[state.subject];

    if (handler) {
      const response = handler(text, question);
      if (response) return response;
    }

    return buildFallback(question);
  }

  /* ---------------- MATHEMATICS ---------------- */

  function solveMath(text) {
    // Safely calculate simple arithmetic; no eval().
    const expression = text
      .replace(/^(what is|calculate|solve|work out)\s+/i, "")
      .replace(/[?=]/g, "")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\btimes\b/g, "*")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .trim();

    const match = expression.match(
      /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/
    );

    if (match) {
      const a = Number(match[1]);
      const operator = match[2];
      const b = Number(match[3]);
      let answer;

      if (operator === "+") answer = a + b;
      if (operator === "-") answer = a - b;
      if (operator === "*") answer = a * b;

      if (operator === "/") {
        if (b === 0) {
          return "MATHEMATICS: DIVISION\n\n" +
            "A number cannot be divided by zero. " +
            "Division by zero is undefined.";
        }
        answer = a / b;
      }

      if (Number.isFinite(answer)) {
        return "MATHEMATICS: STEP-BY-STEP SOLUTION\n\n" +
          "Question: " + a + " " + operator + " " + b + "\n\n" +
          mathSteps(a, operator, b, answer);
      }
    }

    // Percentage problems such as "20% of 50".
    const percent = text.match(
      /(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/
    );

    if (percent) {
      const rate = Number(percent[1]);
      const amount = Number(percent[2]);
      const answer = rate / 100 * amount;

      return "MATHEMATICS: PERCENTAGES\n\n" +
        "Question: " + rate + "% of " + amount + "\n\n" +
        "Step 1: Change the percentage into a decimal.\n" +
        rate + "% = " + rate / 100 + "\n\n" +
        "Step 2: Multiply by the total.\n" +
        (rate / 100) + " × " + amount + " = " + answer + "\n\n" +
        "Answer: " + answer;
    }

    // Times tables, e.g. "12 x 8".
    const multiplication = text.match(
      /(?:what is )?(\d+)\s*(?:x|×|\*|times)\s*(\d+)\??/
    );

    if (multiplication) {
      const a = Number(multiplication[1]);
      const b = Number(multiplication[2]);
      const answer = a * b;

      return "MATHEMATICS: MULTIPLICATION\n\n" +
        a + " × " + b + " = " + answer + "\n\n" +
        "Think of multiplication as repeated addition.\n" +
        "For example, 4 × 3 means 3 + 3 + 3 + 3 = 12.\n\n" +
        "Answer: " + answer;
    }

    if (containsAny(text, ["fraction", "fractions"])) {
      return "MATHEMATICS: FRACTIONS\n\n" +
        "A fraction represents part of a whole.\n\n" +
        "Example: 3/4 means three out of four equal parts.\n\n" +
        "The top number is the numerator. The bottom number " +
        "is the denominator.\n\n" +
        "Practice: What fraction is equal to 1/2? " +
        "One answer is 2/4.";
    }

    if (containsAny(text, ["perimeter", "area of a rectangle"])) {
      return "MATHEMATICS: AREA AND PERIMETER\n\n" +
        "For a rectangle:\n\n" +
        "Area = length × width\n" +
        "Perimeter = 2 × (length + width)\n\n" +
        "Example: length 5 cm and width 3 cm.\n" +
        "Area = 5 × 3 = 15 square centimetres.\n" +
        "Perimeter = 2 × (5 + 3) = 16 cm.";
    }

    if (containsAny(text, ["algebra", "solve for x", "equation"])) {
      return "MATHEMATICS: ALGEBRA\n\n" +
        "Algebra uses letters to represent unknown numbers.\n\n" +
        "Example: x + 3 = 8\n\n" +
        "Step 1: Subtract 3 from both sides.\n" +
        "x + 3 - 3 = 8 - 3\n\n" +
        "Step 2: Simplify.\n" +
        "x = 5\n\n" +
        "Check: 5 + 3 = 8, so the answer is correct.";
    }

    return null;
  }

  function mathSteps(a, operator, b, answer) {
    if (operator === "+") {
      return "Step 1: Start with " + a + ".\n" +
        "Step 2: Add " + b + ".\n" +
        "Step 3: The total is " + answer + ".\n\n" +
        "Answer: " + answer;
    }

    if (operator === "-") {
      return "Step 1: Start with " + a + ".\n" +
        "Step 2: Subtract " + b + ".\n" +
        "Step 3: The result is " + answer + ".\n\n" +
        "Answer: " + answer;
    }

    if (operator === "*") {
      return "Step 1: Multiply " + a + " by " + b + ".\n" +
        "Step 2: The product is " + answer + ".\n\n" +
        "Answer: " + answer;
    }

    return "Step 1: Divide " + a + " by " + b + ".\n" +
      "Step 2: The quotient is " + answer + ".\n\n" +
      "Answer: " + answer;
  }

  function answerMathConcept(text) {
    if (containsAny(text, ["prime number", "prime numbers"])) {
      return "MATHEMATICS: PRIME NUMBERS\n\n" +
        "A prime number is a whole number greater than 1 " +
        "that has exactly two positive factors: 1 and itself.\n\n" +
        "Examples: 2, 3, 5, 7, 11, 13.\n" +
        "The number 9 is not prime because 9 = 3 × 3.";
    }

    return null;
  }

  /* ---------------- ENGLISH ---------------- */

  function answerEnglish(text) {
    if (containsAny(text, ["noun", "nouns"])) {
      return "ENGLISH: NOUNS\n\n" +
        "A noun names a person, place, animal, thing, or idea.\n\n" +
        "Examples: teacher, school, dog, book, happiness.\n\n" +
        "Sentence: The teacher reads a book.\n" +
        "'Teacher' and 'book' are nouns.";
    }

    if (containsAny(text, ["verb", "verbs"])) {
      return "ENGLISH: VERBS\n\n" +
        "A verb expresses an action or a state of being.\n\n" +
        "Examples: run, write, sing, think, is.\n\n" +
        "Sentence: The children play outside.\n" +
        "'Play' is the verb.";
    }

    if (containsAny(text, ["adjective", "adjectives"])) {
      return "ENGLISH: ADJECTIVES\n\n" +
        "An adjective describes a noun or pronoun.\n\n" +
        "Examples: tall, kind, blue, bright.\n\n" +
        "Sentence: The bright student wore a blue shirt.\n" +
        "'Bright' describes the student; 'blue' describes the shirt.";
    }

    if (containsAny(text, ["adverb", "adverbs"])) {
      return "ENGLISH: ADVERBS\n\n" +
        "An adverb can describe a verb, adjective, or another adverb.\n\n" +
        "Example: She ran quickly.\n" +
        "'Quickly' tells us how she ran.";
    }

    if (containsAny(text, ["pronoun", "pronouns"])) {
      return "ENGLISH: PRONOUNS\n\n" +
        "A pronoun can take the place of a noun.\n\n" +
        "Examples: I, you, he, she, it, we, they.\n\n" +
        "Instead of 'Ama is reading', we can say 'She is reading'.";
    }

    if (containsAny(text, ["synonym", "synonyms"])) {
      return "ENGLISH: SYNONYMS\n\n" +
        "Synonyms are words with the same or similar meanings.\n\n" +
        "Examples:\n" +
        "Happy — joyful\n" +
        "Big — large\n" +
        "Begin — start\n" +
        "Small — little";
    }

    if (containsAny(text, ["antonym", "antonyms"])) {
      return "ENGLISH: ANTONYMS\n\n" +
        "Antonyms are words with opposite meanings.\n\n" +
        "Examples:\n" +
        "Hot — cold\n" +
        "Early — late\n" +
        "Happy — sad\n" +
        "Open — closed";
    }

    if (containsAny(text, ["punctuation", "comma", "full stop"])) {
      return "ENGLISH: PUNCTUATION\n\n" +
        "Punctuation helps make writing clear.\n\n" +
        "Full stop (.): ends a statement.\n" +
        "Question mark (?): ends a direct question.\n" +
        "Comma (,): separates items or parts of a sentence.\n" +
        "Example: I bought apples, oranges, and bananas.";
    }

    return null;
  }

  /* ---------------- SCIENCE ---------------- */

  function answerScience(text) {
    if (containsAny(text, ["photosynthesis"])) {
      return "SCIENCE: PHOTOSYNTHESIS\n\n" +
        "Photosynthesis is how green plants use light energy " +
        "to make sugars from water and carbon dioxide.\n\n" +
        "Plants need:\n" +
        "1. Light energy\n" +
        "2. Water\n" +
        "3. Carbon dioxide\n\n" +
        "Plants make sugars and release oxygen during the process.\n\n" +
        "Remember: leaves are important places for photosynthesis.";
    }

    if (containsAny(text, ["water cycle", "evaporation", "condensation"])) {
      return "SCIENCE: THE WATER CYCLE\n\n" +
        "1. Evaporation: liquid water becomes water vapor.\n" +
        "2. Condensation: vapor cools into tiny droplets.\n" +
        "3. Precipitation: water falls as rain, snow, or hail.\n" +
        "4. Collection: water gathers in rivers, lakes, and oceans.\n\n" +
        "The Sun provides energy that drives much of the water cycle.";
    }

    if (containsAny(text, ["gravity"])) {
      return "SCIENCE: GRAVITY\n\n" +
        "Gravity is an attractive force between objects with mass.\n\n" +
        "Earth's gravity pulls objects toward Earth's center.\n\n" +
        "Example: A ball falls to the ground when you let it go.";
    }

    if (containsAny(text, ["solar system", "planets"])) {
      return "SCIENCE: THE SOLAR SYSTEM\n\n" +
        "Our solar system includes the Sun and the objects " +
        "that orbit it.\n\n" +
        "The eight planets, from the Sun outward, are:\n" +
        "Mercury, Venus, Earth, Mars, Jupiter, Saturn, " +
        "Uranus, and Neptune.\n\n" +
        "Earth is the planet where we live.";
    }

    if (containsAny(text, ["states of matter", "solid", "liquid", "gas"])) {
      return "SCIENCE: STATES OF MATTER\n\n" +
        "Three common states of matter are:\n\n" +
        "Solid: keeps a fixed shape, such as ice.\n" +
        "Liquid: flows and takes the shape of its container, " +
        "such as water.\n" +
        "Gas: spreads to fill its container, such as water vapor.\n\n" +
        "Heating or cooling can change a substance's state.";
    }

    if (containsAny(text, ["human body", "heart", "lungs"])) {
      return "SCIENCE: THE HUMAN BODY\n\n" +
        "The human body has many organs that work together.\n\n" +
        "Heart: pumps blood around the body.\n" +
        "Lungs: exchange oxygen and carbon dioxide.\n" +
        "Brain: helps control and coordinate body functions.\n" +
        "Stomach: helps break down food during digestion.";
    }

    return null;
  }

  /* ---------------- HISTORY ---------------- */

  function answerHistory(text) {
    if (containsAny(text, ["history", "historian", "historical sources"])) {
      return "HISTORY: STUDYING THE PAST\n\n" +
        "History is the study of past people, events, and societies.\n\n" +
        "Historians examine evidence such as letters, photographs, " +
        "artifacts, official records, and oral histories.\n\n" +
        "To study an event, ask:\n" +
        "1. What happened?\n" +
        "2. When and where did it happen?\n" +
        "3. Who was involved?\n" +
        "4. What caused it?\n" +
        "5. What changed afterward?";
    }

    if (containsAny(text, ["ancient egypt", "egyptian pyramids"])) {
      return "HISTORY: ANCIENT EGYPT\n\n" +
        "Ancient Egypt was a civilization that developed along " +
        "the Nile River in northeastern Africa.\n\n" +
        "The Nile supported farming and transportation. " +
        "Egyptian society is known for its pyramids, writing " +
        "system, art, and pharaohs.\n\n" +
        "Historians study archaeological evidence to learn " +
        "how ancient Egyptians lived.";
    }

    if (containsAny(text, ["civil rights movement"])) {
      return "HISTORY: THE CIVIL RIGHTS MOVEMENT\n\n" +
        "The modern U.S. Civil Rights Movement sought to end " +
        "racial segregation and discrimination and to secure " +
        "equal rights under the law.\n\n" +
        "Activists used methods including marches, boycotts, " +
        "organizing, and legal challenges.\n\n" +
        "Important historical events should be studied using " +
        "reliable sources and attention to different perspectives.";
    }

    return null;
  }

  /* ---------------- GEOGRAPHY ---------------- */

  function answerGeography(text) {
    if (containsAny(text, ["continent", "continents"])) {
      return "GEOGRAPHY: THE CONTINENTS\n\n" +
        "The seven-continent model lists:\n" +
        "1. Africa\n2. Antarctica\n3. Asia\n4. Europe\n" +
        "5. North America\n6. South America\n7. Australia\n\n" +
        "Different educational traditions sometimes group " +
        "continents differently.";
    }

    if (containsAny(text, ["equator"])) {
      return "GEOGRAPHY: THE EQUATOR\n\n" +
        "The Equator is an imaginary line around Earth at " +
        "0 degrees latitude.\n\n" +
        "It divides Earth into the Northern and Southern Hemispheres.\n" +
        "Places near the Equator generally receive strong sunlight " +
        "throughout the year.";
    }

    if (containsAny(text, ["weather", "climate"])) {
      return "GEOGRAPHY: WEATHER AND CLIMATE\n\n" +
        "Weather describes atmospheric conditions over a short time, " +
        "such as today's temperature or rainfall.\n\n" +
        "Climate describes typical weather patterns in a region " +
        "over many years.\n\n" +
        "Remember: weather changes daily; climate describes " +
        "long-term patterns.";
    }

    if (containsAny(text, ["map", "compass directions"])) {
      return "GEOGRAPHY: MAPS AND DIRECTIONS\n\n" +
        "Maps represent places and features of Earth's surface.\n\n" +
        "The four main compass directions are:\n" +
        "North, South, East, and West.\n\n" +
        "A map key explains symbols, while a scale compares " +
        "map distances with real-world distances.";
    }

    if (containsAny(text, ["river", "mountain", "landform"])) {
      return "GEOGRAPHY: PHYSICAL FEATURES\n\n" +
        "Physical geography studies natural features of Earth.\n\n" +
        "River: flowing water in a channel.\n" +
        "Mountain: a high area of land.\n" +
        "Valley: low land between hills or mountains.\n" +
        "Plain: a broad area of relatively flat land.";
    }

    return null;
  }

  /* ---------------- SOCIAL STUDIES ---------------- */

  function answerSocialStudies(text) {
    if (containsAny(text, ["community"])) {
      return "SOCIAL STUDIES: COMMUNITY\n\n" +
        "A community is a group of people who live in the same " +
        "area or share common interests.\n\n" +
        "Communities often work together to solve problems, " +
        "provide services, and support their members.\n\n" +
        "Examples of community services include libraries, " +
        "schools, hospitals, and fire departments.";
    }

    if (containsAny(text, ["government", "democracy"])) {
      return "SOCIAL STUDIES: GOVERNMENT AND DEMOCRACY\n\n" +
        "Government is the system responsible for making " +
        "decisions and carrying out public responsibilities.\n\n" +
        "In a democracy, citizens have a role in choosing leaders " +
        "or influencing public decisions, often through elections.\n\n" +
        "Government structures and citizens' rights differ by country.";
    }

    if (containsAny(text, ["citizen", "citizenship", "responsibilities"])) {
      return "SOCIAL STUDIES: CITIZENSHIP\n\n" +
        "Citizenship involves membership in a political community " +
        "and the rights and responsibilities connected with it.\n\n" +
        "Examples of civic participation include learning about " +
        "public issues, helping the community, and voting when eligible.\n\n" +
        "Specific rights and duties depend on a country's laws.";
    }

    if (containsAny(text, ["culture", "tradition"])) {
      return "SOCIAL STUDIES: CULTURE\n\n" +
        "Culture includes the shared customs, languages, beliefs, " +
        "arts, food, and traditions of a group of people.\n\n" +
        "Cultures can be different and can change over time.\n" +
        "Learning about cultures helps us understand and respect others.";
    }

    if (containsAny(text, ["natural resources", "resources"])) {
      return "SOCIAL STUDIES: NATURAL RESOURCES\n\n" +
        "Natural resources are materials and features from nature " +
        "that people use.\n\n" +
        "Examples include water, soil, forests, sunlight, and minerals.\n\n" +
        "Responsible use helps protect resources for future generations.";
    }

    return null;
  }

  /* ---------------- GENERAL RESPONSE ---------------- */

  function buildFallback(question) {
    return "KAAKYIRE LEARNING AI\n\n" +
      "Subject: " + state.subject + "\n" +
      "Learning level: " + state.level + "\n\n" +
      "Your question: " + question + "\n\n" +
      "I have received your question, but this local learning " +
      "engine does not yet have a prepared explanation for it.\n\n" +
      "To answer a much wider range of Mathematics, English, " +
      "Science, History, Geography, and Social Studies questions, " +
      "Kaakyire needs a secure connection to a real AI model.\n\n" +
      "This website code alone cannot create that AI connection.";
  }

  return { initialize };
})();

// Start the application after the page has loaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", Kaakyire.initialize);
} else {
  Kaakyire.initialize();
