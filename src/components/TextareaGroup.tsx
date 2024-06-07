import { Textarea } from "./ui/textarea";

export const TextareaGroup = () => {
  return (
    <div className="flex flex-col md:flex-row gap-14  ">
      <Textarea
        className="h-[200px] resize-none"
        placeholder="Type your text here."
      />

      <Textarea
        className="h-[200px] resize-none"
        placeholder="Translated text here."
      />
    </div>
  );
};
