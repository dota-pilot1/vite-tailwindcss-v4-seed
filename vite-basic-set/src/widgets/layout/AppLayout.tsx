import type React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../header/AppHeader";
import { SidebarWithHeadless } from "../sidebar-with-headless";

/**
 * AppLayout.tsx
 *
 * 단순/필수 전역 레이아웃 (widgets 레벨)
 * - 헤더(AppHeader) + 메인 콘텐츠 슬롯
 * - children 없으면 라우터 <Outlet /> 렌더
 * - 과도한 커스터마이징 제거 (mainClassName prop 삭제)
 * - 페이지 컨테이너는 내부 PageContainer 컴포넌트로 캡슐화
 */

export interface AppLayoutProps {
  children?: React.ReactNode;
}

/**
 * 내부 전용 페이지 래퍼
 * - 필요 시 후속 단계에서 padding / 배경 / 다크모드 토큰 치환 한 곳에서 처리
 */
function PageContainer({ children }: { children?: React.ReactNode }) {
  const base =
    "flex-1 overflow-auto bg-gradient-to-b from-white to-gray-50 p-6";
  return (
    <main role="main" className={base}>
      {children ?? <Outlet />}
    </main>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <SidebarWithHeadless />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}

export default AppLayout;
