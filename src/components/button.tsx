import { clsx } from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { ThemeableProps } from "@/lib/themeUtils";
import { getThemeConfig, getComponentRoundness, APPEARANCE_STYLES } from "@/lib/theme";

export enum ButtonSizes {
  Small = "Small",
  Large = "Large",
}

export enum ButtonVariants {
  Primary = "Primary",
  Secondary = "Secondary",
  Destructive = "Destructive",
}

export enum ButtonColors {
  Neutral = "Neutral",
  Primary = "Primary",
  Warn = "Warn",
}

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  color?: ButtonColors;
} & ThemeableProps;

export const getButtonClasses = (
  size: ButtonSizes,
  variant: ButtonVariants,
  color: ButtonColors,
  roundnessClasses: string = "rounded-xl", // Default to more rounded for 10XScale
  appearance: string = "", // Theme appearance (shadows, borders, etc.)
) =>
  clsx(
    {
      "box-border leading-36px text-14px inline-flex items-center justify-center focus:outline-none transition-all duration-300 font-semibold tracking-wide": true,
      "disabled:border-none disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:dark:bg-gray-700 disabled:dark:text-gray-500 disabled:transform-none":
        variant === ButtonVariants.Primary,
      "bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] dark:from-[#818cf8] dark:via-[#a78bfa] dark:to-[#c084fc] text-white hover:shadow-xl hover:shadow-[#6366f1]/30 dark:hover:shadow-[#818cf8]/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg":
        variant === ButtonVariants.Primary && color !== ButtonColors.Warn,
      "bg-gradient-to-r from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-400 text-white hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0":
        variant === ButtonVariants.Primary && color === ButtonColors.Warn,
      "border-2 border-[#6366f1]/30 dark:border-[#818cf8]/30 text-gray-800 dark:text-gray-200 hover:border-[#6366f1] hover:dark:border-[#818cf8] hover:bg-[#6366f1]/5 hover:dark:bg-[#818cf8]/10 focus:bg-[#6366f1]/10 focus:dark:bg-[#818cf8]/15 disabled:text-gray-400 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:cursor-not-allowed disabled:dark:text-gray-600 hover:shadow-md transition-all":
        variant === ButtonVariants.Secondary,
      "border-2 border-red-400/30 dark:border-red-400/30 text-red-500 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-400/10 focus:bg-red-500/15 dark:focus:bg-red-400/15":
        color === ButtonColors.Warn && variant !== ButtonVariants.Primary,
      "px-16 py-3": size === ButtonSizes.Large,
      "px-6 h-[44px]": size === ButtonSizes.Small,
    },
    roundnessClasses, // Apply the full roundness classes directly
    appearance, // Apply appearance-specific styling (shadows, borders, etc.)
  );

// Helper function to get default button roundness from theme
function getDefaultButtonRoundness(): string {
  return getComponentRoundness("button");
}

// Helper function to get default button appearance from centralized theme system
function getDefaultButtonAppearance(): string {
  const themeConfig = getThemeConfig();
  const appearance = APPEARANCE_STYLES[themeConfig.appearance];
  return appearance?.button || "border border-button-light-border dark:border-button-dark-border"; // Fallback to flat design
}

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = ButtonVariants.Primary,
      size = ButtonSizes.Small,
      color = ButtonColors.Primary,
      roundness, // Will use theme default if not provided
      ...props
    },
    ref,
  ) => {
    // Use theme-based values if not explicitly provided
    const actualRoundness = roundness || getDefaultButtonRoundness();
    const actualAppearance = getDefaultButtonAppearance();

    return (
      <button
        type="button"
        ref={ref}
        className={`${getButtonClasses(size, variant, color, actualRoundness, actualAppearance)} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
