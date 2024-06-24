import { useContext } from "react";
import { TranslationBoxTypes } from "@/lib/constants";
import { DocumentDropzoneBox } from "./DocumentDropzoneBox";
import { TranslationBox } from "./TranslationBox";
import { documentContext } from "@/providers";

export const DocumentGroup = () => {
  const { completion } = useContext(documentContext);

  return (
    <div className="flex flex-col md:flex-row md:gap-14">
      <DocumentDropzoneBox />

      <TranslationBox
        textareaProps={{
          readOnly: true,
          placeholder: "Translated text here.",
          value: completion,
        }}
        type={TranslationBoxTypes.TARGET}
      />
    </div>
  );
};
