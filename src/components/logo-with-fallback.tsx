"use client";

type Props = {
  variant?: "light" | "dark";
  height?: number;
  width?: number;
  className?: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function LogoWithFallback({ 
  variant = "light", 
  height = 40, 
  width = 147.5,
  className = "" 
}: Props) {
  const logoSrc = variant === "dark" 
    ? `${basePath}/10xscale-white.svg`
    : `${basePath}/10xscale-black.svg`;

  return (
    <img
      src={logoSrc}
      alt="10XScale.ai"
      height={height}
      width={width}
      className={className}
    />
  );
}
