"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("question-form");
  const subjectInput = document.getElementById("subject");
  const difficultyInput = document.getElementById("difficulty");
  const questionInput = document.getElementById("question");
  const askButton = document.getElementById("ask-button");
  const answerBox = document.getElementById("answer");
  const statusBox = document.getElementById("status");

  if (!form || !subjectInput || !difficultyInput ||
      !questionInput || !askButton || !answerBox || !statusBox) {
    console.error(
      "Kaakyire could not find the required HTML elements. Check index.html."
    );
    return;
  }

  statusBox.textContent = "Kaakyire is ready to help you learn.";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = questionInput.value.trim();
    const subject = subjectInput.value;
    const level = difficultyInput.value;

    if (!question) {
      statusBox.textContent = "Please type a question first.";
      questionInput.focus();
      return;
    }

    askButton.disabled = true;
    askButton.textContent = "Thinking...";
    statusBox.textContent = "Preparing your answer...";
    answerBox.textContent = "";

    try {
      answerBox.textContent = getLearningAnswer(subject, question, level);
      statusBox.textContent = "Answer ready!";
    } catch (error) {
      console.error("Kaakyire error:", error);
      answerBox.textContent =
        "Sorry, something went wrong. Please check the code and try again.";
      statusBox.textContent = "An error occurred.";
    } finally {
      askButton.disabled = false;
      askButton.textContent = "Ask Kaakyire";
    }
  });

  function getLearningAnswer(subject, question, level) {
    const q = question.toLowerCase().trim();
    const clean = q.replace(/[.!?]+$/g, "").trim();

    // GREETINGS AND GENERAL CONVERSATION

    if (/^(hi|hello|hey|hiya)\b/.test(clean)) {
      return "Hello! I am Kaakyire Learning AI. 😊 What would you like to learn today?";
    }

    if (/^good morning\b/.test(clean)) {
      return "Good morning! ☀️ Welcome to Kaakyire Learning AI. What shall we learn today?";
    }

    if (/^good afternoon\b/.test(clean)) {
      return "Good afternoon! Welcome. What can I help you learn today?";
    }

    if (/^good evening\b/.test(clean)) {
      return "Good evening! I'm ready to help you learn. What is your question?";
    }

    if (/^how are you\b/.test(clean) || /^how are you doing\b/.test(clean)) {
      return "I'm doing great and ready to help you learn! How are you doing today?";
    }

    if (/^(who are you|what is kaakyire|what is kaakyire learning ai)$/.test(clean)) {
      return "I am Kaakyire Learning AI, your personal learning assistant. I can help with Mathematics, English, Science, History, Geography, and Social Studies.";
    }

    if (/^(what can you do|what can you help me with)$/.test(clean)) {
      return "I can help explain school subjects, practise maths, understand new words, explore history and geography, and prepare for tests. Ask me a question to get started!";
    }

    if (/^(thank you|thanks|thank you so much|many thanks)$/.test(clean)) {
      return "You're very welcome! 😊 Keep learning and asking questions. What would you like to explore next?";
    }

    if (/^(bye|goodbye|see you|see you later)$/.test(clean)) {
      return "Goodbye! Have a wonderful day, and keep learning. Come back whenever you need help!";
    }

    if (/^(can you help me|help me|i need help)$/.test(clean)) {
      return "Of course! Tell me what you need help with. I'll do my best to explain it clearly, step by step.";
    }

    if (/^(i am sad|i'm sad|i feel sad|i am worried|i'm worried)$/.test(clean)) {
      return "I'm sorry you're feeling this way. It can help to talk to someone you trust. If you'd like, you can tell me more, and I'll try to help.";
    }

    if (/^(tell me a joke|make me laugh)$/.test(clean)) {
      return "Why did the student eat their homework? Because the teacher said it was a piece of cake! 😄";
    }

    if (/^(good job|you are great|you are helpful)$/.test(clean)) {
      return "Thank you! 😊 I'm glad to help you learn. What shall we explore next?";
    }

    if (/^(i am fine|i'm fine|i am good|i'm good|i am doing well)$/.test(clean)) {
      return "I'm glad to hear that! What would you like to learn or talk about today?";
    }

    // MATHEMATICS

    if (subject === "Mathematics") {
      const mathAnswer = solveMath(q);
      if (mathAnswer !== null) {
        return mathAnswer + studyTip(level);
      }

      if (q.includes("fraction")) {
        return "A fraction represents part of a whole. The numerator is the top number and the denominator is the bottom number. For example, 3/4 means three of four equal parts." + studyTip(level);
      }

      if (q.includes("perimeter")) {
        return "Perimeter is the total distance around a shape. Add the lengths of all its sides. For a rectangle, perimeter = 2 × (length + width)." + studyTip(level);
      }

      if (q.includes("area")) {
        return "Area measures the space inside a flat shape. Rectangle area = length × width. For example, a rectangle 5 cm long and 3 cm wide has an area of 15 square centimetres." + studyTip(level);
      }

      if (q.includes("mean") || q.includes("average")) {
        return "To calculate the mean, add all the numbers and divide by how many numbers there are. Example: the mean of 2, 4, and 6 is (2 + 4 + 6) ÷ 3 = 4." + studyTip(level);
      }

      if (q.includes("percent") || q.includes("%")) {
        return "A percentage means 'out of 100.' To find a percentage of a number, change the percentage to a decimal and multiply. For example, 20% of 50 = 0.20 × 50 = 10." + studyTip(level);
      }
    }

    // ENGLISH

    if (subject === "English") {
      if (q.includes("noun")) {
        return "A noun names a person, place, thing, or idea. Examples include teacher, school, book, and kindness. In 'The student reads a book,' student and book are nouns." + studyTip(level);
      }

      if (q.includes("verb")) {
        return "A verb expresses an action or a state of being. Examples include run, write, think, is, and are. In 'The child runs,' runs is the verb." + studyTip(level);
      }

      if (q.includes("adjective")) {
        return "An adjective describes a noun or pronoun. In 'The tall tree is green,' tall and green describe the tree." + studyTip(level);
      }

      if (q.includes("adverb")) {
        return "An adverb often describes a verb, adjective, or another adverb. In 'She reads carefully,' carefully tells us how she reads." + studyTip(level);
      }

      if (q.includes("pronoun")) {
        return "A pronoun replaces a noun. Examples include I, you, he, she, it, we, and they. Instead of saying 'Ama is reading,' you can say 'She is reading.'" + studyTip(level);
      }

      if (q.includes("synonym")) {
        return "A synonym is a word with the same or a similar meaning as another word. For example, happy and joyful are synonyms." + studyTip(level);
      }

      if (q.includes("antonym")) {
        return "An antonym is a word with the opposite meaning of another word. For example, hot and cold are antonyms." + studyTip(level);
      }

      if (q.includes("simile")) {
        return "A simile compares two things using 'like' or 'as.' For example, 'She is as brave as a lion.' This helps readers imagine how brave she is." + studyTip(level);
      }

      if (q.includes("metaphor")) {
        return "A metaphor describes one thing as another to make a comparison. 'Time is a thief' suggests that time takes moments away from us." + studyTip(level);
      }

      if (q.includes("punctuation") || q.includes("comma")) {
        return "Punctuation helps readers understand writing. A full stop ends a statement, a question mark ends a question, and a comma separates items or parts of a sentence." + studyTip(level);
      }

      if (q.includes("essay") || q.includes("paragraph")) {
        return "A paragraph usually develops one main idea. Start with a topic sentence, add supporting details and examples, and finish with a sentence that concludes or connects the idea." + studyTip(level);
      }
    }

    // SCIENCE

    if (subject === "Science") {
      if (q.includes("photosynthesis")) {
        return "Photosynthesis is how plants make food using light energy. Plants use water and carbon dioxide to produce sugar and release oxygen. Chlorophyll in leaves helps capture light energy." + studyTip(level);
      }

      if (q.includes("gravity")) {
        return "Gravity is the force of attraction between objects that have mass. Earth's gravity pulls objects toward its centre, which is why a dropped ball falls to the ground." + studyTip(level);
      }

      if (q.includes("water cycle")) {
        return "The water cycle moves water around Earth. Water evaporates, water vapour condenses into clouds, and precipitation such as rain or snow returns water to the surface." + studyTip(level);
      }

      if (q.includes("solar system") || q.includes("planets")) {
        return "Our solar system includes the Sun, eight planets, their moons, and many smaller objects. From the Sun, the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune." + studyTip(level);
      }

      if (q.includes("cell") || q.includes("cells")) {
        return "A cell is the basic unit of life. Many living things are made of one cell, while plants and animals are made of many cells. Plant cells usually have a cell wall; animal cells do not." + studyTip(level);
      }

      if (q.includes("matter")) {
        return "Matter is anything that has mass and takes up space. The three common states are solid, liquid, and gas. Solids keep their shape, liquids flow, and gases spread to fill their container." + studyTip(level);
      }

      if (q.includes("force") || q.includes("motion")) {
        return "A force is a push or pull that can change an object's motion or shape. Motion is a change in position over time. Friction is a force that resists sliding between surfaces." + studyTip(level);
      }

      if (q.includes("ecosystem") || q.includes("food chain")) {
        return "An ecosystem includes living organisms and their nonliving environment. A food chain shows how energy moves between organisms. For example, grass may be eaten by a grasshopper, which may be eaten by a frog." + studyTip(level);
      }
    }

    // HISTORY

    if (subject === "History") {
      if (q.includes("ancient egypt") || q.includes("pyramids")) {
        return "Ancient Egypt was a civilization in northeastern Africa along the Nile River. The river supported farming and travel. Egyptian pyramids were monumental structures built mainly as tombs for pharaohs." + studyTip(level);
      }

      if (q.includes("slave trade") || q.includes("slavery")) {
        return "The transatlantic slave trade forcibly transported millions of African people across the Atlantic Ocean, mainly to the Americas, over several centuries. Enslaved people suffered violence and exploitation, and the trade had lasting effects on families and societies." + studyTip(level);
      }

      if (q.includes("american revolution")) {
        return "The American Revolution was the struggle by Britain's thirteen North American colonies to become independent. The Declaration of Independence was adopted on July 4, 1776, and Britain recognized American independence in 1783." + studyTip(level);
      }

      if (q.includes("world war i") || q.includes("first world war")) {
        return "World War I lasted from 1914 to 1918. The assassination of Archduke Franz Ferdinand triggered the crisis that led to war, while alliances, militarism, and rivalries contributed to the wider conflict." + studyTip(level);
      }

      if (q.includes("world war ii") || q.includes("second world war")) {
        return "World War II lasted from 1939 to 1945 and involved countries around the world. It caused enormous loss of life. The Holocaust was the systematic persecution and murder of six million Jews by Nazi Germany and its collaborators." + studyTip(level);
      }

      if (q.includes("history")) {
        return "History is the study of people and events of the past. Historians examine documents, photographs, artifacts, and oral accounts to understand what happened and why." + studyTip(level);
      }
    }

    // GEOGRAPHY

    if (subject === "Geography") {
      if (q.includes("continent") || q.includes("continents")) {
        return "The seven commonly recognized continents are Africa, Antarctica, Asia, Europe, North America, South America, and Australia. Some educational traditions group continents differently." + studyTip(level);
      }

      if (q.includes("largest ocean") || q.includes("biggest ocean")) {
        return "The Pacific Ocean is the largest and deepest ocean on Earth." + studyTip(level);
      }

      if (q.includes("river") || q.includes("rivers")) {
        return "A river is a natural flow of water moving through a channel toward another river, a lake, or the sea. Rivers provide water, support farming, and can shape land through erosion." + studyTip(level);
      }

      if (q.includes("mountain") || q.includes("mountains")) {
        return "A mountain is a raised part of Earth's surface that rises high above its surroundings. Mountains can form when tectonic plates collide, when the crust shifts, or through volcanic activity." + studyTip(level);
      }

      if (q.includes("equator")) {
        return "The Equator is an imaginary line at 0 degrees latitude. It circles Earth and divides it into the Northern and Southern Hemispheres." + studyTip(level);
      }

      if (q.includes("weather") || q.includes("climate")) {
        return "Weather describes atmospheric conditions over a short time. Climate describes the usual patterns of weather in a place over many years." + studyTip(level);
      }

      if (q.includes("latitude") || q.includes("longitude") || q.includes("map")) {
        return "Maps represent places and features of Earth. Latitude measures position north or south of the Equator. Longitude measures position east or west of the Prime Meridian." + studyTip(level);
      }

      if (q.includes("ghana")) {
        return "Ghana is a country in West Africa. Its capital is Accra, its official language is English, and it gained independence on March 6, 1957." + studyTip(level);
      }
    }

    // SOCIAL STUDIES

    if (subject === "Social Studies") {
      if (q.includes("democracy")) {
        return "Democracy is a system of government in which people have a role in making political decisions, often by voting for representatives. Democratic systems depend on laws, rights, participation, and accountability." + studyTip(level);
      }

      if (q.includes("citizenship") || q.includes("citizen")) {
        return "Citizenship is membership in a country or political community. Citizens have rights and responsibilities, which may include obeying laws and participating responsibly in their community." + studyTip(level);
      }

      if (q.includes("community")) {
        return "A community is a group of people connected by a place, interests, or relationships. People can work together through families, schools, organizations, and public services to meet shared needs." + studyTip(level);
      }

      if (q.includes("culture")) {
        return "Culture includes the customs, language, beliefs, arts, food, and traditions shared by a group of people. Cultures can change over time and may include many traditions within one community." + studyTip(level);
      }

      if (q.includes("government")) {
        return "A government organizes a country or community. Its responsibilities can include making and enforcing laws, providing public services, protecting rights, and managing public resources." + studyTip(level);
      }

      if (q.includes("human rights")) {
        return "Human rights are basic rights and freedoms that belong to all people. Examples include the right to life, education, and freedom from torture. They apply regardless of a person's background." + studyTip(level);
      }
    }

    // GENERAL SUBJECT HELP

    if (q.includes("study plan") || q.includes("prepare for a test")) {
      return "Here is a simple study plan:\n1. Choose one topic.\n2. Study it for 20 minutes.\n3. Write down the main ideas.\n4. Practise questions without looking at your notes.\n5. Review what you found difficult.\n6. Take a short break and repeat.";
    }

    if (q.includes("explain") || q.includes("what is") ||
        q.includes("what are") || q.includes("how does") ||
        q.includes("how do") || q.includes("why")) {
      return "I'll help you understand " + subject + " step by step.\n\nThis version of Kaakyire has a built-in set of lessons, but it does not yet know the answer to every possible question. Try a more specific topic or example. Connecting a real AI service will allow much more flexible answers.";
    }

    return "I received your question about " + subject + ". This version can answer its built-in topics, greetings, and common maths calculations, but it cannot yet respond intelligently to every new question. A real AI service will be needed for broader conversations." + studyTip(level);
  }

  function solveMath(question) {
    let s = question
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\btimes\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bwhat is\b/g, "")
      .replace(/\bcalculate\b/g, "")
      .replace(/[?]/g, "")
      .trim();

    const percent = s.match(/(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)/);
    if (percent) {
      const p = Number(percent[1]);
      const n = Number(percent[2]);
      return p + "% of " + n + " = " + formatNumber(p / 100 * n) +
        "\n\nStep 1: Convert the percentage to a decimal.\n" +
        "Step 2: Multiply " + n + " by " + (p / 100) + ".\n" +
        "Step 3: The answer is " + formatNumber(p / 100 * n) + ".";
    }

    const equation = s.match(/^\s*(-?\d*\.?\d*)\s*x\s*([+-]\s*\d+(?:\.\d+)?)?\s*=\s*(-?\d+(?:\.\d+)?)\s*$/i);
    if (equation) {
      const a = equation[1] === "" ? 1 :
        equation[1] === "-" ? -1 :
        equation[1] === "+" ? 1 : Number(equation[1]);
      const b = equation[2] ? Number(equation[2].replace(/\s/g, "")) : 0;
      const c = Number(equation[3]);

      if (a !== 0 && Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(c)) {
        const x = (c - b) / a;
        return "Let's solve the equation step by step.\n\n" +
          "Starting equation: " + a + "x " + (b >= 0 ? "+ " + b : "- " + Math.abs(b)) + " = " + c + "\n" +
          "Step 1: Subtract " + b + " from both sides.\n" +
          "Step 2: Divide both sides by " + a + ".\n" +
          "Answer: x = " + formatNumber(x) + ".";
      }
    }

    const match = s.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/);
    if (!match) return null;

    const a = Number(match[1]);
    const operator = match[2];
    const b = Number(match[3]);
    let result;

    switch (operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/":
        if (b === 0) return "You cannot divide by zero. Please try another calculation.";
        result = a / b;
        break;
      default: return null;
    }

    if (!Number.isFinite(result)) return null;

    return "Let's solve " + a + " " + operator + " " + b + ".\n\n" +
      "Step 1: Identify the numbers: " + a + " and " + b + ".\n" +
      "Step 2: Perform the operation " + operator + ".\n" +
      "Step 3: Calculate the result.\n\nAnswer: " + formatNumber(result) + ".";
  }

  function formatNumber(number) {
    return Number.isFinite(number) ? String(Number(number.toFixed(8))) : String(number);
  }

  function studyTip(level) {
    if (level === "Easy") {
      return "\n\nStudy tip: Try explaining this idea in your own words.";
    }

    if (level === "Hard") {
      return "\n\nChallenge: Find another example and explain why the idea works.";
    }

    return "\n\nStudy tip: Write down the main idea and one example.";
  }
});
