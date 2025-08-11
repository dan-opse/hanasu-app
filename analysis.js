// All LLM connections are handled in whisper_spike.js

// -- Main function --
async function runAnalysis(inputText, language, model) {
  console.log("Running analysis...");


    ```


    Start of prompts


    ```


  const prompt = `
        Analyze the following ${language} text from a language learner. Provide the response as a
        JSON object with the following keys: "correctedText", "analysis", "nextTopic".

        1. **correctedText**: Rewrite the text to be grammatically correct. Consider any ${language} specific conventions.
        2. **analysis**: Provide a short, bulleted list of key mistakes. Explain each mistake simply.
        3. **nextTopic**: Suggest a new, related conversation topic that would help the user practice the areas they struggled with.

        Text to analyze: ${inputText}
    `;

  const lang_eng_prompt = `
        You are an expert and empathetic language instructor specializing in conversational fluency. Your goal is to provide clear, encouraging, and actionable feedback.
        **Analyze the input based on these parameters:**

        - **Target Language:** ${language}
            
        - **Text to Analyze:** ${inputText}

        Analyze the student's text and RETURN **ONLY** the following JSON, with EXACT keys and structures as shown. 
        Do NOT add extra text before or after the JSON. Do NOT rename keys. Do NOT change the array/object structure.

        {
        "weakness": [
            { "pattern": "string", "explanation": "string" }
        ],
        "strength": [
            { "pattern": "string", "explanation": "string" }
        ],
        "correctedText": "string",
        "analysis": "string",
        "nextTopic": [
            { "exercise": "string", "explanation": "string" }
        ]
        }

        Below are guidelines on how you may want to analyze the transcribed audio for each key.

        1. **weakness**: Identify the 2-3 most impactful weakness patterns (e.g., Grammar, Word Order, Phrasing). For each pattern, concisely explain the rule and cite a specific error from the student's text. Focus on high-impact patterns, not every single mistake.
        2. **strength**: Highlight 1-2 specific successes. Quote the student's correct use of good vocabulary, an idiom, or a complex grammatical structure.
        3. **correctedText**: Provide a corrected version of the student's text. Clearly mark changes using markdown (e.g., **additions** and ~~deletions~~). For key corrections, add a brief, parenthetical note explaining the "why" (e.g., (verb tense), (gender agreement)). The goal is to teach, not just to fix.
        4. **analysis**: Give a brief, holistic summary with an encouraging tone. Start with their strengths, then state the main area for them to focus on next. Provide an estimated CEFR proficiency level (A1-C2) for the target language with a one-sentence justification.
        5. **nextTopic**: Suggest 2 specific, actionable speaking exercises. Each exercise must directly target a weakness identified above. Briefly explain how each exercise helps the student practice that skill.
        
        - **Example**: "_Weakness: Past Tense. -> Next Topic: 'Describe what you did last weekend.' This provides direct practice with past tense verbs._"
    `;



    ```


    End of prompts; start of analysis


    ```

  try {

    const result = await model.generateContent(lang_eng_prompt);
    const response = result.response;
    const responseText = response.text();

    ```


    End of analysisl Start of output formatting


    ```


    // Parse the JSON
    try {
      // 1. Robustly clean up the response to extract the JSON string.
      let cleanJsonString = null;
      try {
        // This regex finds a JSON object that might be wrapped in markdown code fences.
        const jsonRegex =
          /```(json)?\s*([\s\S]*?)\s*```|({[\s\S]*}|\[[\s\S]*\])/;
        const match = responseText.match(jsonRegex);
        if (match) {
          // Group 2 is for JSON within ```...```, Group 3 is for raw JSON.
          cleanJsonString = match[2] || match[3];
        }
      } catch (e) {
        console.error("Error during regex extraction:", e);
        return null;
      }

      if (!cleanJsonString) {
        console.error(
          "❌ Error: Could not find a valid JSON object in the response."
        );
        return null;
      }

      // 2. Parse the cleaned JSON string.
      let parsedJson;
      try {
        parsedJson = JSON.parse(cleanJsonString);
      } catch (error) {
        console.error("❌ Error: Failed to parse JSON.", error);
        console.log("Attempted to parse this string:", cleanJsonString);
        return null;
      }

      // 3. Format and display the appealing output in the console.
      console.log("\n✅ Feedback processed successfully! Here's the summary:");
      console.log("----------------------------------------------------");


      // Use template literals and emojis for a clean, readable console output.
      // Format arrays of objects before display
      const strengthsFormatted = parsedJson.strength
        .map((s) => `• ${s.pattern}: ${s.explanation}`)
        .join("\n       ");

      const weaknessesFormatted = parsedJson.weakness
        .map((s) => `• ${s.pattern}: ${s.explanation}`)
        .join("\n       ");

      const nextTopicsFormatted = parsedJson.nextTopic
        .map((s) => `• ${s.exercise}: ${s.explanation}`)
        .join("\n       ");

      const output = `
            📊 ANALYSIS & LEVEL
            ${parsedJson.analysis}

            ✅ STRENGTHS
            ${strengthsFormatted}

            🔧 WEAKNESSES
            ${weaknessesFormatted}

            ✍️ SUGGESTED CORRECTIONS
            ${parsedJson.correctedText}

            🚀 NEXT TOPICS
            ${nextTopicsFormatted}
            `;


        ```


        End of output formatting
      
      
        ```


      console.log(output);
      console.log("----------------------------------------------------");

      // 4. Return the parsed JSON object for programmatic use, as in your original code.
      return parsedJson;
    } catch (e) {
      console.error(
        "\n❌ Failed to parse AI response as JSON. The model might not have followed instructions perfectly.",
        e.message
      );
      console.log("Raw response:", responseText);
    }
  } catch (error) {
    console.error("❌ Error communicating with the AI:", error);
  }
}

export default runAnalysis;