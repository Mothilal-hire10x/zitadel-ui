"use client";

import { Logo } from "@/components/logo";
import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import React, { ReactNode, Children } from "react";
import { ThemeWrapper } from "./theme-wrapper";
import { useResponsiveLayout } from "@/lib/theme-hooks";

/**
 * DynamicTheme component handles layout switching between traditional top-to-bottom
 * and modern side-by-side layouts based on NEXT_PUBLIC_THEME_LAYOUT.
 * 
 * Enhanced with 10XScale.ai professional branding matching the reference design.
 */
export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}) {
  const { isSideBySide } = useResponsiveLayout();

  const actualChildren: ReactNode = React.useMemo(() => {
    if (typeof children === "function") {
      return (children as (isSideBySide: boolean) => ReactNode)(isSideBySide);
    }
    return children;
  }, [children, isSideBySide]);

  return (
    <ThemeWrapper branding={branding}>
      {isSideBySide
        ? // Side-by-side layout matching reference design
          (() => {
            const childArray = Children.toArray(actualChildren);
            const leftContent = childArray[0] || null;
            const rightContent = childArray[1] || null;
            const hasLeftRightStructure = childArray.length === 2;

            return (
              <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Main Card Container with Subtle Shadow */}
                <div className="w-full max-w-[950px] relative">
                  {/* Subtle Border/Shadow Effect */}
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 opacity-60"></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex min-h-[560px]">
                    {/* Left Panel - Premium Gradient with Network Background */}
                    <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden">
                      {/* Network/Tech Background Image - Full Coverage */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/ui/v2/login/9142209.jpg')" }}
                      ></div>
                      
                      {/* Dark overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1e]/40 via-[#1a1035]/30 to-[#0d1f3c]/40"></div>
                      
                      {/* Subtle glow effects */}
                      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-blue-500/10 rounded-full blur-[60px]"></div>
                      
                      {/* Logo and Content */}
                      <div className="relative z-10 flex flex-col justify-center items-center w-full p-8">
                        {/* Glass card for logo */}
                        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                          {/* Background image peek inside card */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-20 bg-cover bg-center"
                            style={{ 
                              backgroundImage: "url('/ui/v2/login/9142209.jpg')",
                            }}
                          ></div>
                          
                          {/* Logo */}
                          <div className="relative z-10">
                            {branding?.darkTheme?.logoUrl ? (
                              <Logo
                                lightSrc={branding.darkTheme?.logoUrl}
                                darkSrc={branding.darkTheme?.logoUrl}
                                height={52}
                                width={200}
                              />
                            ) : (
                              <img 
                                src="/ui/v2/login/10xscale-white.svg" 
                                alt="10XScale.ai" 
                                className="h-11 w-auto"
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Tagline */}
                        <p className="mt-8 text-white/80 text-center text-sm font-light max-w-[280px] leading-relaxed">
                          Secure authentication powered by<br />
                          <span className="text-white font-medium">advanced identity management</span>
                        </p>
                        
                        {/* Trust indicators */}
                        <div className="mt-8 flex items-center gap-5">
                          <div className="flex items-center gap-2 text-white/60 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Enterprise Grade</span>
                          </div>
                          <div className="w-px h-4 bg-white/30"></div>
                          <div className="flex items-center gap-2 text-white/60 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>SOC2 Compliant</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Clean White Form */}
                    <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white dark:bg-slate-800">
                      <div className="w-full max-w-[360px]">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex justify-center mb-8">
                          {branding?.lightTheme?.logoUrl ? (
                            <Logo
                              lightSrc={branding.lightTheme?.logoUrl}
                              darkSrc={branding.darkTheme?.logoUrl}
                              height={40}
                              width={150}
                            />
                          ) : (
                            <img src="/ui/v2/login/10xscale-black.svg" alt="10XScale.ai" className="h-8" />
                          )}
                        </div>
                        
                        {/* Form Content */}
                        <div className="space-y-5">
                          {hasLeftRightStructure ? rightContent : leftContent}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        : // Traditional top-to-bottom layout
          (() => {
            const childArray = Children.toArray(actualChildren);
            const titleContent = childArray[0] || null;
            const formContent = childArray[1] || null;
            const hasMultipleChildren = childArray.length > 1;

            return (
              <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="w-full max-w-[440px] relative">
                  {/* Subtle Border */}
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 opacity-60"></div>
                  
                  {/* Card */}
                  <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
                    <div className="flex flex-col items-center space-y-6">
                      {/* Logo */}
                      <div className="mb-2">
                        {branding?.lightTheme?.logoUrl ? (
                          <Logo
                            lightSrc={branding.lightTheme?.logoUrl}
                            darkSrc={branding.darkTheme?.logoUrl}
                            height={50}
                            width={180}
                          />
                        ) : (
                          <img src="/ui/v2/login/10xscale-black.svg" alt="10XScale.ai" className="h-10" />
                        )}
                      </div>

                      {hasMultipleChildren ? (
                        <>
                          <div className="w-full text-center">
                            {titleContent}
                          </div>
                          <div className="w-full">
                            {formContent}
                          </div>
                        </>
                      ) : (
                        <div className="w-full">{actualChildren}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
    </ThemeWrapper>
  );
}
