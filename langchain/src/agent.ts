import { embedPdf } from "./ingest";
import { ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";

let qaChain: RetrievalQAChain;

export const initAgent = async () => {
  const vectorStore = await embedPdf();
  const retriever = vectorStore.asRetriever();

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
  });

  qaChain = await RetrievalQAChain.fromLLM(model, retriever);
};

export const askAgent = async (question: string) => {
  if (!qaChain) {
    throw new Error("Agent not initialized. Please call initAgent first.");
  }
  const res = await qaChain.call({ query: question });
  return res.text;
};
