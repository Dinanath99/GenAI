import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hey how are you?" }],
    }); 
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}
if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment variables.");
  process.exit(1);
}

run();
