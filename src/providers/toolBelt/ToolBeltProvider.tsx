"use client";

import { FC, PropsWithChildren } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { toolBeltContext } from "./toolBeltContext";
import { SearchParams, ToolBeltType } from "@/lib/constants";

export const ToolBeltProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toolBeltType =
    (searchParams.get(SearchParams.OPTION) as ToolBeltType) ??
    ToolBeltType.TEXT;

  const handleChangeToolBeltType = (toolBeltType: ToolBeltType) => () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(SearchParams.OPTION, toolBeltType);

    const queryString = newSearchParams.toString();

    router.replace(`${pathname}?${queryString}`);
  };

  return (
    <toolBeltContext.Provider
      value={{
        handleChangeToolBeltType,
        toolBeltType,
      }}
    >
      {children}
    </toolBeltContext.Provider>
  );
};
