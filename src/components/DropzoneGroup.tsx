import { useContext } from "react";
import { TranslationBoxTypes } from "@/lib/constants";
import { imageContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { TranslationDropzoneBox } from "./TranslationDropzoneBox";

export const DropzoneGroup = () => {
  const { completion } = useContext(imageContext);

  return (
    <div className="flex flex-col md:flex-row md:gap-14">
      <TranslationDropzoneBox />

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
