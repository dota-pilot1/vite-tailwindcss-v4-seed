import type React from "react";
import { Layers, Code2, Palette, Zap, Settings, Globe } from "lucide-react";

export const UiuxOverviewPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              UI/UX 생태계 개요
            </h2>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    핵심 스택
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Vite + React + TypeScript + Tailwind CSS
                </p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    컴포넌트 라이브러리
                  </span>
                </div>
                <p className="text-xs text-green-700">
                  Headless UI, Radix UI, shadcn/ui
                </p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    스타일링 & 애니메이션
                  </span>
                </div>
                <p className="text-xs text-purple-700">
                  Framer Motion, Lottie, CSS-in-JS
                </p>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">
                    개발 도구
                  </span>
                </div>
                <p className="text-xs text-orange-700">
                  Storybook, Figma, Chrome DevTools
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">학습 로드맵</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>1. React + TypeScript 기초</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>2. Tailwind CSS 마스터</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>3. 컴포넌트 라이브러리 활용</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>4. 애니메이션 & 인터랙션</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>5. 성능 최적화 & 접근성</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              UI/UX 개발 생태계
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              현대적인 프론트엔드 개발을 위한 핵심 기술 스택과 도구들을 체계적으로 학습하고 활용하는 방법을 제공합니다.
            </p>
          </div>

          {/* 핵심 기술 스택 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              핵심 기술 스택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Vite</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  차세대 프론트엔드 빌드 도구로 빠른 개발 서버와 최적화된 번들링을 제공합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">빠른 HMR</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">ES 모듈</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">플러그인 생태계</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">React</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  컴포넌트 기반 사용자 인터페이스 라이브러리로 선언적 프로그래밍을 지원합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">Hooks</span>
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">JSX</span>
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">Virtual DOM</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">TypeScript</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  정적 타입 검사를 통해 JavaScript의 안정성과 개발 경험을 크게 향상시킵니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">타입 안전성</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">IntelliSense</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">리팩토링</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Tailwind CSS</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  유틸리티 우선 CSS 프레임워크로 빠르고 일관된 디자인 시스템을 구축할 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">유틸리티 클래스</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">반응형</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">커스터마이징</span>
                </div>
              </div>
            </div>
          </div>

          {/* 환경 설정 가이드 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              환경 설정 가이드
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">1. 프로젝트 초기화</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <code className="text-sm text-gray-800">
                      npm create vite@latest my-app -- --template react-ts<br/>
                      cd my-app<br/>
                      npm install
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">2. Tailwind CSS 설치</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <code className="text-sm text-gray-800">
                      npm install -D tailwindcss postcss autoprefixer<br/>
                      npx tailwindcss init -p
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">3. 추가 라이브러리 설치</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <code className="text-sm text-gray-800">
                      npm install lucide-react clsx class-variance-authority<br/>
                      npm install @headlessui/react framer-motion
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 학습 경로 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              단계별 학습 경로
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">기초 설정 및 구조 이해</h3>
                    <p className="text-gray-600 mb-3">
                      Vite 프로젝트 구조를 파악하고 TypeScript + React 기본 설정을 완료합니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">프로젝트 구조</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">TypeScript 설정</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Vite 설정</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">컴포넌트 라이브러리 활용</h3>
                    <p className="text-gray-600 mb-3">
                      Headless UI, Radix UI, shadcn/ui 등을 활용하여 재사용 가능한 컴포넌트를 구축합니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Headless UI</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Radix UI</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">shadcn/ui</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">고급 스타일링 및 애니메이션</h3>
                    <p className="text-gray-600 mb-3">
                      Tailwind CSS 고급 기능과 Framer Motion을 활용하여 인터랙티브한 UI를 구현합니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Framer Motion</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">CSS-in-JS</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">애니메이션</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">개발 도구 및 최적화</h3>
                    <p className="text-gray-600 mb-3">
                      Storybook, ESLint, Prettier 등을 활용하여 개발 효율성과 코드 품질을 향상시킵니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Storybook</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">ESLint</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">성능 최적화</span>
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

export default UiuxOverviewPage;
