const dotenv = require("dotenv");
const { OpenAI } = require("openai");
dotenv.config();
const openai = new OpenAI();

type Context = {
  role: "user" | "assistant" | "system";
  content: string;
}[];
const context: Context = [
  {
    role: "system",
    content: "You are a helpful assistant.",
  },
  {
    role: "user",
    content: "Hello, how are you?",
  },
];

async function chatCompletion() {
  const response = await openai.chat.completions.create({
    messages: context,
    model: "gpt-3.5-turbo",
  });
  const responseMessage = response.choices[0].message;
  context.push({
    role: "assistant",
    content: responseMessage.content,
  });
  console.log(`Assistant: ${responseMessage.role}, ${responseMessage.content}`);
}

async function run() {
  const input = require("prompt-sync")({ sigint: true });
  while (true) {
    const userInput = input() as string;
    if (userInput.toLocaleLowerCase() === "exit") {
      console.log("Exiting chat...");
      break;
    }
    context.push({
      role: "user",
      content: userInput,
    });
    await chatCompletion();
  }
}
run();
