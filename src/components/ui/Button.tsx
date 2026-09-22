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
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[linear-gradient(135deg,#E4573F,#F06A4F)] text-white border border-white/10 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(228,87,63,0.18)] hover:brightness-105": variant === "default",
            "border border-white/20 bg-transparent hover:bg-[#E4573F]/10 hover:border-[#E4573F]/50 text-foreground": variant === "outline",
            "hover:bg-white/5 text-foreground": variant === "ghost",
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
