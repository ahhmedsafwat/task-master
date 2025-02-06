"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon />
        </Button>
      )}
    </div>
  );
}
