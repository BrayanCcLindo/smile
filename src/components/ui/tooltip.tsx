import type React from "react";
import { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={
            "absolute bottom-full right-1/2 translate-x-1/2 bg-third_bg text-content_text px-3 py-2 rounded text-sm whitespace-nowrap z-10 flex items-center gap-2"
          }
        >
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
