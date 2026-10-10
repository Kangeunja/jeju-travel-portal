"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  return (
    <header
      className={`${isHomePage ? "absolute top-0 left-0 right-0 z-50  text-white border-b border-white/10" : "sticky bg-white text-gray-900 border-b border-gray-200 shadow-sm"}`}
    >
      <div className="max-w-300 mx-auto px-6 h-20 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/img/logo.png"
            alt="제주 여행 메인 배경"
            width={123}
            height={49}
            priority
            className="object-cover object-center -z-10"
          />
          <span className="text-[14px] text-center leading-none">문화관광</span>
        </Link>

        {/* 주 메뉴 */}
        <nav className="hidden md:flex items-center gap-15 font-medium text-[15px]">
          <Link href="/">관광명소</Link>
          <Link href="/">추천코스</Link>
          <Link href="/">축제/행사</Link>
          <Link href="/">여행안내</Link>
        </nav>

        {/* 서브 링크 */}
        <div
          className={`flex items-center gap-4 text-xs ${isHomePage ? "text-white/80" : "text-gray-900"}`}
        >
          <Link href="/" className="hover:underline">
            로그인
          </Link>
          <span>|</span>
          <Link
            href="https://www.ijto.or.kr"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            제주관광공사
          </Link>
          <span>|</span>
          <Link
            href="https://www.jeju.go.kr"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            제주시청
          </Link>
        </div>
      </div>
    </header>
  );
}
