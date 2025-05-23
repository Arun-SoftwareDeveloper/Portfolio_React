import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arun R | Assoicate Software Engineer",
  description:
    "Portfolio website of Arun R, Assoicate Software Engineer and Full Stack Developer",
  generator: "v0.dev",
  icons: "./Images/icon_logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import "./globals.css";
