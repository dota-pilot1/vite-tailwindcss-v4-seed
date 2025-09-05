import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  Users,
  Settings,
  Home,
  CheckSquare,
  Lightbulb,
  Code2,
  Phone,
  Server,
  Shield,
  Zap,
  Database,
  Layers,
  Coffee,
  Network,
  HardDrive,
  Activity,
  Bookmark,
  BookOpen,
} from "lucide-react";
import DropdownMenu, {
  type DropdownItem,
} from "../../design-system/modern-ui/DropdownMenu";

// 메뉴 그룹 정의
const MENU_GROUPS = {
  main: [
    {
      id: "todo",
      label: "할일 관리",
      icon: <CheckSquare className="w-4 h-4" />,
      path: "/todo",
    },
    {
      id: "dev-journal",
      label: "개발 일지",
      icon: <BookOpen className="w-4 h-4" />,
      path: "/dev-journal",
    },
  ],
  challenges: [
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
    {
      id: "startup-idea",
      label: "바이브 코딩",
      icon: <Lightbulb className="w-4 h-4" />,
      path: "/startup-idea",
    },
    {
      id: "dev-journal",
      label: "개발 일지",
      icon: <BookOpen className="w-4 h-4" />,
      path: "/dev-journal",
    },
  ],
  siSkills: [
    {
      id: "spring-security",
      label: "Spring Security",
      icon: <Shield className="w-4 h-4" />,
      path: "/spring-security",
    },
    {
      id: "spring-websocket",
      label: "Spring WebSocket STOMP",
      icon: <Network className="w-4 h-4" />,
      path: "/spring-websocket",
    },
    {
      id: "spring-ai",
      label: "Spring AI",
      icon: <Zap className="w-4 h-4" />,
      path: "/spring-ai",
    },
    {
      id: "spring-jpa-jooq",
      label: "Spring JPA with jOOQ",
      icon: <Database className="w-4 h-4" />,
      path: "/spring-jpa-jooq",
    },
    {
      id: "spring-webflux",
      label: "Spring WebFlux",
      icon: <Layers className="w-4 h-4" />,
      path: "/spring-webflux",
    },
    {
      id: "spring-java21",
      label: "Spring Java 21 문법",
      icon: <Coffee className="w-4 h-4" />,
      path: "/spring-java21",
    },
    {
      id: "spring-graphql",
      label: "Spring with GraphQL",
      icon: <Server className="w-4 h-4" />,
      path: "/spring-graphql",
    },
  ],
  redisSkills: [
    {
      id: "redis-overview",
      label: "레디스 설명",
      icon: <HardDrive className="w-4 h-4" />,
      path: "/redis-overview",
    },
    {
      id: "redis-usage",
      label: "레디스 활용",
      icon: <Activity className="w-4 h-4" />,
      path: "/redis-usage",
    },
    {
      id: "redis-study",
      label: "챌린지형 스터디",
      icon: <Bookmark className="w-4 h-4" />,
      path: "/redis-study",
    },
    {
      id: "redis-spring",
      label: "스프링 부트에서 Redis 활용",
      icon: <Server className="w-4 h-4" />,
      path: "/redis-spring",
    },
    {
      id: "redis-kafka",
      label: "Kafka와 비교",
      icon: <Network className="w-4 h-4" />,
      path: "/redis-kafka",
    },
  ],
  uiuxSkills: [
    {
      id: "uiux-overview",
      label: "UI/UX 개요",
      icon: <Layers className="w-4 h-4" />,
      path: "/uiux-overview",
    },
    {
      id: "component-libraries",
      label: "컴포넌트 라이브러리",
      icon: <Code2 className="w-4 h-4" />,
      path: "/component-libraries",
    },
    {
      id: "development-tools",
      label: "개발 도구",
      icon: <Settings className="w-4 h-4" />,
      path: "/development-tools",
    },
    {
      id: "styling-animation",
      label: "스타일링 & 애니메이션",
      icon: <Zap className="w-4 h-4" />,
      path: "/styling-animation",
    },
  ],
};

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
      label: "챌린지형 스터디",
      children: MENU_GROUPS.challenges.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-2", label: "", divider: true },
    {
      id: "si-skills-menu",
      label: "스프링 생태계",
      children: MENU_GROUPS.siSkills.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-3", label: "", divider: true },
    {
      id: "redis-skills-menu",
      label: "Redis 생태계",
      children: MENU_GROUPS.redisSkills.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => navigate(item.path),
      })),
    },
    { id: "divider-4", label: "", divider: true },
    {
      id: "uiux-skills-menu",
      label: "UI/UX 생태계",
      children: MENU_GROUPS.uiuxSkills.map((item) => ({
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
  onItemSelect?(id: string): void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onItemSelect,
  leftSlot,
  rightSlot,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleItemSelect = (id: string) => {
    if (onItemSelect) {
      onItemSelect(id);
    }
  };

  const dropdownItems = createDropdownItems(handleNavigate);

  return (
    <header
      className={`bg-white border-b border-gray-200 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* 좌측 영역 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate("/developers")}
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:from-blue-700 hover:to-blue-900">
                <Users className="w-4 h-4 text-white transition-transform duration-300 hover:scale-110" />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight transition-colors duration-300 hover:text-blue-700">
                Dev SyncUp
              </span>
            </button>
          </div>
          {leftSlot}
        </div>

        {/* 중앙 영역 - 네비게이션 */}
        <div className="flex items-center gap-4">
          {/* 데스크톱: 직접 메뉴 노출 */}
          <div className="hidden lg:flex items-center gap-6">
            {/* 개발자 관리 직접 링크 */}
            <button
              onClick={() => handleNavigate("/developers")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">개발자 관리</span>
            </button>
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

            {/* 챌린지형 스터디 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium">챌린지형 스터디</span>
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

            {/* 스프링 생태계 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Server className="w-4 h-4" />
                  <span className="text-sm font-medium">스프링 생태계</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.siSkills.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />

            {/* Redis 생태계 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <HardDrive className="w-4 h-4" />
                  <span className="text-sm font-medium">Redis 생태계</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.redisSkills.map((item) => ({
                  id: item.id,
                  label: item.label,
                  icon: item.icon,
                  onClick: () => handleNavigate(item.path),
                })),
              ]}
              onItemClick={(item) => handleItemSelect(item.id)}
            />

            {/* UI/UX 생태계 */}
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Layers className="w-4 h-4" />
                  <span className="text-sm font-medium">UI/UX 생태계</span>
                </div>
              }
              items={[
                ...MENU_GROUPS.uiuxSkills.map((item) => ({
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
