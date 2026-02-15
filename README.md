# Aerophysics - AI Student Portal 🚀

A modern, frontend-only AI student portal built with **Next.js (Frontend)** and **Mock Services**.
This version works completely offline/client-side for demonstration purposes.

---

## 🏗️ Architecture

1.  **Framework**: Next.js 15, React, Tailwind CSS.
2.  **Authentication**: Mock Login (Simulates Google Auth without real credentials).
3.  **Database**: LocalStorage (Data persists in your browser only).
4.  **Storage**: Browser Object URLs (Temporary file handling).
5.  **AI**: Mock Responses (Simulated AI chat for demo).

---

## ⚡ Quick Start

You only need **ONE** terminal to run the entire app.

```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 🛠️ Features (Demo Mode)

- [x] **AI Tutor (Mock)**: Simulates chat and reasoning responses.
- [x] **User Accounts**: Instant "Mock Login" with persistent profile.
- [x] **Resource Library**: Upload/Download files (locally).
- [x] **Community**: Forums and groups (local data).
- [x] **Tools**: GPA Calculator, Code Editor, Whiteboard.
- [x] **Videos**: Educational video collection.
- [x] **Roadmaps**: Interactive learning paths.

---

## 🐛 Troubleshooting

**"Data missing after incognito?"**

> Since we use LocalStorage, data is tied to your browser session. Incognito mode clears it.

**"AI repeats the same answer?"**

> This is a demo. The AI responses are static mocks, not real intelligence.
