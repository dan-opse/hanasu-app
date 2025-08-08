// imports
import fs from "fs";

// AI Connections
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Module
import runAnalysis from './analysis.js'

// load enviornment variables
import dotenv from "dotenv";
dotenv.config();
console.log("--- env variables loaded ---")

// Create connection with Google
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const llm = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

// Create connection with openai
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// Transcribe audio
const transcribedAudio = await openai.audio.transcriptions.create({
    file: fs.createReadStream("Test Files/testfile.m4a"),
    model: "whisper-1",
});

console.log("\n--- Transcribed audio ---")
console.log("\n" + transcribedAudio.text);
console.log("\n--- End of transcribed audio ---")

console.log("\nAbout to run analysis...");

// Run analysis on transcribed audio
try {
    const analysis = await runAnalysis(transcribedAudio.text, "English", llm);
    console.log("Analysis completed:", analysis);
} catch (e) {
    console.error("Error in analysis:", e);
}