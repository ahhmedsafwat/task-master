"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering anything until mounted
  }

  return (
    <div className={className}>
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        <Sun />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        <Moon />
      </Button>
    </div>
  );
}
