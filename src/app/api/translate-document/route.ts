import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import PDFParser, { Output } from "pdf2json";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

import {
  RATE_LIMIT_REQUESTS_DOCUMENT,
  RATE_LIMIT_TIME_DOCUMENT,
} from "@/lib/constants";
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
});

export async function POST(req: Request) {
  // Rate limit the request
  const ip = req.headers.get("x-forwarded-for");
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(
      RATE_LIMIT_REQUESTS_DOCUMENT,
      RATE_LIMIT_TIME_DOCUMENT
    ),
  });

  const {
    success: successRateLimit,
    limit,
    reset,
    remaining,
  } = await ratelimit.limit(`ratelimit_${ip}`);

  if (!successRateLimit) {
    return Response.json(
      {
        success: false,
        message: "You have reached your request limit for the day.",
        data: { limit, remaining, reset },
      },
      { status: 429 }
    );
  }

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
  const { fromLanguage, toLanguage, document } = data;

  const file = dataURLtoFile(document);
  const fileArrayBuffer = await file.arrayBuffer();
  pdfParser.parseBuffer(fileArrayBuffer as Buffer, 9);

  const pdfData = await waitForPdfData();

  const textToTranslate = pdfData.Pages.map((page) => {
    return page.Texts.map((text) => {
      return text.R.map(({ T }) => decodeURIComponent(T).trim()).join("");
    }).join("");
  });

  const model = openai("gpt-4o");

  const result = await streamText({
    model,
    system: `Translate the following text from ${fromLanguage} to ${toLanguage}. If "Auto" is the from language, then try to detect the original language automatically after reading the text. Return directly the translated text. Do not include the prompt in the response.`,
    prompt: textToTranslate.toString(),
    maxTokens: 4096,
    temperature: 0.7,
  });

  return result.toAIStreamResponse();
}
