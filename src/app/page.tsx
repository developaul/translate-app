"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";
import { SetupDialog } from "@/components";

const HomePage: NextPage = () => {
  useSetSearchParams();

  return (
    <>
      <Header />
      <Translate />
      <SetupDialog />
    </>
  );
};

export default HomePage;
