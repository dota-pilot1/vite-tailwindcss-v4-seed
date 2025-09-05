import type React from "react";
import { useState } from "react";

type ChallengeType = "fullstack" | "callcenter";

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty:
    | "초급"
    | "중급"
    | "고급"
    | "Level 1"
    | "Level 2"
    | "Level 3"
    | "Level 4"
    | "Level 5";
  category: string;
  techStack: string[];
  estimatedDays: number;
  resources: string[];
  type: ChallengeType;
}

// 풀스택 개발자 도전 과제 (80개 - 간략화된 버전)
const FULLSTACK_CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "간단한 Todo 리스트 앱",
    description: "CRUD 기능을 포함한 기본적인 할 일 관리 애플리케이션",
    difficulty: "초급",
    category: "기초 웹앱",
    techStack: ["HTML", "CSS", "JavaScript", "Local Storage"],
    estimatedDays: 3,
    resources: ["MDN JavaScript 가이드", "DOM 조작 튜토리얼"],
    type: "fullstack",
  },
  {
    id: 2,
    title: "React 기반 Todo 앱",
    description: "React Hook과 Context API를 활용한 상태관리 Todo 애플리케이션",
    difficulty: "중급",
    category: "React 앱",
    techStack: ["React", "React Hooks", "Context API", "CSS Modules"],
    estimatedDays: 10,
    resources: ["React 공식 문서", "Hook 패턴 가이드"],
    type: "fullstack",
  },
  {
    id: 3,
    title: "마이크로서비스 아키텍처",
    description: "Spring Boot + NestJS를 활용한 이상적인 MSA 구조 설계",
    difficulty: "고급",
    category: "백엔드 & MSA",
    techStack: ["Spring Boot", "NestJS", "API Gateway", "Service Mesh", "gRPC"],
    estimatedDays: 56,
    resources: [
      "MSA 설계 패턴",
      "Spring Cloud 가이드",
      "NestJS 마이크로서비스 문서",
    ],
    type: "fullstack",
  },
];

