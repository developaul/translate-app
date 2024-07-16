"use client";

import { useContext } from "react";
import { TextIcon, ImageIcon, FileIcon, GearIcon } from "@radix-ui/react-icons";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { setupContext, toolBeltContext } from "@/providers";
import { Button } from "@/components/ui/button";
import { ToolBeltType } from "@/lib/constants";

export const ToolBelt = () => {
  const { toolBeltType, handleChangeToolBeltType } =
    useContext(toolBeltContext);

  const { handleOpenSetupDialog } = useContext(setupContext);

  return (
    <nav className="mb-4">
      <ul className="flex items-center gap-2">
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.TEXT)}
            variant={toolBeltType === ToolBeltType.TEXT ? "default" : "ghost"}
            size={"sm"}
          >
            <TextIcon className="h-4 w-4 mr-2" />
            Text
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.IMAGE)}
            variant={toolBeltType === ToolBeltType.IMAGE ? "default" : "ghost"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Images
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.DOCUMENT)}
            variant={
              toolBeltType === ToolBeltType.DOCUMENT ? "default" : "ghost"
            }
            size={"sm"}
          >
            <FileIcon className="h-4 w-4 mr-2" />
            Documents
          </Button>
        </li>
        <li>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleOpenSetupDialog}
                variant="outline"
                size={"icon"}
              >
                <GearIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Setup Api Key</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};
