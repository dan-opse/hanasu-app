// All LLM connections are handled in whisper_spike.js

// -- Main function --
async function runAnalysis(inputText, language, model) {
    console.log("Running analysis...");

    const prompt = 
    `
        Analyze the following ${language} text from a language learner. Provide the response as a
        JSON object with the following keys: "correctedText", "analysis", "nextTopic".

        1. **correctedText**: Rewrite the text to be grammatically correct. Consider any ${language} specific conventions.
        2. **analysis**: Provide a short, bulleted list of key mistakes. Explain each mistake simply.
        3. **nextTopic**: Suggest a new, related conversation topic that would help the user practice the areas they struggled with.

        Text to analyze: ${inputText}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const responseText = response.text();

        // console.log("\n--- AI Response ---");
        // console.log(responseText);
        // console.log("\n--- End of Response ---");

    // Parse the JSON to see if it's valid
    try {
        // Clean up the response text - remove markdown code blocks if present
        let cleanResponse = responseText.trim();
        if (cleanResponse.startsWith('```json')) {
            cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanResponse.startsWith('```')) {
            cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        const parsedJson = JSON.parse(cleanResponse);
        console.log("\n✅ JSON is valid. Here's the corrected text:");
        console.log(parsedJson.correctedText);

        parsedJson.analysis.forEach((item, index) => {
            parsedJson.analysis = (`${index + 1}. ${item.mistake}: ${item.explanation}`);
        });

        return parsedJson;
        // console.log(`\n🎯 Next Topic: ${parsedJson.nextTopic}`);
    } catch (e) {
        console.error("\n❌ Failed to parse AI response as JSON. The model might not have followed instructions perfectly.", e.message);
        console.log("Raw response:", responseText);
    }

  } catch (error) {
    console.error("❌ Error communicating with the AI:", error);
  }
}

export default runAnalysis;