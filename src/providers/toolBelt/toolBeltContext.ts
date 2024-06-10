"use client";

import { createContext } from "react";

import { ToolBeltType } from "@/lib/constants";

export interface ToolBeltContextArgs {
  toolBeltType: ToolBeltType;
  handleChangeToolBeltType: (toolBeltType: ToolBeltType) => () => void;
}

export const toolBeltContext = createContext<ToolBeltContextArgs>(
  {} as ToolBeltContextArgs
);
