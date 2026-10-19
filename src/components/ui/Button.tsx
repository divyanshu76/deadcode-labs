import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-signal text-white border border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_30px_rgba(225,6,0,0.22)] hover:-translate-y-[2px] hover:bg-signal-dark hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_40px_rgba(225,6,0,0.32)] active:translate-y-0": variant === "default",
        "glass-pill text-charcoal hover:-translate-y-[2px] hover:bg-white/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_30px_rgba(42,42,42,0.1)] active:translate-y-0": variant === "outline",
        "hover:bg-white/30 text-charcoal": variant === "ghost",
        "text-charcoal underline-offset-4 hover:underline": variant === "link",
        "h-12 md:h-14 px-6 md:px-8 py-2": size === "default",
        "h-10 px-5": size === "sm",
        "h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold": size === "lg",
        "h-12 w-12 md:h-14 md:w-14": size === "icon",
      },
      className
    );

    // Render the child (e.g. a Link) with button styling instead of nesting
    // an interactive element inside a <button>, which is invalid HTML.
    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
