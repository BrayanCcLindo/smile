import type React from "react";

const AILoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-24 h-24 animate-spin">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="text-[--muted] stroke-current"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            cx="50"
            cy="50"
            r="40"
          />
          <path
            className="text-[--primary] stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M50 10 C 30 10, 10 30, 10 50 C 10 70, 30 90, 50 90 C 70 90, 90 70, 90 50 C 90 30, 70 10, 50 10"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            className="text-[--primary] stroke-current animate-pulse"
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M25 50 L 40 50 L 50 30 L 60 70 L 75 50"
          />
        </svg>
      </div>
      <p className="mt-4 text-sm text-[--muted-foreground] animate-pulse">
        Procesando con IA...
      </p>
    </div>
  );
};

export default AILoader;
