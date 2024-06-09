import { LanguagePicker, ToolBelt, TextareaGroup } from "@/components";

export const Translate = () => {
  return (
    <main className="container px-3 max-w-[1000px]">
      <ToolBelt />
      <LanguagePicker />
      <TextareaGroup />
    </main>
  );
};
