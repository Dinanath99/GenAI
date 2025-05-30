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
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config({});
const openai = new openai_1.default();
//creating our own tool to get time in newyork
function getTimeInNewYork() {
    return new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
    });
}
function callOpenAITool() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = [
            {
                role: "system",
                content: "You are a helpful assistant",
            },
            {
                role: "user",
                content: "what is the current time in nepal",
            },
        ];
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: context,
            tools: [
                {
                    type: "function",
                    function: {
                        name: "getTimeInNewYork",
                        description: "Get current time in newyork",
                    },
                },
            ],
            tool_choice: "auto",
        });
        const willInvokeTheTool = response.choices[0].finish_reason === "tool_calls";
        console.log(response.choices[0].message.content);
    });
}
callOpenAITool();
