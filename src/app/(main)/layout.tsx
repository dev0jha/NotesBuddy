import React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DeviceFingerprint } from "@/components/auth/DeviceFingerprint";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/core/Footer";
import { ReactLenis } from "@/utils/lenis";
import { Toaster } from "@/components/ui/sonner";
import MainNav from "@/components/core/MainNav";
import CrossableBanner from "@/components/core/CrossableBanner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <ReactLenis root>
        <DeviceFingerprint />
        <ThemeProvider defaultTheme="dark" storageKey="notes-buddy-theme">
          <div className="relative min-h-screen bg-[#121212]">
            {/* Left decorative border - diagonal lines pattern */}
            <div className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden h-full w-12 border-r border-[rgba(255,255,255,0.08)] bg-[repeating-linear-gradient(-45deg,transparent,transparent_9px,rgba(255,255,255,0.04)_9px,rgba(255,255,255,0.04)_10px)] sm:block sm:w-16 lg:w-24" />

            {/* Right decorative border - diagonal lines pattern */}
            <div className="pointer-events-none fixed inset-y-0 right-0 z-50 hidden h-full w-12 border-l border-[rgba(255,255,255,0.08)] bg-[repeating-linear-gradient(45deg,transparent,transparent_9px,rgba(255,255,255,0.04)_9px,rgba(255,255,255,0.04)_10px)] sm:block sm:w-16 lg:w-24" />

            {/* Content wrapper with margin from borders */}
            <div className="relative z-10 sm:mr-16 sm:ml-16 lg:mr-24 lg:ml-24">
              <MainNav />
              {children}
              <CrossableBanner />
              <Toaster />
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </ReactLenis>
    </ViewTransitions>
  );
}
