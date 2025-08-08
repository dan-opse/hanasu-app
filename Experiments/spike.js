// Import libraries
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load env variables from .env file
dotenv.config();

// -- Configuration --
// Initialize the Google Generative AI client w/ API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// Select model to use
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

// -- Main function --
async function runSpike() {
    console.log("Running spike...");

    const inputText = "I is learning English. Yesterday I eat a sushi. It were delicious";
    const prompt = `
        Analyze the following English text from a language learner. Provide the response as a
        JSON object with the following keys: "correctedText", "analysis", "nextTopic".

        1. **correctedText**: Rewrite the text to be grammatically correct.
        2. **analysis**: Provide a short, bulleted list of key mistakes. Explain each mistake simply.
        3. **nextTopic**: Suggest a new, related conversation topic that would help the user practice the areas they struggled with.

        Text to analyze: ${inputText}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const responseText = response.text();

        console.log("\n--- AI Response ---");
    console.log(responseText);
    console.log("\n--- End of Response ---");

    // Bonus: Let's try to parse the JSON to see if it's valid
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
        console.log("\n📝 Analysis:");
        parsedJson.analysis.forEach((item, index) => {
            console.log(`${index + 1}. ${item.mistake}: ${item.explanation}`);
        });
        console.log(`\n🎯 Next Topic: ${parsedJson.nextTopic}`);
    } catch (e) {
        console.error("\n❌ Failed to parse AI response as JSON. The model might not have followed instructions perfectly.", e.message);
        console.log("Raw response:", responseText);
    }

  } catch (error) {
    console.error("❌ Error communicating with the AI:", error);
  }
}

// Run the main function
runSpike();