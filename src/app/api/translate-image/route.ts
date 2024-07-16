import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { base64ToUint8Array } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  image: z.string(),
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
  const { fromLanguage, toLanguage, image, apiKey } = data;

  const formattedImage = base64ToUint8Array(image);

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey,
  });

  const model = openai("gpt-4o");

  try {
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
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";

    return Response.json(
      {
        success: false,
        message,
      },
      { status: 401 }
    );
  }
}
