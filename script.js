"use strict";
// ==========================================
// KAAKYIRE LEARNING AI
// Educational assistant for six school subjects
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  const askButton = document.getElementById("askButton");
  const questionInput = document.getElementById("questionInput");
  const answerArea =
    document.getElementById("answerArea") ||
    document.getElementById("response");

  const subjectSelect = document.getElementById("subjectSelect");
  const difficultySelect = document.getElementById("difficultySelect");

  // Find the elements used by your webpage.
  // These alternative IDs help accommodate different HTML versions.
  const input =
    questionInput ||
    document.getElementById("question") ||
    document.getElementById("userQuestion");

  const output = answerArea;

  const button =
    askButton ||
    document.getElementById("askButton") ||
    document.getElementById("askKaakyire") ||
    document.querySelector('button[type="submit"]');

  if (!input || !output || !button) {
    console.error(
      "Kaakyire: Check your HTML IDs for the question input, answer area, and Ask button."
    );
    return;
  }

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Social Studies"
  ];

  function normalize(text) {
    return text.toLowerCase().trim().replace(/\s+/g, " ");
  }

  function showAnswer(message) {
    // textContent prevents a student's question from being
    // interpreted as HTML.
    output.textContent = message;
  }

  function getSubject() {
    if (!subjectSelect) return "general";

    const value = normalize(subjectSelect.value);

    const mapping = {
      math: "mathematics",
      maths: "mathematics",
      mathematics: "mathematics",
      english: "english",
      science: "science",
      history: "history",
      geography: "geography",
      "social studies": "social studies",
      socialstudies: "social studies"
    };

    return mapping[value] || value || "general";
  }

  function getDifficulty() {
    return difficultySelect
      ? difficultySelect.value
      : "Easy";
  }

  function explainMath(question) {
    const q = question.replace(/,/g, "");

    // Arithmetic: 12 x 8, 12 * 8, 12 plus 8, etc.
    const arithmetic =
      q.match(/(-?\d+(?:\.\d+)?)\s*(\+|plus|add|minus|subtract|−|×|x|\*|multiply|times|÷|\/|divided by)\s*(-?\d+(?:\.\d+)?)/i);

    if (arithmetic) {
      const a = Number(arithmetic[1]);
      const operator = arithmetic[2].toLowerCase();
      const b = Number(arithmetic[3]);

      let answer;
      let explanation;

      if (operator === "+" || operator === "plus" || operator === "add") {
        answer = a + b;
        explanation = "Addition means combining two numbers.";
      } else if (
        operator === "-" ||
        operator === "−" ||
        operator === "minus" ||
        operator === "subtract"
      ) {
        answer = a - b;
        explanation = "Subtraction means finding the difference.";
      } else if (
        ["x", "×", "*", "multiply", "times"].includes(operator)
      ) {
        answer = a * b;
        explanation =
          "Multiplication is repeated addition. " +
          a + " groups of " + b + " gives the same product.";
      } else {
        if (b === 0) {
          return "We cannot divide by zero. Please try another question.";
        }
        answer = a / b;
        explanation = "Division splits a number into equal groups.";
      }

      return (
        "Mathematics\n\n" +
        "Question: " + question + "\n\n" +
        "Step 1: Identify the operation.\n" +
        "Step 2: " + explanation + "\n" +
        "Step 3: Calculate the result.\n\n" +
        "Answer: " + answer
      );
    }

    const square = q.match(/square root of\s+(\d+(?:\.\d+)?)/i);
    if (square) {
      const n = Number(square[1]);
      return (
        "Mathematics\n\n" +
        "The square root of " + n + " is " +
        Math.sqrt(n) + ".\n\n" +
        "A square root is a number that, when multiplied by itself, gives the original number."
      );
    }

    return (
      "Mathematics\n\n" +
      "Let's solve your problem step by step.\n\n" +
      "Please enter a clear problem, such as:\n" +
      "• 12 × 8\n" +
      "• 45 + 27\n" +
      "• 100 ÷ 4\n" +
      "• What is the square root of 81?\n\n" +
      "For word problems, include the full question."
    );
  }

  function explainEnglish(question) {
    const q = normalize(question);

    if (/\b(noun|what is a noun)\b/.test(q)) {
      return (
        "English: Nouns\n\n" +
        "A noun is a word that names a person, place, animal, or thing.\n\n" +
        "Examples: teacher, school, dog, book.\n\n" +
        "Sentence: The teacher reads a book.\n" +
        "Teacher and book are nouns."
      );
    }

    if (/\bverb\b/.test(q)) {
      return (
        "English: Verbs\n\n" +
        "A verb expresses an action or a state of being.\n\n" +
        "Examples: run, write, sing, is.\n\n" +
        "Sentence: Ama sings beautifully.\n" +
        "The word 'sings' is the verb."
      );
    }

    if (/\badjective\b/.test(q)) {
      return (
        "English: Adjectives\n\n" +
        "An adjective describes a noun.\n\n" +
        "Examples: tall, beautiful, small, happy.\n\n" +
        "Sentence: The small cat sleeps.\n" +
        "'Small' describes the cat."
      );
    }

    if (/\b(verb tense|past tense|present tense|future tense)\b/.test(q)) {
      return (
        "English: Verb Tenses\n\n" +
        "Present: I walk to school.\n" +
        "Past: I walked to school.\n" +
        "Future: I will walk to school.\n\n" +
        "Verb tenses tell us when an action happens."
      );
    }

    if (/\bpronoun\b/.test(q)) {
      return (
        "English: Pronouns\n\n" +
        "A pronoun replaces a noun.\n\n" +
        "Examples: I, you, he, she, it, we, they.\n\n" +
        "Instead of 'Ama is reading,' we can say 'She is reading.'"
      );
    }

    return (
      "English\n\n" +
      "I can help with grammar, vocabulary, reading, spelling, " +
      "sentence writing, and punctuation.\n\n" +
      "Try asking:\n" +
      "• What is a noun?\n" +
      "• What is a verb?\n" +
      "• What is an adjective?\n" +
      "• Explain past tense.\n" +
      "• Help me write a paragraph.\n\n" +
      "For writing assignments, paste the instructions so we can work through them together."
    );
  }

  function explainScience(question) {
    const q = normalize(question);

    if (/\b(photosynthesis|plants make food)\b/.test(q)) {
      return (
        "Science: Photosynthesis\n\n" +
        "Photosynthesis is the process by which green plants make food.\n\n" +
        "Step 1: Plants absorb sunlight.\n" +
        "Step 2: Their leaves take in carbon dioxide.\n" +
        "Step 3: Roots absorb water.\n" +
        "Step 4: The plant uses these ingredients to make sugar and releases oxygen.\n\n" +
        "Remember: Sunlight, water, and carbon dioxide are important for photosynthesis."
      );
    }

    if (/\b(water cycle|evaporation|condensation|precipitation)\b/.test(q)) {
      return (
        "Science: The Water Cycle\n\n" +
        "1. Evaporation: The Sun heats water, turning it into water vapor.\n" +
        "2. Condensation: Water vapor cools and forms clouds.\n" +
        "3. Precipitation: Water falls as rain, snow, sleet, or hail.\n" +
        "4. Collection: Water gathers in rivers, lakes, and oceans.\n\n" +
        "The cycle repeats."
      );
    }

    if (/\b(planet|solar system|planets)\b/.test(q)) {
      return (
        "Science: The Solar System\n\n" +
        "The solar system includes the Sun and the objects that orbit it.\n\n" +
        "The eight planets in order from the Sun are:\n" +
        "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.\n\n" +
        "Earth is the planet where we live."
      );
    }

    if (/\b(force|gravity)\b/.test(q)) {
      return (
        "Science: Force and Gravity\n\n" +
        "A force is a push or a pull.\n\n" +
        "Gravity is a force that attracts objects toward one another.\n" +
        "Earth's gravity pulls objects toward the ground.\n\n" +
        "Example: When you drop a ball, gravity pulls it down."
      );
    }

    if (/\b(states of matter|solid|liquid|gas)\b/.test(q)) {
      return (
        "Science: States of Matter\n\n" +
        "Solid: Has a definite shape, such as ice.\n" +
        "Liquid: Flows and takes the shape of its container, such as water.\n" +
        "Gas: Spreads out to fill available space, such as water vapor.\n\n" +
        "Heating and cooling can change matter from one state to another."
      );
    }

    return (
      "Science\n\n" +
      "Science helps us understand living things, matter, energy, " +
      "Earth, space, and the natural world.\n\n" +
      "Try asking:\n" +
      "• What is photosynthesis?\n" +
      "• Explain the water cycle.\n" +
      "• How many planets are in the solar system?\n" +
      "• What is gravity?\n" +
      "• What are the three common states of matter?\n\n" +
      "Enter the full question for more targeted help."
    );
  }

  function explainHistory(question) {
    const q = normalize(question);

    if (/\b(ancient egypt|egyptian pyramids|pyramids)\b/.test(q)) {
      return (
        "History: Ancient Egypt\n\n" +
        "Ancient Egypt was a civilization that developed along the Nile River in northeastern Africa.\n\n" +
        "The Nile provided water and fertile soil for farming.\n" +
        "Egypt is famous for its pyramids, pharaohs, and hieroglyphic writing.\n\n" +
        "Why is the Nile important? It supported farming, transport, and settlement."
      );
    }

    if (/\b(slave trade|transatlantic slave trade|slavery)\b/.test(q)) {
      return (
        "History: Slavery and the Transatlantic Slave Trade\n\n" +
        "The transatlantic slave trade forcibly transported millions of African people across the Atlantic Ocean, mainly to the Americas, from the 16th through the 19th centuries.\n\n" +
        "Enslaved people were deprived of their freedom and forced to work. Their resistance, cultures, and contributions shaped history.\n\n" +
        "When studying this topic, examine its causes, human impact, resistance, abolition, and lasting consequences."
      );
    }

    if (/\b(ghana independence|independence of ghana|kwame nkrumah)\b/.test(q)) {
      return (
        "History: Ghana's Independence\n\n" +
        "Ghana became independent from British colonial rule on 6 March 1957.\n\n" +
        "Kwame Nkrumah was a leading figure in the independence movement and became Ghana's first prime minister and later its first president.\n\n" +
        "Ghana was the first country in sub-Saharan Africa to gain independence from colonial rule in the postwar era."
      );
    }

    if (/\b(world war ii|second world war)\b/.test(q)) {
      return (
        "History: World War II\n\n" +
        "World War II lasted from 1939 to 1945.\n\n" +
        "It involved many countries and caused enormous destruction and loss of life.\n" +
        "The Holocaust was the systematic persecution and murder of six million Jewish people by Nazi Germany and its collaborators, alongside the persecution and murder of other targeted groups.\n\n" +
        "The war ended in 1945."
      );
    }

    if (/\b(american revolution|us independence|declaration of independence)\b/.test(q)) {
      return (
        "History: American Independence\n\n" +
        "The Declaration of Independence was adopted on 4 July 1776.\n\n" +
        "It announced that the thirteen American colonies considered themselves independent of Great Britain.\n\n" +
        "The American Revolutionary War continued until 1783."
      );
    }

    return (
      "History\n\n" +
      "History helps us understand past people, events, civilizations, " +
      "and how societies have changed.\n\n" +
      "Try asking:\n" +
      "• What was ancient Egypt?\n" +
      "• When did Ghana gain independence?\n" +
      "• What was the transatlantic slave trade?\n" +
      "• What caused World War II?\n" +
      "• What was the American Revolution?\n\n" +
      "For other topics, enter the full question. A connected AI service will be needed for broad, detailed answers."
    );
  }

  function explainGeography(question) {
    const q = normalize(question);

    if (/\b(continents|how many continents)\b/.test(q)) {
      return (
        "Geography: Continents\n\n" +
        "A common model recognizes seven continents:\n" +
        "Africa, Antarctica, Asia, Europe, North America, South America, and Australia.\n\n" +
        "A continent is one of Earth's major landmasses."
      );
    }

    if (/\b(ghana|capital of ghana|accra)\b/.test(q)) {
      return (
        "Geography: Ghana\n\n" +
        "Ghana is a country in West Africa.\n" +
        "Its capital city is Accra.\n" +
        "Ghana borders Côte d'Ivoire, Burkina Faso, and Togo, and has a coastline along the Gulf of Guinea."
      );
    }

    if (/\b(weather|climate)\b/.test(q)) {
      return (
        "Geography: Weather and Climate\n\n" +
        "Weather describes atmospheric conditions over a short period, such as today's rain or temperature.\n\n" +
        "Climate describes typical weather patterns in a place over a long period, usually 30 years or more.\n\n" +
        "Remember: Weather is short-term; climate is long-term."
      );
    }

    if (/\b(equator|latitude|longitude)\b/.test(q)) {
      return (
        "Geography: Finding Places on Earth\n\n" +
        "The equator is an imaginary line around the middle of Earth.\n\n" +
        "Latitude measures positions north or south of the equator.\n" +
        "Longitude measures positions east or west of the prime meridian.\n\n" +
        "Together, latitude and longitude help identify locations."
      );
    }

    if (/\b(erosion|river|mountain|landform)\b/.test(q)) {
      return (
        "Geography: Landforms and Erosion\n\n" +
        "Landforms are natural features of Earth's surface, such as mountains, valleys, and plains.\n\n" +
        "Erosion is the movement of soil or rock by water, wind, ice, or gravity.\n\n" +
        "Example: A river can slowly wear away its banks."
      );
    }

    return (
      "Geography\n\n" +
      "Geography studies Earth's places, people, environments, " +
      "landforms, and natural resources.\n\n" +
      "Try asking:\n" +
      "• How many continents are there?\n" +
      "• What is the capital of Ghana?\n" +
      "• What is the difference between weather and climate?\n" +
      "• What are latitude and longitude?\n" +
      "• What is erosion?\n\n" +
      "Include the full question for more specific help."
    );
  }

  function explainSocialStudies(question) {
    const q = normalize(question);

    if (/\b(democracy|government)\b/.test(q)) {
      return (
        "Social Studies: Democracy and Government\n\n" +
        "Government is the system a country uses to make and enforce laws and provide public services.\n\n" +
        "In a democracy, people have a role in choosing leaders, often through elections.\n\n" +
        "Example: Eligible citizens vote to help choose their representatives."
      );
    }

    if (/\b(community|citizen|citizenship)\b/.test(q)) {
      return (
        "Social Studies: Community and Citizenship\n\n" +
        "A community is a group of people who live in the same area or share something in common.\n\n" +
        "Good citizenship includes respecting others, following fair laws, helping the community, and taking responsibility.\n\n" +
        "Example: Keeping a shared park clean helps the community."
      );
    }

    if (/\b(culture|tradition|customs)\b/.test(q)) {
      return (
        "Social Studies: Culture and Traditions\n\n" +
        "Culture includes the beliefs, languages, foods, arts, customs, and traditions shared by a group of people.\n\n" +
        "Cultures can differ, and people within the same culture may have different experiences.\n\n" +
        "Respecting cultural differences helps people live and learn together."
      );
    }

    if (/\b(natural resources|resources|conservation)\b/.test(q)) {
      return (
        "Social Studies: Natural Resources\n\n" +
        "Natural resources come from the environment.\n\n" +
        "Examples include water, soil, forests, minerals, sunlight, and wind.\n\n" +
        "Conservation means using resources carefully so they remain available in the future."
      );
    }

    if (/\b(economy|goods and services|trade)\b/.test(q)) {
      return (
        "Social Studies: Economics\n\n" +
        "Goods are things people buy or use, such as books and food.\n" +
        "Services are activities people do for others, such as teaching or medical care.\n\n" +
        "Trade is the exchange of goods or services."
      );
    }

    return (
      "Social Studies\n\n" +
      "Social Studies helps us understand people, communities, " +
      "government, culture, history, geography, and the economy.\n\n" +
      "Try asking:\n" +
      "• What is democracy?\n" +
      "• What is a community?\n" +
      "• What is culture?\n" +
      "• What are natural resources?\n" +
      "• What is the difference between goods and services?\n\n" +
      "Enter the full question for a more focused explanation."
    );
  }

  function getLearningAnswer(question, subject, difficulty) {
    const q = normalize(question);

    if (!q) {
      return "Please type a question first. Kaakyire is ready to help you learn!";
    }

    let answer;

    // Recognize simple arithmetic even if no subject was selected.
    if (
      subject === "mathematics" ||
      subject === "math" ||
      subject === "general"
    ) {
      const mathAnswer = explainMath(question);

      if (
        subject !== "general" ||
        /-?\d+(?:\.\d+)?\s*(?:\+|plus|add|minus|subtract|−|×|x|\*|multiply|times|÷|\/|divided by)\s*-?\d+(?:\.\d+)?/i.test(question) ||
        /square root of/i.test(question)
      ) {
        answer = mathAnswer;
      }
    }

    if (!answer) {
      switch (subject) {
        case "english":
          answer = explainEnglish(question);
          break;
        case "science":
          answer = explainScience(question);
          break;
        case "history":
          answer = explainHistory(question);
          break;
        case "geography":
          answer = explainGeography(question);
          break;
        case "social studies":
        case "socialstudies":
          answer = explainSocialStudies(question);
          break;
        case "general":
          answer =
            "Welcome to Kaakyire Learning AI!\n\n" +
            "Please select a subject, then ask your question.\n\n" +
            "Subjects: " + subjects.join(", ") + ".";
          break;
        default:
          answer =
            "Please select one of these subjects: " +
            subjects.join(", ") + ".";
      }
    }

    if (difficulty && normalize(difficulty) === "easy") {
      answer +=
        "\n\nLearning tip: Read the explanation slowly and try to explain it in your own words.";
    } else if (difficulty && normalize(difficulty) === "hard") {
      answer +=
        "\n\nChallenge: Think of a real-life example and explain why your answer makes sense.";
    }

    return answer;
  }

  function handleAsk(event) {
    if (event) event.preventDefault();

    const question = input.value.trim();
    const subject = getSubject();
    const difficulty = getDifficulty();

    button.disabled = true;
    const oldLabel = button.textContent;
    button.textContent = "Thinking...";

    try {
      const answer = getLearningAnswer(question, subject, difficulty);
      showAnswer(answer);
    } catch (error) {
      console.error("Kaakyire error:", error);
      showAnswer(
        "Sorry, something went wrong. Please check your question and try again."
      );
    } finally {
      button.disabled = false;
      button.textContent = oldLabel || "Ask Kaakyire";
    }
  }

  button.addEventListener("click", handleAsk);

  // Allow students to submit their question with Enter.
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk(event);
    }
  });

  // Support forms without triggering a page reload.
  const form = button.closest("form");
  if (form) {
    form.addEventListener("submit", handleAsk);
  }

  console.log("Kaakyire Learning AI is ready.");
