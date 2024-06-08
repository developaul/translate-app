import { FC, useContext } from "react";
import { CopyIcon, SpeakerLoudIcon, StopIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { languageContext, speechSynthesisContext } from "@/providers";
import { TranslationBoxTypes } from "@/lib/constants";

interface TranslationTargetActionsProps {
  value: string;
}

export const TranslationTargetActions: FC<TranslationTargetActionsProps> = ({
  value,
}) => {
  const { toast } = useToast();

  const { toLanguage } = useContext(languageContext);

  const { speakingState, handleStartSpeaking, handleStopSpeaking } = useContext(
    speechSynthesisContext
  );

  const isTargetSpeaking =
    speakingState.type == TranslationBoxTypes.TARGET &&
    speakingState.isSpeaking;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "📋 Translation copied to clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem copying the text.",
      });
    }
  };

  const _handleStartSpeaking = () => {
    handleStartSpeaking({
      text: value,
      language: toLanguage,
      type: TranslationBoxTypes.TARGET,
    });
  };

  return (
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isTargetSpeaking ? (
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
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCopyToClipboard} variant="ghost" size="icon">
          <CopyIcon />
        </Button>
      </div>
    </footer>
  );
};
