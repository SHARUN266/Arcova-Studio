import type { Metadata } from "next";
import { Outfit, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

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
  title: "Arcova Studio | Premium Digital Agency",
  description: "Creating high-performance websites for businesses in Agra that want to grow online.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
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
