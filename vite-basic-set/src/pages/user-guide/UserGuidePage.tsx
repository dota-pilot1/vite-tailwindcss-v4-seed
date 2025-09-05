import React from "react";
import {
  Search,
  FolderTree,
  MousePointer,
  Navigation,
  Keyboard,
  Star,
  Zap,
  CheckCircle2,
  Book,
  Play,
  Info,
} from "lucide-react";

export interface UserGuidePageProps {
  className?: string;
}

/**
 * UserGuidePage
 *
 * 사용자 가이드 전용 페이지
 * - 상세한 사용법 설명
 * - 단계별 튜토리얼
 * - 팁과 트릭
 */
export const UserGuidePage: React.FC<UserGuidePageProps> = ({ className }) => {
  const guideItems = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "사이드바 검색 기능",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "검색창에 키워드를 입력하면 실시간으로 필터링됩니다",
        "매칭된 항목과 그 상위 폴더가 자동으로 표시됩니다",
        "매칭된 텍스트는 하이라이트로 강조됩니다",
        "너무 짧은 검색어는 자동으로 무시됩니다",
        "Ctrl/Cmd + K 단축키로 빠른 검색 가능",
      ],
      steps: [
        "좌측 사이드바 상단의 검색창을 클릭합니다",
        "찾고자 하는 키워드를 입력합니다",
        "실시간으로 매칭되는 결과를 확인합니다",
        "원하는 항목을 클릭하여 해당 페이지로 이동합니다",
      ],
    },
    {
      icon: <FolderTree className="w-6 h-6" />,
      title: "트리 접기/펼치기",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      features: [
        "헤더의 숫자 버튼(1,2,3)으로 해당 깊이까지 펼칠 수 있습니다",
        "'All' 버튼으로 전체를 접을 수 있습니다",
        "폴더 앞의 ▶ 화살표를 클릭하여 개별 접기/펼치기 가능",
        "검색 중에는 매칭 조건에 맞게 자동으로 확장됩니다",
      ],
      steps: [
        "사이드바 헤더의 숫자 버튼(1, 2, 3)을 확인합니다",
        "원하는 깊이 번호를 클릭하여 해당 레벨까지 펼칩니다",
        "개별 폴더는 화살표 아이콘을 클릭하여 제어합니다",
        "'All' 버튼으로 전체 트리를 접을 수 있습니다",
      ],
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "사이드바 토글",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      features: [
        "헤더 왼쪽의 햄버거 메뉴로 사이드바를 접을 수 있습니다",
        "접힌 상태에서는 주요 섹션만 점으로 표시됩니다",
        "점을 클릭하면 사이드바가 다시 펼쳐집니다",
        "화면 공간을 효율적으로 활용할 수 있습니다",
      ],
      steps: [
        "상단 헤더 좌측의 햄버거 메뉴 아이콘을 찾습니다",
        "아이콘을 클릭하여 사이드바를 접습니다",
        "접힌 상태에서 점 형태의 인디케이터를 확인합니다",
        "인디케이터를 클릭하여 사이드바를 다시 펼칩니다",
      ],
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "페이지 네비게이션",
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      features: [
        "상단 헤더의 드롭다운 메뉴로 모든 페이지에 접근 가능",
        "사이드바의 항목을 클릭하여 직접 이동",
        "현재 페이지는 하이라이트로 표시됩니다",
        "브레드크럼으로 현재 위치를 확인할 수 있습니다",
      ],
      steps: [
        "상단 헤더의 '메뉴' 드롭다운을 클릭합니다",
        "카테고리별로 정리된 페이지 목록을 확인합니다",
        "원하는 페이지를 선택하여 이동합니다",
        "현재 페이지 표시를 통해 위치를 확인합니다",
      ],
    },
  ];

  const quickTips = [
    {
      icon: <Keyboard className="w-5 h-5" />,
      title: "키보드 단축키",
      tip: "Ctrl/Cmd + K로 빠른 검색 실행",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "즐겨찾기",
      tip: "자주 사용하는 페이지는 북마크로 저장",
    },
    {
      icon: <MousePointer className="w-5 h-5" />,
      title: "마우스 제스처",
      tip: "우클릭으로 컨텍스트 메뉴 활용",
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      title: "브레드크럼",
      tip: "상단의 경로를 통해 빠른 이동",
    },
  ];

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className || ""}`}>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Book className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">사용자 가이드</h1>
        </div>
        <p className="text-lg text-gray-600">
          SuperUI Admin 시스템을 효율적으로 사용하는 방법을 학습해보세요.
        </p>
      </div>

      {/* 빠른 시작 가이드 */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">빠른 시작</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  메뉴 탐색
                </div>
                <div className="text-sm text-gray-600">
                  상단 헤더의 드롭다운 메뉴로 원하는 페이지를 찾아보세요.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  검색 활용
                </div>
                <div className="text-sm text-gray-600">
                  Ctrl+K 단축키로 빠르게 원하는 기능을 검색할 수 있습니다.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  효율적 관리
                </div>
                <div className="text-sm text-gray-600">
                  사이드바를 활용하여 작업 공간을 효율적으로 관리하세요.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 가이드 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          상세 기능 가이드
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {guideItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* 헤더 */}
              <div className={`bg-gradient-to-r ${item.color} p-6`}>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-white/20 rounded-xl">{item.icon}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </div>

              {/* 내용 */}
              <div className="p-6">
                {/* 주요 기능 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    주요 기능
                  </h4>
                  <ul className="space-y-2">
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

                {/* 사용 단계 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    사용 방법
                  </h4>
                  <ol className="space-y-2">
                    {item.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로 팁 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          프로 팁
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickTips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {tip.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {tip.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 문제해결 */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          자주 묻는 질문 (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="bg-white rounded-lg border border-gray-200">
            <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
              검색이 작동하지 않아요
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-600">
              검색어가 너무 짧거나(2자 미만) 특수문자만 포함된 경우 검색이
              실행되지 않습니다. 최소 2자 이상의 한글, 영문, 숫자를
              입력해주세요.
            </div>
          </details>

          <details className="bg-white rounded-lg border border-gray-200">
            <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
              사이드바가 접히지 않아요
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-600">
              상단 헤더 좌측의 햄버거 메뉴(≡) 아이콘을 찾아 클릭해주세요.
              아이콘이 보이지 않는다면 브라우저 창을 새로고침해보세요.
            </div>
          </details>

          <details className="bg-white rounded-lg border border-gray-200">
            <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
              단축키가 작동하지 않아요
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-600">
              브라우저에서 JavaScript가 활성화되어 있는지 확인하고, 다른
              브라우저 확장프로그램과 충돌하지 않는지 확인해주세요.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

UserGuidePage.displayName = "UserGuidePage";
export default UserGuidePage;
