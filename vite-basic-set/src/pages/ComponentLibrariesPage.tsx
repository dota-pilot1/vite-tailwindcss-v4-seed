import type React from "react";
import { Code2, Package, Star, Download, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

export const ComponentLibrariesPage: React.FC = () => {
  const componentLibraries = [
    {
      name: "Headless UI",
      category: "Headless 컴포넌트",
      description: "완전히 스타일이 없는 접근성 우선 UI 컴포넌트",
      features: ["완벽한 접근성", "키보드 네비게이션", "포커스 관리", "ARIA 속성"],
      popularity: "매우 높음",
      size: "~150KB",
      react: true,
      typescript: true,
      tailwind: true,
      license: "MIT",
      website: "https://headlessui.com/",
      installCommand: "npm install @headlessui/react",
      pros: ["완벽한 접근성", "Tailwind 친화적", "가벼운 용량"],
      cons: ["스타일링 필요", "학습 곡선"],
      rating: 5
    },
    {
      name: "Radix UI",
      category: "Headless 컴포넌트",
      description: "저수준 UI 프리미티브 컬렉션",
      features: ["WAI-ARIA 호환", "키보드 지원", "모듈형 구조", "타입스크립트"],
      popularity: "높음",
      size: "~200KB",
      react: true,
      typescript: true,
      tailwind: true,
      license: "MIT",
      website: "https://www.radix-ui.com/",
      installCommand: "npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu",
      pros: ["모듈형 설치", "뛰어난 접근성", "활발한 커뮤니티"],
      cons: ["개별 설치 필요", "복잡한 API"],
      rating: 5
    },
    {
      name: "shadcn/ui",
      category: "Copy & Paste 컴포넌트",
      description: "Radix UI와 Tailwind CSS로 구축된 재사용 가능한 컴포넌트",
      features: ["복사 붙여넣기", "커스터마이징", "일관된 디자인", "TypeScript"],
      popularity: "매우 높음",
      size: "설치에 따라 다름",
      react: true,
      typescript: true,
      tailwind: true,
      license: "MIT",
      website: "https://ui.shadcn.com/",
      installCommand: "npx shadcn-ui@latest init",
      pros: ["즉시 커스터마이징", "코드 소유권", "모던 디자인"],
      cons: ["수동 업데이트", "의존성 관리"],
      rating: 5
    },
    {
      name: "Material-UI (MUI)",
      category: "완성형 컴포넌트",
      description: "Google Material Design을 구현한 React 컴포넌트 라이브러리",
      features: ["Material Design", "테마 시스템", "Rich 컴포넌트", "Data Grid"],
      popularity: "매우 높음",
      size: "~1.2MB",
      react: true,
      typescript: true,
      tailwind: false,
      license: "MIT",
      website: "https://mui.com/",
      installCommand: "npm install @mui/material @emotion/react @emotion/styled",
      pros: ["풍부한 컴포넌트", "안정적", "엔터프라이즈 준비"],
      cons: ["큰 용량", "커스터마이징 제한"],
      rating: 4
    },
    {
      name: "Ant Design",
      category: "완성형 컴포넌트",
      description: "엔터프라이즈급 UI 디자인 언어와 React 컴포넌트",
      features: ["40+ 컴포넌트", "국제화", "테마 커스터마이징", "TypeScript"],
      popularity: "높음",
      size: "~1.5MB",
      react: true,
      typescript: true,
      tailwind: false,
      license: "MIT",
      website: "https://ant.design/",
      installCommand: "npm install antd",
      pros: ["완성도 높은 컴포넌트", "좋은 문서화", "빠른 개발"],
      cons: ["중국 스타일", "큰 번들 사이즈"],
      rating: 4
    },
    {
      name: "Chakra UI",
      category: "완성형 컴포넌트",
      description: "단순하고 모듈형이며 접근성을 갖춘 컴포넌트 라이브러리",
      features: ["Dark 모드", "반응형", "접근성", "테마 시스템"],
      popularity: "높음",
      size: "~800KB",
      react: true,
      typescript: true,
      tailwind: false,
      license: "MIT",
      website: "https://chakra-ui.com/",
      installCommand: "npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion",
      pros: ["사용 편의성", "좋은 기본값", "개발자 경험"],
      cons: ["디자인 제한", "CSS-in-JS 의존"],
      rating: 4
    },
    {
      name: "React Bootstrap",
      category: "완성형 컴포넌트",
      description: "Bootstrap을 React 컴포넌트로 재구성한 라이브러리",
      features: ["Bootstrap 디자인", "반응형 그리드", "익숙한 API", "테마"],
      popularity: "중간",
      size: "~600KB",
      react: true,
      typescript: true,
      tailwind: false,
      license: "MIT",
      website: "https://react-bootstrap.github.io/",
      installCommand: "npm install react-bootstrap bootstrap",
      pros: ["Bootstrap 친숙함", "안정적", "많은 테마"],
      cons: ["구식 디자인", "제한된 모던함"],
      rating: 3
    },
    {
      name: "Mantine",
      category: "완성형 컴포넌트",
      description: "풍부한 기능을 가진 React 컴포넌트와 훅 라이브러리",
      features: ["100+ 컴포넌트", "Dark 테마", "Form 관리", "Hooks"],
      popularity: "중간",
      size: "~900KB",
      react: true,
      typescript: true,
      tailwind: false,
      license: "MIT",
      website: "https://mantine.dev/",
      installCommand: "npm install @mantine/core @mantine/hooks",
      pros: ["풍부한 기능", "훅 라이브러리", "좋은 문서"],
      cons: ["학습 곡선", "상대적으로 새로움"],
      rating: 4
    }
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              컴포넌트 라이브러리 분류
            </h2>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Headless UI
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  스타일이 없는 로직만 제공하는 컴포넌트
                </p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    완성형 UI
                  </span>
                </div>
                <p className="text-xs text-green-700">
                  스타일이 완성된 즉시 사용 가능한 컴포넌트
                </p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    Copy & Paste
                  </span>
                </div>
                <p className="text-xs text-purple-700">
                  코드를 복사해서 프로젝트에 직접 추가
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">선택 기준</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>프로젝트 요구사항</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>커스터마이징 필요도</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>번들 크기 고려</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>팀 경험과 선호도</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              UI 컴포넌트 라이브러리
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              React + TypeScript + Tailwind CSS 환경에서 활용할 수 있는 주요 컴포넌트 라이브러리들을 비교 분석합니다.
            </p>
          </div>

          {/* 라이브러리 비교 테이블 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">라이브러리</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">분류</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">인기도</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">크기</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">TypeScript</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tailwind</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">평점</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">링크</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {componentLibraries.map((lib, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{lib.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{lib.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          lib.category === 'Headless 컴포넌트' ? 'bg-blue-50 text-blue-700' :
                          lib.category === '완성형 컴포넌트' ? 'bg-green-50 text-green-700' :
                          'bg-purple-50 text-purple-700'
                        }`}>
                          {lib.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          lib.popularity === '매우 높음' ? 'bg-red-50 text-red-700' :
                          lib.popularity === '높음' ? 'bg-orange-50 text-orange-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          {lib.popularity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lib.size}</td>
                      <td className="px-6 py-4">
                        {lib.typescript ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {lib.tailwind ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {getRatingStars(lib.rating)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={lib.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 상세 카드 섹션 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">상세 비교</h2>

            {componentLibraries.slice(0, 3).map((lib, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{lib.name}</h3>
                    <p className="text-gray-600 mb-4">{lib.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(lib.rating)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">주요 기능</h4>
                    <ul className="space-y-1">
                      {lib.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">장점</h4>
                    <ul className="space-y-1">
                      {lib.pros.map((pro, pIndex) => (
                        <li key={pIndex} className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">단점</h4>
                    <ul className="space-y-1">
                      {lib.cons.map((con, cIndex) => (
                        <li key={cIndex} className="flex items-center gap-2 text-sm text-red-700">
                          <AlertCircle className="w-3 h-3" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">설치 명령어</h4>
                  <code className="text-sm text-gray-800 bg-white px-3 py-2 rounded border">
                    {lib.installCommand}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* 추천 조합 */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">권장 조합</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">최대 유연성</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">Headless UI + Tailwind CSS</div>
                  <div className="text-sm text-gray-600">또는</div>
                  <div className="text-sm text-gray-600">Radix UI + Tailwind CSS</div>
                </div>
                <p className="text-sm text-gray-600">
                  완전한 디자인 제어와 접근성을 모두 확보할 수 있는 조합입니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">빠른 개발</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">shadcn/ui</div>
                  <div className="text-sm text-gray-600">또는</div>
                  <div className="text-sm text-gray-600">Material-UI (MUI)</div>
                </div>
                <p className="text-sm text-gray-600">
                  즉시 사용 가능한 컴포넌트로 빠르게 프로토타입을 구축할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrariesPage;
