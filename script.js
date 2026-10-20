"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("question-form");
  const subjectInput = document.getElementById("subject");
  const difficultyInput = document.getElementById("difficulty");
  const questionInput = document.getElementById("question");
  const askButton = document.getElementById("ask-button");
  const answerBox = document.getElementById("answer");
  const statusBox = document.getElementById("status");

  // Check that the HTML elements exist.
  if (
    !subjectInput ||
    !difficultyInput ||
    !questionInput ||
    !askButton ||
    !answerBox ||
    !statusBox
  ) {
    console.error(
      "Kaakyire: Check the element IDs in index.html."
    );
    return;
  }

  statusBox.textContent = "Kaakyire is ready to help you learn.";

  // Handle questions from the form or button.
  let isAsking = false;

  function handleAsk(event) {
    if (event) event.preventDefault();
    if (isAsking) return;

    const question = questionInput.value.trim();
    const subject = subjectInput.value;
    const level = difficultyInput.value;

    if (!question) {
      statusBox.textContent = "Please type a question first.";
      questionInput.focus();
      return;
    }

    isAsking = true;
    askButton.disabled = true;
    askButton.textContent = "Thinking...";
    statusBox.textContent = "Preparing your answer...";
    answerBox.textContent = "";

    try {
      const answer = getLearningAnswer(subject, question, level);
      answerBox.textContent = answer;
      statusBox.textContent = "Answer ready! Keep learning.";
    } catch (error) {
      console.error("Kaakyire error:", error);
      answerBox.textContent =
        "Something went wrong. Please try another question.";
      statusBox.textContent = "Please try again.";
    } finally {
      isAsking = false;
      askButton.disabled = false;
      askButton.textContent = "Ask Kaakyire";
    }
  }

  if (form) {
    form.addEventListener("submit", handleAsk);
  } else {
    askButton.addEventListener("click", handleAsk);
  }

  // GENERAL ANSWER ENGINE
  function getLearningAnswer(subject, question, level) {
    const q = question.toLowerCase().trim();
    const clean = q.replace(/[.!?]+$/g, "").trim();
    const s = String(subject || "").toLowerCase().trim();

    // Greetings and conversation
    if (/^(hi|hello|hey|hiya)\b/.test(clean)) {
      return "Hello! Welcome to Kaakyire Learning AI! 😊 What would you like to learn today?";
    }

    if (clean.startsWith("good morning")) {
      return "Good morning! ☀️ Let's learn something new today. What is your question?";
    }

    if (clean.startsWith("good afternoon")) {
      return "Good afternoon! Welcome to Kaakyire Learning AI. What shall we learn?";
    }

    if (clean.startsWith("good evening")) {
      return "Good evening! I'm ready to help you learn. What would you like to know?";
    }

    if (/^how are you\b/.test(clean)) {
      return "I'm doing well and ready to help you learn! What subject are we exploring today?";
    }

    if (/^(thank you|thanks|many thanks)\b/.test(clean)) {
      return "You're very welcome! Keep asking questions and growing your knowledge. 😊";
    }

    if (/^(bye|goodbye|see you later)\b/.test(clean)) {
      return "Goodbye! Keep learning, keep practising, and come back whenever you need help.";
    }

    if (/^(who are you|what is kaakyire|what is kaakyire learning ai)$/.test(clean)) {
      return "I am Kaakyire Learning AI, your learning assistant for Mathematics, English, Science, History, Geography, and Social Studies.";
    }

    if (/^(what can you do|what can you help me with)$/.test(clean)) {
      return "I can explain school topics, practise maths, teach vocabulary and grammar, explore historical events, explain geography, and help you prepare for tests. Choose a subject and ask me a question!";
    }

    if (/^(tell me a joke|make me laugh)$/.test(clean)) {
      return "Why did the student bring a ladder to school? Because they wanted to go to the next level! 😄";
    }

    if (/^(help me|i need help|can you help me)$/.test(clean)) {
      return "Of course! Tell me the topic or question you need help with. I'll explain it as clearly as I can.";
    }

    if (/^(i am sad|i'm sad|i feel sad|i am worried|i'm worried)$/.test(clean)) {
      return "I'm sorry you're feeling this way. Talking to someone you trust may help. You can also tell me what's on your mind.";
    }

    // Study skills work across subjects
    if (q.includes("study plan") || q.includes("prepare for a test")) {
      return "Here is a simple study plan:\n\n1. Choose one topic.\n2. Study for 20 minutes.\n3. Write down the main ideas.\n4. Answer practice questions without looking at your notes.\n5. Review mistakes and difficult parts.\n6. Take a short break and repeat.\n\nSmall, regular study sessions can help you remember more.";
    }

    // MATHEMATICS
    if (s.includes("math")) {
      const math = solveMath(q);

      if (math !== null) {
        return math + tip(level);
      }

      if (has(q, ["fraction", "numerator", "denominator"])) {
        return "A fraction represents part of a whole. The numerator is the top number, and the denominator is the bottom number. For example, 3/4 means three out of four equal parts. If a pizza is cut into four equal pieces and you eat three, you have eaten 3/4 of the pizza." + tip(level);
      }

      if (has(q, ["perimeter"])) {
        return "Perimeter is the total distance around a shape. Add all the side lengths. For a rectangle, use perimeter = 2 × (length + width). Example: length 5 cm and width 3 cm gives 2 × (5 + 3) = 16 cm." + tip(level);
      }

      if (has(q, ["area"])) {
        return "Area measures the space inside a flat shape. For a rectangle, area = length × width. Example: a rectangle 5 cm long and 3 cm wide has an area of 5 × 3 = 15 square centimetres." + tip(level);
      }

      if (has(q, ["mean", "average", "median", "mode", "range"])) {
        return "These are ways to describe a set of numbers:\n\nMean: add the numbers and divide by how many there are.\nMedian: put the numbers in order and find the middle value.\nMode: find the value that appears most often.\nRange: subtract the smallest value from the largest.\n\nExample: 2, 4, 4, 6 has mean 4, median 4, mode 4, and range 4." + tip(level);
      }

      if (has(q, ["percent", "percentage", "%"])) {
        return "A percentage means 'out of 100.' To find a percentage of a number, convert the percentage to a decimal and multiply. Example: 20% of 50 = 0.20 × 50 = 10. So 20% of 50 is 10." + tip(level);
      }

      if (has(q, ["decimal", "decimals"])) {
        return "A decimal uses a decimal point to show parts of a whole. In 3.25, the 3 represents three wholes, the 2 represents two tenths, and the 5 represents five hundredths. Decimals can be compared by lining up their decimal points." + tip(level);
      }

      if (has(q, ["multiply", "multiplication", "times table"])) {
        return "Multiplication is repeated addition. For example, 4 × 3 means four groups of three: 3 + 3 + 3 + 3 = 12. Therefore, 4 × 3 = 12. Practising times tables helps you calculate faster." + tip(level);
      }

      if (has(q, ["divide", "division", "quotient"])) {
        return "Division separates a quantity into equal groups. For example, 12 ÷ 3 asks how many are in each of three equal groups. Since 3 × 4 = 12, the answer is 4. You cannot divide a number by zero." + tip(level);
      }

      if (has(q, ["algebra", "equation", "solve for x", "variable"])) {
        return "Algebra uses letters to represent unknown numbers. For example, x + 3 = 7. Subtract 3 from both sides to get x = 7 − 3, so x = 4. To solve an equation, perform the same operation on both sides to keep them equal." + tip(level);
      }

      if (has(q, ["triangle", "angles", "angle"])) {
        return "An angle measures the turn between two lines or rays. An acute angle is less than 90°, a right angle is 90°, and an obtuse angle is greater than 90° but less than 180°. The three interior angles of a triangle add up to 180°." + tip(level);
      }

      if (has(q, ["perimeter", "shape", "geometry", "circle", "volume"])) {
        return "Geometry studies shapes, sizes, angles, areas, and volumes. To solve a geometry problem, identify the shape, write down the known measurements, choose the correct formula, and substitute the numbers." + tip(level);
      }

      return "Let's work on Mathematics step by step. You can ask me to calculate something, solve a simple equation, explain fractions, percentages, decimals, multiplication, division, geometry, area, perimeter, or averages. For example, type: What is 24 divided by 6?" + tip(level);
    }

    // ENGLISH
    if (s.includes("english")) {
      if (has(q, ["noun", "nouns"])) {
        return "A noun names a person, place, thing, or idea. Examples are teacher, Ghana, book, and kindness. In 'The student reads a book,' student and book are nouns." + tip(level);
      }

      if (has(q, ["verb", "verbs"])) {
        return "A verb expresses an action or a state of being. Examples include run, write, think, is, and are. In 'The child runs quickly,' runs is the verb." + tip(level);
      }

      if (has(q, ["adjective", "adjectives"])) {
        return "An adjective describes a noun or pronoun. In 'The tall tree is green,' tall and green describe the tree." + tip(level);
      }

      if (has(q, ["adverb", "adverbs"])) {
        return "An adverb often describes a verb, adjective, or another adverb. In 'She reads carefully,' carefully tells us how she reads." + tip(level);
      }

      if (has(q, ["pronoun", "pronouns"])) {
        return "A pronoun replaces a noun. Examples include I, you, he, she, it, we, and they. Instead of saying 'Ama is reading,' you can say 'She is reading.'" + tip(level);
      }

      if (has(q, ["synonym", "synonyms"])) {
        return "A synonym is a word with the same or a similar meaning as another word. For example, happy and joyful are synonyms. Big and large are also synonyms." + tip(level);
      }

      if (has(q, ["antonym", "antonyms", "opposite meaning"])) {
        return "An antonym is a word with the opposite meaning of another word. Examples include hot and cold, up and down, and early and late." + tip(level);
      }

      if (has(q, ["simile", "similes"])) {
        return "A simile compares two things using 'like' or 'as.' For example, 'She is as brave as a lion.' The comparison helps readers imagine the person's bravery." + tip(level);
      }

      if (has(q, ["metaphor", "metaphors"])) {
        return "A metaphor describes one thing as another to make a comparison. 'Time is a thief' suggests that time takes moments away from us. Unlike a simile, a metaphor does not need 'like' or 'as.'" + tip(level);
      }

      if (has(q, ["punctuation", "comma", "full stop", "question mark"])) {
        return "Punctuation makes writing clearer. A full stop ends a statement. A question mark ends a direct question. A comma separates items or parts of a sentence. An apostrophe can show possession or missing letters." + tip(level);
      }

      if (has(q, ["essay", "paragraph", "composition"])) {
        return "A strong paragraph usually develops one main idea. Start with a topic sentence, add supporting details and examples, and finish with a concluding sentence. An essay commonly includes an introduction, body paragraphs, and a conclusion." + tip(level);
      }

      if (has(q, ["pronunciation", "vocabulary", "meaning of the word"])) {
        return "Vocabulary means the words a person knows and uses. To learn a new word, read its definition, study it in a sentence, say it aloud, and write your own example. If you give me a specific word, I can explain its meaning." + tip(level);
      }

      if (has(q, ["verb tense", "past tense", "present tense", "future tense", "tense"])) {
        return "Verb tense shows when an action happens. Present: 'I walk.' Past: 'I walked.' Future: 'I will walk.' The correct tense helps readers understand the time of an event." + tip(level);
      }

      if (has(q, ["subject and predicate", "sentence", "grammar"])) {
        return "Grammar is the set of rules that helps us form clear sentences. A sentence usually has a subject, which tells who or what the sentence is about, and a predicate, which tells something about the subject. Example: 'The girl sings.' The girl is the subject; sings is the predicate." + tip(level);
      }

      return "Let's improve your English! I can explain nouns, verbs, adjectives, adverbs, pronouns, synonyms, antonyms, similes, metaphors, punctuation, grammar, sentences, vocabulary, and essay writing. Ask about a specific word or sentence for a more focused explanation." + tip(level);
    }

    // SCIENCE
    if (s.includes("science")) {
      if (has(q, ["photosynthesis", "plants make food"])) {
        return "Photosynthesis is how green plants make food using light energy. Plants take in water and carbon dioxide and use light captured by chlorophyll to make sugar, releasing oxygen. This process supports much of life on Earth." + tip(level);
      }

      if (has(q, ["gravity"])) {
        return "Gravity is the attraction between objects that have mass. Earth's gravity pulls objects toward its centre. That is why a dropped ball falls to the ground and why the Moon orbits Earth." + tip(level);
      }

      if (has(q, ["water cycle", "evaporation", "condensation", "precipitation"])) {
        return "The water cycle moves water around Earth. Evaporation changes liquid water into water vapour. Condensation forms tiny droplets that make clouds. Precipitation, such as rain or snow, brings water back to Earth's surface." + tip(level);
      }

      if (has(q, ["solar system", "planets", "planet"])) {
        return "Our solar system contains the Sun, eight planets, their moons, and smaller objects. In order from the Sun, the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune." + tip(level);
      }

      if (has(q, ["cell", "cells", "animal cell", "plant cell"])) {
        return "A cell is the basic unit of life. Cells carry out functions needed for living things to survive. Plant cells generally have a cell wall, chloroplasts in photosynthetic tissues, and a large central vacuole. Animal cells do not have a cell wall." + tip(level);
      }

      if (has(q, ["matter", "solid", "liquid", "gas", "states of matter"])) {
        return "Matter is anything that has mass and takes up space. Solids usually keep their shape, liquids flow and take the shape of their container, and gases spread to fill the available space. Heating or cooling can change matter from one state to another." + tip(level);
      }

      if (has(q, ["force", "motion", "friction"])) {
        return "A force is a push or pull that can change an object's motion or shape. Motion means a change in position over time. Friction is a force that resists movement between surfaces in contact." + tip(level);
      }

      if (has(q, ["ecosystem", "food chain", "food web"])) {
        return "An ecosystem includes living organisms and their nonliving environment. A food chain shows how energy moves between organisms. For example, grass can be eaten by a grasshopper, which can be eaten by a frog." + tip(level);
      }

      if (has(q, ["human body", "heart", "lungs", "brain", "organ"])) {
        return "The human body contains organs that work together. The heart pumps blood, the lungs exchange oxygen and carbon dioxide, and the brain coordinates many body functions. Different organ systems support survival and health." + tip(level);
      }

      if (has(q, ["electricity", "electric circuit", "circuit"])) {
        return "Electric current is the flow of electric charge. A simple circuit needs a complete conducting path and an energy source, such as a battery. An open circuit interrupts the path, so current cannot flow through it." + tip(level);
      }

      if (has(q, ["energy", "renewable energy"])) {
        return "Energy is the ability to cause change or do work. Forms include light, heat, chemical, electrical, and kinetic energy. Energy can be transferred or transformed from one form to another." + tip(level);
      }

      if (has(q, ["environment", "pollution", "climate change"])) {
        return "The environment includes living things and the surroundings in which they live. Pollution can harm air, water, and land. People can help protect the environment by reducing waste, conserving resources, and using cleaner energy." + tip(level);
      }

      return "Let's explore Science! I can explain photosynthesis, gravity, the water cycle, planets, cells, matter, forces, ecosystems, the human body, electricity, energy, and the environment. Ask about a specific topic, and I'll give you a clear starting explanation." + tip(level);
    }

    // HISTORY
    if (s.includes("history")) {
      if (has(q, ["ancient egypt", "pyramids", "pharaoh"])) {
        return "Ancient Egypt was a civilization in northeastern Africa along the Nile River. The Nile supported farming, transport, and settlement. Egyptian pyramids were monumental structures built mainly as tombs for pharaohs." + tip(level);
      }

      if (has(q, ["slave trade", "slavery", "transatlantic"])) {
        return "The transatlantic slave trade forcibly transported millions of African people across the Atlantic Ocean, mainly to the Americas, over several centuries. Enslaved people endured violence and exploitation. The trade had lasting effects on families, communities, economies, and societies." + tip(level);
      }

      if (has(q, ["american revolution", "independence of america"])) {
        return "The American Revolution was the struggle by Britain's thirteen North American colonies to become independent. The Declaration of Independence was adopted on July 4, 1776. Britain formally recognized American independence in 1783." + tip(level);
      }

      if (has(q, ["world war i", "first world war", "wwi"])) {
        return "World War I lasted from 1914 to 1918. The assassination of Archduke Franz Ferdinand triggered the crisis that led to war. Alliances, militarism, nationalism, and international rivalries helped turn the crisis into a wider conflict." + tip(level);
      }

      if (has(q, ["world war ii", "second world war", "wwii"])) {
        return "World War II lasted from 1939 to 1945 and involved countries around the world. It caused enormous loss of life and destruction. The Holocaust was the systematic persecution and murder of six million Jews by Nazi Germany and its collaborators." + tip(level);
      }

      if (has(q, ["ghana independence", "independence of ghana", "kwame nkrumah", "ghana"])) {
        return "Ghana, in West Africa, gained independence from British colonial rule on March 6, 1957. Kwame Nkrumah became the country's first prime minister and later its first president. Ghana's independence was an important event in African decolonization." + tip(level);
      }

      if (has(q, ["industrial revolution"])) {
        return "The Industrial Revolution began in Britain in the eighteenth century and spread to other regions. New machines, factories, and transport systems changed how goods were made and how people lived and worked." + tip(level);
      }

      if (has(q, ["colonialism", "colonization", "colonial rule"])) {
        return "Colonialism occurs when a country or power controls another territory and its people. Colonial rule often involved taking resources and limiting local political control. Its effects differed across regions and continue to shape many societies." + tip(level);
      }

      if (has(q, ["history", "historian", "past events"])) {
        return "History is the study of people and events of the past. Historians examine sources such as documents, photographs, objects, and oral accounts. They compare evidence to understand what happened, why it happened, and how it affected people." + tip(level);
      }

      return "Let's explore History! I can explain Ancient Egypt, the transatlantic slave trade, the American Revolution, World War I, World War II, Ghana's independence, colonialism, and the Industrial Revolution. Ask about a particular event, person, place, or time period." + tip(level);
    }

    // GEOGRAPHY
    if (s.includes("geography")) {
      if (has(q, ["continents", "continent"])) {
        return "The seven commonly recognized continents are Africa, Antarctica, Asia, Europe, North America, South America, and Australia. Some educational traditions group continents differently." + tip(level);
      }

      if (has(q, ["largest ocean", "biggest ocean", "oceans"])) {
        return "The Pacific Ocean is the largest ocean on Earth. The five commonly named oceans are the Pacific, Atlantic, Indian, Southern, and Arctic Oceans." + tip(level);
      }

      if (has(q, ["equator", "hemisphere"])) {
        return "The Equator is an imaginary line at 0 degrees latitude. It circles Earth and divides it into the Northern and Southern Hemispheres. The Equator receives strong sunlight throughout the year." + tip(level);
      }

      if (has(q, ["latitude", "longitude", "coordinates"])) {
        return "Latitude measures how far north or south a location is from the Equator. Longitude measures how far east or west it is from the Prime Meridian. Together, they help identify locations on Earth." + tip(level);
      }

      if (has(q, ["weather", "climate"])) {
        return "Weather describes atmospheric conditions over a short period, such as today's rain or temperature. Climate describes the usual patterns of weather in a place over many years." + tip(level);
      }

      if (has(q, ["river", "rivers"])) {
        return "A river is a natural flow of water moving through a channel. Rivers may flow into other rivers, lakes, or seas. They provide water, support farming and ecosystems, and can shape land through erosion." + tip(level);
      }

      if (has(q, ["mountain", "mountains"])) {
        return "A mountain is a raised part of Earth's surface that rises high above its surroundings. Mountains can form when tectonic plates collide, when Earth's crust shifts, or through volcanic activity." + tip(level);
      }

      if (has(q, ["ghana", "accra"])) {
        return "Ghana is a country in West Africa. Its capital is Accra, its official language is English, and it gained independence on March 6, 1957. Ghana borders Côte d'Ivoire, Burkina Faso, and Togo." + tip(level);
      }

      if (has(q, ["map", "maps", "map scale", "direction"])) {
        return "A map represents all or part of Earth's surface. A map key explains symbols, a scale compares map distance with real distance, and a compass rose shows directions. Different maps show roads, physical features, populations, or political boundaries." + tip(level);
      }

      if (has(q, ["volcano", "earthquake", "tectonic plates"])) {
        return "Earth's outer shell is divided into tectonic plates that move slowly. Their movement can form mountains, trigger earthquakes, and contribute to volcanic activity. These processes continually change Earth's surface." + tip(level);
      }

      if (has(q, ["desert", "forest", "landform", "plain", "plateau"])) {
        return "Landforms are natural features of Earth's surface. Examples include mountains, valleys, plains, and plateaus. Deserts receive very little precipitation, while forests contain many trees and support diverse wildlife." + tip(level);
      }

      if (has(q, ["population", "migration", "urbanization"])) {
        return "Population geography studies where people live and how populations change. Migration is the movement of people from one place to another. Urbanization is the growth of towns and cities as people move into urban areas." + tip(level);
      }

      return "Let's explore Geography! I can explain continents, oceans, maps, latitude, longitude, the Equator, weather, climate, rivers, mountains, Ghana, volcanoes, landforms, and population. Ask about a place or geographical process for a clearer explanation." + tip(level);
    }

    // SOCIAL STUDIES
    if (s.includes("social")) {
      if (has(q, ["democracy", "election", "voting"])) {
        return "Democracy is a system of government in which people have a role in political decision-making, often by voting for representatives. Democratic systems rely on laws, participation, rights, and accountability." + tip(level);
      }

      if (has(q, ["citizenship", "citizen", "responsibilities of citizens"])) {
        return "Citizenship is membership in a country or political community. Citizens have rights and responsibilities. These may include obeying laws, respecting others, participating in community life, and voting when eligible." + tip(level);
      }

      if (has(q, ["community", "communities"])) {
        return "A community is a group of people connected by a place, interests, or relationships. Families, schools, neighbourhoods, and organizations can all form communities. Members can work together to solve problems and meet shared needs." + tip(level);
      }

      if (has(q, ["culture", "tradition", "customs"])) {
        return "Culture includes the language, customs, beliefs, arts, food, and traditions shared by a group of people. Culture can change over time, and people within the same community may have different traditions." + tip(level);
      }

      if (has(q, ["government", "president", "parliament"])) {
        return "A government organizes a country or community. Its responsibilities can include making and enforcing laws, providing public services, protecting rights, and managing public resources. The structure of government differs among countries." + tip(level);
      }

      if (has(q, ["human rights", "rights of children", "children's rights"])) {
        return "Human rights are basic rights and freedoms that belong to all people. Examples include the right to life, education, and freedom from torture. Children's rights also recognize children's need for protection, development, and care." + tip(level);
      }

      if (has(q, ["family", "family roles"])) {
        return "A family is a group of people connected through relationships such as birth, marriage, adoption, or care. Families can provide support, teach values, share responsibilities, and help members meet their needs." + tip(level);
      }

      if (has(q, ["environment", "environmental protection", "sanitation"])) {
        return "A healthy environment supports people, plants, and animals. Communities can protect it by disposing of waste properly, keeping water sources clean, planting trees, reducing pollution, and conserving resources." + tip(level);
      }

      if (has(q, ["conflict", "conflict resolution", "peace"])) {
        return "Conflict happens when people disagree or have competing needs. Peaceful conflict resolution includes listening carefully, respecting different views, explaining concerns calmly, finding common ground, and agreeing on a fair solution." + tip(level);
      }

      if (has(q, ["resources", "natural resources", "economic activity"])) {
        return "Resources are things people use to meet their needs. Natural resources include water, soil, forests, and minerals. People can use resources for farming, building, transport, and industry, but responsible management helps protect them for the future." + tip(level);
      }

      return "Let's explore Social Studies! I can explain democracy, citizenship, government, communities, culture, human rights, families, environmental protection, conflict resolution, and resources. Ask about a particular topic for a clear explanation." + tip(level);
    }

    // General fallback for any subject
    return "Thank you for your question about " + subject + ". I can explain many common school topics using built-in lessons, but I do not yet have an answer for every possible question. Try asking about a specific topic, or give an example of what you are studying. A connected AI service will allow Kaakyire to answer a much wider range of questions." + tip(level);
  }

  // Small helper for matching topic words.
  function has(text, words) {
    return words.some(function (word) {
      return text.includes(word);
    });
  }

  // MATHEMATICS CALCULATOR
  function solveMath(question) {
    let text = question
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/[×✕]/g, "*")
      .replace(/[÷]/g, "/")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\btimes\b/g, "*")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bwhat is\b/g, "")
      .replace(/\bcalculate\b/g, "")
      .replace(/[?]/g, "")
      .trim();

    // Convert "12 x 8" into "12 * 8".
    text = text.replace(/(\d)\s*x\s*(\d)/g, "$1 * $2");

    // Percentage: 20% of 50
    const percentage = text.match(
      /(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)/
    );

    if (percentage) {
      const percent = Number(percentage[1]);
      const number = Number(percentage[2]);
      const result = (percent / 100) * number;

      return percent + "% of " + number + " = " + formatNumber(result) +
        "\n\nStep 1: Change " + percent + "% to a decimal: " +
        formatNumber(percent / 100) + ".\n" +
        "Step 2: Multiply " + number + " by " +
        formatNumber(percent / 100) + ".\n" +
        "Step 3: The answer is " + formatNumber(result) + ".";
    }

    // Simple linear equations, such as 2x + 3 = 7.
    const equation = text.match(
      /^\s*(-?\d*\.?\d*)\s*x\s*([+-]\s*\d+(?:\.\d+)?)?\s*=\s*(-?\d+(?:\.\d+)?)\s*$/i
    );

    if (equation) {
      let aText = equation[1];
      if (aText === "" || aText === "+") aText = "1";
      if (aText === "-") aText = "-1";

      const a = Number(aText);
      const b = equation[2]
        ? Number(equation[2].replace(/\s/g, ""))
        : 0;
      const c = Number(equation[3]);

      if (a === 0) {
        return "The coefficient of x cannot be zero for this simple equation solver. Please check the equation.";
      }

      if ([a, b, c].every(Number.isFinite)) {
        const x = (c - b) / a;

        return "Let's solve the equation step by step.\n\n" +
          "Starting equation: " + a + "x " +
          (b >= 0 ? "+ " + b : "- " + Math.abs(b)) +
          " = " + c + "\n" +
          "Step 1: Move the constant " + b +
          " to the other side by using the opposite operation.\n" +
          "Step 2: Divide both sides by " + a + ".\n" +
          "Answer: x = " + formatNumber(x) + ".";
      }
    }

    // Basic arithmetic with two numbers.
    const match = text.match(
      /(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/
    );

    if (!match) return null;

    const a = Number(match[1]);
    const operator = match[2];
    const b = Number(match[3]);
    let result;

    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) {
          return "You cannot divide by zero. Please try another calculation.";
        }
        result = a / b;
        break;
      default:
        return null;
    }

    if (!Number.isFinite(result)) return null;

    return "Let's solve " + a + " " + operator + " " + b + ".\n\n" +
      "Step 1: Identify the numbers: " + a + " and " + b + ".\n" +
      "Step 2: Apply the operation " + operator + ".\n" +
      "Step 3: Calculate the result.\n\n" +
      "Answer: " + formatNumber(result) + ".";
  }

  function formatNumber(number) {
    return Number.isFinite(number)
      ? String(Number(number.toFixed(8)))
      : String(number);
  }

  function tip(level) {
    if (level === "Easy") {
      return "\n\nStudy tip: Try explaining this idea in your own words.";
    }

    if (level === "Hard") {
      return "\n\nChallenge: Think of another example and explain why it works.";
    }

    return "\n\nStudy tip: Write down the main idea and one example.";
  }
});
