<div align="center">
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white" alt="Gemini API" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  
  <br />
  <br />

  # 🔍 CodeLens-AI
  
  **Elevate Your Code Quality with Instant, AI-Driven Code Reviews.**

  *CodeLens-AI is a premium, full-stack application that leverages the power of Google's Gemini 2.5 Flash API to deeply analyze your code, identify critical bugs, spot security vulnerabilities, and suggest performance optimizations—all within a beautiful, glassmorphism-inspired interface.*

  <br />
</div>

---

## ✨ Features

- **🧠 Deep AI Analysis**: Instantly detects bugs, security flaws, and performance bottlenecks.
- **🎯 Intelligent Scoring**: Generates an automated code health score out of 100 based on code quality.
- **💻 Multi-Language Support**: Automatically detects or lets you specify JavaScript, Python, Java, C++, and HTML/CSS.
- **🎨 Premium UI/UX**: Built with a sleek, dark-themed glassmorphism aesthetic featuring smooth micro-animations and dynamic loading states.
- **🔄 History & Settings**: Track your past reviews and configure your workspace settings seamlessly.
- **🛠️ Suggested Fixes**: Not only finds the problems but rewrites snippets with proposed architectural improvements.

---

## 🏗️ Architecture & Tech Stack

CodeLens-AI is built using a modern, scalable layered architecture:

### Frontend
- **Vanilla HTML5 & CSS3**: Pure, lightweight, and fast.
- **Vanilla JavaScript**: Handles UI state, animations, and backend API communication without the overhead of heavy frameworks.
- **Custom Design System**: Modular CSS with fluid animations (`animations.css`) and responsive glassmorphism components (`style.css`).

### Backend
- **Node.js & Express**: Fast, non-blocking RESTful API.
- **Modular MVC Pattern**: Code is neatly separated into routes, controllers, services, and models for high maintainability.
- **MongoDB & Mongoose**: Stores code review history securely.
- **Google GenAI SDK**: Integrates directly with the `gemini-2.5-flash` model using strict JSON schema validation for deterministic, structured responses.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI
- A free Google Gemini API Key

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/Og-Brutal/CodeLens-AI.git
cd CodeLens-AI
```

### 3. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ai-code-reviewer
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the development server:
```bash
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 4. Frontend Setup

The frontend uses vanilla web technologies and does not require a build step. Simply open the `frontend/index.html` file in your preferred web browser, or use an extension like **Live Server** in VS Code.

---

## 💡 How It Works

1. **Input**: Paste your code into the beautiful editor UI.
2. **Analysis**: The backend constructs a structured prompt instructing Gemini to act as a Senior Security Auditor.
3. **Structured Response**: The AI returns a strictly formatted JSON object containing scores, bugs, security issues, and markdown-formatted feedback.
4. **Display**: The UI parses the JSON and populates the dashboard dynamically with an animated score ring and interactive issue cards.

---

<div align="center">
  <i>Built for engineers who care about quality.</i>
</div>
