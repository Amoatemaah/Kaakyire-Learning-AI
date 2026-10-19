

We are building Kaakyire Learning AI
Yes! ❤️ We are building Kaakyire Learning AI, and we will continue working on it together, step by step.

I understand what you want. You do not want a basic website that only displays a few buttons. You want a learning assistant that can help students understand their schoolwork and get useful answers.

Our goal for Kaakyire Learning AI
PSLE Tuition Singapore | Best PSLE Tutors For Your Child

1. Mathematics

Fractions, multiplication, division, algebra, geometry, word problems, and step-by-step solutions.

MindSpring Light – Admissions

2. English

Grammar, spelling, reading comprehension, essays, vocabulary, and writing assistance.

Academic Life | Brighton College Abu Dhabi

3. Science

Biology, chemistry, physics, the human body, plants, animals, and scientific explanations.

Infrastructures | St Therese's School, Padrauna

4. Social Studies, History, and more

Geography, government, world history, civics, homework, assignments, and study plans.

Where we are now
Your website homepage is opening, but Ask Kaakyire is not giving answers yet. We need to fix the JavaScript in script.js so the website can respond correctly.

We also need to connect an AI service if we want Kaakyire to answer a wide variety of questions intelligently, rather than relying only on answers written into the code.

Let's continue from where we stopped.

You told me that you have not replaced the old script.js code yet.

Are you ready to open script.js now so we can replace the old code with the complete version, step by step?

For building AI apps with vector search, here’s a database option to consider.



The one thing I need is the code for the script
Yes! ❤️ Let's focus on the most important part: the complete script.js code for Kaakyire Learning AI.

This version includes Mathematics, English, Science, Social Studies, History, homework help, essay writing, study plans, and step-by-step explanations. It also connects to an AI backend when one is configured. The built-in responses provide basic help if the AI service is not connected, but they cannot answer every possible question.

Important: A JavaScript file in the browser cannot securely hold your private AI API key. For full AI-powered answers, we will connect it to a secure backend later.

Step 1: Replace the code in script.js
Open script.js, select all the old code, and replace it with the following.


/* =========================================================
   KAAKYIRE LEARNING AI
   Main application script
   Subjects: Mathematics, English, Science, Social Studies,
   History, Geography, Homework, Essays and Study Plans
   ========================================================= */

"use strict";

// ---------------------------------------------------------
// 1. APPLICATION SETTINGS
// ---------------------------------------------------------

const KAAKYIRE_CONFIG = {
  appName: "Kaakyire Learning AI",

  // Leave empty until we create and deploy the secure backend.
  // Example: "/api/ask"
  apiEndpoint: "",

  maxQuestionLength: 5000
};

const SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Social Studies",
  "History",
  "Geography",
  "Homework Help",
  "Essay Writing",
  "Study Plans",
  "General Question"
];

const state = {
  lastQuestion: "",
  lastAnswer: "",
  lastSubject: "General Question",
  busy: false
};

// ---------------------------------------------------------
// 2. FIND THE WEBSITE ELEMENTS
// ---------------------------------------------------------

function findElement(...selectors) {
  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element) {
      return element;
    }
  }

  return null;
}

function getQuestionInput() {
  return findElement(
    "#question",
    "#userQuestion",
    "#questionInput",
    "#topic",
    "#topicInput",
    "#user-input",
    "#messageInput",
    "#prompt",
    "textarea",
    'input[type="text"]'
  );
}

function getAnswerContainer() {
  return findElement(
    "#answer",
    "#answerBox",
    "#response",
    "#responseBox",
    "#chatResponse",
    "#chatMessages",
    "#chat-container",
    "#chatContainer",
    "#results",
    "#output"
  );
}

function getAskButton() {
  return findElement(
    "#askButton",
    "#askBtn",
    "#askKaakyire",
    "#submitQuestion",
    "#sendButton",
    "#sendBtn",
    "#submitBtn",
    "#ask-button"
  );
}

function getStatusElement() {
  return findElement("#status", "#loading", "#statusMessage");
}

// ---------------------------------------------------------
// 3. DISPLAY ANSWERS SAFELY
// ---------------------------------------------------------

