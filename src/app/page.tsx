"use client";

import { useState } from "react";
import { Mermaid } from "@/app/components/mermaid";
import { ChatInput } from "@/app/components/chat-input";
import { CodeBlock } from "@/app/components/code-block";
import { ChatMessage } from "@/app/components/chat-message";
import type { RequestBody } from "@/types/type";
import { parseCodeFromMessage } from "@/lib/utils";

export default function Home() {
  const [draftMessage, setDraftMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [draftOutputCode, setDraftOutputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");

  const handleSubmit = async () => {
    if (!draftMessage) {
      alert("Please enter a message.");
      return;
    }

    const newMessage = draftMessage;
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setDraftMessage("");
    setDraftOutputCode("");

    const controller = new AbortController();
    const body: RequestBody = { messages: [draftMessage] };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      alert("Something went wrong.");
      return;
    }

    const data = response.body;

    if (!data) {
      alert("Something went wrong.");
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      code += chunkValue;
      setDraftOutputCode((prevCode) => prevCode + chunkValue);
    }
    setOutputCode(parseCodeFromMessage(code));
  };

  return (
    <main className="container flex-1 w-full flex flex-wrap">
      <div className="flex border md:border-r-0 flex-col justify-between w-full md:w-1/2">
        <div className="">
          <div className="max-h-[90vh] overflow-auto">
            {messages.map((message, idx) => {
              return <ChatMessage key={idx} message={message} />;
            })}
          </div>
        </div>
        <div className="w-full p-2">
          <ChatInput
            messageCotent={draftMessage}
            onChange={setDraftMessage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="border w-full md:w-1/2 p-2 flex flex-col">
        <CodeBlock code={draftOutputCode} />
        <div className="border relative h-[50%] max-h-[50%]">
          {outputCode && <Mermaid chart={outputCode} />}
        </div>
      </div>
    </main>
  );
}
