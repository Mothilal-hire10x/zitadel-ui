import "@/styles/globals.scss";

import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { 
    title: t("title") + " | 10XScale.ai",
    description: "Secure authentication powered by 10XScale.ai - AI-powered professional journey transformation"
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.className} ${inter.variable}`} suppressHydrationWarning>
      <head />
      <body className="antialiased bg-gradient-to-br from-slate-100 via-white to-slate-100">
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <div className="relative flex min-h-screen flex-col justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100">
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                  </div>
                </div>
              }
            >
              <LanguageProvider>
                {/* Main Content - Clean minimal layout */}
                <main className="relative">
                  {children}
                </main>
                
                {/* Minimal floating controls */}
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-gray-200/50">
                  <LanguageSwitcher />
                </div>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
