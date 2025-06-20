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
exports.loadFruitJsonFile = loadFruitJsonFile;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const openai_1 = require("openai");
const path_1 = require("path");
dotenv_1.default.config();
const openai = new openai_1.OpenAI();
const dotProduct = (vecA, vecB) => {
    return vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
};
const cosineSimilarity = (vecA, vecB) => {
    const dotProd = dotProduct(vecA, vecB);
    const magnitudeA = Math.sqrt(dotProduct(vecA, vecB));
    const magniTudeB = Math.sqrt(dotProduct(vecA, vecB));
    return dotProd / (magnitudeA * magniTudeB);
};
function loadFruitJsonFile(fileName) {
    const filePath = (0, path_1.join)(__dirname, fileName);
    const rawData = (0, fs_1.readFileSync)(filePath, "utf-8");
    return JSON.parse(rawData.toString());
}
// console.log(loadFruitJsonFile("fruits.json"));
function generateEmbeddings(fruitDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield openai.embeddings.create({
            model: "text-embedding-3-small",
            input: "Hello, how are you ?",
        });
        return response;
    });
}
const saveDataToJsonFile = (fileName, data) => {
    const filePath = (0, path_1.join)(__dirname, fileName);
    const jsonData = JSON.stringify(data, null, 2);
    (0, fs_1.writeFileSync)(filePath, jsonData, "utf-8");
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const fruits = loadFruitJsonFile("fruits.json");
        const fruitDescription = fruits.map((fruit) => fruit.description);
        // console.log(fruitDescription);
        const embeddings = yield generateEmbeddings(fruitDescription);
        const fruitsWithEmbeddings = fruits.map((fruit, index) => (Object.assign(Object.assign({}, fruit), { embedding: embeddings.data[index].embedding })));
        saveDataToJsonFile("fruits_with_embeddings.json", fruitsWithEmbeddings);
    });
}
run();