function showAnswer(message, type = "answer") {
  let container = getAnswerContainer();

  if (!container) {
    container = document.createElement("section");
    container.id = "kaakyireAnswer";
    container.setAttribute("aria-live", "polite");
    container.style.cssText = [
      "margin-top:20px",
      "padding:18px",
      "border-radius:12px",
      "background:#f3f7ff",
      "color:#172554",
      "line-height:1.7",
      "white-space:pre-wrap",
      "overflow-wrap:anywhere"
    ].join(";");

    const input = getQuestionInput();

    if (input && input.parentElement) {
      input.parentElement.insertAdjacentElement(
        "afterend",
        container
      );
    } else {
      document.body.appendChild(container);
    }
  }

  container.textContent = message;
  container.style.display = "block";
  container.setAttribute("role", "status");

  if (type === "error") {
    container.style.background = "#fff1f2";
    container.style.color = "#9f1239";
  } else {
    container.style.background = "#f3f7ff";
    container.style.color = "#172554";
  }
}

function setBusy(isBusy) {
  state.busy = isBusy;

  const button = getAskButton();
  const status = getStatusElement();

  if (button) {
    button.disabled = isBusy;

    if (!button.dataset.originalText) {
      button.dataset.originalText =
        button.textContent.trim() || "Ask Kaakyire";
    }

    button.textContent = isBusy
      ? "Thinking..."
      : button.dataset.originalText;
  }

  if (status) {
    status.textContent = isBusy
      ? "Kaakyire is working on your question..."
      : "";
  }
}

// ---------------------------------------------------------
// 4. IDENTIFY THE SUBJECT
// ---------------------------------------------------------

function detectSubject(question) {
  const text = question.toLowerCase();

  const patterns = [
    {
      subject: "Mathematics",
      words: /\b(math|mathematics|calculate|equation|fraction|algebra|geometry|multiply|multiplication|divide|division|percentage|percent|decimal|perimeter|area|volume|solve|addition|subtraction|probability|ratio|average|square root|slope|quadratic|times table)\b/
    },
    {
      subject: "English",
      words: /\b(english|grammar|spelling|punctuation|vocabulary|verb|noun|adjective|adverb|pronoun|sentence|reading comprehension|figurative language|simile|metaphor|synonym|antonym|paragraph|parts of speech)\b/
    },
    {
      subject: "Science",
      words: /\b(science|biology|chemistry|physics|cell|photosynthesis|atom|molecule|gravity|electricity|energy|ecosystem|human body|planet|force|experiment|weather|water cycle|organism|chemical reaction)\b/
    },
    {
      subject: "Social Studies",
      words: /\b(social studies|government|citizenship|civics|community|culture|economics|constitution|democracy|election|rights|responsibilities)\b/
    },
    {
      subject: "History",
      words: /\b(history|historical|ancient|civilization|revolution|slavery|civil war|world war|independence|colonialism|president|historical event)\b/
    },
    {
      subject: "Geography",
      words: /\b(geography|continent|country|capital city|latitude|longitude|map|mountain|river|ocean|climate|population|landform|natural resources)\b/
    },
    {
      subject: "Essay Writing",
      words: /\b(essay|thesis|introduction|conclusion|argument|persuasive|evidence|paragraph|outline|research paper|citation|cite sources)\b/
    },
    {
      subject: "Study Plans",
      words: /\b(study plan|study schedule|exam preparation|prepare for a test|revision schedule|study timetable|time management)\b/
    },
    {
      subject: "Homework Help",
      words: /\b(homework|assignment|schoolwork|worksheet|project|due date|classwork)\b/
    }
  ];

  for (const pattern of patterns) {
    if (pattern.words.test(text)) {
      return pattern.subject;
    }
  }

  return "General Question";
}

// ---------------------------------------------------------
// 5. BASIC MATHEMATICS SUPPORT
// ---------------------------------------------------------

