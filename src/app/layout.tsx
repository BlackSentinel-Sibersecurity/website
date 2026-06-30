import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityProvider from "@/components/SecurityProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlackSentinel - Enterprise Cybersecurity Technologies",
    template: "%s | BlackSentinel",
  },
  description:
    "Building intelligent cybersecurity technologies that enable organizations to stay ahead of evolving threats. SIEM, SOAR, XDR, EDR, and AI-driven security platforms.",
  keywords: [
    "cybersecurity",
    "SIEM",
    "SOAR",
    "XDR",
    "EDR",
    "threat intelligence",
    "security automation",
    "AI security",
    "vulnerability management",
    "cloud security",
    "enterprise security",
  ],
  authors: [{ name: "BlackSentinel" }],
  creator: "BlackSentinel",
  metadataBase: new URL("https://blacksentinel.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blacksentinel.tech",
    siteName: "BlackSentinel",
    title: "BlackSentinel - Enterprise Cybersecurity Technologies",
    description:
      "Building intelligent cybersecurity technologies that enable organizations to stay ahead of evolving threats.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackSentinel - Enterprise Cybersecurity Technologies",
    description:
      "Building intelligent cybersecurity technologies that enable organizations to stay ahead of evolving threats.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <SecurityProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </SecurityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
