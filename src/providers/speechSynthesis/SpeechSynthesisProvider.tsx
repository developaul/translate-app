"use client";

import { FC, PropsWithChildren, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getVoiceByLanguage } from "@/lib/utils";
import { speechSynthesisContext } from "./speechSynthesisContext";
import { languageContext } from "../language";
import { textContext } from "../text";

export const SpeechSynthesisProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { toLanguage } = useContext(languageContext);
  const { completion } = useContext(textContext);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartSpeaking = () => {
    try {
      const speechSynthesis = window.speechSynthesis;

      if (!speechSynthesis)
        throw new Error("SpeechSynthesis is not supported.");

      const voice = getVoiceByLanguage(toLanguage);

      const utterance = new SpeechSynthesisUtterance(completion);

      utterance.voice = voice;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
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
      setIsSpeaking(false);
    }
  };

  return (
    <speechSynthesisContext.Provider
      value={{
        isSpeaking,
        handleStartSpeaking,
        handleStopSpeaking,
      }}
    >
      {children}
    </speechSynthesisContext.Provider>
  );
};
