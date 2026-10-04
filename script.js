const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");

askButton.addEventListener("click", function () {
  const question = questionInput.value.trim();

  if (question === "") {
    answer.textContent = "Please enter a school question.";
    return;
  }

  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("photosynthesis")) {
    answer.textContent =
      "Photosynthesis is the process plants use to make their own food. Plants use sunlight, water, and carbon dioxide to make food and release oxygen.";
  } else if (lowerQuestion.includes("math") || lowerQuestion.includes("mathematics")) {
    answer.textContent =
      "I can help you with mathematics. Enter a math problem, and we can work through it step by step.";
  } else if (lowerQuestion.includes("science")) {
    answer.textContent =
      "Science helps us understand the world around us. Ask me about a science topic, and I can explain it in simple steps.";
  } else if (lowerQuestion.includes("english")) {
    answer.textContent =
      "I can help you understand English, including reading, writing, grammar, vocabulary, and comprehension.";
  } else {
    answer.textContent =
      "Thank you for your question! Kaakyire Learning AI is here to help you understand your schoolwork step by step.";
  }
});


  
