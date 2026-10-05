import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import GradualBlur from "@/components/reactbits/GradualBlur";
import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import SmoothScroll from "@/components/site/SmoothScroll";
import { content } from "@/lib/content";
import "./globals.css";

const GA_ID = "G-1F70620QDZ";

export const metadata: Metadata = {
  metadataBase: new URL("https://ciroperfetto.netlify.app"),
  title: { default: `${content.name} · ${content.role}`, template: `%s · ${content.name}` },
  description: content.summary,
  openGraph: { type: "website", siteName: content.name },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
        <GradualBlur target="page" position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" exponential />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
