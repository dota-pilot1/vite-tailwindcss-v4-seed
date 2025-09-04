/**
 * AboutPage
 *
 * 프로젝트 아키텍처/철학/확장 로드맵을 한 페이지에서 문서화한 소개 컴포넌트.
 * - 목적: 온보딩 / 내부 합의 / 구조적 일관성 확보
 * - 성격: 프레젠테이션 전용 (비즈니스 로직 / API 호출 없음)
 *
 * 섹션 구성:
 * 1. 개요 (Overview)
 * 2. 목표 철학 (Principles)
 * 3. FSD 레이어 개념 정리 (Layers)
 * 4. 현재 디렉토리 역할 (Directory Roles)
 * 5. 확장 로드맵 (Roadmap)
 * 6. 코드/설계 기여 규칙 (Contribution Rules)
 * 7. 의사결정(Decision) 기록 패턴 제안
 * 8. 용어 / 표준 / 주석 가이드 참조
 *
 * 향후:
 * - 이 컴포넌트는 /pages/about 디렉토리 내 문서화 전용 UI로 유지
 * - 실제 프로덕트 단계에서는 정적 md -> 렌더(MDX) 구조로 대체 가능
 */
export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12">
      {/* 1. 개요 */}
      <Section
        id="overview"
        title="프로젝트 개요"
        description="확장성과 유지보수성을 핵심 가치로 하는 UI/프론트엔드 베이스."
      >
        <p className="text-sm leading-relaxed text-gray-700">
          이 프로젝트는 복잡한 기능을 ‘처음부터 모두 설계’하지 않고, 필요한
          시점에 구조를 ‘안전하게 계층화’할 수 있도록 최소한의 골격을
          제공합니다. 즉, &quot;서둘러 거대 구조를 강요하지 않되, 확장 순간에
          뒤틀리지 않는 뼈대&quot;를 목표로 합니다.
        </p>
      </Section>

      {/* 2. 원칙 */}
      <Section
        id="principles"
        title="핵심 설계 철학 (Principles)"
        description="의사결정 시 우선 고려하는 판단 기준."
      >
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>
            <b className="text-gray-800">점진적 도입(Incrementalism)</b>:
            필요하지 않은 계층/추상화는 뒤로 미룬다.
          </li>
          <li>
            <b className="text-gray-800">기능 중심(Feature-Oriented) 분해</b>:
            파일이 아닌 ‘역할과 책임’ 기준으로 단위화.
          </li>
          <li>
            <b className="text-gray-800">도메인 독립성</b>: UI 레이어와 도메인
            모델/로직을 분리하여 재사용성 확보.
          </li>
          <li>
            <b className="text-gray-800">의도 노출</b>: “무엇”보다 “왜”를
            주석/문서로 기록.
          </li>
          <li>
            <b className="text-gray-800">일관성 우선</b>: 완벽보다 예측가능성이
            유지보수 비용을 낮춘다.
          </li>
        </ol>
      </Section>

      {/* 3. FSD 레이어 설명 */}
      <Section
        id="layers"
        title="Feature-Sliced Design (요약)"
        description="필요 시 도입 가능한 계층적 구조 개념."
      >
        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <b>app/</b>: 전역 부트스트랩 (라우터, 글로벌 Provider, 에러
            바운더리)
          </li>
          <li>
            <b>pages/</b>: 라우트 단위 화면(페이지 스코프 상태/조합)
          </li>
          <li>
            <b>widgets/</b>: 여러 feature/page에서 재사용되는 &quot;구성
            단위&quot; (Layout, Header 등)
          </li>
          <li>
            <b>features/</b>: 사용자 액션/유즈케이스 단위 (예: 로그인, 검색,
            필터링)
          </li>
          <li>
            <b>entities/</b>: 핵심 도메인 모델(예: User, Product) + 해당 모델
            관련 로직
          </li>
          <li>
            <b>shared/</b>: 범용 유틸 / 디자인 토큰 / 훅 / 라이브러리 래퍼
          </li>
        </ul>
        <p className="mt-4 text-xs text-gray-500">
          현재 단계에서는 pages / widgets / docs 정도만 존재하며, 나머지는 필요
          시 자연스럽게 추가하는 전략을 유지한다.
        </p>
      </Section>

      {/* 4. 디렉토리 역할 */}
      <Section
        id="directories"
        title="현재 디렉토리 역할"
        description="초기 상태의 최소 골격."
      >
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead>
            <tr className="border-b text-xs uppercase tracking-wide text-gray-500">
              <th className="w-32 py-2">경로</th>
              <th className="py-2">설명</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-b-0">
            <DirRow
              path="src/widgets/layout"
              desc="전역 레이아웃(AppLayout) – children 주입 구조"
            />
            <DirRow path="src/pages/home" desc="홈 화면 (온보딩 / 구조 안내)" />
            <DirRow
              path="src/pages/about"
              desc="프로젝트 설계 철학 및 로드맵 문서화 컴포넌트"
            />
            <DirRow path="docs" desc="설명/정책/가이드 (주석 한글화 규칙 등)" />
            <DirRow
              path="src/lib"
              desc="경량 유틸 (cn, variants 등) – shared/ui 로 추후 이동 가능"
            />
          </tbody>
        </table>
      </Section>

      {/* 5. 로드맵 */}
      <Section
        id="roadmap"
        title="확장 로드맵 (제안)"
        description="우선순위는 팀 상황/비즈니스 요구에 따라 조정."
      >
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>
            라우터 도입 (React Router / TanStack Router) + 코드 스플리팅 전략
          </li>
          <li>디렉토리 계층 확장(features / entities / shared)</li>
          <li>UI 컴포넌트 토큰화(Button, Card, FormField 등 추출)</li>
          <li>
            상태 관리 도구 도입 (Zustand / Query / jotai) – 실제 교차 상태 필요
            확인 후
          </li>
          <li>API 계층 추상 (fetch wrapper + 에러 규격화)</li>
          <li>다국어(i18n) 구조 초기화 (언어 전환 전략 정의)</li>
          <li>
            테스트 도입: unit → integration → visual (Storybook/Chromatic)
          </li>
          <li>CI 파이프라인 (lint / type / 테스트 / preview deploy)</li>
          <li>성능/접근성 지표 모니터링 (Lighthouse / Web Vitals)</li>
        </ol>
      </Section>

      {/* 6. 기여 규칙 */}
      <Section
        id="contrib"
        title="코드/설계 기여 규칙 (요약)"
        description="간결하고 실행가능한 행동 원칙."
      >
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            <b>반복 출현 전 추상화 금지:</b> 3회 이상 패턴 재사용될 때 모듈화
          </li>
          <li>
            <b>주석은 ‘왜’ 중심:</b> 구현 자체 설명 대신 의도/제약/비선택 사유
          </li>
          <li>
            <b>Commit 단위 명확화:</b> “feat:, fix:, refactor:, docs:”
          </li>
          <li>
            <b>불필요한 글로벌 상태 생성 금지:</b> 하향식 props → lifting → 필요
            시 store
          </li>
          <li>
            <b>성능은 계측 후 최적화:</b> React DevTools Profiler / Web Vitals
          </li>
          <li>
            <b>실험적 도입:</b> 실험(feature flag) 명시 + 제거 기준 정의
          </li>
        </ul>
      </Section>

      {/* 7. 의사결정 기록 */}
      <Section
        id="decisions"
        title="의사결정 기록 패턴 (Decision Log)"
        description="프로젝트 맥락 전달/회귀 방지를 위한 최소 템플릿."
      >
        <pre className="overflow-auto rounded-md border bg-gray-50 p-4 text-[11px] leading-relaxed text-gray-700">
          {`# Decision: 라우터로 React Router 채택
- Date: 2025-01-05
- Context: 동적 세그먼트 + 중첩 레이아웃 필요
- Options:
  * A) react-router (중첩/에러경로 안정)
  * B) tanstack-router (타입 안전, 초기 학습)
  * C) 자체 구현 (복잡도 ↑)
- Decision: A 채택 (러닝커브 낮고 팀 경험 존재)
- Consequence:
  * 단기: 빠른 도입
  * 장기: 타입 제한 부분은 후속 마이그레이션 고려
- Review: 2025-Q2 (요구사항 증가 여부 재평가)
`}
        </pre>
        <p className="mt-3 text-xs text-gray-500">
          작은 결정도 누적되면 복잡도를 가중하므로 &quot;로그 습관화&quot;가
          비용을 낮춘다.
        </p>
      </Section>

      {/* 8. 참고 */}
      <Section id="refs" title="참고 / 표준" description="문서 및 표준 위치.">
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            주석 한글화 가이드:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[12px]">
              docs/COMMENT_GUIDELINES_KO.md
            </code>
          </li>
          <li>디렉토리 구조: 점진적 확장 후 docs/ARCHITECTURE.md 예정</li>
          <li>용어/도메인 표준: 추후 docs/TERMS_KO.md 도입</li>
          <li>테스트 전략: 초기 도입 시 docs/TEST_STRATEGY.md 추가</li>
        </ul>
      </Section>

      {/* Footer */}
      <footer className="border-t pt-6">
        <p className="text-center text-[11px] text-gray-500">
          (c) {new Date().getFullYear()} Super UI – 설계는 살아있는 문서이며,
          변경은 ‘기록’이 동반될 때 팀 자산이 된다.
        </p>
      </footer>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* 재사용 가능한 섹션 래퍼                                        */
/* --------------------------------------------------------------- */

/**
 * Section
 * - 반복되는 제목/설명/내용 레이아웃을 표준화
 * - 향후 페이지 전역 디자인 시스템으로 승격 가능
 */
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="space-y-4">
      <header className="space-y-1">
        <h2
          id={`${id}-title`}
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          {title}
        </h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </header>
      <div className="text-sm">{children}</div>
    </section>
  );
}

/**
 * DirRow
 * - 간단한 테이블 행 렌더러
 * - 구조화된 디렉토리 역할 표시에 사용
 */
function DirRow({ path, desc }: { path: string; desc: string }) {
  return (
    <tr className="border-b last:border-none">
      <td className="align-top py-2 font-mono text-xs text-indigo-600">
        {path}
      </td>
      <td className="py-2 text-[13px] text-gray-700">{desc}</td>
    </tr>
  );
}
