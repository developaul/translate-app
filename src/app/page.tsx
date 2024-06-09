"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";
import { Suspense } from "react";

const HomePage: NextPage = () => {
  useSetSearchParams();

  return (
    <Suspense>
      <Header />
      <Translate />
    </Suspense>
  );
};

export default HomePage;
