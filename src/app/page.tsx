"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";

const HomePage: NextPage = () => {
  useSetSearchParams();

  return (
    <>
      <Header />
      <Translate />
    </>
  );
};

export default HomePage;
