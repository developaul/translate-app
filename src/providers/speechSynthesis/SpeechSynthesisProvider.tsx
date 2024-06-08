"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getVoiceByLanguage } from "@/lib/utils";
import { speechSynthesisContext } from "./speechSynthesisContext";
import { HandleStartSpeakingArgs, SpeakingState } from "@/interfaces";
import { defaultSpeakingState } from "@/lib/constants";

export const SpeechSynthesisProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [speakingState, setSpeakingState] =
    useState<SpeakingState>(defaultSpeakingState);

  const handleStartSpeaking = ({
    text,
    language,
    type,
  }: HandleStartSpeakingArgs) => {
    try {
      const speechSynthesis = window.speechSynthesis;

      if (!speechSynthesis)
        throw new Error("SpeechSynthesis is not supported.");

      const voice = getVoiceByLanguage(language);

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.voice = voice;

      utterance.onstart = () => {
        setSpeakingState((prev) => ({ ...prev, type, isSpeaking: true }));
      };

      utterance.onend = () => {
        setSpeakingState((prev) => ({ ...prev, isSpeaking: false }));
      };

      speechSynthesis.speak(utterance);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem speaking the text.",
      });
    }
  };

  // Load speechSynthesis voices on mount
  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;

    if (!speechSynthesis) return;

    speechSynthesis.getVoices();
  }, []);

  const handleStopSpeaking = () => {
    try {
      const speechSynthesis = window.speechSynthesis;

      if (!speechSynthesis)
        throw new Error("SpeechSynthesis is not supported.");

      speechSynthesis.cancel();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem stopping the speech.",
      });
    } finally {
      setSpeakingState((prev) => ({ ...prev, isSpeaking: false }));
    }
  };

  return (
    <speechSynthesisContext.Provider
      value={{
        speakingState,
        handleStartSpeaking,
        handleStopSpeaking,
      }}
    >
      {children}
    </speechSynthesisContext.Provider>
  );
};
