import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../header/AppHeader";

/**
 * AppLayout.tsx
 *
 * 전역 레이아웃 (widgets 레벨)
 * - 기존 내부 HeaderMenu 제거
 * - widgets/header/AppHeader (design-system TopBar + PrimaryNav 조합) 사용
 * - children 이 없으면 라우터 Outlet 렌더
 */

export interface AppLayoutProps {
  children?: React.ReactNode;
  /** 메인 컨텐츠 wrapper 추가 클래스 */
  mainClassName?: string;
}

export function AppLayout({ children, mainClassName }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main
        className={[
          "flex-1 overflow-auto bg-gradient-to-b from-white to-gray-50 p-6",
          mainClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        role="main"
      >
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
