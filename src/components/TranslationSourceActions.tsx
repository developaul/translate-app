import { FC, useContext } from "react";
import { Button } from "./ui/button";
import { KeyboardIcon, SpeakerLoudIcon, StopIcon } from "@radix-ui/react-icons";
import {
  MAX_TEXT_TO_TRANSLATE_LENGTH,
  TranslationBoxTypes,
} from "@/lib/constants";
import { languageContext, speechSynthesisContext } from "@/providers";

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
        {value.length > 0 &&
          (isSourceSpeaking ? (
            <Button onClick={handleStopSpeaking} variant="ghost" size="icon">
              <StopIcon />
            </Button>
          ) : (
            <Button
              disabled={speakingState.isSpeaking}
              onClick={_handleStartSpeaking}
              variant="ghost"
              size="icon"
            >
              <SpeakerLoudIcon />
            </Button>
          ))}
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
