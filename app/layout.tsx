import type { Metadata } from "next";
import { Outfit, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Schema } from "@/components/seo/schema";
import { SITE_CONFIG } from "@/lib/seo-data";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { GoogleAnalytics } from "@/components/google-analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Arcova Studio | Premium Web Design & Development Agency in Agra",
    template: "%s | Arcova Studio",
  },
  description:
    "Premium web design and development studio serving businesses across Agra, Mathura, Firozabad, Vrindavan, and Hathras. Fast, modern websites that help you grow online.",
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${syne.variable} ${mono.variable} antialiased selection:bg-primary/30 selection:text-white`}
      >
        <Schema />
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
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
