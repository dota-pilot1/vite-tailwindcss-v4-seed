import React, { useState } from "react";
import {
  Book,
  BarChart3,
  Search,
  FolderTree,
  MousePointer,
  Navigation,
  Activity,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Calendar,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export interface ManualPageProps {
  className?: string;
}

/**
 * ManualPage
 *
 * 시스템 사용 가이드와 리포트를 제공하는 페이지
 * - 사이드바 기능 가이드
 * - 시스템 통계 리포트
 * - 사용법 문서
 */
export const ManualPage: React.FC<ManualPageProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<"guide" | "report">("guide");

  return (
    <div className={`p-6 max-w-6xl mx-auto ${className || ""}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">시스템 매뉴얼</h1>
        <p className="text-lg text-gray-600">
          Super UI Admin 시스템 사용법과 현황을 확인할 수 있습니다.
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("guide")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "guide"
              ? "border-slate-600 text-slate-700 bg-slate-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <Book className="w-4 h-4" />
          사용 가이드
        </button>
        <button
          onClick={() => setActiveTab("report")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "report"
              ? "border-slate-600 text-slate-700 bg-slate-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          시스템 리포트
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "guide" ? <GuideContent /> : <ReportContent />}
    </div>
  );
};

/**
 * 사용 가이드 컨텐츠
 */
const GuideContent: React.FC = () => {
  const guideItems = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "사이드바 검색 기능",
      color: "from-blue-500 to-blue-600",
      features: [
        "검색창에 키워드를 입력하면 실시간으로 필터링됩니다",
        "매칭된 항목과 그 상위 폴더가 자동으로 표시됩니다",
        "매칭된 텍스트는 하이라이트로 강조됩니다",
        "너무 짧은 검색어는 자동으로 무시됩니다",
      ],
    },
    {
      icon: <FolderTree className="w-6 h-6" />,
      title: "트리 접기/펼치기",
      color: "from-emerald-500 to-emerald-600",
      features: [
        "헤더의 숫자 버튼(1,2,3)으로 해당 깊이까지 펼칠 수 있습니다",
        "'All' 버튼으로 전체를 접을 수 있습니다",
        "폴더 앞의 ▶ 화살표를 클릭하여 개별 접기/펼치기 가능",
        "검색 중에는 매칭 조건에 맞게 자동으로 확장됩니다",
      ],
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "사이드바 접기",
      color: "from-amber-500 to-amber-600",
      features: [
        "헤더 왼쪽의 화살표 버튼으로 사이드바를 접을 수 있습니다",
        "접힌 상태에서는 주요 섹션만 점으로 표시됩니다",
        "점을 클릭하면 사이드바가 다시 펼쳐집니다",
      ],
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "네비게이션",
      color: "from-slate-500 to-slate-600",
      features: [
        "라우트가 있는 메뉴 항목을 클릭하면 해당 페이지로 이동합니다",
        "현재 페이지와 연결된 메뉴는 회색 배경으로 표시됩니다",
        "폴더 클릭 시에는 접기/펼치기만 동작합니다",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {guideItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${item.color} p-4`}>
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {item.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 팁 섹션 */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          프로 팁
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 text-sm">
                키보드 단축키
              </div>
              <div className="text-sm text-gray-600">
                Ctrl/Cmd + K로 빠른 검색 가능
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 text-sm">
                북마크 기능
              </div>
              <div className="text-sm text-gray-600">
                자주 사용하는 페이지 즐겨찾기 추가
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 시스템 리포트 컨텐츠
 */
const ReportContent: React.FC = () => {
  // 실제로는 API에서 가져올 데이터들
  const stats = {
    totalNodes: 42,
    totalFolders: 18,
    totalItems: 24,
    searchPerformance: "평균 150ms",
    lastUpdate: "2024-01-15 14:30",
    activeUsers: 12,
    popularSearches: ["Dev", "팀", "그룹", "서울", "FE"],
    systemHealth: "정상",
    uptime: "99.9%",
    responseTime: "85ms",
  };

  const metrics = [
    {
      icon: <Activity className="w-6 h-6" />,
      label: "전체 노드",
      value: stats.totalNodes,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FolderTree className="w-6 h-6" />,
      label: "폴더",
      value: stats.totalFolders,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Book className="w-6 h-6" />,
      label: "항목",
      value: stats.totalItems,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "활성 사용자",
      value: `${stats.activeUsers}명`,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 메트릭 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div
              className={`inline-flex p-3 rounded-lg ${metric.bgColor} mb-4`}
            >
              <div
                className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
              >
                {metric.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* 성능 지표 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            성능 지표
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">검색 응답 시간</span>
              <span className="font-medium text-gray-900">
                {stats.searchPerformance}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">시스템 상태</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {stats.systemHealth}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">가동률</span>
              <span className="font-medium text-gray-900">{stats.uptime}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">평균 응답시간</span>
              <span className="font-medium text-gray-900">
                {stats.responseTime}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            인기 검색어
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.popularSearches.map((term, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer"
              >
                #{term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 업데이트 정보 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-500" />
          업데이트 정보
        </h3>
        <div className="flex items-center gap-4">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">마지막 업데이트</div>
            <div className="font-medium text-gray-900">{stats.lastUpdate}</div>
          </div>
        </div>
      </div>

      {/* 향후 개발 계획 */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-blue-500" />
          향후 개발 예정
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  검색 고도화
                </div>
                <div className="text-sm text-gray-600">
                  Fuzzy 검색, 초성 검색 지원
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  드래그 앤 드롭
                </div>
                <div className="text-sm text-gray-600">순서 변경 및 재배치</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  다중 선택
                </div>
                <div className="text-sm text-gray-600">일괄 작업 및 관리</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  컨텍스트 메뉴
                </div>
                <div className="text-sm text-gray-600">
                  우클릭 기반 빠른 작업
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  다국어 지원
                </div>
                <div className="text-sm text-gray-600">
                  한국어/영어 인터페이스
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  테마 시스템
                </div>
                <div className="text-sm text-gray-600">
                  다크모드 및 커스텀 테마
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ManualPage.displayName = "ManualPage";
export default ManualPage;
