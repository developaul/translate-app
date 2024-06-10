import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { base64ToUint8Array } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  prompt: z.string(),
  fromLanguage: z.string(),
  toLanguage: z.string(),
  image: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data, error } = RequestSchema.safeParse(body);

  if (!success) {
    return new Response(JSON.stringify(error.format()), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const model = openai("gpt-4o");

  const { fromLanguage, toLanguage, image } = data;

  const formattedImage = base64ToUint8Array(image);

  const result = await streamText({
    model,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Translate the following text from ${fromLanguage} to ${toLanguage}. If "Auto" is the from language, then try to detect the original language automatically after reading the text from the image. If no text is detected in the image, return an empty string. Always return directly the translated text. Do not include the prompt in the response.`,
          },
          { type: "image", image: formattedImage },
        ],
      },
    ],
    maxTokens: 4096,
    temperature: 0.7,
  });

  return result.toAIStreamResponse();
}
