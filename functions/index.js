// Trigger re-deployment
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Define the secret using defineSecret
const geminiApiKey = defineSecret("GEMINI_API_KEY");

const cors = require("cors")({ origin: true });

exports.generateRecommendations = onCall({ secrets: [geminiApiKey] }, async (request) => {
  // Access the secret's value
  const genAI = new GoogleGenerativeAI(geminiApiKey.value());

  const prompt = request.data.prompt;

  if (!prompt || typeof prompt !== 'string') {
    throw new HttpsError(
      "invalid-argument",
      "The function must be called with a non-empty 'prompt' string."
    );
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { recommendations: text };
  } catch (error) {
    console.error("Error generating content:", error);
    throw new HttpsError("internal", "Error generating recommendations.");
  }
});

exports.imageProxy = onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});
