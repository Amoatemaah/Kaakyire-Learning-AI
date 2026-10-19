from pathlib import Path
import zipfile, textwrap, os

root = Path("/mnt/data/kaakyire-learning-ai-full-starter")
root.mkdir(parents=True, exist_ok=True)

files = {
"index.html": r'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Kaakyire Learning AI helps students learn step by step.">
  <title>Kaakyire Learning AI</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="#" aria-label="Kaakyire Learning AI home">
      <span class="brand-mark">K</span>
      <span>Kaakyire <strong>Learning AI</strong></span>
    </a>
    <span class="header-note">Learn one step at a time</span>
  </header>

  <main class="page">
    <section class="hero">
      <p class="eyebrow">YOUR LEARNING COMPANION</p>
      <h1>What would you like to learn today?</h1>
      <p class="hero-copy">Ask a school question, explore a difficult topic, or get help working through a problem.</p>
    </section>

    <section class="chat-panel" aria-label="Learning assistant">
      <div class="subject-list" aria-label="Try a subject">
        <button class="subject-chip" type="button" data-prompt="Explain fractions with an example.">Mathematics</button>
        <button class="subject-chip" type="button" data-prompt="Explain photosynthesis in simple words.">Science</button>
        <button class="subject-chip" type="button" data-prompt="What is a noun? Give examples.">English</button>
        <button class="subject-chip" type="button" data-prompt="What is democracy? Explain simply.">Social Studies</button>
        <button class="subject-chip" type="button" data-prompt="What is history and how do historians study the past?">History</button>
      </div>

      <form id="question-form">
        <label for="question">Your school question</label>
        <textarea id="question" name="question" rows="4" maxlength="5000" placeholder="For example: Solve 12 × 8 and explain each step." required></textarea>
        <div class="form-bottom">
          <span class="hint">Be specific so Kaakyire can help you better.</span>
          <button id="ask-button" class="primary-button" type="submit">Ask Kaakyire <span aria-hidden="true">→</span></button>
        </div>
      </form>

      <section id="answer-section" class="answer-section" aria-live="polite" hidden>
        <div class="answer-heading">
          <span class="answer-icon" aria-hidden="true">✦</span>
          <h2>Kaakyire's answer</h2>
        </div>
        <p id="status" class="status" hidden></p>
        <div id="answer" class="answer-text"></div>
      </section>
    </section>

    <p class="privacy-note">Learning support for students, teachers, and parents. Check important answers with a trusted teacher or reliable source.</p>
  </main>

  <footer class="site-footer">© <span id="year"></span> Kaakyire Learning AI</footer>
  <script src="script.js" defer></script>
</body>
</html>
''',
"style.css": r''':root {
  --ink: #192b3a;
  --muted: #617383;
  --brand: #176b62;
  --brand-dark: #10564f;
  --soft: #eaf5f2;
  --paper: #ffffff;
  --background: #f4f8f7;
  --border: #d9e5e2;
  --shadow: 0 16px 44px rgba(25, 54, 61, .08);
}
* { box-sizing: border-box; }
body {
  margin: 0; color: var(--ink); background: var(--background);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
}
.site-header {
  min-height: 76px; display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 14px clamp(18px, 5vw, 64px); background: var(--paper);
  border-bottom: 1px solid var(--border);
}
.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--ink); text-decoration: none; font-size: 1.02rem; }
.brand strong { color: var(--brand); }
.brand-mark {
  display: grid; place-items: center; width: 42px; height: 42px; border-radius: 13px;
  color: white; background: var(--brand); font-size: 1.3rem; font-weight: 800;
}
.header-note { color: var(--muted); font-size: .92rem; }
.page { width: min(920px, calc(100% - 32px)); margin: 0 auto; padding: 56px 0 32px; }
.hero { text-align: center; margin: 0 auto 30px; max-width: 700px; }
.eyebrow { color: var(--brand); font-size: .76rem; letter-spacing: .16em; font-weight: 800; margin: 0 0 10px; }
h1 { font-size: clamp(2rem, 5vw, 3.35rem); line-height: 1.12; letter-spacing: -.04em; margin: 0 0 15px; }
.hero-copy { color: var(--muted); font-size: 1.08rem; margin: 0 auto; max-width: 600px; }
.chat-panel { background: var(--paper); border: 1px solid var(--border); border-radius: 24px; padding: clamp(18px, 4vw, 34px); box-shadow: var(--shadow); }
.subject-list { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 26px; }
.subject-chip {
  border: 1px solid var(--border); border-radius: 999px; background: #fff; color: var(--brand-dark);
  padding: 9px 14px; font: inherit; font-size: .9rem; cursor: pointer;
}
.subject-chip:hover, .subject-chip:focus-visible { background: var(--soft); border-color: var(--brand); }
label { display: block; font-weight: 750; margin-bottom: 9px; }
textarea {
  width: 100%; resize: vertical; min-height: 125px; border: 1px solid #cbd9d6; border-radius: 14px;
  padding: 15px; color: var(--ink); background: #fcfefd; font: inherit; font-size: 1rem;
}
textarea:focus { outline: 3px solid rgba(23, 107, 98, .16); border-color: var(--brand); }
.form-bottom { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 13px; }
.hint { color: var(--muted); font-size: .85rem; }
.primary-button {
  border: 0; border-radius: 12px; padding: 12px 18px; background: var(--brand); color: white;
  font: inherit; font-weight: 750; cursor: pointer; white-space: nowrap;
}
.primary-button:hover { background: var(--brand-dark); }
.primary-button:disabled { opacity: .65; cursor: wait; }
.answer-section { margin-top: 30px; border-top: 1px solid var(--border); padding-top: 24px; }
.answer-heading { display: flex; align-items: center; gap: 10px; }
.answer-heading h2 { font-size: 1.12rem; margin: 0; }
.answer-icon { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; color: var(--brand); background: var(--soft); }
.status { color: var(--muted); font-size: .9rem; margin: 12px 0 0; }
.answer-text { white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 14px; }
.answer-text p { margin: 0 0 12px; }
.privacy-note { color: var(--muted); font-size: .86rem; text-align: center; margin: 24px auto 0; max-width: 700px; }
.site-footer { text-align: center; padding: 18px; color: var(--muted); font-size: .84rem; }
@media (max-width: 600px) {
  .site-header { align-items: flex-start; flex-direction: column; gap: 7px; }
  .page { padding-top: 36px; }
  .form-bottom { align-items: stretch; flex-direction: column; }
  .primary-button { width: 100%; }
  .hint { order: 2; }
  .chat-panel { border-radius: 18px; }
}
''',
"script.js": r'''const form = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const answerSection = document.getElementById("answer-section");
const answerBox = document.getElementById("answer");
const statusBox = document.getElementById("status");

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.dataset.prompt || "";
    questionInput.focus();
  });
});

