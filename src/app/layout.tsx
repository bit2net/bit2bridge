import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";
import WalletProvider from "@/components/wallet-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <WalletProvider>{children}</WalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
