"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("question-form");
  const subjectInput = document.getElementById("subject");
  const difficultyInput = document.getElementById("difficulty");
  const questionInput = document.getElementById("question");
  const askButton = document.getElementById("ask-button");
  const answerBox = document.getElementById("answer");
  const statusBox = document.getElementById("status");

  // Check that the page and JavaScript are connected.
  if (
    !form ||
    !subjectInput ||
    !difficultyInput ||
    !questionInput ||
    !askButton ||
    !answerBox ||
    !statusBox
  ) {
    console.error(
      "Kaakyire could not find one or more required HTML elements."
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
    askButton.textContent = "Working...";
    statusBox.textContent = "Preparing your explanation...";
    answerBox.textContent = "";

    try {
      const response = getLearningAnswer(subject, question, level);
      answerBox.textContent = response;
      statusBox.textContent = "Your answer is ready.";
    } catch (error) {
      console.error("Kaakyire error:", error);
      answerBox.textContent =
        "Sorry, something went wrong. Please check the JavaScript code and try again.";
      statusBox.textContent = "An error occurred.";
    } finally {
      askButton.disabled = false;
      askButton.textContent = "Ask Kaakyire";
    }
  });

  function getLearningAnswer(subject, question, level) {
    const q = question.toLowerCase().trim();

    if (subject === "Mathematics") {
      const mathAnswer = solveMath(q);

      if (mathAnswer !== null) {
        return mathAnswer;
      }
    }
    
    const lessons = {
      "English": [
        {
          words: ["noun"],
          answer: "A noun names a person, place, thing, or idea. Examples include teacher, school, book, and kindness. In the sentence 'The student reads a book,' student and book are nouns."
        },
        {
          words: ["verb"],
          answer: "A verb expresses an action or a state of being. Examples include run, write, think, is, and are. In 'The child runs,' runs is the verb."
        },
        {
          words: ["adjective"],
          answer: "An adjective describes a noun or pronoun. For example, in 'The tall tree is green,' tall and green describe the tree."
        },
        {
          words: ["adverb"],
          answer: "An adverb often describes a verb, adjective, or another adverb. In 'She reads carefully,' carefully tells us how she reads."
        },
        {
          words: ["pronoun"],
          answer: "A pronoun replaces a noun. Examples include I, you, he, she, it, we, and they. Instead of 'Ama is reading,' you can say 'She is reading.'"
        },
        {
          words: ["punctuation", "comma", "full stop", "period"],
          answer: "Punctuation makes writing easier to understand. A full stop ends a statement. A comma separates items or parts of a sentence. A question mark ends a direct question."
        },
        {
          words: ["simile"],
          answer: "A simile compares two things using 'like' or 'as.' Example: 'She is as brave as a lion.' The comparison helps readers imagine the person's bravery."
        },
        {
          words: ["metaphor"],
          answer: "A metaphor describes one thing as another to make a comparison. For example, 'Time is a thief' suggests that time takes moments away from us."
        },
        {
          words: ["synonym"],
          answer: "A synonym is a word with the same or a similar meaning as another word. For example, happy and joyful are synonyms."
        },
        {
          words: ["antonym"],
          answer: "An antonym is a word with the opposite meaning of another word. For example, hot and cold are antonyms."
        },
        {
          words: ["essay", "paragraph"],
          answer: "A good paragraph usually focuses on one main idea. Begin with a topic sentence, add supporting details or examples, and finish with a sentence that connects or concludes the idea."
        }
      ],

      "Science": [
        {
          words: ["photosynthesis"],
          answer: "Photosynthesis is the process plants use to make food. Plants use light energy, water, and carbon dioxide to produce sugar and release oxygen. Chlorophyll in leaves captures light energy."
        },
        {
          words: ["gravity"],
          answer: "Gravity is a force of attraction between objects that have mass. Earth's gravity pulls objects toward its center, which is why a dropped ball falls to the ground."
        },
        {
          words: ["water cycle"],
          answer: "The water cycle moves water around Earth. The Sun heats water, causing evaporation. Water vapor cools and condenses into clouds. Then precipitation, such as rain or snow, returns water to Earth's surface."
        },
        {
          words: ["solar system", "planet", "planets"],
          answer: "Our solar system includes the Sun, eight planets, their moons, and many smaller objects. The planets, in order from the Sun, are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
        },
        {
          words: ["cell", "cells"],
          answer: "A cell is the basic unit of life. Many living things are made of one cell, while plants and animals are made of many cells. Plant cells usually have a cell wall and chloroplasts; animal cells do not."
        },
        {
          words: ["force", "motion"],
          answer: "A force is a push or pull that can change an object's motion or shape. Motion describes a change in an object's position over time. Friction is a force that resists sliding between surfaces."
        },
        {
          words: ["matter"],
          answer: "Matter is anything that has mass and takes up space. The three common states are solid, liquid, and gas. Solids keep their shape, liquids flow, and gases spread to fill their container."
        },
        {
          words: ["ecosystem", "food chain"],
          answer: "An ecosystem includes living organisms and their nonliving environment. In a food chain, energy moves from one organism to another. For example, grass can be eaten by a grasshopper, which can be eaten by a frog."
        }
      ],

      "History": [
        {
          words: ["ancient egypt", "egyptian pyramids", "pyramids"],
          answer: "Ancient Egypt was a civilization in northeastern Africa along the Nile River. The Nile supported farming and travel. Egyptian pyramids were monumental structures built mainly as tombs for pharaohs."
        },
        {
          words: ["transatlantic slave trade", "slave trade"],
          answer: "The transatlantic slave trade forcibly transported millions of African people across the Atlantic Ocean, mainly to the Americas, over several centuries. Enslaved people endured violence and exploitation, and the trade had lasting effects on societies and families."
        },
        {
          words: ["american revolution", "independence of america"],
          answer: "The American Revolution was the struggle by Britain's thirteen North American colonies to become independent. The Declaration of Independence was adopted on July 4, 1776. The war ended with Britain's recognition of American independence in 1783."
        },
        {
          words: ["world war i", "first world war"],
          answer: "World War I lasted from 1914 to 1918. It involved many countries and alliances. The assassination of Archduke Franz Ferdinand was the immediate trigger, while rivalries and militarism contributed to the wider conflict."
        },
        {
          words: ["world war ii", "second world war"],
          answer: "World War II lasted from 1939 to 1945. It involved countries around the world and caused enormous loss of life. The Holocaust was the systematic persecution and murder of six million Jews by Nazi Germany and its collaborators, alongside other victims."
        },
        {
          words: ["history"],
          answer: "History is the study of people and events of the past. Historians examine evidence such as documents, photographs, artifacts, and oral accounts to understand what happened and why."
        }
      ],

      "Geography": [
        {
          words: ["continent", "continents"],
          answer: "The seven commonly recognized continents are Africa, Antarctica, Asia, Europe, North America, South America, and Australia. A continent is a large landmass, though the way continents are grouped can vary by educational tradition."
        },
        {
          words: ["equator"],
          answer: "The Equator is an imaginary line around Earth at 0 degrees latitude. It divides Earth into the Northern and Southern Hemispheres."
        },
        {
          words: ["weather", "climate"],
          answer: "Weather describes atmospheric conditions over a short period, such as today's rain or temperature. Climate describes the usual patterns of weather in a place over many years."
        },
        {
          words: ["river", "rivers"],
          answer: "A river is a natural flow of water moving through a channel toward another river, a lake, or the sea. Rivers can provide water, support farming, and shape the land through erosion."
        },
        {
          words: ["map", "latitude", "longitude"],
          answer: "Maps represent places and features of Earth. Latitude measures position north or south of the Equator. Longitude measures position east or west of the Prime Meridian."
        },
        {
          words: ["ghana"],
          answer: "Ghana is a country in West Africa. Its capital is Accra, its official language is English, and it borders Côte d'Ivoire, Burkina Faso, and Togo. Ghana gained independence from British rule on March 6, 1957."
        }
      ],

      "Social Studies": [
        {
          words: ["democracy"],
          answer: "Democracy is a system of government in which people have a role in making political decisions, often by voting for representatives. Democratic systems also depend on laws, rights, participation, and accountability."
        },
        {
          words: ["citizen", "citizenship"],
          answer: "Citizenship is membership in a country or political community. Citizens may have rights, such as legal protection, and responsibilities, such as obeying laws and participating responsibly in their community."
        },
        {
          words: ["community"],
          answer: "A community is a group of people who share a place, interests, or connections. Communities work together through families, schools, local organizations, and public services to meet people's needs."
        },
        {
          words: ["culture"],
          answer: "Culture includes the customs, language, beliefs, arts, food, and traditions shared by a group of people. Cultures can change over time and may include many different traditions within one community."
        },
        {
          words: ["government"],
          answer: "A government organizes a country or community. Its responsibilities can include making and enforcing laws, providing public services, protecting rights, and managing public resources."
        },
        {
          words: ["human rights", "rights"],
          answer: "Human rights are basic rights and freedoms that belong to all people. Examples include the right to life, education, and freedom from torture. Human rights apply regardless of a person's background."
        }
      ]
    };

    const subjectLessons = lessons[subject] || [];
    for (const lesson of subjectLessons) {
      if (lesson.words.some(word => q.includes(word))) {
        return lesson.answer + getStudyTip(level);
      }
    }

    if (subject === "Mathematics") {
      return "Let's work through the math problem carefully. Try entering a calculation such as '12 × 8', '144 divided by 12', 'What is 25% of 80?', or 'Solve 2x + 3 = 11'. This version can solve common arithmetic and simple linear equations.";
    }

    return "I received your " + subject + " question: \"" + question + "\".\n\nThis version has a small built-in lesson library, so it cannot accurately answer every possible question yet. Try asking about a specific topic such as photosynthesis, nouns, the water cycle, ancient Egypt, continents, or democracy.\n\nA real AI service will be needed for flexible answers to new questions. This version is not connected to that service yet." + getStudyTip(level);
  }

  function getStudyTip(level) {
    if (level === "Easy") {
      return "\n\nStudy tip: Explain the main idea in your own words, as if you were teaching a friend.";
    }

    if (level === "Hard") {
      return "\n\nChallenge: Find another example, explain why the idea works, and consider when it might not apply.";
    }

    return "\n\nStudy tip: Write down the main idea and one example to help you remember it.";
  }

  function solveMath(q) {
    let s = q
      .replace(/,/g, "")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\btimes\b/g, "*")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bnegative\b/g, "-")
      .replace(/\bwhat is\b/g, "")
      .replace(/\bcalculate\b/g, "")
      .replace(/\bsolve\b/g, "")
      .replace(/[?=]/g, " ")
      .trim();

    // Handle percentage questions such as "25% of 80".
    const percent = s.match(/(-?\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(-?\d+(?:\.\d+)?)/);
    if (percent) {
      const p = Number(percent[1]);
      const n = Number(percent[2]);
      const result = (p / 100) * n;
      return p + "% of " + n + " = " + formatNumber(result) +
        "\n\nStep 1: Convert " + p + "% to a decimal: " + p + " ÷ 100 = " + (p / 100) +
        "\nStep 2: Multiply by " + n + ".\nStep 3: The answer is " + formatNumber(result) + ".";
    }

    // Handle simple linear equations such as 2x + 3 = 11.
    const equation = q.match(/^\s*(-?\d*\.?\d*)\s*x\s*([+-]\s*\d*\.?\d+)?\s*=\s*(-?\d*\.?\d+)\s*\??\s*$/i);
    if (equation) {
      let aText = equation[1];
      const a = aText === "" || aText === "+" ? 1 :
        aText === "-" ? -1 : Number(aText);
      const b = equation[2] ? Number(equation[2].replace(/\s/g, "")) : 0;
      const c = Number(equation[3]);

      if (Number.isFinite(a) && a !== 0 && Number.isFinite(b) && Number.isFinite(c)) {
        const x = (c - b) / a;
        return "Let's solve " + q.replace(/\?$/, "") + ".\n\n" +
          "Step 1: Start with " + a + "x " + (b >= 0 ? "+ " + b : "- " + Math.abs(b)) + " = " + c + ".\n" +
          "Step 2: Subtract " + b + " from both sides.\n" +
          "Step 3: Divide both sides by " + a + ".\n" +
          "Answer: x = " + formatNumber(x) + ".";
      }
    }

    // Find two numbers and an arithmetic operator.
    const match = s.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/);

    if (!match) {
      return null;
    }

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);
    let result;

    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else if (op === "/") {
      if (b === 0) return "You cannot divide a number by zero. Try a different divisor.";
      result = a / b;
    } else return null;

    const symbol = { "+": "plus", "-": "minus", "*": "multiplied by", "/": "divided by" }[op];

    return "Let's solve " + a + " " + symbol + " " + b + ".\n\n" +
      "Step 1: Identify the two numbers: " + a + " and " + b + ".\n" +
      "Step 2: Perform the operation " + op + ".\n" +
      "Step 3: Calculate the result.\n\n" +
      "Answer: " + formatNumber(result) + ".";
  }

  function formatNumber(number) {
    if (!Number.isFinite(number)) return String(number);
    return Number(number.toFixed(8)).toString();
  }
});
