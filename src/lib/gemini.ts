"server only";

import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import endent from "endent";

const systemPrompt = endent`
You are an assistant that helps users build diagrams using Mermaid.
You only need to return the output Mermaid code block.
Do not include any description, do not include the \`\`\`.
Code (no \`\`\`):
`;

export const streamGemini = async (messages: string[]) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 100,
    },
    systemInstruction: {
      parts: [{ text: systemPrompt }],
      role: "system",
    },
  });

  const result = await chat.sendMessageStream(messages[0]);

  const response = await result.response;

  for (const message of messages) {
    const result = await chat.sendMessageStream(message);
    await streamToStdout(result.stream);
  }

  displayTokenCount(model, chat, messages[0]);

  return response.text();
};

// Prints chunks of generated text to the console as they become available
const streamToStdout = async (stream: any) => {
  console.log("Streaming...\n");
  for await (const chunk of stream) {
    // Get first candidate's current text chunk
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
  console.log("\n");
};

const displayTokenCount = async (model: any, chat: any, msg: any) => {
  const history = await chat.getHistory();
  const msgContent = { role: "user", parts: [{ text: msg }] };
  const { totalTokens } = await model.countTokens({
    contents: [...history, msgContent],
  });

  console.log("Token count: ", totalTokens);
};