// 콜센터 코어 시스템 도전 과제 (50개)
const CALLCENTER_CHALLENGES: Challenge[] = [
  // Level 1 - 기초 콜센터 시스템 (1-10)
  {
    id: 1,
    title: "기본 PBX 시스템 구축",
    description:
      "FreePBX를 활용한 기본적인 Private Branch Exchange 시스템 설치 및 설정",
    difficulty: "Level 1",
    category: "PBX 기초",
    techStack: ["FreePBX", "Asterisk", "SIP", "Linux", "VoIP"],
    estimatedDays: 7,
    resources: [
      "FreePBX 설치 가이드",
      "Asterisk 기본 설정",
      "SIP 프로토콜 이해",
    ],
    type: "callcenter",
  },
  {
    id: 2,
    title: "SIP 트렁크 연동 설정",
    description: "VoIP 서비스 제공업체와 SIP 트렁크 연결 및 통화 테스트",
    difficulty: "Level 1",
    category: "연결성",
    techStack: ["SIP Trunk", "NAT", "Firewall", "SIP Provider"],
    estimatedDays: 4,
    resources: ["SIP 트렁크 설정 가이드", "NAT 구성", "VoIP 네트워크 기초"],
    type: "callcenter",
  },
  {
    id: 3,
    title: "기본 IVR 메뉴 구축",
    description:
      "Interactive Voice Response 시스템으로 고객 자동 응답 메뉴 생성",
    difficulty: "Level 1",
    category: "IVR",
    techStack: ["Asterisk Dialplan", "Audio Files", "IVR Menu", "Call Flow"],
    estimatedDays: 5,
    resources: [
      "Asterisk Dialplan 가이드",
      "IVR 설계 원칙",
      "오디오 파일 처리",
    ],
    type: "callcenter",
  },

  // Level 2 - 중급 콜센터 기능 (11-20)
  {
    id: 11,
    title: "고급 IVR 스크립트 엔진",
    description: "조건부 분기와 데이터베이스 연동이 가능한 동적 IVR 시스템",
    difficulty: "Level 2",
    category: "IVR 고급",
    techStack: ["AGI Scripts", "Database Integration", "Conditional Logic"],
    estimatedDays: 12,
    resources: ["AGI 프로그래밍", "데이터베이스 연동", "복잡한 콜 플로우"],
    type: "callcenter",
  },
  {
    id: 12,
    title: "ACD (Automatic Call Distribution)",
    description: "상담원 스킬, 우선순위, 로드밸런싱을 고려한 지능형 통화 분배",
    difficulty: "Level 2",
    category: "통화 분배",
    techStack: ["Call Routing", "Skill-based Routing", "Load Balancing"],
    estimatedDays: 15,
    resources: ["ACD 알고리즘", "스킬 기반 라우팅", "통화 분배 전략"],
    type: "callcenter",
  },

  // Level 3 - 고급 콜센터 시스템 (21-30)
  {
    id: 21,
    title: "지능형 음성 봇 (IVR Bot)",
    description: "자연어 처리와 음성 인식을 결합한 대화형 IVR 시스템",
    difficulty: "Level 3",
    category: "AI 음성봇",
    techStack: ["NLP", "ASR", "TTS", "Dialog Management", "Machine Learning"],
    estimatedDays: 35,
    resources: ["음성인식 엔진", "자연어처리", "대화 관리 시스템"],
    type: "callcenter",
  },
  {
    id: 22,
    title: "실시간 감정 분석 시스템",
    description: "통화 중 고객 감정 상태를 실시간으로 분석하여 상담원에게 알림",
    difficulty: "Level 3",
    category: "AI 분석",
    techStack: [
      "Emotion Analysis",
      "Real-time Processing",
      "ML Models",
      "Alert System",
    ],
    estimatedDays: 28,
    resources: ["감정 인식 모델", "실시간 분석", "머신러닝 파이프라인"],
    type: "callcenter",
  },

  // Level 4 - 엔터프라이즈 급 (31-40)
  {
    id: 31,
    title: "하이브리드 클라우드 콜센터",
    description: "온프레미스와 클라우드를 결합한 하이브리드 아키텍처",
    difficulty: "Level 4",
    category: "하이브리드 클라우드",
    techStack: [
      "Hybrid Architecture",
      "Private/Public Cloud",
      "Data Governance",
      "Security",
    ],
    estimatedDays: 60,
    resources: ["하이브리드 아키텍처", "데이터 거버넌스", "보안 정책"],
    type: "callcenter",
  },
  {
    id: 32,
    title: "대규모 트래픽 처리 시스템",
    description: "동시 10,000+ 통화를 처리할 수 있는 초대규모 콜센터 인프라",
    difficulty: "Level 4",
    category: "대규모 처리",
    techStack: [
      "Load Balancing",
      "Distributed Architecture",
      "High Availability",
      "Performance Tuning",
    ],
    estimatedDays: 70,
    resources: ["분산 아키텍처", "고가용성 설계", "성능 최적화"],
    type: "callcenter",
  },

  // Level 5 - 연구개발/미래기술 (41-50)
  {
    id: 41,
    title: "AGI 기반 완전 자동 콜센터",
    description:
      "AGI(Artificial General Intelligence)를 활용한 완전 자동화된 콜센터",
    difficulty: "Level 5",
    category: "AGI",
    techStack: [
      "AGI",
      "Autonomous AI",
      "Self-learning Systems",
      "Cognitive Computing",
    ],
    estimatedDays: 120,
    resources: ["AGI 기술", "인지 컴퓨팅", "자율 학습 시스템"],
    type: "callcenter",
  },
  {
    id: 50,
    title: "콜센터 특이점 시스템",
    description: "기술적 특이점에 도달한 초지능 콜센터 시스템",
    difficulty: "Level 5",
    category: "특이점",
    techStack: [
      "Technological Singularity",
      "Superintelligence",
      "Recursive Self-improvement",
    ],
    estimatedDays: 500,
    resources: ["기술적 특이점", "초지능", "재귀적 자기 개선"],
    type: "callcenter",
  },
];

