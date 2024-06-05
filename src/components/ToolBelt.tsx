"use client";

import { useEffect } from "react";
import { TextIcon, ImageIcon, FileIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ToolBeltType, validToolBeltTypes } from "@/lib/constants";

export const ToolBelt = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toolBeltType = searchParams.get("op") as ToolBeltType;

  const handleChange = (toolBeltType: ToolBeltType) => () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("op", toolBeltType);

    const queryString = newSearchParams.toString();

    router.replace(`${pathname}?${queryString}`);
  };

  useEffect(() => {
    if (validToolBeltTypes.includes(toolBeltType)) return;
    handleChange(ToolBeltType.TEXT)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <Button
            onClick={handleChange(ToolBeltType.TEXT)}
            variant={toolBeltType === ToolBeltType.TEXT ? "default" : "ghost"}
            size={"sm"}
          >
            <TextIcon className="h-4 w-4 mr-2" />
            Text
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChange(ToolBeltType.IMAGE)}
            variant={toolBeltType === ToolBeltType.IMAGE ? "default" : "ghost"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Images
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChange(ToolBeltType.DOCUMENT)}
            variant={
              toolBeltType === ToolBeltType.DOCUMENT ? "default" : "ghost"
            }
            size={"sm"}
          >
            <FileIcon className="h-4 w-4 mr-2" />
            Documents
          </Button>
        </li>
      </ul>
    </nav>
  );
};
