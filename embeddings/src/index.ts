import dotenv from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import { OpenAI } from "openai";
import { join } from "path";
dotenv.config();

type Fruits = {
  id: string;
  name: string;
  description: string;
};
const openai = new OpenAI();
const dotProduct = (vecA: number[], vecB: number[]) => {
  return vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
};

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProd = dotProduct(vecA, vecB);
  const magnitudeA = Math.sqrt(dotProduct(vecA, vecB));
  const magniTudeB = Math.sqrt(dotProduct(vecA, vecB));
  return dotProd / (magnitudeA * magniTudeB);
};

export function loadFruitJsonFile<T>(fileName: string): T {
  const filePath = join(__dirname, fileName);
  const rawData = readFileSync(filePath, "utf-8");
  return JSON.parse(rawData.toString());
}
// console.log(loadFruitJsonFile("fruits.json"));
async function generateEmbeddings(fruitDescription: string[]) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "Hello, how are you ?",
  });
  return response;
}

const saveDataToJsonFile = (fileName: string, data: any) => {
  const filePath = join(__dirname, fileName);
  const jsonData = JSON.stringify(data, null, 2);
  writeFileSync(filePath, jsonData, "utf-8");
};

async function run() {
  const fruits: Fruits[] = loadFruitJsonFile("fruits.json");
  const fruitDescription = fruits.map((fruit) => fruit.description);
  // console.log(fruitDescription);
  const embeddings = await generateEmbeddings(fruitDescription);

  const fruitsWithEmbeddings = fruits.map((fruit, index) => ({
    ...fruit,
    embedding: embeddings.data[index].embedding,
  }));

  saveDataToJsonFile("fruits_with_embeddings.json", fruitsWithEmbeddings);
}
run();
