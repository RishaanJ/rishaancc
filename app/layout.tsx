import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import StockTicker from "@/components/StockTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rishaan jain",
  description: "rishaan jain portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ "--font-apple-garamond": "'Apple Garamond Light', 'Garamond', 'EB Garamond', Georgia, serif" } as React.CSSProperties}
      >
        <Providers>
          {children}
          <ThemeToggle />
          <StockTicker />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
