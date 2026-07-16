import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://adwheeler.in"),
  title: {
    default: `${BRAND.name} 2.0 — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name} 2.0`,
  },
  description:
    "GPS-powered mobile LED advertising that transforms every street into an opportunity. Move your brand through the city.",
  keywords: ["DOOH", "mobile advertising", "LED vehicles", "outdoor advertising India", "AD Wheeler"],
  openGraph: {
    title: `${BRAND.name} 2.0`,
    description: BRAND.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600,700&f[]=jetbrains-mono@400,500&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
