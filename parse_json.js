// Format output function

function parse_json(cleanJsonString) {
  if (!cleanJsonString) {
    console.error(
      "❌ Error: Could not find a valid JSON object in the response."
    );
    return null;
  }

  // Parse the cleaned JSON string.
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

  return parsedJson;
}

export default parse_json;
