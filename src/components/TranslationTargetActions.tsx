import { FC, useContext } from "react";
import {
  CopyIcon,
  EnvelopeClosedIcon,
  Share1Icon,
  SpeakerLoudIcon,
  StopIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { languageContext, speechSynthesisContext } from "@/providers";
import { TranslationBoxTypes } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Share1Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 w-52 p-2">
            <h4 className="text-center">Share this translation</h4>
            <div className="flex items-center justify-center gap-1">
              <a rel="noreferrer" href={`mailto:?body=${value}`}>
                <Button variant="ghost" size="icon">
                  <EnvelopeClosedIcon />
                </Button>
              </a>
              <a
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${value}`}
                target="_blank"
              >
                <Button variant="ghost" size="icon">
                  <TwitterLogoIcon />
                </Button>
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </footer>
  );
};
