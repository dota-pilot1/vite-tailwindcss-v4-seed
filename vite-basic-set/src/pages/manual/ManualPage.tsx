import React, { useState } from "react";

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
    <div className={`p-6 max-w-4xl mx-auto ${className || ""}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          시스템 매뉴얼
        </h1>
        <p className="text-gray-600">
          Super UI 시스템 사용법과 현황을 확인할 수 있습니다.
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "guide"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          사용 가이드
        </button>
        <button
          onClick={() => setActiveTab("report")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "report"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
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
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          🔍 사이드바 검색 기능
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 검색창에 키워드를 입력하면 실시간으로 필터링됩니다</li>
            <li>• 매칭된 항목과 그 상위 폴더가 자동으로 표시됩니다</li>
            <li>• 매칭된 텍스트는 노란색으로 하이라이트됩니다</li>
            <li>• 너무 짧은 검색어는 자동으로 무시됩니다</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          📁 트리 접기/펼치기
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 헤더의 숫자 버튼(1,2,3)으로 해당 깊이까지 펼칠 수 있습니다</li>
            <li>• 'All' 버튼으로 전체를 접을 수 있습니다</li>
            <li>• 폴더 앞의 ▶ 화살표를 클릭하여 개별 접기/펼치기 가능</li>
            <li>• 검색 중에는 매칭 조건에 맞게 자동으로 확장됩니다</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          ↔️ 사이드바 접기
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 헤더 왼쪽의 화살표 버튼으로 사이드바를 접을 수 있습니다</li>
            <li>• 접힌 상태에서는 주요 섹션만 점으로 표시됩니다</li>
            <li>• 점을 클릭하면 사이드바가 다시 펼쳐집니다</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          🎯 네비게이션
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 라우트가 있는 메뉴 항목을 클릭하면 해당 페이지로 이동합니다</li>
            <li>• 현재 페이지와 연결된 메뉴는 회색 배경으로 표시됩니다</li>
            <li>• 폴더 클릭 시에는 접기/펼치기만 동작합니다</li>
          </ul>
        </div>
      </section>
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
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          📊 시스템 현황
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.totalNodes}
            </div>
            <div className="text-sm text-gray-600">전체 노드</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalFolders}
            </div>
            <div className="text-sm text-gray-600">폴더</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {stats.totalItems}
            </div>
            <div className="text-sm text-gray-600">항목</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          ⚡ 성능 지표
        </h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">검색 응답 시간</div>
              <div className="text-lg font-medium">{stats.searchPerformance}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">활성 사용자</div>
              <div className="text-lg font-medium">{stats.activeUsers}명</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          🔥 인기 검색어
        </h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {stats.popularSearches.map((term, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          📅 업데이트 정보
        </h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">마지막 업데이트</div>
          <div className="text-lg font-medium">{stats.lastUpdate}</div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          🚀 향후 개발 예정
        </h2>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 🔍 검색 고도화 (Fuzzy 검색, 초성 검색)</li>
            <li>• ↕️ 드래그 앤 드롭으로 순서 변경</li>
            <li>• ☑️ 다중 선택 및 일괄 작업</li>
            <li>• 🖱️ 우클릭 컨텍스트 메뉴</li>
            <li>• 🌐 다국어 지원 (한국어/영어)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

ManualPage.displayName = "ManualPage";
export default ManualPage;
