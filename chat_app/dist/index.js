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
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
dotenv.config();
const openai = new OpenAI(); //instance of openAi
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello !" }],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices[0].message.content);
    });
}
run();
