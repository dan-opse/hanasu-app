// Analysis Route:
// Method: POST
// Purpose: Analyze transcribed text -> provide feedback
// Input: Transcribed text (transcription route)
// Output: Analysis as JSON file

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import parse_json from "./parse_json.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const llm = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Stopping here August 14, 11:13 AM:
// [ ] - need to add more input variables: inputText, language, model
// [ ] - combine analysis.js with this file

export async function POST(request) {
  console.log("\n--- Running Analysis ---\n");

  try {
    const result = await request;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: e.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
