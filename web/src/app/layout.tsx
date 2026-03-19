import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoAgentX - Autonomous Financial Guardian",
  description: "Algorand AI Execution & Security Layer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased dark overflow-hidden`}>
      <body className="h-full bg-[#050505] font-mono text-white flex flex-col selection:bg-cyan-500/20">
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
