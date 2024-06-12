import { atom } from "jotai";

import type { OpenAIModel } from "@/types";

export const apiKeyAtom = atom("");
export const modelAtom = atom<OpenAIModel>("gpt-3.5-turbo");
