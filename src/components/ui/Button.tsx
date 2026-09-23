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
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F3D]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[rgba(201,111,61,0.75)] text-[#FFF9F2] backdrop-blur-[20px] saturate-125 border border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_30px_rgba(201,111,61,0.15)] hover:-translate-y-[2px] hover:bg-[rgba(201,111,61,0.85)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_40px_rgba(201,111,61,0.25)]": variant === "default",
            "glass-pill text-[#3A2920] hover:-translate-y-[2px] hover:bg-[rgba(255,255,255,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_30px_rgba(75,52,38,0.1)]": variant === "outline",
            "hover:bg-white/30 text-[#3B2A21]": variant === "ghost",
            "text-[#3B2A21] underline-offset-4 hover:underline": variant === "link",
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
