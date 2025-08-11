// File system
import fs from "fs";

// AI Connections
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Module
import runAnalysis from './analysis.js'


import dotenv from "dotenv";

dotenv.config();
console.log("--- env variables loaded ---")


```


End of imports; start of AI connections


```

// Create connection with google gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const llm = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

// Create connection with openai whisper
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });


```


End of AI conections; start of service


```

// Transcribe audio
const transcribedAudio = await openai.audio.transcriptions.create({
    file: fs.createReadStream("Test Files/testfile 2.m4a"),
    model: "whisper-1",
});

console.log("\n--- Transcribed audio ---")
console.log("\n" + transcribedAudio.text);
console.log("\n--- End of transcribed audio ---")

console.log("\nAbout to run analysis...");
// Run analysis on transcribed audio
try {
    const analysis = await runAnalysis(transcribedAudio.text, "English", llm);
    console.log("\n--- Analysis completed ---\n", analysis);
} catch (e) {
    console.error("Error in analysis:", e);
}

```


End of service


```