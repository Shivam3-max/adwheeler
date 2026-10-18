import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import BootLoader from "@/components/BootLoader";
import RouteTransition from "@/components/RouteTransition";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://adwheeler.in"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "GPS-powered mobile LED advertising that transforms every street into an opportunity. Move your brand through the city.",
  keywords: ["DOOH", "mobile advertising", "LED vehicles", "outdoor advertising India", "AdWheeler"],
  openGraph: {
    title: `${BRAND.name}`,
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
        <BootLoader />
        <RouteTransition />
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
