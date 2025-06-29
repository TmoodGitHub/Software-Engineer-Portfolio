# 🤖 Tmood AI Portfolio Chatbot

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

<table>
  <tr>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40"/><br/>React</td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="40"/><br/>Vite</td>
    <td align="center" width="100"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="40"/><br/>Tailwind CSS</td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40"/><br/>Python</td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40"/><br/>Node.js</td>
  </tr>
  <tr>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40"/><br/>JavaScript</td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="40"/><br/>PostgreSQL</td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40"/><br/>Docker</td>
    <td align="center" width="150">
      <img src="https://img.shields.io/badge/OpenAI-API-green?logo=openai&logoColor=white" /><br/>OpenAI API
    </td>
    <td align="center" width="100"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40"/><br/>Git</td>
  </tr>
</table>

---

## 💻 Running Locally

### 🧠 Run Knowledge Base Scripts

```bash
# 1. Create virtual environment
python -m venv venv

# macOS/Linux
source venv/bin/activate

# Windows (Git Bash / PowerShell)
source venv/Scripts/activate

# 2. Install dependencies
pip install openai tiktoken python-dotenv

# 3. Run scripts
node scrape_github.mjs           # Optional GitHub scraping
python combine_knowledge.py      # Combine all inputs
python embed_knowledge.py        # Embed into vector format
```

### 🚀 Run Frontend

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open browser at `http://localhost:5173`

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

## 📫 Contact

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://linkedin.com/in/tmood" target="_blank">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="30" alt="LinkedIn"/><br/>LinkedIn
      </a>
    </td>
    <td align="center" width="150">
      <a href="mailto:tamer.m.mahmoud@gmail.com">
        <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" width="30" alt="Email"/><br/>Email
      </a>
    </td>
  </tr>
</table>
