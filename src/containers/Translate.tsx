import { Suspense } from "react";
import { LanguagePicker, ToolBelt, TextareaGroup } from "@/components";

export const Translate = () => {
  return (
    <main className="container px-3 max-w-[1000px]">
      <Suspense>
        <ToolBelt />
      </Suspense>
      <LanguagePicker />
      <TextareaGroup />
    </main>
  );
};
