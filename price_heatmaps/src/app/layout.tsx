import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DependenciesProvider from "./DependenciesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Price Heatmaps",
  description: "Price Heatmaps prototype project",
};



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <DependenciesProvider>
          {children}
        </DependenciesProvider>
      </body>
    </html>
  );
}
