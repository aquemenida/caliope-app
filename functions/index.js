// Trigger re-deployment
const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Use environment variables for the API key
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

exports.generateCaliopeRecommendations = functions.https.onCall(async (data, context) => {
  const prompt = data.prompt;

  // Log the received prompt for debugging.
  console.log("Received data object:", data);
  console.log("Received prompt:", prompt);

  if (!prompt || typeof prompt !== 'string') {
    console.error("Invalid or missing prompt:", prompt);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a non-empty 'prompt' string."
    );
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    // Pass the prompt string directly to generateContent.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { recommendations: text };
  } catch (error) {
    console.error("Error generating content:", error);
    throw new functions.https.HttpsError("internal", "Error generating recommendations.");
  }
});

exports.imageProxy = functions.https.onRequest(async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    res.status(400).send("Missing image URL");
    return;
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "stream",
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
});