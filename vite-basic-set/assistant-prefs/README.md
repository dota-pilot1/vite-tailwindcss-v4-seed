# Assistant Preferences: ESLint & TypeScript Rule Philosophy

목적: 이 문서는 프로젝트에서 "엄격함(quality)"과 "개발 속도 DX" 사이 균형을 어떻게 맞출지에 대한 합의(assistant / 인간 협업 기준)를 정의한다. 특히 반복적으로 질문될 수 있는 "이 규칙 너무 과한 것 아냐?" 상황에서 일관된 결정을 빠르게 내리도록 돕는다.

---
## 1. 우선순위 원칙 (Principles)
1. 오류 예방 > 스타일. (버그 가능성 / 유지비 절감에 직접 기여하는 규칙을 먼저 채택)
2. 가독성 > 개인 취향. (논쟁 많은 포맷팅은 Prettier 또는 자동화 도구에 위임)
3. 반복 발생 전 추상화 금지. (규칙도 실제 문제를 2~3회 겪은 후 강화)
4. 로컬 해결 우선. (파일 단위 disable → 합당한 사유 기록 → 필요 시 전역 정책 갱신)
5. "왜(WHY)"가 문서화된 예외만 허용. (일회성 편의성은 주석 사유 불충분)

---
## 2. 레벨 체계
| Level | 의미 | 적용 방식 | 예 |
| ----- | ---- | --------- | -- |
| hard-error | CI/빌드 중단 | TypeScript 또는 ESLint error | 타입 불일치, 사용되지 않는 실제 변수 |
| warn | 개발 중 피드백, CI 통과 | ESLint 경고 | 복잡도 높음, 추후 리팩터 대상 |
| off (documented) | 의도적 비활성 | README / decision log 기록 | 조기 최적화 방지 위해 `no-explicit-any` 완화 |
| temporary-disable | 파일/라인 국소 해제 | 주석 + 사유 | 외부 라이브러리 패치 영역 |

---
## 3. TypeScript vs ESLint 역할 구분
- TypeScript: 정적 안정성 (타입, 미사용, 흐름)
- ESLint: 패턴/안티패턴, React Hooks 규칙, import 순서 등
- 중복 금지: 동일한 문제를 TS와 ESLint가 동시에 "error"로 내지 않도록 조정 (피로도 증가 방지)

---
## 4. 현재 핵심 유지 규칙 (Keep Strict)
아래 규칙들은 개발 피로보다 유지/신뢰 비용 절감 효과가 훨씬 크므로 엄격 유지 (hard-error).
- TypeScript: `strict`, `noUnusedLocals`, `noUnusedParameters` (단, `_` prefix 예외는 ESLint 측 경고 완화)
- `react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`
- `no-fallthrough` (switch), `no-unchecked-side-effect-imports`
- 잠재적 런타임 오류 유발: `no-undef` (TS가 대부분 커버하지만 선언 안 된 전역은 즉시 실패)

---
## 5. 완화 대상 (Softened)
반복적으로 "의미보다 소음"을 만든 규칙은 경고(warn) 또는 off. (사유 포함)
| Rule | 상태 | 사유 / 메모 |
| ---- | ---- | ----------- |
| `@typescript-eslint/no-unused-vars` | warn | TS `noUnusedLocals`가 이미 error. ESLint는 `_` prefix 무시 + 안내용 메시지 |
| `@typescript-eslint/explicit-function-return-type` | off | JSX/콜백 짧은 표현식 DX 유지. 필요 시 비즈니스 core 모듈에만 opt-in |
| `@typescript-eslint/no-explicit-any` | warn | 빠른 프로토타이핑 허용, 장기 잔존 any는 린트 경고 목록에서 추적 |
| `@typescript-eslint/ban-ts-comment` | warn | 금지보단 문서화 유도. 필요시 `// @ts-expect-error (이유)` 패턴 강제 |
| `complexity` | warn | 과도한 중첩 조기 인지, 단 blocking 아님 |
| `max-lines` | off | 문서성 컴포넌트(AboutPage 등) 허용. 대신 도메인 로직은 모듈화 원칙 적용 |

