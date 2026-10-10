import "./globals.css";

import { Black_Han_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-han-sans", // CSS 변수 이름 정의
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  return (
    <html lang="ko" className={blackHanSans.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">
        <QueryProvider>
          <Header />

          {/* 페이지 컨텐츠 영역 */}
          <div className="flex-1 w-full">{children}</div>

        {/* 공통 푸터 */}
        <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm space-y-2">
            <p>제주특별자치도 관광 안내 포털 (Jeju Travel Portal)</p>
            {/* <p className="text-xs text-gray-500">
              © 2026 VISIT JEJU. All rights reserved.
            </p> */}
          </div>
        </footer>
        </QueryProvider>

        <Script
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`}
          strategy="afterInteractive"
        ></Script>
      </body>
    </html>
  );
}
