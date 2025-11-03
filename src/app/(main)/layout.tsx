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
        <ThemeProvider defaultTheme="light" storageKey="notes-buddy-theme">
          <MainNav />
          {children}
          <CrossableBanner />
          <Toaster />
          <Footer />
        </ThemeProvider>
      </ReactLenis>
    </ViewTransitions>
  );
}
