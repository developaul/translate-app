import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  prompt: z.string(),
  fromLanguage: z.string(),
  toLanguage: z.string(),
  apiKey: z.string(),
});

export async function POST(req: Request) {
  // Validate the request body
  const body = await req.json();

  const { success: successSchema, data, error } = RequestSchema.safeParse(body);

  if (!successSchema) {
    return Response.json(
      {
        success: false,
        message: "Invalid request body.",
        data: error.format(),
      },
      { status: 400 }
    );
  }

  // Controller for the translation
  const { fromLanguage, toLanguage, prompt, apiKey } = data;

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      prompt,
      system: `Translate the following text from ${fromLanguage} to ${toLanguage}. If "Auto" is the from language, then try to detect the original language automatically after reading the text. Return directly the translated text. Do not include the prompt in the response.`,
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "You need to provide your API Key",
      },
      { status: 401 }
    );
  }
}
