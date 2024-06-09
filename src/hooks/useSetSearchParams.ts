"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DEFAULT_FROM_QUERY_LANGUAGE,
  DEFAULT_TO_QUERY_LANGUAGE,
  SearchParams,
  ToolBeltType,
  querylanguages,
  validToolBeltTypes,
} from "@/lib/constants";

export const useSetSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setDefaultSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const option = searchParams.get(SearchParams.OPTION);
    const fromLanguage = searchParams.get(SearchParams.FROM_LANGUAGE);
    const toLanguage = searchParams.get(SearchParams.TO_LANGUAGE);

    if (!validToolBeltTypes.includes(option as ToolBeltType))
      newSearchParams.set(SearchParams.OPTION, ToolBeltType.TEXT);

    if (!querylanguages.includes(fromLanguage as string))
      newSearchParams.set(
        SearchParams.FROM_LANGUAGE,
        DEFAULT_FROM_QUERY_LANGUAGE
      );

    if (!querylanguages.includes(toLanguage as string))
      newSearchParams.set(SearchParams.TO_LANGUAGE, DEFAULT_TO_QUERY_LANGUAGE);

    const queryString = newSearchParams.toString();

    router.replace(`${pathname}?${queryString}`);
  };

  useEffect(() => {
    setDefaultSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
