import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { base64ToUint8Array } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

import {
  RATE_LIMIT_REQUESTS_IMAGE,
  RATE_LIMIT_TIME_IMAGE,
} from "@/lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  image: z.string(),
});

export async function POST(req: Request) {
  // Rate limit the request
  const ip = req.headers.get("x-forwarded-for");
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(
      RATE_LIMIT_REQUESTS_IMAGE,
      RATE_LIMIT_TIME_IMAGE
    ),
  });

  const {
    success: successRateLimit,
    limit,
    reset,
    remaining,
  } = await ratelimit.limit(`ratelimit_image_${ip}`);

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
