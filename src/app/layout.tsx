import { Suspense } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ThemeProvider,
  TextProvider,
  LanguageProvider,
  SpeechSynthesisProvider,
  ToolBeltProvider,
  ImageProvider,
  SpeechRecognitionProvider,
  ErrorProvider,
  DocumentProvider,
} from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";
import { SetupProvider } from "@/providers/setup";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Translate App",
  description:
    "Translate your text, images, and documents in multiple languages",
  keywords:
    "translate, translator, translation, text, image, document, pdf, ai, openai, gpt, chatgpt, vercel, nextjs, tailwindcss, shadcn, radix, react, typescript, bun, kv, ratelimit, dayjs, pdf2json",
  metadataBase: new URL("https://talk-translate.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={DEFAULT_TOOLTIP_DELAY_DURATION}>
            <ErrorProvider>
              <Suspense>
                <SetupProvider>
                  <ToolBeltProvider>
                    <LanguageProvider>
                      <TextProvider>
                        <ImageProvider>
                          <DocumentProvider>
                            <SpeechSynthesisProvider>
                              <SpeechRecognitionProvider>
                                {children}
                                <Analytics />
                              </SpeechRecognitionProvider>
                            </SpeechSynthesisProvider>
                          </DocumentProvider>
                        </ImageProvider>
                      </TextProvider>
                    </LanguageProvider>
                  </ToolBeltProvider>
                </SetupProvider>
              </Suspense>
            </ErrorProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
