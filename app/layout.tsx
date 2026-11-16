import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Members · VancoBiz Club",
  description: "Meet the members of the VancoBiz Club, Vancouver's business community. Connect, collaborate, grow locally.",
};

export const viewport: Viewport = { themeColor: "#09090B" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
