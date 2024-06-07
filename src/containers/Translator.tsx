import { LanguagePicker, ToolBelt, TextareaGroup } from "@/components";

export const Translator = () => {
  return (
    <main className="container px-3 max-w-[1000px]">
      <ToolBelt />
      <LanguagePicker />
      <TextareaGroup />
    </main>
  );
};
