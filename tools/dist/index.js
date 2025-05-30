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
function getTimeInNepal() {
    return new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
    });
}
function callOpenAITool() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
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
                        name: "getTimeInNepal",
                        description: "Get current time in Nepal",
                    },
                },
            ],
            tool_choice: "auto",
        });
        const willInvokeTheTool = response.choices[0].finish_reason === "tool_calls";
        const toolCall = (_a = response.choices[0].message.tool_calls) === null || _a === void 0 ? void 0 : _a[0];
        if (willInvokeTheTool) {
            const toolName = toolCall === null || toolCall === void 0 ? void 0 : toolCall.function.name;
            if (toolName === "getTimeInNepal") {
                const time = getTimeInNepal();
                context.push(response.choices[0].message);
                context.push({
                    role: "tool",
                    content: time,
                    tool_call_id: (_b = toolCall === null || toolCall === void 0 ? void 0 : toolCall.id) !== null && _b !== void 0 ? _b : "",
                });
            }
        }
        const secondReponse = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: context,
        });
        console.log(secondReponse.choices[0].message.content);
    });
}
callOpenAITool();
