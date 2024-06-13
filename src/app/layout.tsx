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
} from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Translate App",
  description: "Translate your text easily and quickly in multiple languages",
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
            <Suspense>
              <ToolBeltProvider>
                <LanguageProvider>
                  <TextProvider>
                    <ImageProvider>
                      <SpeechSynthesisProvider>
                        <SpeechRecognitionProvider>
                          {children}
                          <Analytics />
                        </SpeechRecognitionProvider>
                      </SpeechSynthesisProvider>
                    </ImageProvider>
                  </TextProvider>
                </LanguageProvider>
              </ToolBeltProvider>
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
