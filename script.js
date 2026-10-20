"use strict";
document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // KAAKYIRE LEARNING AI
  // Mathematics, English, Science, History,
  // Geography, and Social Studies
  // ==========================================

  const form = document.getElementById("question-form");
  const subjectInput = document.getElementById("subject");
  const difficultyInput = document.getElementById("difficulty");
  const questionInput = document.getElementById("question");
  const askButton = document.getElementById("ask-button");
  const answerBox = document.getElementById("answer");
  const statusBox = document.getElementById("status");

  if (
    !subjectInput ||
    !questionInput ||
    !askButton ||
    !answerBox
  ) {
    console.error(
      "Kaakyire Learning AI: Check the HTML IDs for subject, question, ask-button, and answer."
    );
    return;
  }

  // Prevent the page from refreshing when the form is submitted.
  if (form) {
    form.addEventListener("submit", handleAsk);
  } else {
    askButton.addEventListener("click", handleAsk);
    questionInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleAsk(event);
      }
    });
  }

  function handleAsk(event) {
    if (event) event.preventDefault();

    const question = questionInput.value.trim();
    const subject = subjectInput.value;
    const level = difficultyInput
      ? difficultyInput.value
      : "Medium";

    if (!question) {
      showStatus("Please type a question first.");
      questionInput.focus();
      return;
    }

    showStatus("Kaakyire is preparing your explanation...");
    askButton.disabled = true;

    try {
      const response = getLearningAnswer(
        subject,
        question,
        level
      );

      answerBox.textContent = response;
      showStatus("Here is your learning answer.");
    } catch (error) {
      console.error("Kaakyire error:", error);
      answerBox.textContent =
        "Sorry, something went wrong. Please check your question and try again.";
      showStatus("Please try again.");
    } finally {
      askButton.disabled = false;
    }
  }

  function showStatus(message) {
    if (statusBox) {
      statusBox.textContent = message;
    }
  }

  // ==========================================
  // MAIN LEARNING ANSWER FUNCTION
  // ==========================================

  function getLearningAnswer(subject, question, level) {
    const q = question.toLowerCase().trim();
    const s = String(subject || "").toLowerCase().trim();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/.test(q)) {
      return "Hello! Welcome to Kaakyire Learning AI. What would you like to learn today? Choose a subject and ask your question.";
    }

    if (
      q.includes("who are you") ||
      q.includes("what is kaakyire")
    ) {
      return "I am Kaakyire Learning AI, an educational learning assistant. I help learners understand school subjects through explanations, examples, and practice questions.";
    }

    // MATHEMATICS
    if (
      s.includes("math") ||
      s.includes("mathemat")
    ) {
      return getMathAnswer(question, level);
    }

    // ENGLISH
    if (s.includes("english")) {
      if (q.includes("noun")) {
        return "A noun is a word that names a person, place, animal, or thing.\n\nExamples:\n• Person: teacher\n• Place: school\n• Animal: dog\n• Thing: book\n\nPractice: Can you identify the noun in this sentence: The girl reads a book?";
      }

      if (q.includes("verb")) {
        return "A verb is a word that describes an action or state of being.\n\nExamples:\n• run\n• eat\n• write\n• is\n\nIn the sentence 'The boy runs fast,' the word 'runs' is the verb.";
      }

      if (q.includes("adjective")) {
        return "An adjective describes a noun or pronoun.\n\nExamples: a tall building, a red apple, a happy child.\n\nIn 'The small cat sleeps,' the word 'small' is the adjective.";
      }

      if (q.includes("adverb")) {
        return "An adverb gives more information about a verb, adjective, or another adverb. It may explain how, when, or where something happens.\n\nExample: 'She speaks slowly.' The word 'slowly' tells us how she speaks.";
      }

      if (q.includes("pronoun")) {
        return "A pronoun takes the place of a noun.\n\nExamples: I, you, he, she, it, we, and they.\n\nInstead of saying 'Ama is reading. Ama is happy,' we can say 'Ama is reading. She is happy.'";
      }

      if (q.includes("past tense")) {
        return "Past tense describes something that already happened.\n\nExamples:\n• walk → walked\n• play → played\n• go → went\n• eat → ate\n\nExample sentence: Yesterday, I walked to school.";
      }

      if (q.includes("present tense")) {
        return "Present tense describes something happening now or something that happens regularly.\n\nExamples:\n• I read every day.\n• She plays football.\n• They are learning English.";
      }

      if (q.includes("future tense")) {
        return "Future tense describes something that will happen later.\n\nExample: 'I will study tomorrow.' The words 'will study' tell us the action is in the future.";
      }

      if (q.includes("sentence")) {
        return "A sentence is a group of words that expresses a complete thought. It usually begins with a capital letter and ends with punctuation.\n\nExample: The students are learning.\n\nA simple sentence can contain a subject and a verb.";
      }

      if (q.includes("synonym")) {
        return "A synonym is a word with the same or a similar meaning as another word.\n\nExamples:\n• happy — joyful\n• big — large\n• fast — quick\n• begin — start";
      }

      if (q.includes("antonym")) {
        return "An antonym is a word with the opposite meaning of another word.\n\nExamples:\n• hot — cold\n• tall — short\n• happy — sad\n• early — late";
      }

      if (q.includes("punctuation")) {
        return "Punctuation helps make writing clear.\n\n• Period (.) ends a statement.\n• Question mark (?) ends a question.\n• Exclamation mark (!) shows strong feeling.\n• Comma (,) separates items or parts of a sentence.\n\nExample: I bought apples, oranges, and bananas.";
      }

      if (q.includes("write") || q.includes("writing") || q.includes("essay")) {
        return "To write a good paragraph or essay:\n\n1. Understand the topic.\n2. Write an introduction that presents your main idea.\n3. Add supporting details and examples.\n4. Organize your ideas clearly.\n5. Check spelling, grammar, and punctuation.\n6. Finish with a conclusion when writing an essay.\n\nTell me your topic if you would like help planning your writing.";
      }

      return "English helps us read, write, speak, and understand others. I can help with grammar, nouns, verbs, adjectives, tenses, punctuation, vocabulary, reading comprehension, paragraphs, and essays.\n\nPlease ask a specific question, such as 'What is a noun?' or 'Give me five examples of verbs.'";
    }

    // SCIENCE
    if (s.includes("science")) {
      if (q.includes("photosynthesis")) {
        return "Photosynthesis is the process plants use to make their own food. Plants use sunlight, water, and carbon dioxide to produce sugar and release oxygen.\n\nRemember: sunlight + water + carbon dioxide help plants make food.";
      }

      if (q.includes("water cycle")) {
        return "The water cycle is the continuous movement of water around Earth.\n\n1. Evaporation: the Sun heats water and turns it into water vapor.\n2. Condensation: water vapor cools and forms clouds.\n3. Precipitation: water falls as rain, snow, sleet, or hail.\n4. Collection: water gathers in rivers, lakes, oceans, and the ground.";
      }

      if (q.includes("planet") || q.includes("solar system")) {
        return "Our solar system has eight recognized planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. They orbit the Sun.\n\nEarth is the planet where we live.";
      }

      if (q.includes("gravity")) {
        return "Gravity is a force of attraction between objects that have mass. Earth's gravity pulls objects toward the ground and helps keep the Moon in orbit around Earth.";
      }

      if (q.includes("human body") || q.includes("organs")) {
        return "The human body has many organs that work together.\n\n• The brain controls and coordinates many body activities.\n• The heart pumps blood.\n• The lungs help us breathe.\n• The stomach helps digest food.\n• The kidneys filter waste from the blood.";
      }

      if (q.includes("solid") || q.includes("liquid") || q.includes("gas") || q.includes("states of matter")) {
        return "The three common states of matter are:\n\n• Solid: has a definite shape and volume, like ice.\n• Liquid: has a definite volume but takes the shape of its container, like water.\n• Gas: spreads out to fill its container, like air.";
      }

      if (q.includes("food chain")) {
        return "A food chain shows how energy moves from one living thing to another.\n\nExample: grass → grasshopper → frog → snake.\n\nThe grass makes its own food, the grasshopper eats the grass, the frog eats the grasshopper, and the snake may eat the frog.";
      }

      if (q.includes("force") || q.includes("motion")) {
        return "A force is a push or pull. Forces can start or stop movement, change speed, or change direction.\n\nExample: kicking a stationary ball applies a force that makes the ball move.";
      }

      return "Science helps us understand living things, matter, energy, Earth, and space. I can explain topics such as plants, animals, the human body, the water cycle, forces, matter, ecosystems, and the solar system.\n\nAsk a specific science question and I will help you learn it.";
    }

    // HISTORY
    if (s.includes("history")) {
      if (q.includes("ancient egypt") || q.includes("egypt")) {
        return "Ancient Egypt was a civilization that developed along the Nile River in northeastern Africa. The Nile provided water, fertile soil, and a route for travel and trade. Ancient Egyptians are known for pyramids, hieroglyphic writing, and their pharaohs.";
      }

      if (q.includes("slavery")) {
        return "Slavery is a system in which people are treated as property and denied their freedom. In the United States, slavery became closely connected to the forced labor of Africans and their descendants. Enslaved people resisted slavery in many ways, and abolitionists worked to end it. The 13th Amendment to the U.S. Constitution abolished slavery, except as punishment for a crime.";
      }

      if (q.includes("american revolution") || q.includes("revolutionary war")) {
        return "The American Revolution was the struggle in which thirteen British colonies in North America fought for independence. The conflict began in 1775, and the Declaration of Independence was adopted on July 4, 1776. The United States later won independence from Britain.";
      }

      if (q.includes("civil war")) {
        return "The American Civil War lasted from 1861 to 1865. The Union fought against the Confederacy. Slavery was a central cause of the conflict. The Union won, and the 13th Amendment abolished slavery in the United States, except as punishment for a crime.";
      }

      if (q.includes("world war i") || q.includes("first world war")) {
        return "World War I lasted from 1914 to 1918. It involved many countries and alliances. The assassination of Archduke Franz Ferdinand helped trigger the conflict, alongside deeper political, military, and nationalist tensions.";
      }

      if (q.includes("world war ii") || q.includes("second world war")) {
        return "World War II lasted from 1939 to 1945. It involved countries around the world. Nazi Germany's invasion of Poland in 1939 began the war in Europe. The war ended in 1945 after the defeat of the Axis powers.";
      }

      if (q.includes("history")) {
        return "History is the study of people, events, and societies of the past. Historians use documents, artifacts, photographs, and other evidence to understand what happened and why it matters.";
      }

      return "History helps us understand past people, civilizations, events, and changes over time. I can help you study ancient civilizations, African history, American history, world wars, independence movements, and important historical events.\n\nAsk a specific question about a person, place, or event.";
    }

    // GEOGRAPHY
    if (s.includes("geography")) {
      if (q.includes("continent")) {
        return "The seven commonly recognized continents are Africa, Antarctica, Asia, Europe, North America, South America, and Australia. Some models group Europe and Asia together or use a different continent count.";
      }

      if (q.includes("ocean")) {
        return "The five commonly recognized oceans are the Pacific, Atlantic, Indian, Southern, and Arctic Oceans. The Pacific is the largest.";
      }

      if (q.includes("capital of")) {
        const capitals = [
          { keys: ["ghana"], answer: "The capital of Ghana is Accra." },
          { keys: ["united states", "usa", "america"], answer: "The capital of the United States is Washington, D.C." },
          { keys: ["united kingdom", "uk", "england"], answer: "The capital of the United Kingdom is London. London is also the capital of England." },
          { keys: ["nigeria"], answer: "The capital of Nigeria is Abuja." },
          { keys: ["kenya"], answer: "The capital of Kenya is Nairobi." },
          { keys: ["france"], answer: "The capital of France is Paris." },
          { keys: ["japan"], answer: "The capital of Japan is Tokyo." },
          { keys: ["canada"], answer: "The capital of Canada is Ottawa." },
          { keys: ["australia"], answer: "The capital of Australia is Canberra." },
          { keys: ["india"], answer: "The capital of India is New Delhi." },
          { keys: ["china"], answer: "The capital of China is Beijing." },
          { keys: ["south africa"], answer: "South Africa has three capital cities with different government roles: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial, traditionally)." }
        ];

        for (const item of capitals) {
          if (item.keys.some(key => q.includes(key))) {
            return item.answer;
          }
        }

        return "A capital city is an important city where a country's national government is based. Please tell me the country whose capital you want to know.";
      }

      if (q.includes("equator")) {
        return "The Equator is an imaginary line around the middle of Earth. It divides Earth into the Northern Hemisphere and Southern Hemisphere. Its latitude is 0 degrees.";
      }

      if (q.includes("weather") || q.includes("climate")) {
        return "Weather describes atmospheric conditions over a short time, such as today's rain or temperature. Climate describes the usual weather patterns of a place over a long period, often 30 years or more.";
      }

      if (q.includes("map")) {
        return "A map is a representation of all or part of Earth's surface. Maps may show roads, borders, mountains, rivers, population, or climate. A map key explains the symbols used, and a scale helps compare map distances with real distances.";
      }

      if (q.includes("river")) {
        return "A river is a natural flow of water that moves through a channel toward another river, a lake, or an ocean. Rivers provide water for people, plants, animals, farming, and transportation.";
      }

      return "Geography is the study of places, people, environments, and Earth's features. I can help with continents, oceans, countries, capitals, maps, rivers, mountains, climate, weather, and landforms.\n\nAsk a specific geography question to get started.";
    }

    // SOCIAL STUDIES
    if (s.includes("social")) {
      if (q.includes("democracy")) {
        return "Democracy is a system of government in which people have a role in making political decisions, often by voting for representatives. Fair elections, participation, and the rule of law are important democratic principles.";
      }

      if (q.includes("government")) {
        return "Government is the system or group of people responsible for making and carrying out public decisions and laws.\n\nIn the United States, the federal government has three branches:\n• Legislative: makes laws.\n• Executive: carries out laws.\n• Judicial: interprets laws.";
      }

      if (q.includes("citizen") || q.includes("citizenship")) {
        return "Citizenship is membership in a country or community, with rights and responsibilities defined by its laws. Responsibilities may include obeying laws, respecting others, and participating in community life.";
      }

      if (q.includes("culture")) {
        return "Culture includes the shared customs, language, beliefs, arts, food, traditions, and ways of life of a group of people. Cultures can change over time and influence one another.";
      }

      if (q.includes("community")) {
        return "A community is a group of people who live in the same area or share interests, experiences, or goals. People can support their communities by helping others, respecting differences, and taking care of shared spaces.";
      }

      if (q.includes("rights")) {
        return "Rights are freedoms or protections that people are entitled to under laws or recognized principles. Examples in the United States include freedom of speech and freedom of religion, subject to applicable laws and limits.";
      }

      if (q.includes("economy") || q.includes("economics")) {
        return "Economics studies how people and societies use limited resources to meet their needs and wants. Important ideas include goods, services, supply, demand, production, and trade.";
      }

      if (q.includes("resources")) {
        return "Resources are things people use to meet needs and wants. Natural resources include water, soil, and minerals. Human resources are people's skills and work. Capital resources include tools, buildings, and machinery.";
      }

      return "Social Studies helps us understand people, communities, government, citizenship, culture, economics, and how societies work.\n\nAsk a specific question, such as 'What is democracy?' or 'What are the three branches of the U.S. government?'";
    }

    // No subject-specific match
    return "Welcome to Kaakyire Learning AI!\n\nI can help with Mathematics, English, Science, History, Geography, and Social Studies. Please choose the correct subject and ask a clear question.\n\nFor example:\n• Mathematics: What is 12 × 8?\n• English: What is a noun?\n• Science: What is photosynthesis?\n• History: What was the American Revolution?\n• Geography: What are the seven continents?\n• Social Studies: What is democracy?\n\nI will explain the answer in a way that supports learning.";
  }

  // ==========================================
  // MATHEMATICS
  // ==========================================

  function getMathAnswer(question, level) {
    const q = question.toLowerCase().trim();
    const calculation = solveMath(question);

    if (calculation !== null) {
      return calculation;
    }

    if (q.includes("fraction")) {
      return "A fraction represents part of a whole. It has a numerator on top and a denominator on the bottom.\n\nExample: 3/4 means three out of four equal parts.\n\nTo add fractions with the same denominator, add the numerators and keep the denominator:\n1/4 + 2/4 = 3/4.";
    }

    if (q.includes("percentage") || q.includes("percent")) {
      return "A percentage means a number out of 100.\n\nTo find a percentage of a number, multiply the number by the percentage written as a decimal.\n\nExample: 20% of 50 = 0.20 × 50 = 10.\n\nTry asking: What is 20% of 50?";
    }

    if (q.includes("perimeter")) {
      return "Perimeter is the total distance around the outside of a shape.\n\nFor a rectangle:\nPerimeter = 2 × (length + width)\n\nExample: length = 6 cm and width = 4 cm.\nPerimeter = 2 × (6 + 4) = 20 cm.";
    }

    if (q.includes("area")) {
      return "Area measures the space inside a flat shape.\n\nRectangle: area = length × width.\n\nExample: a rectangle is 6 cm long and 4 cm wide.\nArea = 6 × 4 = 24 square centimeters (cm²).";
    }

    if (q.includes("mean") || q.includes("average")) {
      return "To find the mean (average):\n\n1. Add all the numbers.\n2. Divide the total by how many numbers there are.\n\nExample: 2, 4, and 6.\nMean = (2 + 4 + 6) ÷ 3 = 12 ÷ 3 = 4.";
    }

    if (q.includes("median")) {
      return "The median is the middle number when numbers are arranged in order.\n\nExample: 3, 5, 8. The median is 5.\n\nIf there are two middle numbers, add them and divide by 2.";
    }

    if (q.includes("mode")) {
      return "The mode is the number that appears most often in a set.\n\nExample: 2, 3, 3, 4, 5. The mode is 3 because it appears more often than the other numbers.";
    }

    if (q.includes("prime number")) {
      return "A prime number is a whole number greater than 1 that has exactly two positive factors: 1 and itself.\n\nExamples: 2, 3, 5, 7, 11, and 13.\n\nThe number 1 is not prime.";
    }

    if (q.includes("multiplication") || q.includes("multiply")) {
      return "Multiplication is repeated addition.\n\nExample: 4 × 3 means 4 groups of 3.\n3 + 3 + 3 + 3 = 12, so 4 × 3 = 12.\n\nYou can ask me to solve a specific multiplication problem.";
    }

    if (q.includes("division") || q.includes("divide")) {
      return "Division separates a quantity into equal groups.\n\nExample: 12 ÷ 3 = 4 because 12 items shared equally among 3 groups gives 4 items per group.\n\nYou can ask me to solve a specific division problem.";
    }

    if (q.includes("equation") || q.includes("solve for")) {
      const equation = solveLinearEquation(question);
      if (equation !== null) return equation;

      return "An equation states that two expressions are equal.\n\nExample: x + 3 = 7.\nSubtract 3 from both sides:\nx = 7 − 3 = 4.\n\nTry asking: Solve x + 3 = 7.";
    }

    if (q.includes("decimal")) {
      return "A decimal uses a decimal point to show parts of a whole.\n\nExample: 0.5 means five tenths, which is equal to 1/2 or 50%.\n\nWhen adding decimals, line up the decimal points.";
    }

    if (q.includes("round")) {
      return "To round a number, look at the digit immediately to the right of the place you want to round to.\n\nIf that digit is 5 or greater, round up. If it is less than 5, keep the rounding digit the same.\n\nExample: 47 rounded to the nearest ten is 50.";
    }

    return "Let's work on Mathematics together!\n\nI can help with arithmetic, multiplication, division, fractions, percentages, decimals, area, perimeter, averages, and simple equations.\n\nType a question such as:\n• What is 12 × 8?\n• What is 20% of 50?\n• What is 25 + 17?\n• What is 12 divided by 3?\n• Solve x + 3 = 7.\n\nI will show the steps when I can.";
  }

  // Safely solve basic arithmetic without executing arbitrary code.
  function solveMath(question) {
    let text = String(question).toLowerCase().trim();

    // Convert common words and symbols to arithmetic operators.
    text = text
      .replace(/,/g, "")
      .replace(/[×✕]/g, "*")
      .replace(/[÷]/g, "/")
      .replace(/[−–—]/g, "-")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\btimes\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bdivided into\b/g, "/")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bnegative\b/g, "-")
      .replace(/\badded to\b/g, "+")
      .replace(/\bsubtract\b/g, "-")
      .replace(/\bfrom\b/g, " from ")
      .replace(/(\d)\s*x\s*(\d)/g, "$1 * $2")
      .replace(/\bwhat is\b/g, " ")
      .replace(/\bcalculate\b/g, " ")
      .replace(/\bsolve\b/g, " ")
      .replace(/\bplease\b/g, " ")
      .replace(/[?=]/g, " ")
      .trim();

    // Handle percentages such as "20% of 50".
    const percentMatch = text.match(
      /(-?\d+(?:\.\d+)?)\s*%\s*(?:of\s*)?(-?\d+(?:\.\d+)?)/
    );

    if (percentMatch) {
      const percentage = Number(percentMatch[1]);
      const number = Number(percentMatch[2]);
      const result = (percentage / 100) * number;

      return (
        "Let's solve it step by step.\n\n" +
        percentage + "% of " + number + " means:\n" +
        percentage + " ÷ 100 × " + number + "\n" +
        "= " + formatNumber(percentage / 100) +
        " × " + formatNumber(number) + "\n" +
        "= " + formatNumber(result) + "\n\n" +
        "Answer: " + formatNumber(result)
      );
    }

    // Remove common question words left after normalization.
    text = text
      .replace(/\bhow much is\b/g, " ")
      .replace(/\bwhat does\b/g, " ")
      .replace(/\bequal to\b/g, " ")
      .replace(/\banswer\b/g, " ")
      .replace(/\bthe\b/g, " ")
      .replace(/\bof\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Find a basic arithmetic expression in the question.
    const expressionMatch = text.match(
      /-?\d+(?:\.\d+)?(?:\s*[\+\-*/]\s*-?\d+(?:\.\d+)?|\s*[\+\-*/]\s*\(\s*-?\d+(?:\.\d+)?(?:\s*[\+\-*/]\s*-?\d+(?:\.\d+)?)*\s*\))+(?:\s*[\+\-*/]\s*-?\d+(?:\.\d+)?)*/
    );

    let expression = expressionMatch ? expressionMatch[0] : "";

    // Also accept a single number when a learner asks to calculate it.
    if (!expression && /^-?\d+(?:\.\d+)?$/.test(text)) {
      expression = text;
    }

    if (!expression) {
      // A direct expression like "12 * 8" may be all that's needed.
      const simple = text.match(
        /-?\d+(?:\.\d+)?\s*[\+\-*/]\s*-?\d+(?:\.\d+)?/
      );
      if (simple) expression = simple[0];
    }

    if (!expression) return null;

    // Accept only numbers, arithmetic operators, spaces, and parentheses.
    if (!/^[\d\s.+*/()\-]+$/.test(expression)) {
      return null;
    }

    try {
      const result = evaluateExpression(expression);

      if (!Number.isFinite(result)) {
        return "That calculation does not produce a finite number. Please check the numbers and try again.";
      }

      const formatted = formatNumber(result);
      return (
        "Let's solve it step by step.\n\n" +
        "Calculation: " + expression + "\n\n" +
        "Answer: " + formatted + "\n\n" +
        "Keep practicing! Understanding each step will help you solve similar problems."
      );
    } catch (error) {
      return null;
    }
  }

  // Arithmetic parser: supports +, -, *, /, and parentheses.
  function evaluateExpression(expression) {
    const tokens = expression.match(
      /\d+(?:\.\d+)?|[()+\-*/]/g
    );

    if (!tokens || tokens.join("") !== expression.replace(/\s+/g, "")) {
      throw new Error("Invalid arithmetic expression");
    }

    let index = 0;

    function parseExpression() {
      let value = parseTerm();

      while (tokens[index] === "+" || tokens[index] === "-") {
        const operator = tokens[index++];
        const right = parseTerm();
        value = operator === "+" ? value + right : value - right;
      }

      return value;
    }

    function parseTerm() {
      let value = parseFactor();

      while (tokens[index] === "*" || tokens[index] === "/") {
        const operator = tokens[index++];
        const right = parseFactor();

        if (operator === "/" && right === 0) {
          throw new Error("Cannot divide by zero");
        }

        value = operator === "*" ? value * right : value / right;
      }

      return value;
    }

    function parseFactor() {
      const token = tokens[index];

      if (token === "+") {
        index++;
        return parseFactor();
      }

      if (token === "-") {
        index++;
        return -parseFactor();
      }

      if (token === "(") {
        index++;
        const value = parseExpression();

        if (tokens[index] !== ")") {
          throw new Error("Missing closing parenthesis");
        }

        index++;
        return value;
      }

      if (token !== undefined && /^\d+(?:\.\d+)?$/.test(token)) {
        index++;
        return Number(token);
      }

      throw new Error("Invalid number");
    }

    const result = parseExpression();

    if (index !== tokens.length) {
      throw new Error("Unexpected input");
    }

    return result;
  }

  function formatNumber(number) {
    if (Number.isInteger(number)) return String(number);

    return String(Number(number.toFixed(8)));
  }

  // Solve simple equations such as x + 3 = 7 and 2x = 10.
  function solveLinearEquation(question) {
    let text = question.toLowerCase().replace(/\s+/g, "");
    text = text.replace(/^solve/, "").replace(/^for/, "");

    const match = text.match(
      /^([+-]?\d*\.?\d*)x([+-]\d+(?:\.\d+)?)?=([+-]?\d+(?:\.\d+)?)$/
    );

    if (match) {
      let coefficient = match[1];

      if (coefficient === "" || coefficient === "+") coefficient = "1";
      if (coefficient === "-") coefficient = "-1";

      const a = Number(coefficient);
      const b = Number(match[2] || 0);
      const c = Number(match[3]);

      if (a === 0) return null;

      const x = (c - b) / a;

      return (
        "Let's solve the equation step by step.\n\n" +
        "Equation: " + question + "\n" +
        "Move the number without x to the other side, then divide by the coefficient of x.\n\n" +
        "x = (" + formatNumber(c) + " − (" + formatNumber(b) + ")) ÷ " + formatNumber(a) + "\n" +
        "x = " + formatNumber(x) + "\n\n" +
        "Answer: x = " + formatNumber(x)
      );
    }

    const multiplication = text.match(
      /^([+-]?\d+(?:\.\d*)?)x=([+-]?\d+(?:\.\d*)?)$/
    );

    if (multiplication) {
      const a = Number(multiplication[1]);
      const b = Number(multiplication[2]);

      if (a === 0) return null;

      const x = b / a;

      return (
        "Let's solve the equation step by step.\n\n" +
        "Equation: " + question + "\n" +
        "Divide both sides by " + formatNumber(a) + ".\n\n" +
        "x = " + formatNumber(b) + " ÷ " + formatNumber(a) + "\n" +
        "x = " + formatNumber(x) + "\n\n" +
        "Answer: x = " + formatNumber(x)
      );
    }

    return null;
  }
});
