import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="container px-3 flex items-center justify-end py-3 md:p-6">
      <ThemeToggle />
    </header>
  );
};
