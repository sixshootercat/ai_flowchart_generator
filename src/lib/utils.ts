import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { deflate } from "pako";
import { fromUint8Array } from "js-base64";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const parseCodeFromMessage = (message: string) => {
  const regex = /```(?:mermaid)?\s*([\s\S]*?)```/;
  const match = message.match(regex);

  if (match) {
    return match[1];
  } else {
    return message;
  }
};

export const serializeCode = (code: string) => {
  const state = {
    code: parseCodeFromMessage(code),
    mermaid: JSON.stringify(
      {
        theme: "default",
      },
      undefined,
      2
    ),
    autoSync: true,
    updateDiagram: true,
  };
  const data = new TextEncoder().encode(JSON.stringify(state));
  const compressed = deflate(data, { level: 9 });
  return fromUint8Array(compressed, true);
};
