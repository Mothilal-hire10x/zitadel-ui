"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { ChangeEvent, DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { getComponentRoundness } from "@/lib/theme";

export type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  suffix?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string | ReactNode;
  success?: string | ReactNode;
  disabled?: boolean;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: ChangeEvent<HTMLInputElement>) => void;
  roundness?: string; // Allow override via props
};

const styles = (error: boolean, disabled: boolean, roundnessClasses: string = "rounded-xl") =>
  clsx(
    {
      "h-[48px] mb-[2px] px-4 py-3 bg-gray-50 dark:bg-slate-800 transition-all duration-300 grow": true,
      "border border-gray-200 dark:border-gray-700 hover:border-[#6366f1]/50 hover:dark:border-[#818cf8]/50 focus:border-[#6366f1] focus:dark:border-[#818cf8]": true,
      "focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:dark:ring-[#818cf8]/10 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500": true,
      "focus:bg-white dark:focus:bg-slate-700": true,
      "border border-red-400 dark:border-red-400 hover:border-red-500 hover:dark:border-red-400 focus:border-red-500 focus:dark:border-red-400 focus:ring-red-500/10 focus:dark:ring-red-400/10":
        error,
      "pointer-events-none text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 cursor-not-allowed shadow-none":
        disabled,
    },
    roundnessClasses, // Apply the full roundness classes directly
  );

// Helper function to get default input roundness from theme
function getDefaultInputRoundness(): string {
  return getComponentRoundness("input");
}

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      placeholder,
      defaultValue,
      suffix,
      required = false,
      error,
      disabled,
      success,
      onChange,
      onBlur,
      roundness,
      ...props
    },
    ref,
  ) => {
    // Use theme-based roundness if not explicitly provided
    const actualRoundness = roundness || getDefaultInputRoundness();

    return (
      <label className="relative flex flex-col text-sm text-gray-600 dark:text-gray-400">
        <span className={`mb-2 font-medium leading-4 ${error ? "text-red-500 dark:text-red-400" : ""}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        <input
          suppressHydrationWarning
          ref={ref}
          className={styles(!!error, !!disabled, actualRoundness)}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={props.autoComplete ?? "off"}
          onChange={(e) => onChange && onChange(e)}
          onBlur={(e) => onBlur && onBlur(e)}
          {...props}
        />

        {suffix && (
          <span
            className={clsx(
              "absolute bottom-[22px] right-[3px] z-30 translate-y-1/2 transform bg-white dark:bg-slate-800 px-3 py-1 text-gray-500 dark:text-gray-400",
              // Extract just the roundness part for the suffix (no padding)
              actualRoundness.split(" ")[0], // Take only the first part (rounded-full, rounded-md, etc.)
            )}
          >
            @{suffix}
          </span>
        )}

        <div className="leading-14.5px h-14.5px flex flex-row items-center text-xs text-red-500 dark:text-red-400 mt-1">
          <span>{error ? error : " "}</span>
        </div>

        {success && (
          <div className="text-sm mt-1 flex flex-row items-center text-green-500">
            <CheckCircleIcon className="h-4 w-4" />
            <span className="ml-1">{success}</span>
          </div>
        )}
      </label>
    );
  },
);