---
## 6. 로컬 예외 패턴
1. 한 줄 비활성: `// eslint-disable-next-line <rule> -- <사유>`  
2. 블록:  
   ```ts
   /* eslint-disable @typescript-eslint/no-explicit-any -- 외부 스키마 파서 임시 */
   // ...코드...
   /* eslint-enable @typescript-eslint/no-explicit-any */
   ```
3. TS 기대 오류:  
   ```ts
   // @ts-expect-error: 라이브러리 타입 정의 버그 (버전 ↑ 시 제거 예정)
   someLegacyCall(legacyValue)
   ```
4. 금지: `// @ts-ignore` (사유 없는 억제) → 반드시 `@ts-expect-error` + 이유

---
## 7. `_` Prefix 컨벤션
- 사용되지 않는 매개변수/변수 허용 패턴: `_` 또는 `_context`, `_unused`.
- 목적: 인터페이스 시그니처 보존 + 구현부에서 사용 안 함을 명시.
- ESLint 설정 예 (개념):
  ```js
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }]
  ```

---
## 8. 디렉토리별 강화/완화 차별화 (향후)
| 영역 | 전략 |
| ---- | ----- |
| `src/entities/**` | 더 엄격 (any 금지, 반환 타입 명확) |
| `src/features/**` | 중간 (필요시 any, 추후 제거) |
| `src/pages/**` | 표현/조합 중심, 가장 느슨 |
| `src/widgets/**` | 재사용 레벨 → 접근성 규칙 추가 예정 |

필요 시 ESLint override 배열에 `files`/`excludedFiles` 조합으로 세분화.

---
## 9. 추천 워크플로 (Commit 전)
1. 저장 시 포맷 (Prettier or Vite plugin)
2. `npm run lint` → 경고만 남은 상태 허용 (단, 새로 추가된 경고는 PR 설명에 사유)
3. 타입 확인: `tsc -p tsconfig.app.json --noEmit`
4. 중요한 예외가 있다면 `/docs/DECISIONS.md` 또는 PR description에 기록

---
## 10. 자주 묻는 질문(FAQ)
Q. "import React from 'react'" 지워야 하나?  
A. React 17+ 자동 JSX: 필요 없음. 남겨두면 TS `noUnusedLocals` 에러. → 제거.

Q. any를 빨리 없애고 싶다?  
A. 우선 `// TODO(any-cleanup #<issue-id>): <맥락>` 주석 남기고 경고 추적. 특정 스프린트에 제거 태스크 배치.

Q. 빌드가 사소한 unused로 깨지는 게 싫다?  
A. dev 전용 tsconfig 도입 고려 (`noUnusedLocals: false`) + CI는 엄격 유지. 결정은 decision log에 남김.

Q. 경고 너무 많아졌다?  
A. 새로 추가되는 warn 수를 PR 템플릿에서 diff로 보여주는 lightweight 스크립트 추가 고려.

---
## 11. 향후 개선 아이디어
- a11y(접근성) 플러그인 도입 (`jsx-a11y`) 시 위 레벨 테이블에 반영
- 테스트 커버리지 게이팅 전 단계: 복잡도/경고 수 메트릭 대시보드화
- 규칙 변경 자동 changelog: eslint config 수정 시 pre-commit 훅으로 diff 추출

---
## 12. 빠른 체크리스트 (요약)
- 불필요한 `import React` 제거 했는가?
- `any` 사용 시 주석 이유 기록 했는가?
- 사용 안 하는 파라미터에 `_` prefix 달았는가?
- disable 주석에 반드시 사유를 적었는가?
- 경고 늘렸다면 PR 본문에 "왜"를 설명했는가?

---
유지/변경 제안 시: 작은 PR + 본문에 "현상 → 문제 → 변경안 → 트레이드오프" 4행 구조로 제출.

끝.