import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "peer block w-full outline-0 rounded-lg border border-neutral-400 focus:border-black bg-neutral-50 text-gray-900 p-2.5 sm:text-sm transition-all disabled:bg-gray-100 disabled:cursor-not-allowed",
            className,
          )}
          placeholder=""
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute left-0 w-full h-full select-none pointer-events-none flex transition-all",
            "text-gray-500 peer-focus:text-gray-900 -left-0.5 -top-1.5 text-[11px] peer-placeholder-shown:text-sm",
            "before:content-[' '] before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:transition-all ",
            "after:content-[' '] after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:transition-all peer-placeholder-shown:after:border-transparent peer-placeholder-shown:leading-[3.75]",
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