function solveBasicMath(question) {
  const text = question.toLowerCase().trim();

  // Only evaluate simple numeric expressions.
  // Never execute arbitrary JavaScript supplied by a user.
  const expressionMatch = text.match(
    /(?:what is|calculate|solve|evaluate|find the value of)\s+(-?\d+(?:\.\d+)?(?:\s*[\+\-*/×÷]\s*-?\d+(?:\.\d+)?)+)\s*\??$/
  );

  let expression = expressionMatch
    ? expressionMatch[1]
    : text.match(
        /^(-?\d+(?:\.\d+)?(?:\s*[\+\-*/×÷]\s*-?\d+(?:\.\d+)?)+)\s*\??$/
      )?.[1];

  if (!expression) {
    const percentMatch = text.match(
      /what is\s+(\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)/
    );

    if (percentMatch) {
      const percent = Number(percentMatch[1]);
      const number = Number(percentMatch[2]);
      const answer = (percent / 100) * number;

      return `${percent}% of ${number} = ${answer}\n\nStep 1: Convert ${percent}% into a decimal by dividing by 100.\n${percent} ÷ 100 = ${percent / 100}\n\nStep 2: Multiply the decimal by ${number}.\n${percent / 100} × ${number} = ${answer}`;
    }

    return null;
  }

  expression = expression.replace(/[×]/g, "*");
  expression = expression.replace(/[÷]/g, "/");
  expression = expression.replace(/\s+/g, "");

  if (!/^[\d.+*/-]+$/.test(expression)) {
    return null;
  }

  const numbers = expression.match(
    /(?:^|[*/+-])-?\d+(?:\.\d+)?/g
  );

  if (!numbers) {
    return null;
  }

  // A tiny arithmetic parser with operator precedence.
  const tokens = expression.match(
    /-?\d+(?:\.\d+)?|[+*/-]/g
  );

  if (!tokens) {
    return null;
  }

  const values = [];
  const operators = [];

  let expectNumber = true;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (expectNumber) {
      if (token === "-") {
        const next = Number(tokens[++i]);

        if (!Number.isFinite(next)) return null;

        values.push(-next);
      } else if (token === "+") {
        const next = Number(tokens[++i]);

        if (!Number.isFinite(next)) return null;

        values.push(next);
      } else {
        const value = Number(token);

        if (!Number.isFinite(value)) return null;

        values.push(value);
      }

      expectNumber = false;
    } else {
      if (!["+", "-", "*", "/"].includes(token)) {
        return null;
      }

      operators.push(token);
      expectNumber = true;
    }
  }

  if (expectNumber || values.length !== operators.length + 1) {
    return null;
  }

  // Handle multiplication and division first.
  for (let i = 0; i < operators.length;) {
    const op = operators[i];

    if (op === "*" || op === "/") {
      const a = values[i];
      const b = values[i + 1];

      if (op === "/" && b === 0) {
        return "Division by zero is undefined. Please use a nonzero divisor.";
      }

      const result = op === "*" ? a * b : a / b;

      values.splice(i, 2, result);
      operators.splice(i, 1);
    } else {
      i++;
    }
  }

  let result = values[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += values[i + 1];
    } else {
      result -= values[i + 1];
    }
  }

  if (!Number.isFinite(result)) return null;

  return `Let's solve it step by step!\n\nExpression: ${expression.replace(/\*/g, " × ").replace(/\//g, " ÷ ")}\n\nApply multiplication and division before addition and subtraction. Then calculate from left to right for operations with the same priority.\n\nAnswer: ${Number(result.toPrecision(10))}`;
}

// ---------------------------------------------------------
// 6. BUILT-IN LEARNING HELP
// ---------------------------------------------------------

