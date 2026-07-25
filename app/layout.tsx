import type { Metadata } from "next";
import { Geist, Caveat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Schema } from "@/components/seo/schema";
import { SITE_CONFIG } from "@/lib/seo-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
    default: "Arcova Studio | Premium Web Design & Development Agency",
    template: "%s | Arcova Studio",
  },
  description:
    "We combine strategy, design, and technology to help ambitious brands stand out & create meaningful digital experiences.",
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
      "We design brands that move people. Strategy, design, and technology for ambitious brands.",
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
      "We design brands that move people. Strategy, design, and technology for ambitious brands.",
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
      <body
        className={`${geist.variable} ${caveat.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden w-full bg-[#FAFAF8] text-[#1A1A1A] selection:bg-[#ff6321]/20 selection:text-[#ff6321]`}
      >
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xrvwnmcpag");
            `,
          }}
        />
        <Schema />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <PageTransition />
          <ScrollProgress />
          <CustomCursor />
          <WhatsAppButton />
          <Navbar />
          <LenisProvider>
            <main className="min-h-screen pt-0 bg-[#FAFAF8]">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
