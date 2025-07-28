"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const agent_1 = require("./agent");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Health check
app.get("/", (_req, res) => {
    res.send("LangChain PDF QA Server is running ✅ Using OpenAI: gpt-3.5-turbo");
});
app.post("/ask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question } = req.body;
        if (!question || typeof question !== "string") {
            return res.status(400).json({ error: "Invalid question format" });
        }
        const answer = yield (0, agent_1.askAgent)(question);
        res.json({ answer });
    }
    catch (err) {
        console.error("Error in /ask:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Start server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 Server running on http://localhost:${port}`);
    try {
        // Optional: log OpenAI key status
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.warn(" OPENAI_API_KEY is not set in .env");
        }
        else {
            console.log("OpenAI API Key loaded");
        }
        yield (0, agent_1.initAgent)();
        console.log("Agent initialized using OpenAI (gpt-3.5-turbo)");
    }
    catch (err) {
        console.error("Failed to initialize agent:", err);
    }
}));
