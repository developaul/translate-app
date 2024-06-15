import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

import { RATE_LIMIT_REQUESTS, RATE_LIMIT_TIME } from "@/lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  prompt: z.string(),
  fromLanguage: z.string(),
  toLanguage: z.string(),
});

export async function POST(req: Request) {
  // Rate limit the request
  const ip = req.headers.get("x-forwarded-for");
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_TIME),
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
  const model = openai("gpt-4o");

  const { fromLanguage, toLanguage, prompt } = data;

  const result = await streamText({
    model,
    prompt,
    system: `Translate the following text from ${fromLanguage} to ${toLanguage}. If "Auto" is the from language, then try to detect the original language automatically after reading the text. Return directly the translated text. Do not include the prompt in the response.`,
    maxTokens: 4096,
    temperature: 0.7,
  });

  return result.toAIStreamResponse();
}