function getBuiltInAnswer(question, subject) {
  const text = question.toLowerCase().trim();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
    return "Hello! Welcome to Kaakyire Learning AI! 😊\n\nWhat would you like to learn today? I can help you practise Mathematics, English, Science, History, Social Studies, and more.\n\nType your question, and we will work through it together.";
  }

  if (/^(who are you|what are you|what is kaakyire)\??$/.test(text)) {
    return "I am Kaakyire Learning AI, your learning assistant. I am designed to help students understand school subjects, practise problems, improve writing, and organise their studies.";
  }

  if (/thank you|thanks/.test(text)) {
    return "You're welcome! Keep learning and asking questions. 😊";
  }

  // Arithmetic questions.
  const mathAnswer = solveBasicMath(question);

  if (mathAnswer) {
    return mathAnswer;
  }

  // Common maths facts.
  if (/\b(times table|multiplication table)\b/.test(text)) {
    return "Here is the 6 times table:\n\n6 × 1 = 6\n6 × 2 = 12\n6 × 3 = 18\n6 × 4 = 24\n6 × 5 = 30\n6 × 6 = 36\n6 × 7 = 42\n6 × 8 = 48\n6 × 9 = 54\n6 × 10 = 60\n\nTell me which number's times table you would like to practise.";
  }

  if (/\bwhat is a fraction\b|\bexplain fractions\b/.test(text)) {
    return "A fraction represents part of a whole.\n\nFor example, 3/4 means three out of four equal parts.\n\nThe top number (3) is the numerator. The bottom number (4) is the denominator.\n\nExample: If a pizza is divided into 4 equal slices and you eat 3, you have eaten 3/4 of the pizza.\n\nPractice: What fraction represents 2 parts out of 5 equal parts?";
  }

  if (/\bphotosynthesis\b/.test(text)) {
    return "Photosynthesis is the process plants use to make their own food.\n\nStep 1: The plant absorbs sunlight through its leaves.\nStep 2: Its roots absorb water from the soil.\nStep 3: The leaves take in carbon dioxide from the air.\nStep 4: The plant uses light energy to make glucose (sugar) and releases oxygen.\n\nIn simple terms: sunlight + water + carbon dioxide help a plant make food and release oxygen.";
  }

  if (/\bwater cycle\b/.test(text)) {
    return "The water cycle is the continuous movement of water between Earth's surface and the atmosphere.\n\n1. Evaporation: The Sun heats water, turning it into water vapour.\n2. Condensation: Water vapour cools and forms clouds.\n3. Precipitation: Water falls as rain, snow, sleet, or hail.\n4. Collection: Water gathers in rivers, lakes, oceans, and the ground.\n\nThe cycle then continues.";
  }

  if (/\b(noun|verb|adjective)\b/.test(text) && subject === "English") {
    return "Here is a quick English grammar guide:\n\nA noun names a person, place, thing, or idea. Example: teacher, school, book.\n\nA verb expresses an action or state. Example: run, write, is.\n\nAn adjective describes a noun. Example: a beautiful flower.\n\nExample sentence: The happy student reads.\n- Student = noun\n- Happy = adjective\n- Reads = verb";
  }

  if (/\b(thesis statement|write a thesis|essay outline)\b/.test(text)) {
    return "A thesis statement presents the main argument or point of an essay.\n\nExample topic: Online learning.\n\nExample thesis: Online learning can benefit students because it provides flexibility, expands access to educational resources, and allows learners to study at their own pace.\n\nA simple essay outline:\n1. Introduction and thesis statement\n2. Body paragraph 1 with evidence\n3. Body paragraph 2 with evidence\n4. Body paragraph 3 with evidence\n5. Conclusion\n\nTell me your essay topic, and I can help you develop your own outline.";
  }

  if (/\b(study plan|study schedule|study timetable)\b/.test(text)) {
    return "Here is a simple one-hour study plan:\n\n0–5 minutes: Choose your learning goal.\n5–20 minutes: Read your notes or textbook.\n20–35 minutes: Practise questions.\n35–45 minutes: Check your answers and correct mistakes.\n45–55 minutes: Explain what you learned in your own words.\n55–60 minutes: Review the key points and plan your next session.\n\nTell me your subjects and test date so I can help you make a more personal study schedule.";
  }

  if (/\b(photosynthesis|gravity|ecosystem|atom|electricity|human body|planet|energy)\b/.test(text)) {
    return "Let's learn this topic step by step.\n\nFirst, identify the key idea. Next, connect it to a real-life example. Finally, explain the idea in your own words and practise a question.\n\nPlease tell me which part of this topic you find confusing, and I can help you work through it.";
  }

  const subjectAdvice = {
    "Mathematics":
      "Let's solve your mathematics question step by step. I can handle simple arithmetic here. For equations, fractions, geometry, and more advanced problems, the connected AI service will be needed for broader explanations. Please include the complete question.",
    "English":
      "I can help you practise English grammar, spelling, reading comprehension, vocabulary, and writing. Please share the sentence, passage, or assignment instructions you are working on.",
    "Science":
      "I can help you explore biology, chemistry, physics, Earth science, and scientific concepts. Please share the exact question so we can identify the key idea and work through it.",
    "Social Studies":
      "I can help you study communities, government, citizenship, economics, culture, and social studies concepts. Please provide your question and any instructions from your teacher.",
    "History":
      "I can help you examine historical events, people, causes, consequences, and evidence. Please tell me the event or period your question is about.",
    "Geography":
      "I can help you explore maps, continents, countries, climate, landforms, and population. Please share your geography question.",
    "Essay Writing":
      "I can help you plan an introduction, thesis statement, body paragraphs, evidence, citations, and a conclusion. Please share your essay topic and assignment instructions.",
    "Study Plans":
      "I can help you organise your learning into manageable study sessions. Tell me your subjects, available study time, and any upcoming test or due date.",
    "Homework Help":
      "Let's work through your homework together. Share the full question and, if possible, tell me what you have tried so far.",
    "General Question":
      "I'm ready to help you learn! Please provide your complete question, including any numbers, instructions, or relevant passage. For broad, specialised, or current questions, we will need to connect the AI service."
  };

  return (
    `${subjectAdvice[subject] || subjectAdvice["General Question"]}\n\n` +
    "Note: These built-in explanations are limited. To answer a wide range of questions accurately, Kaakyire Learning AI needs its secure AI connection."
  );
}

