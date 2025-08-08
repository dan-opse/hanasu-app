
# Hanasu: AI Language Coach

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)

A web application that allows users to practice a new language by analyzing voice memos, receiving AI-powered transcription, and getting actionable feedback on grammar and pronunciation. 

---

### ► Live Demo

_WIP_

### ► Screenshot

_WIP_

---

### ✨ Core Features

* **Voice Memo Recording:** Simple, browser-based audio recording.
* **Voice Memo Uploads:** Upload existing voice memos to be analyzed.
* **AI-Powered Transcription:** Utilizes OpenAI's Whisper API for transcription.
* **Grammar & Fluency Analysis:** Leverages a Large Language Model (LLM) to correct errors and provide improvement suggestions.
* **Targeted Practice:** Suggests new topics based on the user's identified weaknesses.

---

### 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** Firestore
* **AI Services:**
    * **Speech-to-Text:** Whisper
    * **Analysis:** Gemini-1.5 Flash
    * **Text-to-Speech:** TBA

---

### 🚀 Getting Started

Instructions on how to set up and run a local copy of this project.

**Prerequisites:**
* Node.js (v18 or later)
* npm

**Installation & Setup:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/hanasu-app.git](https://github.com/your-username/hanasu-app.git)
    cd hanasu-app
    ```

2.  **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Set up environment variables:**
    * Create a `.env` file in the `server` directory.
    * Add your `API_KEY="YOUR_API_KEY_HERE"`.

5.  **Run the application:**
    * From the `server` directory, run `npm start` to start the backend.
    * From the `client` directory, run `npm start` to start the React frontend.

---

### 📝 Project Status

This project is currently in the MVP development phase. The core record-analyze-improve loop is the primary focus.
>>>>>>> 8ca2b3bf5e67b8882d768ed6a49081a08f2dceb2
