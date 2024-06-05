"use client";

import { useEffect } from "react";
import {
  TextIcon,
  ImageIcon,
  FileIcon,
  TableIcon,
} from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ToolBeltType } from "@/lib/constants";

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
    if (toolBeltType) return;
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
          >
            <TextIcon className="h-4 w-4 mr-2" />
            Text
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChange(ToolBeltType.IMAGE)}
            variant={toolBeltType === ToolBeltType.IMAGE ? "default" : "ghost"}
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
          >
            <FileIcon className="h-4 w-4 mr-2" />
            Documents
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChange(ToolBeltType.WEB_SITE)}
            variant={
              toolBeltType === ToolBeltType.WEB_SITE ? "default" : "ghost"
            }
          >
            <TableIcon className="h-4 w-4 mr-2" />
            Web sites
          </Button>
        </li>
      </ul>
    </nav>
  );
};
