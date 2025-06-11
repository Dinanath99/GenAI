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
const fs_1 = require("fs");
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
const openai = new openai_1.default();
function generateImageFromText() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const response = yield openai.images.generate({
            prompt: "An astronaut riding a horse in a futuristic city",
            n: 1,
            size: "1024x1024",
            model: "dall-e-3",
            quality: "standard",
            style: "vivid",
            response_format: "b64_json", // Required to get base64 string
        });
        const base64Image = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.b64_json;
        if (base64Image) {
            (0, fs_1.writeFileSync)("image.png", Buffer.from(base64Image, "base64"));
            console.log("Image saved as image.png");
        }
        else {
            console.log("Failed to generate image.");
        }
    });
}
generateImageFromText();
