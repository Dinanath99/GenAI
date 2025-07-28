// index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initAgent, askAgent } from "./agent";
import { ChatOpenAI } from "@langchain/openai";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.send("LangChain PDF QA Server is running ✅ Using OpenAI: gpt-3.5-turbo");
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Invalid question format" });
    }

    const answer = await askAgent(question);
    res.json({ answer });
  } catch (err) {
    console.error("Error in /ask:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  try {
    // Optional: log OpenAI key status
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn(" OPENAI_API_KEY is not set in .env");
    } else {
      console.log("OpenAI API Key loaded");
    }

    await initAgent();
    console.log("Agent initialized using OpenAI (gpt-3.5-turbo)");
  } catch (err) {
    console.error("Failed to initialize agent:", err);
  }
});
