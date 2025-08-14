# 🤖 A Software Engineer Porfolio with AI Chatbot

A fully responsive developer portfolio built with React, Vite, and Tailwind CSS. It is designed for performance, responsiveness, and clean UI/UX, featuring a theme toggle, animated transitions, section-based navigation, and a starry animated background with occasional shooting meteors visible in dark mode. The site also includes a custom AI chatbot powered by OpenAI, Python, and embeddings, trained on my resume, GitHub, and LinkedIn to answer recruiter and developer-related questions in a conversational way.

---

## ✨ Features

- ⚡ Lightning-fast Vite + React front end
- 🤖 AI chatbot with custom embeddings from resume, LinkedIn, and GitHub
- 🌗 Theme toggle (light/dark)
- 📱 Responsive layout with TailwindCSS
- 🎨 Clean, modern design with animations
- 🧪 Knowledge base pipeline built in Python + Node.js

---

## 🔧 Tech Stack

<div align="center">

<table>
  <tr>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" width="200" /><br/>React
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" width="200" /><br/>Vite
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" width="200" /><br/>Tailwind CSS
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" width="200" /><br/>Node.js
    </td>
  </tr>
  <tr>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" width="200" /><br/>JavaScript
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" width="200" /><br/>Python
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/OpenAI_API-412991?logo=openai&logoColor=white" width="200" /><br/>OpenAI API
    </td>
    <td align="center" width="240">
      <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white" width="200" /><br/>Git
    </td>
  </tr>
</table>

</div>

---

## 💻 Running Locally

### Prereqs

- Node 18+ (Node 20 recommended)
- OpenAI API key
- Python 3.10+ only if you plan to regenerate embeddings

### Environment variables

Create a file named `.env.local` at the project root:

```bash
OPENAI_API_KEY=sk-...
```

Do not put the key in any Vite env var.

### 🧠 Run Knowledge Base Scripts (optional, only if you want to refresh embeddings)

```bash
# 1) Create virtual environment
python -m venv venv

# macOS/Linux
source venv/bin/activate

# Windows (Git Bash / PowerShell)
source venv/Scripts/activate

# 2) Install Python deps
pip install openai tiktoken python-dotenv

# 3) Build knowledge base
node scrape_github.mjs           # optional GitHub scraping
python combine_knowledge.py      # combine inputs
python embed_knowledge.py        # embed into vector format

# Output must exist at:
# knowledge_base/tamer_knowledge_base_chunk.json
```

---

### 🚀 Start the app

#### Option A - Recommended: Vercel dev for API + UI

Runs the serverless API on port 3000 and Vite on 5173. This matches production and makes the chatbot work.

```bash
# 1) Install dependencies
npm install

# 2) Start Vercel local server for API
npx vercel dev

# 3) In another terminal, start Vite dev server
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

Your `vite.config.js` should proxy API calls:

```js
// vite.config.js
export default {
  server: { proxy: { '/api': 'http://localhost:3000' } },
};
```

#### Option B - Vite only

This starts just the UI. The chatbot will not work unless the API is also running with `npx vercel dev`.

```bash
npm install
npm run dev
```

---

### Optional: production build preview

You do not need to build for normal local dev. If you want to preview a production build locally:

```bash
npm run build
npx vercel dev --prebuilt
```

---

### Quick sanity check

Test the API directly:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

You should get a JSON response with a `reply`.

---

## 🧾 Folder Highlights

| Folder            | Description                               |
| ----------------- | ----------------------------------------- |
| `/src`            | React components and layout               |
| `/api`            | Chat API handler for OpenAI calls         |
| `/knowledge_base` | Scripts and context files for the chatbot |
| `/public`         | Static assets                             |

---

## 🌐 Live Demo

### 👉 [View it live](https://vite-react-portfolio-lime.vercel.app/)

---

## 👀 Screenshots

<p float="left">
  <img src="./screenshots/Screenshot-hero.png" width="32%" alt="Hero Section"/>
  <img src="./screenshots/Screenshot-about.png" width="32%" alt="About Section"/>
  <img src="./screenshots/Screenshot-chatbot.png" width="32%" alt="AI Chatbot"/>
</p>

---

## 📫 Let’s Connect

<div align="center">

<table>
  <tr>
    <td align="center" width="260">
      <a href="https://linkedin.com/in/tmood" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-Tamer%20Mahmoud-0A66C2?logo=linkedin&logoColor=white" width="240" />
      </a>
    </td>
    <td align="center" width="380">
      <a href="mailto:tamer.m.mahmoud@gmail.com">
        <img src="https://img.shields.io/badge/Email-tamer.m.mahmoud@gmail.com-D14836?logo=gmail&logoColor=white" width="360" />
      </a>
    </td>
  </tr>
</table>

</div>