function showAnswer(text, status = "") {
  answerSection.hidden = false;
  answerBox.textContent = text;
  statusBox.textContent = status;
  statusBox.hidden = !status;
}

function offlineAnswer(question) {
  const q = question.toLowerCase();

  // A small offline helper is available if the AI server has not been configured.
  // It is intentionally clear that this is not a full AI response.
  const math = q.match(/(-?\d+(?:\.\d+)?)\s*([+\-×x*/÷])\s*(-?\d+(?:\.\d+)?)/);
  if (math) {
    const a = Number(math[1]);
    const op = math[2];
    const b = Number(math[3]);
    let result;
    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (["×", "x", "*"].includes(op)) result = a * b;
    if (["÷", "/"].includes(op)) {
      if (b === 0) return "A number cannot be divided by zero.";
      result = a / b;
    }
    if (result !== undefined) {
      return `${a} ${op} ${b} = ${result}\n\nStep 1: Identify the two numbers: ${a} and ${b}.\nStep 2: Apply the operation ${op}.\nStep 3: The answer is ${result}.\n\nThis is an offline calculation, not a full AI explanation.`;
    }
  }

  const prepared = [
    [/photosynthesis/, "Photosynthesis is how green plants make food using sunlight, water, and carbon dioxide. The process makes sugar and releases oxygen."],
    [/gravity/, "Gravity is the force of attraction between objects. Earth's gravity pulls objects toward the ground."],
    [/\bnoun\b/, "A noun names a person, place, thing, or idea. Examples: teacher, school, book, happiness."],
    [/\bverb\b/, "A verb expresses an action or state of being. Examples: run, write, think, is, are."],
    [/water cycle/, "The water cycle is the movement of water around Earth. Key stages include evaporation, condensation, and precipitation."],
    [/democracy/, "Democracy is a system of government in which people have a role in choosing their leaders, often through voting."],
    [/american revolution/, "The American Revolution was the struggle in which thirteen British colonies in North America fought for independence. The Declaration of Independence was adopted in 1776."]
  ];
  for (const [pattern, text] of prepared) {
    if (pattern.test(q)) return `${text}\n\nThis is a prepared offline answer. Connect an AI service for broader questions.`;
  }
  return "The AI service is not connected yet, so I cannot generate a full answer to that question. You can still test simple arithmetic and a few prepared topics. To enable broader answers, set up the secure server and an AI API key. Do not put an API key in this browser code.";
}

