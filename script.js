const askButton = document.getElementById("ask-button");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");

function sendMessage() {
  const question = questionInput.value.trim();

  if (question === "") {
    answerBox.textContent = "Please enter a school question first.";
    return;
  }

  const q = question.toLowerCase();
  let answer = "";

  // MATHEMATICS: basic arithmetic
  const mathMatch = q.match(
    /(-?\d+(?:\.\d+)?)\s*([+\-×x*/÷])\s*(-?\d+(?:\.\d+)?)/
  );

  if (mathMatch) {
    const a = Number(mathMatch[1]);
    const operator = mathMatch[2];
    const b = Number(mathMatch[3]);
    let result;

    if (operator === "+") result = a + b;
    else if (operator === "-") result = a - b;
    else if (["×", "x", "*"].includes(operator)) result = a * b;
    else if (["÷", "/"].includes(operator)) {
      if (b === 0) {
        answer = "You cannot divide a number by zero.";
      } else {
        result = a / b;
      }
    }

    if (answer === "" && result !== undefined) {
      answer = `${a} ${operator} ${b} = ${result}.\n\n`;
      answer += "Step by step:\n";
      answer += `1. Start with ${a} and ${b}.\n`;
      answer += `2. Apply the ${operator} operation.\n`;
      answer += `3. The answer is ${result}.`;
    }
  }

  // SCIENCE
  else if (q.includes("photosynthesis")) {
    answer =
      "Photosynthesis is the process plants use to make their own food. " +
      "Plants use sunlight, water, and carbon dioxide to make sugar " +
      "and release oxygen. For example, a green plant uses sunlight " +
      "to help make food in its leaves.";
  } else if (q.includes("gravity")) {
    answer =
      "Gravity is a force that pulls objects toward one another. " +
      "On Earth, gravity pulls objects toward the ground. " +
      "For example, a dropped ball falls to the floor.";
  } else if (q.includes("water cycle")) {
    answer =
      "The water cycle is the continuous movement of water around Earth. " +
      "The main stages are evaporation, condensation, and precipitation. " +
      "For example, water evaporates, forms clouds, and falls as rain.";
  } else if (q.includes("solar system")) {
    answer =
      "The solar system consists of the Sun and the objects that orbit it, " +
      "including eight planets. Earth is the third planet from the Sun.";
  } else if (q.includes("states of matter")) {
    answer =
      "The three common states of matter are solid, liquid, and gas. " +
      "Ice is a solid, water is a liquid, and water vapor is a gas.";
  }

  // ENGLISH
  else if (q.includes("noun")) {
    answer =
      "A noun names a person, place, thing, or idea. " +
      "Examples include teacher, school, book, and happiness. " +
      "In 'The student reads a book,' student and book are nouns.";
  } else if (q.includes("verb")) {
    answer =
      "A verb expresses an action or a state of being. " +
      "Examples include run, write, think, is, and are. " +
      "In 'The child runs,' runs is the verb.";
  } else if (q.includes("adjective")) {
    answer =
      "An adjective describes a noun. " +
      "For example, in 'the red ball,' red is an adjective " +
      "because it describes the ball.";
  } else if (q.includes("adverb")) {
    answer =
      "An adverb can describe a verb, adjective, or another adverb. " +
      "For example, in 'She reads quietly,' quietly describes how she reads.";
  } else if (q.includes("pronoun")) {
    answer =
      "A pronoun takes the place of a noun. Examples include " +
      "I, you, he, she, it, we, and they. " +
      "For example, 'Ama is kind. She helps others.'";
  } else if (q.includes("plural")) {
    answer =
      "A plural noun means more than one person, place, or thing. " +
      "Examples: one book, two books; one child, two children.";
  }

  // SOCIAL STUDIES
  else if (q.includes("democracy")) {
    answer =
      "Democracy is a system of government in which people have a role " +
      "in choosing their leaders, often through voting.";
  } else if (q.includes("community")) {
    answer =
      "A community is a group of people who live in the same area " +
      "or share something in common. Examples include a neighborhood " +
      "or a school community.";
  } else if (q.includes("continents")) {
    answer =
      "There are seven commonly recognized continents: Africa, " +
      "Antarctica, Asia, Europe, North America, South America, and Australia.";
  } else if (q.includes("map")) {
    answer =
      "A map is a drawing or representation of an area of land or sea. " +
      "Maps help us find places and understand where things are located.";
  } else if (q.includes("history")) {
    answer =
      "History is the study of past events and people. " +
      "Historians use sources such as documents, photographs, " +
      "artifacts, and eyewitness accounts to learn about the past.";
  }

  // GENERAL LEARNING
  else if (q.includes("study plan") || q.includes("study schedule")) {
    answer =
      "Here is a simple study plan:\n" +
      "1. Choose one subject.\n" +
      "2. Study for 20 minutes.\n" +
      "3. Take a 5-minute break.\n" +
      "4. Practice a few questions.\n" +
      "5. Review what you learned.";
  } else if (q.includes("help me study") || q.includes("homework")) {
    answer =
      "I can help you study step by step. " +
      "Please tell me the subject and type your specific question. " +
      "I will try to explain it in simple words.";
  } else {
    answer =
      "Thank you for your question! I am Kaakyire Learning AI, " +
      "your learning assistant.\n\n" +
      "I can currently answer some prepared questions in Mathematics, " +
      "Science, English, and Social Studies. I do not have a full AI " +
      "answer service connected yet, so I may not know every answer.\n\n" +
      "Please try asking about multiplication, photosynthesis, gravity, " +
      "nouns, verbs, democracy, or the water cycle.";
  }

  answerBox.textContent = answer;
}

if (askButton) {
  askButton.addEventListener("click", sendMessage);
}

if (questionInput) {
  questionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}
