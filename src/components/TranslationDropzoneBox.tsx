import { useContext } from "react";
import Image from "next/image";

import { Dropzone } from "./Dropzone";
import { imageContext } from "@/providers";

export const TranslationDropzoneBox = () => {
  const { handleImageChange, file } = useContext(imageContext);

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    handleImageChange(file);
  };

  const image = file != null ? URL.createObjectURL(file) : null;

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm">
      {image ? (
        <Image
          priority
          className="w-full h-full object-cover max-w-[150px] max-h-[150px]"
          src={image}
          alt="preview image"
          width={150}
          height={150}
        />
      ) : (
        <Dropzone onDrop={onDrop} />
      )}
    </div>
  );
};
