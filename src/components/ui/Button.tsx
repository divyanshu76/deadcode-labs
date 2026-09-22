import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-foreground text-background hover:bg-foreground/90": variant === "default",
            "border border-border bg-transparent hover:bg-muted text-foreground": variant === "outline",
            "hover:bg-muted text-foreground": variant === "ghost",
            "text-foreground underline-offset-4 hover:underline": variant === "link",
            "h-12 md:h-14 px-6 md:px-8 py-2": size === "default",
            "h-10 px-5": size === "sm",
            "h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold": size === "lg",
            "h-12 w-12 md:h-14 md:w-14": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
