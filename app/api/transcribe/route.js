// Transcription Route:
// Method: POST
// Purpose: Convert uploaded audio -> text using Whisper
// Input: Audio file URL (via Vercel Blob)
// Output: Transcribed text

import { NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables (keys)
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(request) {
  try {
    const { audioUrl } = await request.json();

    // Download audio from Vercel Blob URL
    const audioResponse = await fetch(audioUrl);
    const audioBuffer = await audioResponse.arrayBuffer();

    // Extract file extension from the URL or detect MIME type
    let fileExtension = 'mp3'; // default fallback
    
    // Try to get extension from URL
    const urlParts = audioUrl.split('.');
    if (urlParts.length > 1) {
      const extension = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params
      fileExtension = extension;
    } else {
      // If no extension in URL, try to detect from Content-Type header
      const contentType = audioResponse.headers.get('content-type');
      if (contentType) {
        const mimeToExtension = {
          'audio/mpeg': 'mp3',
          'audio/mp3': 'mp3',
          'audio/wav': 'wav',
          'audio/wave': 'wav',
          'audio/x-wav': 'wav',
          'audio/flac': 'flac',
          'audio/m4a': 'm4a',
          'audio/mp4': 'mp4',
          'audio/ogg': 'ogg',
          'audio/webm': 'webm',
          'video/mp4': 'mp4',
          'video/mpeg': 'mpeg',
          'video/webm': 'webm'
        };
        fileExtension = mimeToExtension[contentType] || 'mp3';
      }
    }

    // Create file-like object for Whisper with proper extension
    const file = new File([audioBuffer], `audio.${fileExtension}`);

    const transcribedAudio = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    console.log("Transcription successful!");
    // Return the text
    return NextResponse.json({
      text: transcribedAudio.text,
      success: true,
    });
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      {
        error: e.message,
        success: false,
      },
      { status: 500 }
    );
  }
}