const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
  switch (difficulty) {
    case "초급":
      return "bg-green-100 text-green-800 border-green-200";
    case "중급":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "고급":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "Level 1":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Level 2":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "Level 3":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Level 4":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "Level 5":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const ChallengeTable: React.FC<{
  challenges: Challenge[];
  title: string;
  description: string;
}> = ({ challenges, title, description }) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  과제명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                  설명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                  기술 스택
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  참고 자료
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <tr
                  key={challenge.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {challenge.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    <div className="max-w-xs">{challenge.title}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div className="max-w-md leading-relaxed">
                      {challenge.description}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {challenge.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {challenge.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {challenge.estimatedDays}일
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      <ul className="space-y-1">
                        {challenge.resources.map((resource, idx) => (
                          <li key={idx} className="text-xs leading-relaxed">
                            • {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlanPage: React.FC = () => {
  const [challengeType, setChallengeType] =
    useState<ChallengeType>("fullstack");
  const [activeTab, setActiveTab] = useState<string>("all");

  // 현재 선택된 타입에 따른 과제 배열
  const currentChallenges =
    challengeType === "fullstack"
      ? FULLSTACK_CHALLENGES
      : CALLCENTER_CHALLENGES;

  // 풀스택 과제 필터링
  const beginnerChallenges = currentChallenges.filter(
    (c) => c.difficulty === "초급",
  );
  const intermediateChallenges = currentChallenges.filter(
    (c) => c.difficulty === "중급",
  );
  const advancedChallenges = currentChallenges.filter(
    (c) => c.difficulty === "고급",
  );

  // 콜센터 과제 필터링
  const level1Challenges = currentChallenges.filter(
    (c) => c.difficulty === "Level 1",
  );
  const level2Challenges = currentChallenges.filter(
    (c) => c.difficulty === "Level 2",
  );
  const level3Challenges = currentChallenges.filter(
    (c) => c.difficulty === "Level 3",
  );
  const level4Challenges = currentChallenges.filter(
    (c) => c.difficulty === "Level 4",
  );
  const level5Challenges = currentChallenges.filter(
    (c) => c.difficulty === "Level 5",
  );

  const getFilteredChallenges = () => {
    if (challengeType === "fullstack") {
      switch (activeTab) {
        case "초급":
          return beginnerChallenges;
        case "중급":
          return intermediateChallenges;
        case "고급":
          return advancedChallenges;
        default:
          return currentChallenges;
      }
    } else {
      switch (activeTab) {
        case "Level 1":
          return level1Challenges;
        case "Level 2":
          return level2Challenges;
        case "Level 3":
          return level3Challenges;
        case "Level 4":
          return level4Challenges;
        case "Level 5":
          return level5Challenges;
        default:
          return currentChallenges;
      }
    }
  };

  const TabButton: React.FC<{
    tab: string;
    label: string;
    count: number;
  }> = ({ tab, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label} ({count})
    </button>
  );

  const getTabButtons = () => {
    if (challengeType === "fullstack") {
      return (
        <>
          <TabButton tab="all" label="전체" count={currentChallenges.length} />
          <TabButton
            tab="초급"
            label="초급"
            count={beginnerChallenges.length}
          />
          <TabButton
            tab="중급"
            label="중급"
            count={intermediateChallenges.length}
          />
          <TabButton
            tab="고급"
            label="고급"
            count={advancedChallenges.length}
          />
        </>
      );
    } else {
      return (
        <>
          <TabButton tab="all" label="전체" count={currentChallenges.length} />
          <TabButton
            tab="Level 1"
            label="Level 1"
            count={level1Challenges.length}
          />
          <TabButton
            tab="Level 2"
            label="Level 2"
            count={level2Challenges.length}
          />
          <TabButton
            tab="Level 3"
            label="Level 3"
            count={level3Challenges.length}
          />
          <TabButton
            tab="Level 4"
            label="Level 4"
            count={level4Challenges.length}
          />
          <TabButton
            tab="Level 5"
            label="Level 5"
            count={level5Challenges.length}
          />
        </>
      );
    }
  };

  const handleChallengeTypeChange = (newType: ChallengeType) => {
    setChallengeType(newType);
    setActiveTab("all");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            개발자 도전 과제 플랫폼
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            풀스택 웹개발부터 콜센터 코어 시스템까지, 전문 기술을 단계별로
            마스터하세요.
          </p>

          {/* 도전 과제 타입 선택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              도전 과제 유형 선택
            </label>
            <select
              value={challengeType}
              onChange={(e) =>
                handleChallengeTypeChange(e.target.value as ChallengeType)
              }
              className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="fullstack">🚀 풀스택 개발자 도전 과제</option>
              <option value="callcenter">📞 콜센터 코어 시스템 구축</option>
            </select>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap gap-2 mb-6">{getTabButtons()}</div>
        </div>

        {/* 통계 카드 */}
        {challengeType === "fullstack" ? (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-gray-900">초급 과제</h3>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {beginnerChallenges.length}개
              </p>
              <p className="text-sm text-gray-500">기초 기술 습득</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-gray-900">중급 과제</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {intermediateChallenges.length}개
              </p>
              <p className="text-sm text-gray-500">실무 기술 확장</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-slate-500 rounded-full mr-2"></div>
                <h3 className="font-medium text-gray-900">고급 과제</h3>
              </div>
              <p className="text-2xl font-bold text-slate-600 mt-1">
                {advancedChallenges.length}개
              </p>
              <p className="text-sm text-gray-500">전문가 수준</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
              (level, idx) => {
                const levelChallenges = currentChallenges.filter(
                  (c) => c.difficulty === level,
                );
                const colors = ["emerald", "cyan", "blue", "slate", "rose"];
                const descriptions = [
                  "기초 PBX",
                  "중급 기능",
                  "AI 시스템",
                  "엔터프라이즈",
                  "미래 기술",
                ];

                return (
                  <div
                    key={level}
                    className="p-4 bg-white rounded-lg shadow-sm border"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 bg-${colors[idx]}-500 rounded-full mr-2`}
                      ></div>
                      <h3 className="font-medium text-gray-900">{level}</h3>
                    </div>
                    <p
                      className={`text-2xl font-bold text-${colors[idx]}-600 mt-1`}
                    >
                      {levelChallenges.length}개
                    </p>
                    <p className="text-sm text-gray-500">{descriptions[idx]}</p>
                  </div>
                );
              },
            )}
          </div>
        )}

        {/* 과제 테이블 또는 필터된 테이블 */}
        {activeTab === "all" ? (
          challengeType === "fullstack" ? (
            <>
              <ChallengeTable
                challenges={beginnerChallenges}
                title="🌱 초급 과제"
                description="웹 개발의 기초를 다지는 입문 수준의 프로젝트들입니다."
              />
              <ChallengeTable
                challenges={intermediateChallenges}
                title="🚀 중급 과제"
                description="React, Node.js 등 모던 웹 기술 스택을 활용한 실무 수준의 프로젝트들입니다."
              />
              <ChallengeTable
                challenges={advancedChallenges}
                title="⚡ 고급 과제"
                description="대규모 시스템 설계와 고도화된 기술을 다루는 전문가 수준의 프로젝트들입니다."
              />
            </>
          ) : (
            <>
              <ChallengeTable
                challenges={level1Challenges}
                title="📞 Level 1: 기초 콜센터 시스템"
                description="PBX 설치, SIP 트렁크, 기본 IVR 등 콜센터의 기본 구성 요소를 학습합니다."
              />
              <ChallengeTable
                challenges={level2Challenges}
                title="🔧 Level 2: 중급 콜센터 기능"
                description="ACD, CTI 연동, 실시간 모니터링 등 실무에서 필요한 고급 기능들을 구현합니다."
              />
              <ChallengeTable
                challenges={level3Challenges}
                title="🤖 Level 3: AI 기반 콜센터"
                description="음성 봇, 감정 분석, 실시간 번역 등 AI 기술이 접목된 지능형 시스템을 구축합니다."
              />
              <ChallengeTable
                challenges={level4Challenges}
                title="🏢 Level 4: 엔터프라이즈 급 시스템"
                description="대규모 트래픽 처리, 하이브리드 클라우드, 블록체인 등 기업급 기술을 적용합니다."
              />
              <ChallengeTable
                challenges={level5Challenges}
                title="🚀 Level 5: 미래 기술 연구"
                description="AGI, BCI, 홀로그램 등 차세대 기술을 활용한 혁신적인 콜센터 시스템입니다."
              />
            </>
          )
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                      과제명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                      설명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {challengeType === "fullstack" ? "난이도" : "레벨"}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                      기술 스택
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      기간
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                      참고 자료
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredChallenges().map((challenge) => (
                    <tr
                      key={challenge.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {challenge.id}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                        <div className="max-w-xs">{challenge.title}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="max-w-md leading-relaxed">
                          {challenge.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(challenge.difficulty)}`}
                        >
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {challenge.category}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {challenge.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {challenge.estimatedDays}일
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          <ul className="space-y-1">
                            {challenge.resources.map((resource, idx) => (
                              <li key={idx} className="text-xs leading-relaxed">
                                • {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 학습 가이드 */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 학습 가이드
          </h2>
          {challengeType === "fullstack" ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">초급 단계</h3>
                <p className="text-sm text-green-700">
                  웹 개발의 기초를 다지는 단계입니다.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">중급 단계</h3>
                <p className="text-sm text-blue-700">
                  실무 기술을 익히는 단계입니다.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">고급 단계</h3>
                <p className="text-sm text-slate-700">
                  전문가 수준의 기술을 습득하는 단계입니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">
                🚦 현실적인 콜센터 구축 전략
              </h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>
                  <strong>일반 중소기업:</strong> 3CX + LangChain 조합으로 80%
                  요구사항 충족 가능
                </p>
                <p>
                  <strong>중견기업:</strong> 3CX 기반 + 클라우드 확장으로 1000콜
                  대응
                </p>
                <p>
                  <strong>대기업:</strong> Level 3-4 과제로 완전 커스텀 시스템
                  구축
                </p>
                <p>
                  <strong>연구소:</strong> Level 5 미래 기술 연구 프로젝트
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
