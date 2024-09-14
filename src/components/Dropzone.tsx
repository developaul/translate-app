import Image from "next/image";
import React, { FC } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  title: string;
  accept?: Accept;
}

export const Dropzone: FC<DropzoneProps> = ({ title, accept, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
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
          src={"/drag_and_drop.webp"}
          loading='lazy'
          alt="drag and drop"
          width={150}
          height={90}
        />
        <p className="text-center">{title}</p>
      </div>
    </section>
  );
};
