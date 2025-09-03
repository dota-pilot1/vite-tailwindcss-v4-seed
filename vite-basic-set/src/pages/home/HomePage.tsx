import React from "react";

/**
 * HomePage
 *
 * 홈(기본) 화면 컴포넌트.
 * - 확장성 중심 구조: 라우터 도입 시 그대로 경로("/")에 매핑
 * - 도메인 로직 없음: 순수 프레젠테이션 + 온보딩 안내
 *
 * 구성:
 * 1. Hero 영역: 프로젝트 목적 및 간단 소개
 * 2. 특징(Features) 목록: 현재 구조/의도
 * 3. 다음 단계(Next Steps): 권장 발전 방향
 *
 * 접근성:
 * - h1은 페이지 내 단 한 번 사용 (문서 제목 역할)
 * - 목록/구조는 시멘틱 태그 사용 (ul/ol/section)
 */
export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      {/* Hero / 소개 */}
      <section aria-labelledby="home-hero-title" className="space-y-3">
        <h1
          id="home-hero-title"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Super UI 시작 화면
        </h1>
        <p className="text-sm leading-relaxed text-gray-600">
          이 프로젝트는 확장성과 유지보수성을 고려한 구조(FSD 방향성)를 점진적으로
          도입하기 위한 베이스 코드입니다. 복잡한 의존성을 서둘러 추가하지 않고
          “필요할 때 확장”하는 전략을 따릅니다.
        </p>
      </section>

      {/* 현재 구조 요약 */}
      <section
        aria-labelledby="home-structure-title"
        className="space-y-4 rounded-lg border border-dashed border-gray-300 bg-white/70 p-6 shadow-sm"
      >
        <h2
          id="home-structure-title"
          className="text-lg font-semibold text-gray-800"
        >
          현재 포함된 구조
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            widgets/layout: 전역 레이아웃(AppLayout) – children 주입 방식
          </li>
          <li>pages/home, pages/about: 페이지 단위 컴포넌트 분리</li>
          <li>
            docs/COMMENT_GUIDELINES_KO.md: 주석/문서 한글화 가이드 (팀 규칙)
          </li>
          <li>향후 라우터 도입을 위한 최소 진입점(App.tsx) 단순화</li>
          <li>Tailwind 유틸리티 기반 빠른 스타일 구성</li>
        </ul>
      </section>

      {/* 특징 / 철학 */}
      <section
        aria-labelledby="home-philosophy-title"
        className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2
          id="home-philosophy-title"
          className="text-lg font-semibold text-gray-800"
        >
          설계 철학 (요약)
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>
            <span className="font-medium text-gray-800">
              점진적 확장 (Progressive Adoption)
            </span>
            : 복잡한 아키텍처(모듈 구조, 전역 상태, 다국어 등)는 “필요 시” 추가
          </li>
          <li>
            <span className="font-medium text-gray-800">
              명확한 책임 분리
            </span>
            : Layout 은 프레임, Page 는 컨텐츠, Feature 는 행동 단위
          </li>
          <li>
            <span className="font-medium text-gray-800">
              도메인 독립성 확보
            </span>
            : UI 레이어와 로직/모델 분리를 위한 사전 토대
          </li>
          <li>
            <span className="font-medium text-gray-800">
              주석/문서 표준화
            </span>
            : 유지보수·온보딩 속도 향상 (한글 주석 컨벤션)
          </li>
        </ol>
      </section>

      {/* 다음 단계 */}
      <section
        aria-labelledby="home-next-title"
        className="space-y-4 rounded-lg border border-indigo-200 bg-indigo-50/60 p-6 shadow-sm"
      >
        <h2
          id="home-next-title"
            className="text-lg font-semibold text-indigo-700"
        >
          추천 다음 단계
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-indigo-800">
          <li>React Router 또는 TanStack Router 도입</li>
          <li>디렉토리 정교화: entities / features / shared 분리</li>
          <li>공용 UI 컴포넌트 계층(shared/ui 또는 components) 정의</li>
          <li>테마/다국어(i18n) 전략 기초 결정</li>
          <li>테스트 도입: 유틸 → 컴포넌트 → 통합 순</li>
          <li>빌드/품질 자동화(CI, lint, type-check, preview 배포)</li>
        </ul>
        <p className="text-[13px] text-indigo-600">
          “지금 반드시 필요하지 않은 것”은 과감히 미루되,
          <span className="font-medium">
            &nbsp;미룬 이유와 기준은 문서화
          </span>
          한다.
        </p>
      </section>

      {/* 푸터 / 안내 */}
      <footer className="border-t pt-4">
        <p className="text-xs text-gray-500">
          이 화면은 향후 대시보드 / 온보딩 / 공지 영역 등으로 대체 가능. 레이아웃
          구조를 깨지 않는 선에서 자유롭게 확장.
        </p>
      </footer>
    </div>
  );
}
