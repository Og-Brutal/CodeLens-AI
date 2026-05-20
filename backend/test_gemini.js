require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
    try {
        console.log("Using Key:", process.env.GEMINI_API_KEY ? "Set" : "Not Set");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "say hi",
        });
        console.log(response.text);
    } catch (e) {
        console.error("FULL ERROR:", e);
    }
}
test();
