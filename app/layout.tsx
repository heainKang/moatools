import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  description: "연봉 실수령액, BMI, 대출이자, MBTI 궁합 등 24가지 생활 계산기를 한곳에서 무료로. 광고 없이 빠르게 계산하세요.",
  keywords: "연봉계산기, 실수령액, 4대보험, 소득세, BMI계산기, 대출이자, 시급계산기, 무료계산기",
  metadataBase: new URL("https://moatools.vercel.app"),
  openGraph: {
    title: "모아툴즈 - 생활 계산기 도구 모음",
    description: "연봉, BMI, 대출이자, MBTI 궁합 등 24가지 계산기를 무료로.",
    url: "https://moatools.vercel.app",
    siteName: "모아툴즈",
    locale: "ko_KR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "모아툴즈",
  "url": "https://moatools.vercel.app",
  "description": "연봉, BMI, 대출이자, MBTI 궁합 등 24가지 생활 계산기 무료 제공",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://moatools.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="bg-white border-t border-gray-100 mt-auto py-6 px-4">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© 2026 모아툴즈. 모든 계산 결과는 참고용입니다.</p>
            <div className="flex gap-4 text-xs text-gray-400">
              <Link href="/about" className="hover:text-gray-600">소개</Link>
              <Link href="/privacy" className="hover:text-gray-600">개인정보 처리방침</Link>
              <a href="mailto:a01023906731@gmail.com" className="hover:text-gray-600">문의</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
