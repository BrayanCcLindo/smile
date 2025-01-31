import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils";

const buttonVariants = cva(
  "text-left rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card_border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-input_bg text-heading ring-1 ring-card_border border-0",
        destructive:
          "text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "hover:bg-gray-300 hover:text-slate-900  dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondar: "text-content_text bg-third_bg hover:bg-third_bg/50 px-4 p-2",
        ghost: "hover:bg-slate-900 text-slate-900 hover:text-slate-50 ",
        link: "text-slate-900 bg-red-500 underline-offset-4 hover:underline dark:text-slate-50"
      },
      size: {
        default: "px-4 p-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
