import { FC, useContext } from "react";
import {
  CopyIcon,
  EnvelopeClosedIcon,
  Link1Icon,
  Share1Icon,
  SpeakerLoudIcon,
  StopIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  languageContext,
  speechRecognitionContext,
  speechSynthesisContext,
} from "@/providers";
import { TranslationBoxTypes } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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

  const { isRecording } = useContext(speechRecognitionContext);

  const isTargetSpeaking =
    speakingState.type == TranslationBoxTypes.TARGET &&
    speakingState.isSpeaking;

  const handleCopyTranslatedText = async () => {
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "📋 Link copied to clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem copying the link.",
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
        {isTargetSpeaking && (
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

        {!isTargetSpeaking && (
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopyTranslatedText}
              variant="ghost"
              size="icon"
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Copy translation</p>
          </TooltipContent>
        </Tooltip>

        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share1Icon />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Share translation</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="flex flex-col gap-2 w-52 p-2">
            <h4 className="text-center font-bold">Share this translation</h4>
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

              <Button onClick={handleCopyLink} variant="ghost" size="icon">
                <Link1Icon />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </footer>
  );
};
