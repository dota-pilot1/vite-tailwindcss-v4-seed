import type React from "react";

export const TodoPage: React.FC = () => {
  const adminComponents = [
    {
      id: 1,
      title: "복잡한 헤더 메뉴 컴포넌트",
      description: "다중 레벨 드롭다운, 실시간 알림 패널, 사용자 프로필 메뉴",
      status: "pending",
    },
    {
      id: 2,
      title: "복잡한 사이드바 메뉴 컴포넌트",
      description:
        "트리 구조 네비게이션, 접이식/펼침 기능, 아코디언 스타일 서브메뉴",
      status: "pending",
    },
    {
      id: 3,
      title: "복잡한 탭바 및 탭분할 컴포넌트",
      description: "드래그 앤 드롭 탭, 동적 탭 추가/삭제, 중첩 탭 구조",
      status: "pending",
    },
    {
      id: 4,
      title: "소개/대시보드 페이지 컴포넌트",
      description: "실시간 차트 위젯, KPI 카드 컴포넌트, 드래그 가능한 위젯",
      status: "pending",
    },
    {
      id: 5,
      title: "메뉴얼/도큐먼트 페이지 컴포넌트",
      description: "마크다운 렌더러, 목차 자동 생성, 검색 및 필터링",
      status: "pending",
    },
    {
      id: 6,
      title: "Todo 관리 페이지 고도화",
      description: "드래그 앤 드롭 정렬, 필터링 및 그룹핑, 인라인 편집",
      status: "pending",
    },
    {
      id: 7,
      title: "데이터 테이블 컴포넌트",
      description: "가상화 스크롤, 정렬/필터/검색, 인라인 편집",
      status: "pending",
    },
    {
      id: 8,
      title: "폼 빌더 컴포넌트",
      description: "드래그 앤 드롭 폼 필드, 동적 유효성 검사, 조건부 필드 표시",
      status: "pending",
    },
    {
      id: 9,
      title: "파일 업로드 관리자 컴포넌트",
      description: "드래그 앤 드롭 업로드, 진행률 표시, 미리보기 기능",
      status: "pending",
    },
    {
      id: 10,
      title: "캘린더/스케줄러 컴포넌트",
      description: "월/주/일 뷰, 이벤트 드래그 앤 드롭, 일정 충돌 검사",
      status: "pending",
    },
    {
      id: 11,
      title: "차트/대시보드 위젯 컴포넌트",
      description: "실시간 데이터 차트, 인터랙티브 차트, 다양한 차트 타입",
      status: "pending",
    },
    {
      id: 12,
      title: "모달/다이얼로그 시스템",
      description: "다중 모달 관리, 드래그 가능한 모달, 동적 크기 조절",
      status: "pending",
    },
    {
      id: 13,
      title: "알림/토스트 시스템",
      description: "다양한 알림 타입, 위치별 표시, 자동 닫힘 기능",
      status: "pending",
    },
    {
      id: 14,
      title: "사용자 관리 컴포넌트",
      description: "권한 매트릭스, 사용자 검색/필터, 벌크 작업",
      status: "pending",
    },
    {
      id: 15,
      title: "설정 페이지 컴포넌트",
      description: "탭별 설정 그룹, 실시간 미리보기, 설정 가져오기/내보내기",
      status: "pending",
    },
    {
      id: 16,
      title: "검색 인터페이스 컴포넌트",
      description: "자동완성, 필터 조합, 결과 하이라이팅",
      status: "pending",
    },
    {
      id: 17,
      title: "데이터 시각화 도구 컴포넌트",
      description: "커스텀 차트 빌더, 데이터 드릴다운, 엑셀 내보내기",
      status: "pending",
    },
    {
      id: 18,
      title: "워크플로우 에디터 컴포넌트",
      description: "노드 기반 편집, 드래그 앤 드롭 연결, 조건부 브랜치",
      status: "pending",
    },
    {
      id: 19,
      title: "실시간 채팅/메시징 컴포넌트",
      description: "메시지 스레드, 파일 공유, 이모티콘 반응",
      status: "pending",
    },
    {
      id: 20,
      title: "다국어 관리 컴포넌트",
      description: "텍스트 키 관리, 번역 진행률, 컨텍스트 기반 편집",
      status: "pending",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        관리자 페이지 컴포넌트 개발 Todo
      </h1>

      <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              관리자 페이지를 위한 20개의 복잡한 UI 컴포넌트 개발 계획입니다. 각
              컴포넌트는 실제 관리자 시스템에서 사용될 수 있는 고급 기능들을
              포함합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">컴포넌트 개발 목록</h2>
            <div className="text-sm text-gray-600">
              총 {adminComponents.length}개 컴포넌트
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {adminComponents.map((component) => (
            <div key={component.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-500">
                      #{component.id.toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {component.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        component.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {component.status === "pending" ? "대기중" : "완료"}
                    </span>
                  </div>
                  <p className="text-gray-600 ml-7">{component.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    시작
                  </button>
                  <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    상세
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>진행률: 0/20 완료</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 검증된 라이브러리 목록 */}
      <div className="mt-8 bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            활용 가능한 검증된 라이브러리
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            각 컴포넌트 구현에 사용할 수 있는 검증된 라이브러리들
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                🎨 UI 프레임워크
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">Headless UI</span> - 접근성
                  좋은 unstyled 컴포넌트
                </li>
                <li>
                  • <span className="font-medium">Radix UI</span> - 고품질
                  프리미티브 컴포넌트
                </li>
                <li>
                  • <span className="font-medium">Ariakit</span> - 접근성 중심
                  컴포넌트
                </li>
                <li>
                  • <span className="font-medium">React Aria</span> - Adobe의
                  접근성 라이브러리
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                🖱️ 드래그 앤 드롭
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">@dnd-kit</span> - 현대적이고
                  접근 가능한 DnD
                </li>
                <li>
                  • <span className="font-medium">react-beautiful-dnd</span> -
                  부드러운 DnD (Atlassian)
                </li>
                <li>
                  • <span className="font-medium">react-sortable-hoc</span> -
                  정렬 가능한 컴포넌트
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                📊 차트/시각화
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">Recharts</span> - React용 차트
                  라이브러리
                </li>
                <li>
                  • <span className="font-medium">D3.js</span> - 강력한 데이터
                  시각화
                </li>
                <li>
                  • <span className="font-medium">Chart.js</span> - 간단하고
                  유연한 차트
                </li>
                <li>
                  • <span className="font-medium">Victory</span> - 모듈식 차트
                  컴포넌트
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">📝 폼 관리</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">React Hook Form</span> - 성능
                  좋은 폼 라이브러리
                </li>
                <li>
                  • <span className="font-medium">Formik</span> - 완전한 폼
                  솔루션
                </li>
                <li>
                  • <span className="font-medium">Zod</span> - TypeScript 스키마
                  검증
                </li>
                <li>
                  • <span className="font-medium">Yup</span> - 객체 스키마 검증
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">📱 상태 관리</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">Zustand</span> - 간단한 상태
                  관리
                </li>
                <li>
                  • <span className="font-medium">Redux Toolkit</span> - Redux
                  공식 도구
                </li>
                <li>
                  • <span className="font-medium">Jotai</span> - 원자적 상태
                  관리
                </li>
                <li>
                  • <span className="font-medium">Valtio</span> - 프록시 기반
                  상태
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                🗂️ 테이블/그리드
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">@tanstack/react-table</span> -
                  헤드리스 테이블
                </li>
                <li>
                  • <span className="font-medium">AG Grid</span> -
                  엔터프라이즈급 그리드
                </li>
                <li>
                  • <span className="font-medium">react-data-grid</span> - 엑셀
                  스타일 그리드
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">⚡ 가상화</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">@tanstack/react-virtual</span>{" "}
                  - 가상 스크롤
                </li>
                <li>
                  • <span className="font-medium">react-window</span> - 대용량
                  리스트
                </li>
                <li>
                  • <span className="font-medium">react-virtuoso</span> - 가상화
                  라이브러리
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                🎭 애니메이션
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">Framer Motion</span> - 선언적
                  애니메이션
                </li>
                <li>
                  • <span className="font-medium">React Spring</span> - 물리
                  기반 애니메이션
                </li>
                <li>
                  • <span className="font-medium">Lottie React</span> - After
                  Effects 애니메이션
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">📅 날짜/시간</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">react-big-calendar</span> -
                  구글 캘린더 스타일
                </li>
                <li>
                  • <span className="font-medium">react-calendar</span> - 간단한
                  캘린더
                </li>
                <li>
                  • <span className="font-medium">date-fns</span> - 모던 날짜
                  유틸리티
                </li>
                <li>
                  • <span className="font-medium">dayjs</span> - 경량 날짜
                  라이브러리
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">🔍 검색/필터</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <span className="font-medium">Fuse.js</span> - 퍼지 검색
                </li>
                <li>
                  • <span className="font-medium">React Select</span> - 고급
                  셀렉트 박스
                </li>
                <li>
                  • <span className="font-medium">Downshift</span> - 자동완성
                  컴포넌트
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 참고 사이트 목록 */}
      <div className="mt-8 bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">관리자 프로젝트 참고 사이트</h2>
          <p className="text-sm text-gray-600 mt-1">
            UI/UX 디자인 및 기능 구현 참고용 사이트들
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">
              🎨 디자인 시스템
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://ant.design"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Ant Design
                </a>{" "}
                - 엔터프라이즈 UI
              </li>
              <li>
                •{" "}
                <a
                  href="https://mui.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Material-UI
                </a>{" "}
                - 구글 머티리얼 디자인
              </li>
              <li>
                •{" "}
                <a
                  href="https://chakra-ui.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Chakra UI
                </a>{" "}
                - 간단하고 모듈식
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.radix-ui.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Radix UI
                </a>{" "}
                - 헤드리스 컴포넌트
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">
              🏢 실제 관리자 사이트
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://vercel.com/dashboard"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Vercel Dashboard
                </a>{" "}
                - 깔끔한 대시보드
              </li>
              <li>
                •{" "}
                <a
                  href="https://stripe.com/docs"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Stripe Dashboard
                </a>{" "}
                - 결제 관리 UI
              </li>
              <li>
                •{" "}
                <a
                  href="https://notion.so"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Notion
                </a>{" "}
                - 워크스페이스 UI
              </li>
              <li>
                •{" "}
                <a
                  href="https://linear.app"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Linear
                </a>{" "}
                - 이슈 트래킹 UI
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">
              📊 대시보드 템플릿
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://ui.shadcn.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  shadcn/ui
                </a>{" "}
                - 모던 컴포넌트
              </li>
              <li>
                •{" "}
                <a
                  href="https://tailwindui.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Tailwind UI
                </a>{" "}
                - 프리미엄 템플릿
              </li>
              <li>
                •{" "}
                <a
                  href="https://headlessui.dev"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Headless UI
                </a>{" "}
                - 접근성 중심
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.tremor.so"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Tremor
                </a>{" "}
                - 대시보드 블록
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">🎯 특화 도구</h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://reactflow.dev"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  React Flow
                </a>{" "}
                - 노드 기반 에디터
              </li>
              <li>
                •{" "}
                <a
                  href="https://github.com/bvaughn/react-virtualized"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  React Virtualized
                </a>{" "}
                - 대용량 데이터
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.ag-grid.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  AG Grid
                </a>{" "}
                - 고급 테이블
              </li>
              <li>
                •{" "}
                <a
                  href="https://floating-ui.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Floating UI
                </a>{" "}
                - 툴팁/팝오버
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">📚 학습 리소스</h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://storybook.js.org"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Storybook
                </a>{" "}
                - 컴포넌트 개발
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.patterns.dev"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Patterns.dev
                </a>{" "}
                - 디자인 패턴
              </li>
              <li>
                •{" "}
                <a
                  href="https://react-typescript-cheatsheet.netlify.app"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  React TypeScript
                </a>{" "}
                - 치트시트
              </li>
              <li>
                •{" "}
                <a
                  href="https://usehooks.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  useHooks
                </a>{" "}
                - 커스텀 훅
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">🛠️ 개발 도구</h3>
            <ul className="text-sm space-y-2">
              <li>
                •{" "}
                <a
                  href="https://react-query.tanstack.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  TanStack Query
                </a>{" "}
                - 서버 상태
              </li>
              <li>
                •{" "}
                <a
                  href="https://testing-library.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Testing Library
                </a>{" "}
                - 테스팅
              </li>
              <li>
                •{" "}
                <a
                  href="https://vitejs.dev"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Vite
                </a>{" "}
                - 빌드 도구
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.chromatic.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Chromatic
                </a>{" "}
                - 비주얼 테스팅
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
