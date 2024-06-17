import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center outline-none whitespace-nowrap w-full transition font-medium rounded-lg text-center grid",
  {
    variants: {
      variant: {
        default:
          "hover:translate-y-1 bg-accent text-white border-2 border-lime-500 hover:bg-lime-700 hover:border-lime-600 hover:text-opacity-80 relative",
      },
      size: {
        default: "text-sm px-5 py-2.5 gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
          <div className="relative w-full">
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            ></Comp>
            <div className="absolute -z-10 -bottom-1 h-4 w-full rounded-lg bg-accent" />
          </div>
        );
    },
);

Button.displayName = "Button";

export { Button, buttonVariants };
