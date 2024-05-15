import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Color management app",
  description: "Technical task for The unit interview process by Milos Lekovic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full">
          <div className="flex flex-col">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