// ---------------------------------------------------------
// 7. ASK THE CONNECTED AI SERVICE
// ---------------------------------------------------------

async function askAI(question, subject) {
  if (!KAAKYIRE_CONFIG.apiEndpoint) {
    return getBuiltInAnswer(question, subject);
  }

  const response = await fetch(KAAKYIRE_CONFIG.apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      subject,
      appName: KAAKYIRE_CONFIG.appName,
      instructions:
        "You are Kaakyire Learning AI, a friendly educational assistant for students, teachers, and parents. " +
        "Help with Mathematics, English, Science, Social Studies, History, Geography, homework, essays, and study plans. " +
        "Explain concepts clearly, show mathematical steps, adapt explanations to the student's level, and encourage learning. " +
        "Do not invent sources, quotations, or facts. For assignments, help students understand and develop their own work."
    })
  });

  if (!response.ok) {
    throw new Error(
      `The learning service returned an error (${response.status}).`
    );
  }

  const data = await response.json();

  const answer =
    data.answer ??
    data.response ??
    data.message ??
    data.output_text;

  if (typeof answer !== "string" || !answer.trim()) {
    throw new Error("The learning service returned no answer.");
  }

  return answer.trim();
}

// ---------------------------------------------------------
// 8. HANDLE STUDENT QUESTIONS
// ---------------------------------------------------------

async function handleQuestion() {
  if (state.busy) return;

  const input = getQuestionInput();

  if (!input) {
    showAnswer(
      "I could not find the question box on this webpage. Please check that index.html contains a textarea or text input for the question.",
      "error"
    );
    return;
  }

  const question = input.value.trim();

  if (!question) {
    showAnswer("Please type a school question or topic first.", "error");
    input.focus();
    return;
  }

  if (question.length > KAAKYIRE_CONFIG.maxQuestionLength) {
    showAnswer(
      `Please keep your question under ${KAAKYIRE_CONFIG.maxQuestionLength} characters.`,
      "error"
    );
    return;
  }

  const subject = detectSubject(question);

  state.lastQuestion = question;
  state.lastSubject = subject;

  setBusy(true);
  showAnswer(`Kaakyire is thinking about your ${subject} question...`);

  try {
    const answer = await askAI(question, subject);

    state.lastAnswer = answer;

    showAnswer(
      `${subject}\n\n${answer}\n\n— Kaakyire Learning AI`
    );
  } catch (error) {
    console.error("Kaakyire Learning AI error:", error);

    showAnswer(
      "I'm sorry, I could not get an answer from the learning service right now.\n\nPlease check your internet connection or try again later. If this keeps happening, the secure AI backend may need to be checked.",
      "error"
    );
  } finally {
    setBusy(false);
  }
}

// ---------------------------------------------------------
// 9. SUBJECT BUTTONS
// ---------------------------------------------------------

function setupSubjectButtons() {
  const buttons = document.querySelectorAll(
    "[data-subject], .subject-button, .subject-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const subject =
        button.dataset.subject ||
        button.textContent.trim();

      const input = getQuestionInput();

      if (input) {
        input.dataset.selectedSubject = subject;
        input.placeholder = `Ask a ${subject} question...`;
        input.focus();
      }

      state.lastSubject = subject;

      showAnswer(
        `You selected ${subject}.\n\nType your question in the question box and click Ask Kaakyire. I will help you work through it.`
      );
    });
  });
}

// ---------------------------------------------------------
// 10. FOLLOW-UP QUESTIONS
// ---------------------------------------------------------

function setupFollowUp() {
  document.addEventListener("keydown", (event) => {
    const input = getQuestionInput();

    if (
      input &&
      event.target === input &&
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleQuestion();
    }
  });
}

// ---------------------------------------------------------
// 11. START THE APPLICATION
// ---------------------------------------------------------

function initializeKaakyire() {
  const button = getAskButton();

  if (button) {
    button.addEventListener("click", handleQuestion);
  }

  // Support existing forms without requiring a particular ID.
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleQuestion();
    });
  });

  setupSubjectButtons();
  setupFollowUp();

  console.info(
    `${KAAKYIRE_CONFIG.appName} is ready.`
  );

  if (!getQuestionInput()) {
    console.warn(
      "Question input not found. Check the IDs in index.html."
    );
  }

  if (!button && document.querySelectorAll("form").length === 0) {
    console.warn(
      "Ask button not found. Check the IDs in index.html."
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeKaakyire
  );
} else {
  initializeKaakyire();
}
