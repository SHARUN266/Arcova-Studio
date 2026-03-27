import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Schema } from "@/components/seo/schema";
import { SITE_CONFIG } from "@/lib/seo-data";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Arcova Studio | Premium Web Design & Development Agency in Agra",
    template: "%s | Arcova Studio",
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
    title: "Arcova Studio | Premium Web Design & Development Agency",
    description:
      "We build fast, modern websites for businesses across Agra and nearby cities. Premium quality. Local prices.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arcova Studio — Premium Web Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcova Studio | Premium Web Design & Development Agency",
    description:
      "We build fast, modern websites for businesses across Agra and nearby cities.",
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
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${instrument.variable} font-sans antialiased overflow-x-hidden w-full selection:bg-primary/30 selection:text-white`}
      >
        <Schema />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />
          <ScrollProgress />
          <WhatsAppButton />
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
