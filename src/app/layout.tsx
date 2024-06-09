import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ThemeProvider,
  TextProvider,
  LanguageProvider,
  SpeechSynthesisProvider,
} from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";
import { Suspense } from "react";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Translate App",
  description: "Translate your text easily and quickly in multiple languages",
};

export const dynamic = "force-dynamic";

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
              <LanguageProvider>
                <TextProvider>
                  <SpeechSynthesisProvider>{children}</SpeechSynthesisProvider>
                </TextProvider>
              </LanguageProvider>
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
