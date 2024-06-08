import { NextPage } from "next";

import { Header, Translate } from "@/containers";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <Translate />
    </>
  );
};

export default HomePage;
