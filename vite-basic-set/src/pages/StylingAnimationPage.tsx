import type React from "react";
import { Palette, Zap, Sparkles, Layers, Play, Settings } from "lucide-react";

export const StylingAnimationPage: React.FC = () => {
  const stylingLibraries = [
    {
      name: "Tailwind CSS",
      category: "CSS 프레임워크",
      description: "유틸리티 우선 CSS 프레임워크",
      features: ["유틸리티 클래스", "반응형 디자인", "다크 모드", "커스텀 테마"],
      complexity: "쉬움",
      bundleSize: "~50KB (압축)",
      performance: "우수",
      viteSupport: "완벽",
      learningCurve: "낮음",
      website: "https://tailwindcss.com/",
      installCommand: "npm install -D tailwindcss postcss autoprefixer",
      pros: ["빠른 개발", "일관성", "커스터마이징", "작은 용량"],
      cons: ["HTML 복잡", "학습 필요"],
      rating: 5,
      useCases: ["모든 프로젝트", "프로토타이핑", "디자인 시스템"]
    },
    {
      name: "styled-components",
      category: "CSS-in-JS",
      description: "React용 CSS-in-JS 라이브러리",
      features: ["컴포넌트 기반", "동적 스타일", "테마 지원", "SSR"],
      complexity: "보통",
      bundleSize: "~40KB",
      performance: "보통",
      viteSupport: "우수",
      learningCurve: "보통",
      website: "https://styled-components.com/",
      installCommand: "npm install styled-components",
      pros: ["컴포넌트 범위", "JavaScript 로직", "동적 스타일"],
      cons: ["런타임 오버헤드", "번들 크기"],
      rating: 4,
      useCases: ["컴포넌트 라이브러리", "복잡한 스타일링"]
    },
    {
      name: "Emotion",
      category: "CSS-in-JS",
      description: "성능에 최적화된 CSS-in-JS 라이브러리",
      features: ["빠른 성능", "서버 렌더링", "소스맵", "캐싱"],
      complexity: "보통",
      bundleSize: "~25KB",
      performance: "우수",
      viteSupport: "우수",
      learningCurve: "보통",
      website: "https://emotion.sh/",
      installCommand: "npm install @emotion/react @emotion/styled",
      pros: ["좋은 성능", "작은 크기", "TypeScript"],
      cons: ["설정 복잡", "생태계"],
      rating: 4,
      useCases: ["성능 중요 프로젝트", "라이브러리 개발"]
    }
  ];

  const animationLibraries = [
    {
      name: "Framer Motion",
      category: "React 애니메이션",
      description: "React용 프로덕션 준비된 모션 라이브러리",
      features: ["선언적 API", "제스처", "레이아웃 애니메이션", "SVG 애니메이션"],
      complexity: "보통",
      bundleSize: "~100KB",
      performance: "우수",
      viteSupport: "완벽",
      learningCurve: "보통",
      website: "https://www.framer.com/motion/",
      installCommand: "npm install framer-motion",
      pros: ["강력한 기능", "좋은 문서", "React 친화적"],
      cons: ["용량 큰 편", "학습 곡선"],
      rating: 5,
      useCases: ["마이크로 인터랙션", "페이지 전환", "복잡한 애니메이션"]
    },
    {
      name: "React Spring",
      category: "물리 기반 애니메이션",
      description: "스프링 물리학 기반 애니메이션 라이브러리",
      features: ["물리 기반", "Hooks API", "크로스 플랫폼", "성능 최적화"],
      complexity: "어려움",
      bundleSize: "~80KB",
      performance: "우수",
      viteSupport: "우수",
      learningCurve: "높음",
      website: "https://www.react-spring.dev/",
      installCommand: "npm install @react-spring/web",
      pros: ["자연스러운 애니메이션", "성능", "유연성"],
      cons: ["복잡한 API", "학습 어려움"],
      rating: 4,
      useCases: ["자연스러운 모션", "복잡한 상호작용"]
    },
    {
      name: "React Transition Group",
      category: "전환 애니메이션",
      description: "React 컴포넌트 전환 관리",
      features: ["라이프사이클 관리", "CSS 전환", "컴포넌트 래핑", "간단한 API"],
      complexity: "쉬움",
      bundleSize: "~15KB",
      performance: "우수",
      viteSupport: "완벽",
      learningCurve: "낮음",
      website: "https://reactcommunity.org/react-transition-group/",
      installCommand: "npm install react-transition-group",
      pros: ["가벼움", "간단함", "안정적"],
      cons: ["기본 기능만", "제한적"],
      rating: 3,
      useCases: ["간단한 전환", "모달/토스트", "목록 애니메이션"]
    },
    {
      name: "Lottie React",
      category: "애니메이션 파일",
      description: "After Effects 애니메이션을 웹에서 렌더링",
      features: ["벡터 애니메이션", "After Effects", "인터랙션", "최적화"],
      complexity: "쉬움",
      bundleSize: "~50KB",
      performance: "우수",
      viteSupport: "우수",
      learningCurve: "낮음",
      website: "https://lottiefiles.com/",
      installCommand: "npm install lottie-react",
      pros: ["고품질 애니메이션", "디자이너 협업", "작은 파일"],
      cons: ["디자인 툴 필요", "제한적 제어"],
      rating: 4,
      useCases: ["로딩 애니메이션", "아이콘 애니메이션", "일러스트"]
    },
    {
      name: "Auto-Animate",
      category: "자동 애니메이션",
      description: "자동으로 레이아웃 변경을 애니메이션화",
      features: ["자동 감지", "제로 설정", "크로스 플랫폼", "경량"],
      complexity: "매우 쉬움",
      bundleSize: "~5KB",
      performance: "우수",
      viteSupport: "완벽",
      learningCurve: "매우 낮음",
      website: "https://auto-animate.formkit.com/",
      installCommand: "npm install @formkit/auto-animate",
      pros: ["설정 불요", "매우 가벼움", "즉시 사용"],
      cons: ["제한적 제어", "기본 애니메이션만"],
      rating: 4,
      useCases: ["목록 변경", "레이아웃 이동", "간단한 전환"]
    }
  ];

  const getAllLibraries = () => [...stylingLibraries, ...animationLibraries];

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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "매우 쉬움": return "bg-emerald-50 text-emerald-700";
      case "쉬움": return "bg-green-50 text-green-700";
      case "보통": return "bg-yellow-50 text-yellow-700";
      case "어려움": return "bg-red-50 text-red-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "우수": return "bg-green-50 text-green-700";
      case "보통": return "bg-yellow-50 text-yellow-700";
      case "낮음": return "bg-red-50 text-red-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              스타일링 & 애니메이션 분류
            </h2>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    CSS 프레임워크
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Tailwind CSS, Bootstrap 등
                </p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    CSS-in-JS
                  </span>
                </div>
                <p className="text-xs text-green-700">
                  styled-components, Emotion
                </p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    React 애니메이션
                  </span>
                </div>
                <p className="text-xs text-purple-700">
                  Framer Motion, React Spring
                </p>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">
                    특수 애니메이션
                  </span>
                </div>
                <p className="text-xs text-orange-700">
                  Lottie, Auto-Animate
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">추천 조합</h3>
            <div className="space-y-3 text-sm">
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">기본 조합</div>
                <div className="text-gray-600">Tailwind CSS + Framer Motion</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">고급 조합</div>
                <div className="text-gray-600">Tailwind + React Spring + Lottie</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">간단 조합</div>
                <div className="text-gray-600">Tailwind + Auto-Animate</div>
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
              스타일링 & 애니메이션
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              React + Vite + Tailwind CSS 환경에서 활용할 수 있는 스타일링 도구와 애니메이션 라이브러리를 소개합니다.
            </p>
          </div>

          {/* 통합 비교 테이블 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">라이브러리</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">카테고리</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">복잡도</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">번들 크기</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">성능</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vite 지원</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">학습 곡선</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">평점</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getAllLibraries().map((lib, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{lib.name}</div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{lib.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          lib.category.includes('CSS') ? 'bg-blue-50 text-blue-700' :
                          lib.category.includes('CSS-in-JS') ? 'bg-green-50 text-green-700' :
                          lib.category.includes('React') ? 'bg-purple-50 text-purple-700' :
                          'bg-orange-50 text-orange-700'
                        }`}>
                          {lib.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${getComplexityColor(lib.complexity)}`}>
                          {lib.complexity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lib.bundleSize}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${getPerformanceColor(lib.performance)}`}>
                          {lib.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${getPerformanceColor(lib.viteSupport)}`}>
                          {lib.viteSupport}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${getComplexityColor(lib.learningCurve)}`}>
                          {lib.learningCurve}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {getRatingStars(lib.rating)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 스타일링 라이브러리 상세 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">스타일링 도구</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stylingLibraries.map((lib, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{lib.name}</h3>
                      <p className="text-gray-600 mb-3">{lib.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          {lib.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {getRatingStars(lib.rating)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">주요 기능</h4>
                      <ul className="space-y-1">
                        {lib.features.slice(0, 3).map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">사용 사례</h4>
                      <ul className="space-y-1">
                        {lib.useCases.map((useCase, uIndex) => (
                          <li key={uIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">설치 명령어</h4>
                    <code className="text-sm text-gray-800 bg-white px-3 py-1 rounded border block">
                      {lib.installCommand}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 애니메이션 라이브러리 상세 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">애니메이션 라이브러리</h2>
            <div className="space-y-6">
              {animationLibraries.map((lib, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{lib.name}</h3>
                        <div className="flex items-center gap-1">
                          {getRatingStars(lib.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{lib.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">카테고리</div>
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                            {lib.category}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">복잡도</div>
                          <span className={`px-3 py-1 text-sm rounded-full ${getComplexityColor(lib.complexity)}`}>
                            {lib.complexity}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">번들 크기</div>
                          <div className="text-sm text-gray-900">{lib.bundleSize}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">성능</div>
                          <span className={`px-3 py-1 text-sm rounded-full ${getPerformanceColor(lib.performance)}`}>
                            {lib.performance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">주요 기능</h4>
                      <ul className="space-y-2">
                        {lib.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <Play className="w-3 h-3 text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">장점</h4>
                      <ul className="space-y-2">
                        {lib.pros.map((pro, pIndex) => (
                          <li key={pIndex} className="flex items-center gap-2 text-sm text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">사용 사례</h4>
                      <ul className="space-y-2">
                        {lib.useCases.map((useCase, uIndex) => (
                          <li key={uIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">설치 명령어</h4>
                    <code className="text-sm text-gray-800 bg-white px-3 py-2 rounded border block">
                      {lib.installCommand}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 실제 사용 예제 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">실전 조합 예제</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 추천 스택</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Palette className="w-8 h-8 p-2 bg-blue-100 rounded-lg text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">Tailwind CSS</div>
                      <div className="text-sm text-gray-600">스타일링</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 p-2 bg-purple-100 rounded-lg text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">Framer Motion</div>
                      <div className="text-sm text-gray-600">애니메이션</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-2">설치 명령어:</div>
                    <code className="text-sm">npm install framer-motion</code>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">고급 개발자용</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Layers className="w-8 h-8 p-2 bg-green-100 rounded-lg text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Tailwind + Emotion</div>
                      <div className="text-sm text-gray-600">하이브리드 스타일링</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 p-2 bg-orange-100 rounded-lg text-orange-600" />
                    <div>
                      <div className="font-medium text-gray-900">React Spring</div>
                      <div className="text-sm text-gray-600">물리 기반 애니메이션</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-2">더 많은 제어와 커스터마이징</div>
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

export default StylingAnimationPage;
