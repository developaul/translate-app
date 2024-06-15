import Image from "next/image";
import React, { FC } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const Dropzone: FC<DropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <section className="w-full h-full">
      <div
        {...getRootProps({
          className:
            "dropzone w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <Image
          src={"/drag_and_drop.png"}
          alt="drag and drop"
          priority
          className="max-w-[150px] max-h-[150px]"
          width={150}
          height={150}
        />
        <p className="text-center">
          Drag and drop an image here, or click to select an image
        </p>
      </div>
    </section>
  );
};
