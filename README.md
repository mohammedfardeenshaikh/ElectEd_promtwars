# 🗳️ ElectEd — Interactive Election Learning Assistant

> **Empowering citizens with election knowledge through interactive lessons, timelines, AI-powered chat, and quizzes.**

![ElectEd Banner](https://img.shields.io/badge/ElectEd-Election%20Learning%20Platform-6c63ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPvCfl7PvuI88L3RleHQ+PC9zdmc+)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white)

---

## ✨ Features

### 🏠 Hero Section
- Bold headline with gradient text animation
- Floating interactive cards with election process preview
- Animated stats counter (learners, modules, ratings)
- Call-to-action buttons with hover effects

### 📚 Learning Modules
Six comprehensive feature cards covering:
- 📋 **Voter Registration** — Eligibility, documents, and how to register
- 🏛️ **Types of Elections** — General, primary, local, and special elections
- 🗳️ **Casting Your Vote** — Step-by-step voting guide
- 📊 **Counting & Results** — How votes are counted and certified
- ⚖️ **Electoral Laws** — Legal framework for fair elections
- 🌍 **Global Perspectives** — Compare electoral systems worldwide

### 📅 Election Timeline
An interactive 8-step visual timeline covering the full election cycle:
1. Election Announcement → 2. Nomination Filing → 3. Campaign Period → 4. Voter Registration Deadline → 5. Election Day → 6. Vote Counting → 7. Results Declaration → 8. Government Formation

### 🤖 AI-Powered Chat Assistant
- **Gemini AI Integration** — Real-time AI responses about elections
- **Smart Fallback** — Comprehensive local knowledge base (14+ topics) when API is unavailable
- **Conversation Memory** — Maintains context across the chat session
- **Quick Questions** — Pre-built buttons for common queries
- **Topics Covered**: Indian elections, EVMs, voter ID, minimum voting age, political parties, campaigns, Lok Sabha, Rajya Sabha, and more

### 🧠 Interactive Quiz
- 6 multiple-choice questions on election knowledge
- Instant feedback with explanations
- Progress bar tracking
- Final score with personalized messages
- Retry functionality

---

## 🎨 Design

| Element | Detail |
|---------|--------|
| **Style** | Soft UI / Neumorphism-inspired |
| **Background** | Pastel gradient (lavender → blue → white) |
| **Cards** | Glassmorphism with backdrop blur |
| **Buttons** | Green/teal primary, rounded with shadows |
| **Typography** | Inter (Google Fonts) — bold headings, clean body |
| **Animations** | Scroll-triggered reveals, floating cards, stat counters |
| **Responsive** | Fully responsive — desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure with SEO meta tags
- **CSS3** — Vanilla CSS with custom properties, animations, glassmorphism
- **JavaScript** — Vanilla JS with modular functions
- **Gemini AI API** — Google's Gemini 2.0 Flash for intelligent chat responses
- **No frameworks** — Lightweight, fast, zero dependencies

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (optional, for local server)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammedfardeenshaikh/ElectEd_promtwars.git
   cd ElectEd_promtwars
   ```

2. **Start a local server**
   ```bash
   npx http-server . -p 8080 -c-1
   ```

3. **Open in browser**
   ```
   http://127.0.0.1:8080
   ```

Or simply open `index.html` directly in your browser!

### Gemini AI Setup
The chat assistant uses Google's Gemini API. To use your own key:
1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Replace the `GEMINI_API_KEY` value in `app.js` (line 160)

> **Note:** If the API key hits its quota limit, the assistant automatically falls back to the built-in local knowledge base with 14+ detailed topics.

---

## 📁 Project Structure

```
ElectEd_promtwars/
├── index.html      # Main HTML structure
├── index.css       # Styles — neumorphism, gradients, animations
├── app.js          # Logic — chat, quiz, timeline, animations
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

---

## 📸 Screenshots

### Hero Section
> Clean, modern landing with floating cards and gradient text

### Features Grid
> Six interactive learning module cards with hover effects

### Election Timeline
> Visual step-by-step election process with scroll animations

### AI Chat Assistant
> Ask questions and get instant, detailed responses

### Interactive Quiz
> Test your election knowledge with instant feedback

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mohammed Fardeen Shaikh**
- GitHub: [@mohammedfardeenshaikh](https://github.com/mohammedfardeenshaikh)

---

<p align="center">
  Made with ❤️ to empower civic education for everyone
</p>
