import { useContext } from "react";
import {
  LanguagePicker,
  ToolBelt,
  TextareaGroup,
  DropzoneGroup,
} from "@/components";
import { ToolBeltType } from "@/lib/constants";
import { toolBeltContext } from "@/providers";

export const Translate = () => {
  const { toolBeltType } = useContext(toolBeltContext);

  return (
    <main className="container px-3 max-w-[1000px]">
      <ToolBelt />

      <LanguagePicker />

      {toolBeltType === ToolBeltType.TEXT && <TextareaGroup />}

      {toolBeltType === ToolBeltType.IMAGE && <DropzoneGroup />}
    </main>
  );
};
