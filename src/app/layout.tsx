import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense } from "react";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { headers } from "next/headers";
import { incrementVisitor } from "@/service/visitor/increment";
import { siteConfig } from "@/config/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserratFont = Montserrat({
  variable: '--montserratFont',
  subsets: ['latin', 'cyrillic', 'vietnamese'],
  style: ['normal'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "./favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = (await headers()).get("x-visitor-path");

  // ✅ only call backend if path is allowed
  if (pathname) {
    incrementVisitor(pathname);
  }

  return (
    <html lang="en">
      <body
        className={`${montserratFont.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto">
          <ThemeProvider>
            {children}
          </ThemeProvider>
          <Toaster richColors />
          <Suspense fallback={null}>
            <LoginSuccessToast />
            <LogoutSuccessToast />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
