import { streamGemini } from "@/lib/gemini";
import { type RequestBody } from "@/types/type";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as RequestBody;

    const stream = await streamGemini(messages);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
