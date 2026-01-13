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
              <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100">
                {/* Main Card Container with Gradient Border */}
                <div className="w-full max-w-[900px] relative">
                  {/* Gradient Border Effect */}
                  <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 opacity-60 blur-sm"></div>
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 opacity-80"></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[520px]">
                    {/* Left Panel - Premium Gradient with Network Background */}
                    <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
                      {/* Base Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1f3c]"></div>
                      
                      {/* Network/Tech Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-90"
                        style={{ backgroundImage: "url('/ui/v2/login/9142209.jpg')" }}
                      ></div>
                      
                      {/* Gradient Overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e]/80 via-transparent to-[#1a1035]/60"></div>
                      
                      {/* Animated glow effects */}
                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/15 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      
                      {/* Floating particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-cyan-400/60 rounded-full animate-float"></div>
                        <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-float" style={{ animationDelay: '0.3s' }}></div>
                        <div className="absolute top-[55%] left-[35%] w-1 h-1 bg-pink-400/60 rounded-full animate-float" style={{ animationDelay: '0.6s' }}></div>
                        <div className="absolute top-[75%] right-[30%] w-2 h-2 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: '0.9s' }}></div>
                        <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
                        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-violet-400/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                      </div>
                      
                      {/* Logo and Content */}
                      <div className="relative z-10 flex flex-col justify-center items-center w-full p-8">
                        {/* Premium Glass card for logo with background image */}
                        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden group hover:bg-white/15 transition-all duration-500">
                          {/* Inner glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                          
                          {/* Background image inside logo card */}
                          <div 
                            className="absolute inset-0 opacity-30 bg-cover bg-center"
                            style={{ 
                              backgroundImage: "url('/ui/v2/login/9142209.jpg')",
                              mixBlendMode: 'overlay'
                            }}
                          ></div>
                          
                          {/* Logo */}
                          <div className="relative z-10">
                            {branding?.darkTheme?.logoUrl ? (
                              <Logo
                                lightSrc={branding.darkTheme?.logoUrl}
                                darkSrc={branding.darkTheme?.logoUrl}
                                height={56}
                                width={200}
                              />
                            ) : (
                              <img 
                                src="/ui/v2/login/10xscale-white.svg" 
                                alt="10XScale" 
                                className="h-12 w-auto drop-shadow-lg"
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Tagline */}
                        <p className="mt-8 text-white/70 text-center text-sm font-light max-w-[280px] tracking-wide">
                          Secure authentication powered by<br />
                          <span className="text-white/90 font-medium">advanced identity management</span>
                        </p>
                        
                        {/* Trust indicators */}
                        <div className="mt-8 flex items-center gap-6">
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Enterprise Grade</span>
                          </div>
                          <div className="w-px h-4 bg-white/20"></div>
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>SOC2 Compliant</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Clean White Form */}
                    <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-white">
                      <div className="w-full max-w-[380px]">
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
                            <img src="/ui/v2/login/10xscale-black.svg" alt="10XScale" className="h-8" />
                          )}
                        </div>
                        
                        {/* Form Content */}
                        <div className="space-y-6">
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
              <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100">
                <div className="w-full max-w-[440px] relative">
                  {/* Gradient Border */}
                  <div className="absolute -inset-[2px] rounded-[26px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 opacity-60 blur-sm"></div>
                  <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 opacity-80"></div>
                  
                  {/* Card */}
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8">
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
                          <img src="/ui/v2/login/10xscale-black.svg" alt="10XScale" className="h-10" />
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
