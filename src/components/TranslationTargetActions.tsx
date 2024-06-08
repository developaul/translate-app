import { FC, useContext, useState } from "react";
import { CopyIcon, SpeakerLoudIcon, StopIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { speechSynthesisContext } from "@/providers";

interface TranslationTargetActionsProps {
  value: string;
}

export const TranslationTargetActions: FC<TranslationTargetActionsProps> = ({
  value,
}) => {
  const { toast } = useToast();

  const { isSpeaking, handleStartSpeaking, handleStopSpeaking } = useContext(
    speechSynthesisContext
  );

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

  return (
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isSpeaking ? (
          <Button onClick={handleStopSpeaking} variant="ghost" size="icon">
            <StopIcon />
          </Button>
        ) : (
          <Button onClick={handleStartSpeaking} variant="ghost" size="icon">
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
