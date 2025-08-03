# AI Language Learning Spike

A test script for analyzing English text from language learners using Google's Gemini AI. This project demonstrates how to use the Google Generative AI API to provide grammar corrections, analysis, and conversation suggestions.

## Features

- Analyzes English text for grammatical errors
- Provides corrected versions of the text
- Offers detailed explanations of mistakes
- Suggests next conversation topics for practice
- Uses Google's Gemini 1.5 Flash model

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-spike
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   - Get a Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the project root
   - Add your API key: `GOOGLE_API_KEY=your_actual_api_key_here`

4. **Run the script**
   ```bash
   npm start
   ```

## Usage

The script currently analyzes a sample text: "I is learning English. Yesterday I eat a sushi. It were delicious"

To analyze different text, modify the `sampleText` variable in `spike.js`.

## Output Example

```
✅ JSON is valid. Here's the corrected text:
I am learning English. Yesterday I ate sushi. It was delicious.

📝 Analysis:
1. I is learning English: Incorrect verb conjugation...
2. Yesterday I eat a sushi: Incorrect past tense verb...
3. It were delicious: Incorrect verb conjugation...

🎯 Next Topic: Talking about past activities and meals...
```

## Dependencies

- `@google/generative-ai`: Google's Generative AI SDK
- `dotenv`: Environment variable management

## Security

- Never commit your `.env` file to version control
- The `.gitignore` file is configured to exclude sensitive files
- Keep your API keys secure and rotate them regularly

## License

MIT 