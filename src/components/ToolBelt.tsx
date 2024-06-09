"use client";

import { TextIcon, ImageIcon, FileIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SearchParams, ToolBeltType } from "@/lib/constants";

export const ToolBelt = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toolBeltType =
    (searchParams.get(SearchParams.OPTION) as ToolBeltType) ??
    ToolBeltType.TEXT;

  const handleChange = (toolBeltType: ToolBeltType) => () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(SearchParams.OPTION, toolBeltType);

    const queryString = newSearchParams.toString();

    router.replace(`${pathname}?${queryString}`);
  };

  return (
    <nav className="mb-4">
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
            disabled
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
            disabled
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
