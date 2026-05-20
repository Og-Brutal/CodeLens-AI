const { GoogleGenAI } = require('@google/genai');
const env = require('../../config/env');
const Review = require('./reviews.model');

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const generateReview = async (code, language) => {
    if (!env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing. Please configure it in .env");
    }

    const systemInstruction = `You are an expert Senior Software Engineer and Security Auditor. 
Your task is to review the provided code snippet.
Analyze it for bugs, security vulnerabilities, and optimization opportunities.
Also, provide suggested fixes and architectural improvements in Markdown format.

You MUST respond ONLY with a valid JSON object matching this exact structure, with no markdown code blocks around the JSON:
{
  "score": <number between 0 and 100 representing overall quality>,
  "bugs": [<array of strings describing bugs, empty if none>],
  "security": [<array of strings describing security issues, empty if none>],
  "optimizations": [<array of strings describing performance or readability optimizations, empty if none>],
  "general_feedback": "<string containing detailed Markdown formatted suggestions and rewritten code snippets>"
}

Ensure the response is purely the JSON object so it can be parsed programmatically.`;

    const prompt = `Language: ${language}\n\nCode to review:\n\`\`\`\n${code}\n\`\`\``;

    const responseSchema = {
        type: "object",
        properties: {
            score: { type: "number" },
            bugs: { type: "array", items: { type: "string" } },
            security: { type: "array", items: { type: "string" } },
            optimizations: { type: "array", items: { type: "string" } },
            general_feedback: { type: "string" }
        },
        required: ["score", "bugs", "security", "optimizations", "general_feedback"]
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });

        let aiText = response.text;
        
        // Safety cleanup just in case
        aiText = aiText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

        const parsedResponse = JSON.parse(aiText);

        // Save to Database (fire and forget for this simple example)
        try {
            await Review.create({
                code,
                language,
                aiResponse: parsedResponse
            });
        } catch (dbError) {
            console.error("Failed to save review to DB:", dbError.message);
        }

        return parsedResponse;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate code review from AI.");
    }
};

const getAllReviews = async () => {
    return await Review.find().sort({ createdAt: -1 }).limit(20);
};

module.exports = {
    generateReview,
    getAllReviews
};
