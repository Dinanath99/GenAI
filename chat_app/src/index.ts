const dotenv = require("dotenv");
const { OpenAI } = require("openai");
dotenv.config();
const openai = new OpenAI(); //instance of openAi

async function run() {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Hello !" }],
    model: "gpt-3.5-turbo",
  });
  console.log(response.choices[0].message.content);
}
run();
