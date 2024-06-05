import { NextPage } from "next";

import { Header } from "@/containers/Header";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        Translator
      </main>
    </>
  );
};

export default HomePage;
