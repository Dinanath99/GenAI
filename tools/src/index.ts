import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({});
const openai = new OpenAI();

//creating our own tool to get time in newyork
function getTimeInNewYork() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
}

async function callOpenAITool() {
  const context: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a helpful assistant",
    },
    {
      role: "user",
      content: "what is the current time in nepal",
    },
  ];
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: context,
    tools: [
      {
        type: "function",
        function: {
          name: "getTimeInNewYork",
          description: "Get current time in newyork",
        },
      },
    ],

    tool_choice: "auto",
  });
  const willInvokeTheTool = response.choices[0].finish_reason === "tool_calls";
  console.log(response.choices[0].message.content);
}
callOpenAITool();
