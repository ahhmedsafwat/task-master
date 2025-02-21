import { Dispatch, SetStateAction } from "react";
import { Button } from "./button";

export const MenuIcon = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="p-2"
      onClick={() => {
        toggleMenu((prev) => !prev);
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "rotate-90" : ""
        }`}
      >
        <g className="transition-all duration-300 ease-in-out">
          {/* 4 dots */}
          <circle
            cx="7"
            cy="7"
            r="2"
            fill="currentColor"
            className={isMenuOpen ? "opacity-0" : "opacity-100"}
          />
          <circle
            cx="17"
            cy="7"
            r="2"
            fill="currentColor"
            className={isMenuOpen ? "opacity-0" : "opacity-100"}
          />
          <circle
            cx="7"
            cy="17"
            r="2"
            fill="currentColor"
            className={isMenuOpen ? "opacity-0" : "opacity-100"}
          />
          <circle
            cx="17"
            cy="17"
            r="2"
            fill="currentColor"
            className={isMenuOpen ? "opacity-0" : "opacity-100"}
          />
          {/* X shape */}
          <line
            x1="7"
            y1="7"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <line
            x1="17"
            y1="7"
            x2="7"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </g>
      </svg>
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};
