import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "Vdsidiously",
  description:
    "This is a tech-blog site made in collabaration. The intent of this site is to demystify the jargon and make the tech world more accessible to everyone.Especailly the young indian developers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`antialiased flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <SessionProvider>
            {" "}
            <NavBar></NavBar>
          </SessionProvider>
          {children}
          <Toaster></Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