async function askKaakyire(question) {
  // The backend route keeps the API key on the server, never in the browser.
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && typeof data.answer === "string" && data.answer.trim()) {
      return { answer: data.answer, status: "AI-powered response" };
    }
    if (response.status !== 404 && response.status !== 501) {
      throw new Error(data.error || "The AI service could not answer right now.");
    }
  } catch (error) {
    // If opened as a static-only website, continue with offline demo behavior.
    if (error instanceof TypeError) {
      return { answer: offlineAnswer(question), status: "Offline/demo mode" };
    }
    if (error.message && !/fetch|network/i.test(error.message)) {
      return { answer: offlineAnswer(question), status: "Offline/demo mode — " + error.message };
    }
  }
  return { answer: offlineAnswer(question), status: "Offline/demo mode" };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) {
    showAnswer("Please type a school question first.");
    questionInput.focus();
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Thinking…";
  showAnswer("Let me work through your question…", "Preparing your answer");
  try {
    const result = await askKaakyire(question);
    showAnswer(result.answer, result.status);
  } finally {
    askButton.disabled = false;
    askButton.innerHTML = 'Ask Kaakyire <span aria-hidden="true">→</span>';
  }
});
''',
"server.js": r'''require("dotenv").config();
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/ask", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question) return res.status(400).json({ error: "Please enter a school question." });
  if (question.length > 5000) return res.status(413).json({ error: "Please keep your question under 5,000 characters." });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(501).json({
      error: "The AI service is not configured. Add an API key on the server when you are ready."
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: [
        "You are Kaakyire Learning AI, a friendly and patient educational assistant for students, teachers, and parents.",
        "Help with Mathematics, Science, English, Social Studies, History, and other school subjects.",
        "Explain concepts in simple language and give clear step-by-step reasoning appropriate to the learner.",
        "For calculations, show the method and check the result. For homework, teach the method rather than only giving an unexplained answer.",
        "Be respectful, encouraging, and honest about uncertainty. Never invent sources or facts.",
        "Ask a short clarifying question when the question is too vague to answer safely or accurately.",
        "Do not claim that you are a human teacher."
      ].join(" "),
      input: question,
      max_output_tokens: 1200
    });

    const answer = response.output_text;
    if (!answer || !answer.trim()) {
      return res.status(502).json({ error: "No answer was returned. Please try again." });
    }
    return res.json({ answer });
  } catch (error) {
    console.error("AI request failed:", error?.message || error);
    return res.status(502).json({
      error: "Kaakyire could not get an AI answer right now. Check the server configuration and API account, then try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Kaakyire Learning AI is running at http://localhost:${port}`);
});
''',
"package.json": r'''{
  "name": "kaakyire-learning-ai",
  "version": "1.0.0",
  "private": true,
  "description": "Kaakyire Learning AI educational assistant",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "openai": "^4.77.0"
  }
}
''',
".env.example": r'''# Copy this file to .env on your own computer/server when you are ready.
# Put your secret key only in .env or your hosting provider's secret settings.
# NEVER commit .env to GitHub or put the key in index.html or script.js.
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
''',
".gitignore": r'''node_modules/
.env
.DS_Store
npm-debug.log*
''',
"README.md": r'''# Kaakyire Learning AI

A responsive educational website for students, teachers, and parents.

## What is included?

- `index.html` — homepage, question form, answer area, subject prompt buttons
- `style.css` — responsive layout for phones, tablets, and computers
- `script.js` — browser behavior, offline demo answers, and secure calls to `/api/ask`
- `server.js` — server endpoint that calls an AI model without exposing the secret key in the browser
- `package.json` — server dependencies and start command
- `.env.example` — example environment variables (contains no secret key)

## Important

The site can show a few prepared offline answers and calculate simple arithmetic without an API connection. To answer a wide range of new questions, you must run the server and configure a valid API key with available API billing/credits. ChatGPT subscriptions and API billing are separate.

**Never place a secret API key in `index.html` or `script.js`, and never commit a real `.env` file to GitHub.**

## Run locally

1. Install Node.js 18 or newer.
2. Download these project files to one folder.
3. Open a terminal in that folder and run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. When ready to use the AI feature, add your API key to `.env`:
   `OPENAI_API_KEY=your_secret_key_here`
6. Run `npm start`.
7. Open `http://localhost:3000`.

If no API key is configured, the site falls back to limited offline/demo answers.

## Deployment

This is a Node.js app, not just a static site. Deploy `server.js` to a host that supports Node.js. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the host's private environment-variable settings. Do not publish the secret key. Check hosting and API pricing before enabling live AI responses.
'''
}

for name, content in files.items():
    (root / name).write_text(content, encoding="utf-8")

zip_path = Path("/mnt/data/Kaakyire-Learning-AI-Full-Starter.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for p in root.rglob("*"):
        if p.is_file():
            z.write(p, arcname=f"Kaakyire-Learning-AI/{p.relative_to(root)}")

print("Created project files:")
for name in files:
    print(f"- {name}")
print(f"\nZIP: {zip_path}")
