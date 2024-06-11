"use client";

import { FC, PropsWithChildren, useContext, useRef, useState } from "react";

import { speechRecognitionContext } from "./speechRecognitionContext";
import { textContext } from "../text";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const SpeechRecognitionProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const recognition = useRef<any>(null);

  const { handleChangeTextToTranslate } = useContext(textContext);

  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;

    recognition.current.onresult = async function (event: any) {
      const textToTranslate = [...event.results]
        .map((result: SpeechRecognitionResult) => {
          const transcript = result[0].transcript;

          return transcript;
        })
        .join("");

      handleChangeTextToTranslate(textToTranslate);
    };

    recognition.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    recognition.current.abort();
    setIsRecording(false);
  };

  return (
    <speechRecognitionContext.Provider
      value={{ handleStartRecording, handleStopRecording, isRecording }}
    >
      {children}
    </speechRecognitionContext.Provider>
  );
};
