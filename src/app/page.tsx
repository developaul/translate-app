import { NextPage } from "next";

import { Button } from "@/components/ui/button";

const HomePage: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
    </main>
  );
};

export default HomePage;
