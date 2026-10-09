
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://metrius.in"
  ),

  title: {
    default: "METRIUS — Building Digital Products People Remember.",
    template: "%s | METRIUS",
  },

  description:
    "Metrius designs, develops and scales premium websites, applications and AI solutions for ambitious businesses.",

  applicationName: "METRIUS",

  keywords: [
    "METRIUS",
    "web development",
    "AI solutions",
    "digital products",
    "premium websites",
    "application development",
  ],

  openGraph: {
    type: "website",
    siteName: "METRIUS",
    title: "METRIUS — Building Digital Products People Remember.",
    description:
      "Premium websites, applications and AI solutions for ambitious businesses.",
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "METRIUS — Building Digital Products People Remember.",
    description:
      "Premium websites, applications and AI solutions for ambitious businesses.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
