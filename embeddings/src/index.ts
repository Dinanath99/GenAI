import dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

const openai = new OpenAI();
async function generateEmbeddings() {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "Hello, how are you ?",
  });
  console.log(response);
}
generateEmbeddings();
