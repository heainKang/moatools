import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "모아툴즈 - 생활 계산기 도구 모음",
  description: "연봉 실수령액, BMI, 대출이자 등 생활에 필요한 계산기를 한곳에서. 무료로 이용하세요.",
  keywords: "연봉계산기, 실수령액, 4대보험, 소득세, 계산기, 무료도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="google-site-verification" content="cZeNnsj93st33DvE3YIoJQ8kE1uRiAWk8leu_IfdUKI" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3382986214425775" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
