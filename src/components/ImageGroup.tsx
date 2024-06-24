import { useContext } from "react";

import { TranslationBoxTypes } from "@/lib/constants";
import { imageContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { ImageDropzoneBox } from "./ImageDropzoneBox";

export const ImageGroup = () => {
  const { completion } = useContext(imageContext);

  return (
    <div className="flex flex-col md:flex-row md:gap-14">
      <ImageDropzoneBox />

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
