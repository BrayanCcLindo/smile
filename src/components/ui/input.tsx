import * as React from "react";

import { cn } from "../../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-card_border bg-input_bg px-3 py-2 text-sm ring-offset-white placeholder:text-context_text focus-visible:outline-none focus-visible:ring-2 focus-within:ring-2 text-content_text focus-within:ring-content_text disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
