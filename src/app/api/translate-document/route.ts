import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import pdf from "pdf-parse";

import { validPrefixes } from "@/lib/constants";


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  document: z.string(),
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
  const { fromLanguage, toLanguage, document, apiKey } = data;

  const matchedPrefix = validPrefixes.find((prefix) =>
    document.startsWith(prefix)
  );
  
  if (!matchedPrefix) {
    return Response.json(
      {
        success: false,
        message: "The Data URI format is invalid",
      },
      { status: 401 }
    );
  }

  const base64Data = document.slice(matchedPrefix.length);

  const pdfBuffer = Buffer.from(base64Data, "base64");

  let textToTranslate = "";

  try {
    const data = await pdf(pdfBuffer);
    textToTranslate = data.text;
  } catch (error) {    
    return Response.json(
      {
        success: false,
        message: "Error parsing the PDF document",
      },
      { status: 500 }
    );
  }

  // Service for the translation
  const openai = createOpenAI({
    compatibility: "strict",
    apiKey,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      system: `Translate the following text from ${fromLanguage} to ${toLanguage}. If "Auto" is the from language, then try to detect the original language automatically after reading the text. Return directly the translated text. Do not include the prompt in the response.`,
      prompt: textToTranslate.toString(),
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
