import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "peer w-full px-3 py-2.5 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300",
            "outline-none focus:ring-1 focus:ring-black focus:border-transparent",
            "transition-all duration-200 ease-in-out placeholder-transparent",
            "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
            className,
          )}
          placeholder={label}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 -top-2.5 text-xs text-gray-600 bg-white px-1",
            "transition-all duration-200 ease-in-out pointer-events-none",
            disabled && "bg-muted text-muted-foreground",
            "peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2",
            "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-black ",
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
