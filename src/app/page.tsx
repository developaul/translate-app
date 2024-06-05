import { NextPage } from "next";

import { Header, Translator } from "@/containers";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <Translator />
    </>
  );
};

export default HomePage;
