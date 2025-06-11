import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI();
async function generateImageFromText() {
  const response = await openai.images.generate({
    prompt: "A beautiful landscape with mountains and a river",
    n: 1, //number of response
    size: "1024x1024",
    model: "dall-e-3",
    quality: "standard",
    style: "vivid",
  });
  console.log(response);
}
generateImageFromText();
