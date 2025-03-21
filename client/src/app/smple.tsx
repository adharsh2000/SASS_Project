import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/common/Preloader";
import Providers from "@/providers";
import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Preloader />
          <div className="flex flex-row min-h-screen w-full">
            <AppSidebar />
            <SidebarTrigger />
            {/* Main Content */}
            <div className="">
              <Header />
              <main className="">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
