document.addEventListener("DOMContentLoaded", () => {
  // KA AKYIRE LEARNING AI
  // Educational learning assistant
  // This version uses built-in educational answers.
  // A connected AI service is needed for open-ended answers.

  let selectedSubject = "general";

  const questionInput = document.querySelector(
    "#questionInput, #question, #userQuestion, #user-question, " +
    "#question-input, input[name='question'], textarea[name='question'], " +
    "textarea, input[type='text']"
  );

  const answerBox = document.querySelector(
    "#answerBox, #answer, #response, #result, #aiResponse, " +
    "#answer-box, #output, #chatResponse, [aria-live='polite']"
  );

  const form = document.querySelector(
    "#questionForm, #askForm, #chatForm, form"
  );

  const askButton = document.querySelector(
    "#askButton, #askBtn, #submitQuestion, #sendButton, " +
    "button[type='submit']"
  );

  const subjectNames = [
    "mathematics", "math", "science", "english",
    "social studies", "history", "geography",
    "computer skills", "reading", "writing"
  ];

  function normalize(text) {
    return text.toLowerCase().replace(/[’']/g, "'").trim();
  }

  function showAnswer(text) {
    if (answerBox) {
      answerBox.textContent = text;
      answerBox.style.whiteSpace = "pre-wrap";
    } else {
      const existing = document.querySelector(
        "#answerBox, #answer, #response, #result, #aiResponse, #output"
      );

      if (existing) {
        existing.textContent = text;
      } else {
        alert(text);
      }
    }
  }

  function chooseSubject(subject) {
    selectedSubject = normalize(subject);
    document.querySelectorAll(
      "[data-subject], .subject-btn, .subject-button"
    ).forEach(button => {
      const name = normalize(
        button.dataset.subject || button.textContent
      );
      button.setAttribute(
        "aria-pressed",
        String(name.includes(selectedSubject))
      );
    });
  }

  // Connect subject buttons already present on the website.
  document.querySelectorAll(
    "[data-subject], .subject-btn, .subject-button"
  ).forEach(button => {
    button.addEventListener("click", () => {
      chooseSubject(button.dataset.subject || button.textContent);
    });
  });

  // Also recognize buttons labelled with a subject.
  document.querySelectorAll("button").forEach(button => {
    const label = normalize(button.textContent);
    const subject = subjectNames.find(name =>
      label === name || label === name + " help"
    );

    if (subject) {
      button.addEventListener("click", () => chooseSubject(subject));
    }
  });

  function findSubject(question) {
    const q = normalize(question);

    if (/\b(geography|continent|continents|capital city|ocean|map|climate|landform|latitude|longitude|equator)\b/.test(q)) {
      return "geography";
    }
    if (/\b(history|historical|ancient civilization|world war|revolution|past events)\b/.test(q)) {
      return "history";
    }
    if (/\b(science|plant|photosynthesis|gravity|solar system|planet|water cycle|animal|human body|energy|matter|evaporation|condensation)\b/.test(q)) {
      return "science";
    }
    if (/\b(math|mathematics|multiply|multiplication|divide|division|fraction|equation|calculate|plus|minus)\b/.test(q)) {
      return "mathematics";
    }
    if (/\b(english|grammar|noun|verb|adjective|adverb|spelling|vocabulary|punctuation|reading|essay)\b/.test(q)) {
      return "english";
    }
    if (/\b(social studies|democracy|government|citizen|citizenship|community|economy|rights|responsibilities)\b/.test(q)) {
      return "social studies";
    }

    return selectedSubject;
  }

  function answerMath(q) {
    // Handle simple arithmetic questions such as 12 x 8.
    const match = q.match(
      /(-?\d+(?:\.\d+)?)\s*(\+|\-|\*|\/|×|÷|\bx\b)\s*(-?\d+(?:\.\d+)?)/
    );

    if (match) {
      const a = Number(match[1]);
      const op = match[2];
      const b = Number(match[3]);
      let result;

      if (op === "+") result = a + b;
      else if (op === "-") result = a - b;
      else if (["*", "×", "x"].includes(op)) result = a * b;
      else if (["/", "÷"].includes(op)) {
        if (b === 0) return "You cannot divide a number by zero.";
        result = a / b;
      }

      return `Let's solve it step by step.\n\n${a} ${op} ${b}\n= ${result}\n\nAnswer: ${result}`;
    }

    if (/\b(fraction|fractions)\b/.test(q)) {
      return "A fraction represents part of a whole. For example, 1/2 means one out of two equal parts.\n\nTo add fractions with the same denominator, add the numerators and keep the denominator. Example: 1/4 + 2/4 = 3/4.";
    }

    if (/\b(multiplication|multiply|times table)\b/.test(q)) {
      return "Multiplication is repeated addition. For example, 3 × 4 means 3 groups of 4.\n\n4 + 4 + 4 = 12, so 3 × 4 = 12.";
    }

    return null;
  }

  const lessons = [
    {
      subject: "geography",
      keywords: /\b(continents|continent)\b/,
      answer: "There are seven commonly recognized continents:\n1. Africa\n2. Antarctica\n3. Asia\n4. Europe\n5. North America\n6. South America\n7. Australia (often grouped with Oceania).\n\nA continent is one of Earth's large land areas."
    },
    {
      subject: "geography",
      keywords: /\b(oceans|ocean)\b/,
      answer: "Earth has five commonly recognized oceans:\n1. Pacific Ocean\n2. Atlantic Ocean\n3. Indian Ocean\n4. Southern Ocean\n5. Arctic Ocean.\n\nThe Pacific is the largest ocean."
    },
    {
      subject: "geography",
      keywords: /\b(capital of ghana|ghana's capital|ghana capital)\b/,
      answer: "The capital city of Ghana is Accra. Accra is on the Gulf of Guinea in West Africa."
    },
    {
      subject: "geography",
      keywords: /\b(capital of the united states|us capital|usa capital|capital of america)\b/,
      answer: "The capital of the United States is Washington, D.C. It is a federal district, not a state."
    },
    {
      subject: "geography",
      keywords: /\b(equator)\b/,
      answer: "The Equator is an imaginary line around the middle of Earth. It divides Earth into the Northern Hemisphere and Southern Hemisphere."
    },
    {
      subject: "geography",
      keywords: /\b(latitude|longitude)\b/,
      answer: "Latitude measures how far north or south a place is from the Equator. Longitude measures how far east or west a place is from the Prime Meridian. Together, they help locate places on Earth."
    },
    {
      subject: "geography",
      keywords: /\b(weather|climate)\b/,
      answer: "Weather describes short-term atmospheric conditions, such as today's rain or temperature. Climate describes the usual weather patterns of a place over a long period."
    },
    {
      subject: "geography",
      keywords: /\b(mountain|mountains|landform|landforms|valley|plain|plateau)\b/,
      answer: "Landforms are natural features of Earth's surface. Examples include mountains, valleys, plains, plateaus, and hills. They form through processes such as erosion, volcanic activity, and movements of Earth's crust."
    },
    {
      subject: "science",
      keywords: /\b(plant|plants|photosynthesis|sunlight)\b/,
      answer: "Why do plants need sunlight?\n\nStep 1: Leaves absorb light energy from the Sun.\nStep 2: Plants use that energy in a process called photosynthesis.\nStep 3: They use water from the soil and carbon dioxide from the air to make sugars.\nStep 4: The sugars provide energy and materials for growth. Oxygen is released as a by-product.\n\nRemember: sunlight provides the energy plants need for photosynthesis."
    },
    {
      subject: "science",
      keywords: /\b(water cycle|evaporation|condensation|precipitation)\b/,
      answer: "The water cycle moves water around Earth.\n\n1. Evaporation: the Sun heats water, turning some liquid water into vapor.\n2. Condensation: water vapor cools and forms tiny droplets in clouds.\n3. Precipitation: water falls as rain, snow, sleet, or hail.\n4. Collection: water gathers in rivers, lakes, oceans, and the ground.\n\nThen the cycle continues."
    },
    {
      subject: "science",
      keywords: /\b(gravity)\b/,
      answer: "Gravity is a force of attraction between objects that have mass. Earth's gravity pulls objects toward its center. This is why a dropped ball falls to the ground and why we stay on Earth's surface."
    },
    {
      subject: "science",
      keywords: /\b(solar system|planets|planet)\b/,
      answer: "Our solar system has eight recognized planets, in order from the Sun:\n1. Mercury\n2. Venus\n3. Earth\n4. Mars\n5. Jupiter\n6. Saturn\n7. Uranus\n8. Neptune.\n\nThe planets orbit the Sun. Earth is the planet where we live."
    },
    {
      subject: "science",
      keywords: /\b(photosynthesis)\b/,
      answer: "Photosynthesis is how plants use light energy to make sugars from water and carbon dioxide. Oxygen is released in the process. Photosynthesis helps plants grow and supports much of life on Earth."
    },
    {
      subject: "science",
      keywords: /\b(heart|human body|lungs|brain)\b/,
      answer: "The human body has many systems that work together. The brain helps control the body, the heart pumps blood, and the lungs exchange oxygen and carbon dioxide. Together, these organs help keep us alive."
    },
    {
      subject: "science",
      keywords: /\b(states of matter|solid|liquid|gas)\b/,
      answer: "Three common states of matter are:\n1. Solid: has a definite shape and volume, like ice.\n2. Liquid: has a definite volume but takes the shape of its container, like water.\n3. Gas: spreads out to fill its container, like water vapor.\n\nHeating or cooling can change matter from one state to another."
    },
    {
      subject: "history",
      keywords: /\b(ancient egypt|egyptian pyramids|pharaoh|pharaohs)\b/,
      answer: "Ancient Egypt was a civilization in northeastern Africa along the Nile River. The Nile supported farming and transportation. Ancient Egyptians built pyramids, developed writing called hieroglyphs, and were ruled by kings known as pharaohs."
    },
    {
      subject: "history",
      keywords: /\b(ancient greece|greek civilization|ancient greeks)\b/,
      answer: "Ancient Greece consisted of independent city-states, including Athens and Sparta. Ancient Greeks influenced philosophy, mathematics, art, architecture, and ideas about democracy. Their society was diverse, and political rights were not shared equally by everyone."
    },
    {
      subject: "history",
      keywords: /\b(american revolution|revolutionary war|independence of the united states)\b/,
      answer: "The American Revolution was the struggle by Britain's thirteen North American colonies to become independent. The Declaration of Independence was adopted on July 4, 1776. The war ended with the Treaty of Paris in 1783, which recognized United States independence."
    },
    {
      subject: "history",
      keywords: /\b(world war ii|second world war|wwii)\b/,
      answer: "World War II lasted from 1939 to 1945. It involved many countries and caused enormous loss of life. The Holocaust was the systematic persecution and murder of six million Jews by Nazi Germany and its collaborators, alongside the persecution and murder of many other victims. The war ended in 1945."
    },
    {
      subject: "history",
      keywords: /\b(world war i|first world war|wwi)\b/,
      answer: "World War I lasted from 1914 to 1918. It involved many countries, mainly in Europe at first, and caused widespread destruction. The war ended with an armistice on November 11, 1918."
    },
    {
      subject: "history",
      keywords: /\b(ghana independence|independence of ghana|kwame nkrumah)\b/,
      answer: "Ghana gained independence from British colonial rule on March 6, 1957. Kwame Nkrumah became the country's first prime minister and later its first president."
    },
    {
      subject: "english",
      keywords: /\b(noun|nouns)\b/,
      answer: "A noun names a person, place, thing, or idea.\n\nExamples:\n- Person: teacher\n- Place: school\n- Thing: book\n- Idea: courage\n\nExample sentence: The student reads a book. 'Student' and 'book' are nouns."
    },
    {
      subject: "english",
      keywords: /\b(verb|verbs)\b/,
      answer: "A verb expresses an action or a state of being.\n\nExamples: run, read, write, think, is, and are.\n\nExample: The girl reads a book. 'Reads' is the verb."
    },
    {
      subject: "english",
      keywords: /\b(adjective|adjectives)\b/,
      answer: "An adjective describes a noun or pronoun. Examples include happy, tall, blue, and interesting.\n\nExample: The tall student has a blue bag. 'Tall' describes the student and 'blue' describes the bag."
    },
    {
      subject: "english",
      keywords: /\b(adverb|adverbs)\b/,
      answer: "An adverb often describes a verb, an adjective, or another adverb. Examples include quickly, carefully, very, and yesterday.\n\nExample: She reads carefully. 'Carefully' tells how she reads."
    },
    {
      subject: "social studies",
      keywords: /\b(democracy|democratic government)\b/,
      answer: "Democracy is a form of government in which people have a role in making political decisions, often by electing representatives. Democratic systems depend on participation, laws, and protection of rights. Different countries organize their democracies in different ways."
    },
    {
      subject: "social studies",
      keywords: /\b(community|communities)\b/,
      answer: "A community is a group of people who live in the same area or share interests, services, or goals. Community members can help one another, follow shared rules, and work together to solve problems."
    },
    {
      subject: "social studies",
      keywords: /\b(rights and responsibilities|responsibilities of citizens|citizen rights)\b/,
      answer: "Rights are freedoms or protections people are entitled to under the law. Responsibilities are duties people are expected to fulfill. Examples can include following laws, respecting others, participating in community life, and learning about civic issues."
    },
    {
      subject: "computer skills",
      keywords: /\b(computer|keyboard|mouse|internet safety)\b/,
      answer: "Computer skills include using a keyboard and mouse, managing files, using applications, searching the internet carefully, and protecting personal information. Never share passwords or sensitive information with people you do not trust."
    },
    {
      subject: "general",
      keywords: /\b(study plan|study schedule)\b/,
      answer: "Here is a simple study plan:\n\n1. Choose one subject and a clear goal.\n2. Study for 20–25 minutes.\n3. Take a short break.\n4. Answer practice questions without looking at your notes.\n5. Review mistakes and try again.\n6. Repeat for your next subject.\n\nWrite down assignment deadlines so you can plan ahead."
    },
    {
      subject: "general",
      keywords: /\b(quiz|practice questions|test me)\b/,
      answer: "Let's practise! Choose a subject and ask me for a short quiz. I can give you practice questions on the topics covered in this learning assistant. For the best results, tell me your grade level and topic."
    }
  ];

  function answerQuestion(question) {
    const q = normalize(question);
    const subject = findSubject(q);

    if (!q) {
      return "Please type a question first. I am here to help you learn.";
    }

    const mathAnswer = answerMath(q);
    if (mathAnswer && (
      subject === "mathematics" ||
      /[0-9]\s*(\+|\-|\*|\/|×|÷|x)\s*[0-9]/.test(q)
    )) {
      return mathAnswer;
    }

    // Match subject-specific lessons first.
    const match = lessons.find(lesson =>
      lesson.keywords.test(q) &&
      (lesson.subject === subject || subject === "general")
    );

    if (match) return match.answer;

    // Then allow matching prepared lessons from other subjects.
    const otherMatch = lessons.find(lesson => lesson.keywords.test(q));
    if (otherMatch) return otherMatch.answer;

    if (/\b(homework|assignment)\b/.test(q)) {
      return "I can help you understand your homework step by step. Please type the full question and tell me the subject. I will try to explain the steps clearly.";
    }

    if (/\b(study guide|revision)\b/.test(q)) {
      return "To make a useful study guide, tell me your subject, topic, and grade level. I can organize key ideas, definitions, and practice questions.";
    }

    return "Thank you for asking Kaakyire Learning AI!\n\nI don't have a prepared answer for this exact question yet. Please try asking about a specific topic, or include the subject and grade level so I can guide you better.\n\nImportant: this version uses built-in lesson answers. It is not yet connected to a full AI service, so it cannot reliably answer every question.";
  }

  function submitQuestion(event) {
    if (event) event.preventDefault();

    if (!questionInput) {
      showAnswer(
        "I could not find the question box on this page. " +
        "The input selector in script.js may need to match index.html."
      );
      return;
    }

    const question = questionInput.value.trim();
    showAnswer(answerQuestion(question));
  }

  if (form) {
    form.addEventListener("submit", submitQuestion);
  }

  if (askButton && (!form || askButton.form !== form)) {
    askButton.addEventListener("click", submitQuestion);
  }

  // Support common button labels if the page has no form.
  if (!form && !askButton) {
    document.querySelectorAll("button").forEach(button => {
      if (/\b(ask|send|submit|answer)\b/i.test(button.textContent)) {
        button.addEventListener("click", submitQuestion);
      }
    });
  }

  console.log("Kaakyire Learning AI is ready.");
});
