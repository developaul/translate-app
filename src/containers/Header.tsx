import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="container flex items-center justify-end p-4 md:p-8">
      <ThemeToggle />
    </header>
  );
};
