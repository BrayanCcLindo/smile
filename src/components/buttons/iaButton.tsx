import type React from "react"; // Added import for React
import { Button } from "./button";
import { twMerge } from "tailwind-merge";

interface AIButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: "purple" | "blue";
}

export default function AIButton({
  onClick,
  children,
  type = "button",
  color
}: AIButtonProps) {
  return (
    <Button
      type={type}
      className={twMerge(
        "relative px-4 py-2 overflow-hidden text-content_text transition-all duration-500 shadow-lg group rounded-2xl hover:scale-105 hover:shadow-xl active:scale-95 mt-2",
        color === "purple" &&
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white",
        color === "blue" &&
          "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
      )}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center gap-3">
        {children}
      </div>
      <span className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-300 ease-in-out transform scale-x-0 bg-white group-hover:scale-x-100"></span>
    </Button>
  );
}
