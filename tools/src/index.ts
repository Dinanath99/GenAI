import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({});
const openai = new OpenAI();

//creating our own tool to get time in newyork
function getTimeInNepal() {
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
          name: "getTimeInNepal",
          description: "Get current time in Nepal",
        },
      },
    ],

    tool_choice: "auto",
  });

  const willInvokeTheTool = response.choices[0].finish_reason === "tool_calls";
  const toolCall = response.choices[0].message.tool_calls?.[0];

  if (willInvokeTheTool) {
    const toolName = toolCall?.function.name;
    if (toolName === "getTimeInNepal") {
      const time = getTimeInNepal();
      context.push(response.choices[0].message);
      context.push({
        role: "tool",
        content: time,
        tool_call_id: toolCall?.id ?? "",
      });
    }
  }
  const secondReponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: context,
  });
  console.log(secondReponse.choices[0].message.content);
}
callOpenAITool();
