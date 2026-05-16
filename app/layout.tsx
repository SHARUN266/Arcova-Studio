import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Schema } from "@/components/seo/schema";
import { SITE_CONFIG } from "@/lib/seo-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { CustomCursor } from "@/components/ui/custom-cursor";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Nexora Studio | Premium Web Design & Development Agency",
    template: "%s | Nexora Studio",
  },
  description:
    "Premium web design and development studio serving businesses across Agra, Mathura, Firozabad, Vrindavan, and Hathras. Fast, modern websites that help you grow online.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Nexora Studio | Premium Web Design & Development Agency",
    description:
      "We build fast, modern, and cinematic 3D websites for ambitious brands. Premium quality.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexora Studio — Premium Web Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Studio | Premium Web Design & Development Agency",
    description:
      "We build fast, modern, and cinematic 3D websites for ambitious brands.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=instrument-serif@400,400i&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden w-full selection:bg-primary/30 selection:text-white`}
      >
        <Schema />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <PageTransition />
          <ScrollProgress />
          <CustomCursor />
          <WhatsAppButton />
          <Navbar />
          <LenisProvider>
            <main className="min-h-screen pt-0">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
