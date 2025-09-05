import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  Settings,
  HelpCircle,
  FileText,
  Home,
  CheckSquare,
  Lightbulb,
  Code2,
  Phone,
  Book,
} from "lucide-react";
import DropdownMenu, {
  type DropdownItem,
} from "../../design-system/modern-ui/DropdownMenu";

// 메뉴 그룹 정의
const MENU_GROUPS = {
  main: [
    {
      id: "home",
      label: "대시보드",
      icon: <Home className="w-4 h-4" />,
      path: "/home",
    },
    {
      id: "todo",
      label: "할일 관리",
      icon: <CheckSquare className="w-4 h-4" />,
      path: "/todo",
    },
  ],
  challenges: [
    {
      id: "fullstack-challenge",
      label: "풀스택 챌린지",
      icon: <Code2 className="w-4 h-4" />,
      path: "/fullstack-challenge",
    },
    {
      id: "plan-fullstack",
      label: "풀스택 프로젝트",
      icon: <Code2 className="w-4 h-4" />,
      path: "/plan-fullstack",
    },
    {
      id: "plan-callcenter",
      label: "콜센터 챌린지",
      icon: <Phone className="w-4 h-4" />,
      path: "/plan-callcenter",
    },
  ],
  ideas: [
    {
      id: "startup-idea",
      label: "바이브 코딩",
      icon: <Lightbulb className="w-4 h-4" />,
      path: "/startup-idea",
    },
  ],
  system: [
    {
      id: "manual",
      label: "시스템 매뉴얼",
      icon: <FileText className="w-4 h-4" />,
      path: "/manual",
    },
    {
      id: "user-guide",
      label: "사용자 가이드",
      icon: <Book className="w-4 h-4" />,
      path: "/user-guide",
    },
    {
      id: "system-report",
      label: "시스템 리포트",
      icon: <HelpCircle className="w-4 h-4" />,
      path: "/system-report",
    },
    {
      id: "about",
      label: "정보",
      icon: <HelpCircle className="w-4 h-4" />,
      path: "/about",
    },
  ],
};

/* 경로 → 활성 nav id 매핑 유틸 */
function deriveActiveId(pathname: string): string {
  if (pathname.startsWith("/developers")) return "developers";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/manual")) return "manual";
  if (pathname.startsWith("/user-guide")) return "user-guide";
  if (pathname.startsWith("/system-report")) return "system-report";
  if (pathname.startsWith("/todo")) return "todo";
  if (pathname.startsWith("/fullstack-challenge")) return "fullstack-challenge";
  if (pathname.startsWith("/plan-fullstack")) return "plan-fullstack";
  if (pathname.startsWith("/plan-callcenter")) return "plan-callcenter";
  if (pathname.startsWith("/startup-idea")) return "startup-idea";
  if (pathname.startsWith("/home")) return "home";
  return "developers";
}

/* ---------------------------------- */
/* 드롭다운 메뉴 아이템 생성             */
/* ---------------------------------- */

function createDropdownItems(navigate: (path: string) => void): DropdownItem[] {
  return [
    {
      id: "main-menu",
      label: "주요 기능",
      children: MENU_GROUPS.main.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-1", label: "", divider: true },
    {
      id: "challenges-menu",
      label: "프로젝트 챌린지",
      children: MENU_GROUPS.challenges.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-2", label: "", divider: true },
    {
      id: "ideas-menu",
      label: "창업 아이디어",
      children: MENU_GROUPS.ideas.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-3", label: "", divider: true },
    {
      id: "system-menu",
      label: "시스템",
      children: MENU_GROUPS.system.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
  ];
}

/* ---------------------------------- */
/* Placeholder Components             */
/* ---------------------------------- */

function ThemeTogglePlaceholder() {
  return (
    <button
      type="button"
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      aria-label="테마 전환 (미구현)"
    >
      <Settings className="w-4 h-4" />
    </button>
  );
}

function UserMenuPlaceholder() {
  const userMenuItems: DropdownItem[] = [
    { id: "profile", label: "프로필", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "설정", icon: <Settings className="w-4 h-4" /> },
    { id: "divider", label: "", divider: true },
    { id: "logout", label: "로그아웃" },
  ];

  return (
    <DropdownMenu
      trigger={
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden text-sm text-gray-700 sm:inline">관리자</span>
        </div>
      }
      items={userMenuItems}
      align="right"
    />
  );
}

/* ---------------------------------- */
/* AppHeader 컴포넌트                  */
/* ---------------------------------- */

export interface AppHeaderProps {
  activeIdOverride?: string;
  onItemSelect?(id: string): void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeIdOverride,
  onItemSelect,
  leftSlot,
  rightSlot,
  className = "",
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeId = activeIdOverride ?? deriveActiveId(location.pathname);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleItemSelect = (id: string) => {
    if (onItemSelect) {
      onItemSelect(id);
    }
  };

  const dropdownItems = createDropdownItems(handleNavigate);

  // 현재 활성 메뉴의 정보 찾기
  const getCurrentMenuItem = () => {
    for (const group of Object.values(MENU_GROUPS)) {
      const found = group.find((item) => item.id === activeId);
      if (found) return found;
    }
    return MENU_GROUPS.main[0]; // 기본값
  };

  const currentItem = getCurrentMenuItem();

  return (
    <header
      className={`bg-white border-b border-gray-200 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* 좌측 영역 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                SuperUI Admin
              </span>
            </div>
          </div>
          {leftSlot}
        </div>

        {/* 중앙 영역 - 네비게이션 */}
        <div className="flex items-center gap-4">
          {/* 데스크톱: 직접 메뉴 노출 */}
          <div className="hidden lg:flex items-center gap-6">
            {/* 주요 기능 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">주요 기능</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.main.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />

            {/* 프로젝트 챌린지 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium">프로젝트 챌린지</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.challenges.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />

            {/* 창업 아이디어 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm font-medium">창업 아이디어</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.ideas.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />

            {/* 시스템 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">시스템</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.system.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />
          </div>

          {/* 모바일/태블릿: 통합 메뉴 */}
          <div className="flex lg:hidden">
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Menu className="w-4 h-4" />
                  <span className="text-sm font-medium">메뉴</span>
                </div>
              }
              items={dropdownItems}
              onItemClick={(item) => handleItemSelect(item.id)}
            />
          </div>

          {/* 현재 페이지 표시 */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            {currentItem.icon}
            <span className="text-sm font-medium text-gray-700">
              {currentItem.label}
            </span>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-3">
          {rightSlot || (
            <>
              <ThemeTogglePlaceholder />
              <UserMenuPlaceholder />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
