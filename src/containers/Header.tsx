import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Header = () => {
  return (
    <header className="container px-3 flex items-center justify-end py-3 md:p-6 gap-2">
      <a
        href="https://github.com/developaul/translate-app"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <GitHubLogoIcon />
        </Button>
      </a>
      <ThemeToggle />
    </header>
  );
};
