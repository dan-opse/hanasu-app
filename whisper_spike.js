// imports
import fs from "fs";
import OpenAI from "openai";

// load enviornment variables
import dotenv from "dotenv";
dotenv.config();
console.log("-- env variables loaded --")

// Create connection with openai
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// Transcribe audio
const transcribedAudio = await openai.audio.transcriptions.create({
    file: fs.createReadStream("Test Files/testfile.m4a"),
    model: "whisper-1",
});

// Output transcription
console.log(transcribedAudio.text);