import dotenv from "dotenv";
import { writeFileSync } from "fs";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

async function generateImageFromText() {
  const response = await openai.images.generate({
    prompt: "An astronaut riding a horse in a futuristic city",
    n: 1,
    size: "1024x1024",
    model: "dall-e-3",
    quality: "standard",
    style: "vivid",
    response_format: "b64_json", // Required to get base64 string
  });

  const base64Image = response.data?.[0]?.b64_json;
  if (base64Image) {
    writeFileSync("image.png", Buffer.from(base64Image, "base64"));
    console.log("Image saved as image.png");
  } else {
    console.log("Failed to generate image.");
  }
}

generateImageFromText();
