import { FC, useContext } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { KeyboardIcon, SpeakerLoudIcon, StopIcon } from "@radix-ui/react-icons";
import {
  MAX_TEXT_TO_TRANSLATE_LENGTH,
  TranslationBoxTypes,
} from "@/lib/constants";
import {
  languageContext,
  speechRecognitionContext,
  speechSynthesisContext,
} from "@/providers";
import { Microphone } from "@/icons";

interface TranslationSourceActionsProps {
  value: string;
}

export const TranslationSourceActions: FC<TranslationSourceActionsProps> = ({
  value,
}) => {
  const { fromLanguage } = useContext(languageContext);

  const { speakingState, handleStartSpeaking, handleStopSpeaking } = useContext(
    speechSynthesisContext
  );

  const { isRecording, handleStartRecording, handleStopRecording } = useContext(
    speechRecognitionContext
  );

  const isSourceSpeaking =
    speakingState.type == TranslationBoxTypes.SOURCE &&
    speakingState.isSpeaking;

  const _handleStartSpeaking = () => {
    handleStartSpeaking({
      text: value,
      language: fromLanguage,
      type: TranslationBoxTypes.SOURCE,
    });
  };

  return (
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!isRecording && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={speakingState.isSpeaking}
                onClick={handleStartRecording}
                variant="ghost"
                size="icon"
              >
                <Microphone />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Translate by voice</p>
            </TooltipContent>
          </Tooltip>
        )}

        {isRecording && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleStopRecording} variant="ghost" size="icon">
                <StopIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>stop voice translation</p>
            </TooltipContent>
          </Tooltip>
        )}

        {value.length > 0 && isSourceSpeaking && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleStopSpeaking} variant="ghost" size="icon">
                <StopIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Stop</p>
            </TooltipContent>
          </Tooltip>
        )}

        {value.length > 0 && !isSourceSpeaking && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={speakingState.isSpeaking || isRecording}
                onClick={_handleStartSpeaking}
                variant="ghost"
                size="icon"
              >
                <SpeakerLoudIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Listen</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs">
          {value.length} / {MAX_TEXT_TO_TRANSLATE_LENGTH}
        </p>

        <Button disabled variant="ghost" size="icon">
          <KeyboardIcon />
        </Button>
      </div>
    </footer>
  );
};
