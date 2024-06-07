import { Textarea } from "./ui/textarea";

export const TextareaGroup = () => {
  return (
    <div className="flex flex-col md:flex-row gap-14  ">
      <Textarea placeholder="Type your text here." />

      <Textarea placeholder="Translated text here." />
    </div>
  );
};
