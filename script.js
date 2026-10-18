const askButton = document.getElementById("ask-button");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");

function sendMessage() {
  const question = questionInput.value.trim();

  if (question === "") {
    answerBox.textContent = "Please enter a school question first.";
    return;
  }

  answerBox.textContent = "Let me help you think through this question...";

  const q = question.toLowerCase();

  if (q.includes("photosynthesis")) {
    answerBox.textContent =
      "Photosynthesis is the process plants use to make their own food. " +
      "Plants use sunlight, water, and carbon dioxide to produce sugar and release oxygen.";
  } else if (
    q.includes("math") ||
    q.includes("what is") && (q.includes("2 + 2") || q.includes("2+2"))
  ) {
    if (q.includes("2 + 2") || q.includes("2+2")) {
      answerBox.textContent = "2 + 2 = 4. You can count two objects and then two more to get four.";
    } else {
      answerBox.textContent =
        "Mathematics is the study of numbers, shapes, patterns, and problem-solving. " +
        "Please enter a specific math problem, and I will try to guide you.";
    }
  } else if (q.includes("gravity")) {
    answerBox.textContent =
      "Gravity is a force that pulls objects toward one another. " +
      "On Earth, gravity pulls objects toward the ground.";
  } else if (q.includes("noun")) {
    answerBox.textContent =
      "A noun is a word that names a person, place, thing, or idea. " +
      "Examples include teacher, school, book, and kindness.";
  } else if (q.includes("verb")) {
    answerBox.textContent =
      "A verb is a word that describes an action or a state of being. " +
      "Examples include run, write, learn, is, and are.";
  } else if (q.includes("water cycle")) {
    answerBox.textContent =
      "The water cycle is the movement of water through evaporation, condensation, and precipitation. " +
      "Water evaporates, forms clouds, and falls back to Earth as rain or snow.";
  } else if (q.includes("social studies") || q.includes("history")) {
    answerBox.textContent =
      "Social Studies helps us understand people, communities, geography, history, and government. " +
      "Please tell me the specific topic you are studying so we can explore it together.";
  } else {
    answerBox.textContent =
      "Thank you for your question! I can currently help with a few common learning topics, " +
      "such as photosynthesis, gravity, nouns, verbs, and the water cycle. " +
      "I do not have a full AI answer service connected yet, so I may not know the answer to every question.";
  }
}

if (askButton && questionInput && answerBox) {
  askButton.addEventListener("click", sendMessage);
}
