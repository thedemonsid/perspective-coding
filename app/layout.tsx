import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

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
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar></NavBar>
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
