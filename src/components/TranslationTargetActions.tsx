import { FC } from "react";
import { CopyIcon, Share1Icon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface TranslationTargetActionsProps {
  value: string;
}

export const TranslationTargetActions: FC<TranslationTargetActionsProps> = ({
  value,
}) => {
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Translation copied to clipboard",
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
    <footer className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <Button onClick={handleCopyToClipboard} variant="ghost" size="icon">
          <CopyIcon />
        </Button>
      </div>
    </footer>
  );
};
