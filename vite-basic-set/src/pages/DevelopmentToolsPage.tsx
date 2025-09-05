import type React from "react";
import { Settings, Code2, Monitor, Package, Bug } from "lucide-react";

export const DevelopmentToolsPage: React.FC = () => {
  const developmentTools = [
    {
      name: "Storybook",
      category: "컴포넌트 개발",
      description: "UI 컴포넌트를 독립적으로 개발하고 테스트할 수 있는 도구",
      features: [
        "컴포넌트 카탈로그",
        "문서 자동 생성",
        "인터랙션 테스트",
        "시각적 테스트",
      ],
      viteIntegration: "우수",
      reactSupport: "완벽",
      tailwindSupport: "완벽",
      setupDifficulty: "보통",
      performance: "보통",
      website: "https://storybook.js.org/",
      installCommand: "npx storybook@latest init",
      pros: ["컴포넌트 독립 개발", "자동 문서화", "다양한 애드온"],
      cons: ["설정 복잡성", "빌드 시간"],
      rating: 5,
    },
    {
      name: "Vite",
      category: "빌드 도구",
      description: "현대적인 프론트엔드 빌드 도구",
      features: ["빠른 HMR", "ES 모듈", "플러그인 생태계", "최적화된 번들링"],
      viteIntegration: "기본",
      reactSupport: "완벽",
      tailwindSupport: "완벽",
      setupDifficulty: "쉬움",
      performance: "우수",
      website: "https://vitejs.dev/",
      installCommand: "npm create vite@latest",
      pros: ["빠른 개발 서버", "간단한 설정", "모던 도구"],
      cons: ["상대적으로 새로움", "생태계"],
      rating: 5,
    },
    {
      name: "ESLint",
      category: "코드 품질",
      description: "JavaScript/TypeScript 코드 린터",
      features: ["코드 품질 검사", "자동 수정", "커스텀 규칙", "통합 지원"],
      viteIntegration: "우수",
      reactSupport: "완벽",
      tailwindSupport: "플러그인",
      setupDifficulty: "쉬움",
      performance: "우수",
      website: "https://eslint.org/",
      installCommand: "npm install eslint @typescript-eslint/parser",
      pros: ["코드 일관성", "버그 예방", "팀 협업"],
      cons: ["초기 설정", "규칙 복잡성"],
      rating: 5,
    },
    {
      name: "Prettier",
      category: "코드 포맷팅",
      description: "코드 포맷터",
      features: ["자동 포맷팅", "다양한 언어", "에디터 통합", "설정 간소화"],
      viteIntegration: "우수",
      reactSupport: "완벽",
      tailwindSupport: "플러그인",
      setupDifficulty: "쉬움",
      performance: "우수",
      website: "https://prettier.io/",
      installCommand: "npm install prettier prettier-plugin-tailwindcss",
      pros: ["일관된 포맷팅", "자동화", "설정 최소화"],
      cons: ["포맷팅 스타일 제한", "설정 충돌"],
      rating: 5,
    },
    {
      name: "Figma",
      category: "디자인 도구",
      description: "UI/UX 디자인 및 프로토타이핑 도구",
      features: ["벡터 디자인", "컴포넌트 시스템", "프로토타이핑", "협업"],
      viteIntegration: "플러그인",
      reactSupport: "코드 생성",
      tailwindSupport: "플러그인",
      setupDifficulty: "보통",
      performance: "우수",
      website: "https://figma.com/",
      installCommand: "웹 애플리케이션 (설치 불필요)",
      pros: ["강력한 디자인 도구", "실시간 협업", "개발자 핸드오프"],
      cons: ["학습 곡선", "인터넷 연결 필요"],
      rating: 5,
    },
    {
      name: "Chromatic",
      category: "시각적 테스트",
      description: "UI 컴포넌트 시각적 테스트 및 리뷰 도구",
      features: ["시각적 회귀 테스트", "UI 리뷰", "Storybook 통합", "CI/CD"],
      viteIntegration: "우수",
      reactSupport: "완벽",
      tailwindSupport: "완벽",
      setupDifficulty: "보통",
      performance: "우수",
      website: "https://www.chromatic.com/",
      installCommand: "npm install chromatic",
      pros: ["자동 시각적 테스트", "팀 리뷰", "히스토리 추적"],
      cons: ["유료 서비스", "Storybook 의존"],
      rating: 4,
    },
    {
      name: "React DevTools",
      category: "디버깅",
      description: "React 애플리케이션 디버깅 도구",
      features: [
        "컴포넌트 트리",
        "Props/State 검사",
        "성능 프로파일링",
        "Hooks 디버깅",
      ],
      viteIntegration: "기본",
      reactSupport: "완벽",
      tailwindSupport: "해당없음",
      setupDifficulty: "쉬움",
      performance: "우수",
      website: "https://react.dev/learn/react-developer-tools",
      installCommand: "브라우저 확장 프로그램",
      pros: ["필수 디버깅 도구", "무료", "브라우저 통합"],
      cons: ["브라우저 확장만", "기능 제한"],
      rating: 5,
    },
    {
      name: "TypeScript",
      category: "타입 시스템",
      description: "정적 타입을 추가한 JavaScript 확장",
      features: [
        "정적 타입 검사",
        "IntelliSense",
        "리팩토링 지원",
        "컴파일 시간 오류",
      ],
      viteIntegration: "기본",
      reactSupport: "완벽",
      tailwindSupport: "타입 정의",
      setupDifficulty: "보통",
      performance: "우수",
      website: "https://www.typescriptlang.org/",
      installCommand: "npm install typescript @types/react @types/react-dom",
      pros: ["타입 안전성", "개발 경험", "리팩토링"],
      cons: ["학습 곡선", "설정 복잡성"],
      rating: 5,
    },
  ];

  const toolCategories = [
    { name: "빌드 도구", color: "blue", tools: ["Vite", "Webpack", "Rollup"] },
    {
      name: "코드 품질",
      color: "green",
      tools: ["ESLint", "Prettier", "Husky"],
    },
    {
      name: "디자인 도구",
      color: "purple",
      tools: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "테스트 도구",
      color: "orange",
      tools: ["Jest", "Testing Library", "Chromatic"],
    },
    {
      name: "디버깅",
      color: "red",
      tools: ["React DevTools", "Redux DevTools"],
    },
    {
      name: "개발 환경",
      color: "indigo",
      tools: ["Storybook", "VS Code", "GitHub Codespaces"],
    },
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full ${
          index < rating ? "bg-yellow-400" : "bg-gray-300"
        }`}
      />
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-50 text-green-700";
      case "보통":
        return "bg-yellow-50 text-yellow-700";
      case "어려움":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getIntegrationColor = (level: string) => {
    switch (level) {
      case "완벽":
        return "bg-green-50 text-green-700";
      case "우수":
        return "bg-blue-50 text-blue-700";
      case "보통":
        return "bg-yellow-50 text-yellow-700";
      case "기본":
        return "bg-blue-50 text-blue-700";
      case "플러그인":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              개발 도구 카테고리
            </h2>
            <div className="space-y-2">
              {toolCategories.map((category, index) => (
                <div
                  key={index}
                  className={`p-3 bg-${category.color}-50 border border-${category.color}-200 rounded-lg`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Settings
                      className={`w-4 h-4 text-${category.color}-600`}
                    />
                    <span
                      className={`text-sm font-medium text-${category.color}-900`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className={`text-xs text-${category.color}-700 bg-${category.color}-100 px-2 py-1 rounded`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">
              필수 도구 체크리스트
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Vite (빌드 도구)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>ESLint + Prettier</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Storybook</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>React DevTools</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Figma (디자인)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">개발 도구</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              React + TypeScript + Tailwind CSS 개발 환경을 위한 필수 도구들과
              워크플로우를 정리합니다.
            </p>
          </div>

          {/* 도구 비교 테이블 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      도구명
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      카테고리
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Vite 통합
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      React 지원
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tailwind
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      설정 난이도
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      성능
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      평점
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {developmentTools.map((tool, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {tool.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {tool.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getIntegrationColor(tool.viteIntegration)}`}
                        >
                          {tool.viteIntegration}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getIntegrationColor(tool.reactSupport)}`}
                        >
                          {tool.reactSupport}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getIntegrationColor(tool.tailwindSupport)}`}
                        >
                          {tool.tailwindSupport}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(tool.setupDifficulty)}`}
                        >
                          {tool.setupDifficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getIntegrationColor(tool.performance)}`}
                        >
                          {tool.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {getRatingStars(tool.rating)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 추천 워크플로우 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              추천 개발 워크플로우
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    개발 환경 설정
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        1
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Vite 프로젝트 생성
                      </div>
                      <div className="text-sm text-gray-600">
                        React + TypeScript 템플릿
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        2
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Tailwind CSS 설정
                      </div>
                      <div className="text-sm text-gray-600">
                        PostCSS 플러그인 포함
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        3
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        ESLint + Prettier
                      </div>
                      <div className="text-sm text-gray-600">
                        코드 품질 도구 설정
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    컴포넌트 개발
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        1
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Storybook 설정
                      </div>
                      <div className="text-sm text-gray-600">
                        컴포넌트 개발 환경
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        2
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        컴포넌트 구현
                      </div>
                      <div className="text-sm text-gray-600">
                        TypeScript + Tailwind
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        3
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Story 작성
                      </div>
                      <div className="text-sm text-gray-600">
                        다양한 상태 시나리오
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bug className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    테스트 & 디버깅
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        1
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        React DevTools
                      </div>
                      <div className="text-sm text-gray-600">
                        컴포넌트 상태 확인
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        2
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        시각적 테스트
                      </div>
                      <div className="text-sm text-gray-600">
                        Chromatic 활용
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        3
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        성능 최적화
                      </div>
                      <div className="text-sm text-gray-600">
                        Lighthouse 분석
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 설정 예제 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              빠른 설정 가이드
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  package.json 스크립트
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800">
                    {`{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write .",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  VS Code 확장 프로그램
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">
                        ES7+ React/Redux/React-Native snippets
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">
                        Tailwind CSS IntelliSense
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        TypeScript Importer
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">ESLint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">
                        Prettier - Code formatter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium">
                        Auto Rename Tag
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentToolsPage;
