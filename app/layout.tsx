import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumina — AI-Powered Design Intelligence",
  description:
    "Lumina transforms how product teams create and iterate. AI-powered design intelligence that learns your brand, accelerates your workflow, and ships pixel-perfect UIs.",
  keywords: ["AI design", "design tool", "UI generation", "product teams", "design automation"],
  authors: [{ name: "Lumina Inc." }],
  openGraph: {
    title: "Lumina — AI-Powered Design Intelligence",
    description: "AI-powered design intelligence that learns your brand and ships pixel-perfect UIs.",
    type: "website",
    url: "https://lumina.design",
    siteName: "Lumina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina — AI-Powered Design Intelligence",
    description: "AI-powered design intelligence that learns your brand and ships pixel-perfect UIs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
