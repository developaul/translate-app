import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import PDFParser, { Output } from "pdf2json";

import { dataURLtoFile } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const pdfParser = new PDFParser();

const waitForPdfData = (): Promise<Output> => {
  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", reject);
    pdfParser.on("pdfParser_dataReady", resolve);
  });
};

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

  const file = dataURLtoFile(document);
  const fileArrayBuffer = await file.arrayBuffer();
  pdfParser.parseBuffer(fileArrayBuffer as Buffer, 9);

  const pdfData = await waitForPdfData();

  const textToTranslate = pdfData.Pages.map((page) => {
    return page.Texts.map((text) => {
      return text.R.map(({ T }) => decodeURIComponent(T).trim()).join("");
    }).join("");
  });

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
