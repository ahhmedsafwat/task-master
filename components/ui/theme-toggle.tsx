"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex w-fit items-center rounded-2xl bg-muted gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={`size-6 rounded-full cursor-pointer text-foreground hover:bg-secondary ${theme === "system" ? "bg-background shadow-sm" : ""}`}
        onClick={() => setTheme("system")}
      >
        <Laptop className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`size-6  rounded-full cursor-pointer text-foreground hover:bg-accent ${theme === "light" ? "bg-background shadow-sm" : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`size-6  rounded-full cursor-pointer text-foreground hover:bg-accent ${theme === "dark" ? "bg-background shadow-sm" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  );
}
