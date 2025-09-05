import React, { useState } from "react";
import {
  Lightbulb,
  Code,
  Globe,
  Users,
  Rocket,
  CheckCircle2,
  Target,
  Zap,
  Server,
  Database,
  Shield,
  GitBranch,
  Settings,
  Award,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface StartupIdeaPageProps {
  className?: string;
}

/**
 * StartupIdeaPage
 *
 * 창업 아이디어와 풀스택 개발의 중요성을 설명하는 모던 관리자 페이지
 * - 바이브 코딩 프로젝트 소개
 * - 풀스택 개발이 필수인 이유
 * - 기본기 요구사항
 * - 실무 검증 과정
 */
export const StartupIdeaPage: React.FC<StartupIdeaPageProps> = ({
  className,
}) => {
  const [activeSection, setActiveSection] = useState<
    "overview" | "why" | "requirements" | "validation"
  >("overview");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const fullstackSkills = [
    {
      category: "프론트엔드",
      icon: <Globe className="w-5 h-5" />,
      skills: [
        "React (or Next.js)",
        "Tailwind CSS",
        "상태관리 (Zustand/Redux)",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      category: "백엔드",
      icon: <Server className="w-5 h-5" />,
      skills: ["Spring Boot (or NestJS)", "REST/GraphQL API"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      category: "실시간 통신",
      icon: <Zap className="w-5 h-5" />,
      skills: ["WebSocket", "SSE", "이벤트 기반 아키텍처"],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      category: "데이터베이스",
      icon: <Database className="w-5 h-5" />,
      skills: ["Redis (Pub/Sub, 세션)", "RDB (Postgres/MySQL)"],
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      category: "DevOps",
      icon: <Settings className="w-5 h-5" />,
      skills: ["Docker", "CI/CD (GitHub Actions, GitLab, Jenkins)"],
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      category: "보안",
      icon: <Shield className="w-5 h-5" />,
      skills: ["JWT 인증", "OAuth2"],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
    {
      category: "협업/품질",
      icon: <GitBranch className="w-5 h-5" />,
      skills: ["Git", "린트", "테스트 코드", "Postman/Insomnia"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const whyFullstack = [
    {
      title: "스택이 정형화됨",
      description: "공부할 게 산더미가 아니라, 필수 세트가 좁혀졌음",
      icon: <Target className="w-6 h-6" />,
      detail:
        "과거에는 수십 가지 프레임워크 중 선택의 어려움이 있었지만, 현재는 업계 표준이 명확히 정립되어 학습 경로가 단순해졌습니다.",
    },
    {
      title: "레퍼런스 풍부",
      description:
        "과제 하나 주면 바로 검색/적용 가능, 완성 못하면 실무도 불가",
      icon: <Code className="w-6 h-6" />,
      detail:
        "오픈소스와 문서화가 잘 되어 있어, 기본적인 CRUD 애플리케이션은 레퍼런스를 참고하여 빠르게 구현할 수 있어야 합니다.",
    },
    {
      title: "클라우드 보급",
      description: "혼자서도 서버 띄우고 배포 테스트까지 가능",
      icon: <Rocket className="w-6 h-6" />,
      detail:
        "AWS, Vercel, Netlify 등의 플랫폼으로 개발자 개인도 손쉽게 배포와 운영을 경험할 수 있게 되었습니다.",
    },
  ];

  const faqs = [
    {
      question: "왜 하필 한 달이라는 기간을 설정했나요?",
      answer:
        "현대의 개발 환경에서는 스택이 정형화되고 레퍼런스가 풍부해져서, 기본기가 있는 개발자라면 한 달 안에 중형 프로젝트를 완성할 수 있어야 합니다. 이는 실무에서 요구하는 최소한의 속도이기도 합니다.",
    },
    {
      question: "풀스택을 못하면 개발자가 아닌가요?",
      answer:
        "그렇지 않습니다. 다만 현재 시장에서는 풀스택 능력이 기본기로 여겨지고 있으며, 특히 스타트업이나 중소기업에서는 필수적인 능력입니다. 전문 영역을 가지되 전체적인 이해도 필요합니다.",
    },
    {
      question: "90% 실력 검증이라고 했는데, 나머지 10%는 무엇인가요?",
      answer:
        "코드 품질, 협업 태도, 문제 해결력 등은 프로젝트만으로는 완전히 검증하기 어렵습니다. 이는 면접과 코드 리뷰를 통해 평가해야 할 영역입니다.",
    },
    {
      question: "바이브 코딩은 어떤 방식으로 운영되나요?",
      answer:
        "실제 업무와 유사한 미니 프로젝트를 제공하고, 참가자들이 완성도 있는 결과물을 만들어내는 과정을 통해 실력을 검증하며, 우수한 참가자에게는 채용 기회를 제공합니다.",
    },
  ];

  const sections = [
    {
      id: "overview",
      label: "프로젝트 개요",
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      id: "why",
      label: "풀스택이 필수인 이유",
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: "requirements",
      label: "기본기 요구사항",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      id: "validation",
      label: "실력 검증 과정",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className || ""}`}>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            창업 아이디어: 바이브 코딩
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          미니 프로젝트 챌린지를 통한 상시 풀스택 개발자 채용 및 개발 공유
          시스템
        </p>
      </div>

      {/* 섹션 네비게이션 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id
                ? "bg-slate-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* 프로젝트 개요 */}
      {activeSection === "overview" && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🎯 미니 프로젝트 챌린지 시스템
                </h2>
                <p className="text-gray-600 mb-6">
                  실전 미니 프로젝트를 통해 실력을 증명하고, 상시 채용 기회를
                  제공하는 혁신적인 플랫폼입니다.
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    <Play className="w-4 h-4" />
                    챌린지 시작하기
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    <Users className="w-4 h-4" />
                    채용 정보 보기
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    30일
                  </div>
                  <div className="text-sm text-gray-600">프로젝트 기간</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    90%
                  </div>
                  <div className="text-sm text-gray-600">실력 검증률</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    7가지
                  </div>
                  <div className="text-sm text-gray-600">필수 기술 스택</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-slate-600 mb-1">
                    상시
                  </div>
                  <div className="text-sm text-gray-600">채용 기회</div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로세스 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              프로젝트 진행 프로세스
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  1. 챌린지 선택
                </h4>
                <p className="text-sm text-gray-600">
                  다양한 난이도의 실전 프로젝트 중 선택
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  2. 개발 진행
                </h4>
                <p className="text-sm text-gray-600">
                  30일 안에 완성도 있는 결과물 개발
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  3. 평가 및 채용
                </h4>
                <p className="text-sm text-gray-600">
                  코드 리뷰를 통한 평가 및 채용 기회 제공
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 풀스택이 필수인 이유 */}
      {activeSection === "why" && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              왜 풀스택이 현대 웹개발자의 "기본기"인가?
            </h2>
            <p className="text-gray-600 mb-8">
              현재 시장에서 풀스택 능력은 더 이상 선택이 아닌 필수가 되었습니다.
              한 달 안에 중형 프로젝트(게시판 + 채팅 + 배포)를 만들 수 있어야
              기본기 통과라고 봅니다.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {whyFullstack.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 검증 가능한 이유 */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              한 달 프로젝트로 90% 실력 검증이 가능한 이유
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">스택의 표준화</div>
                  <div className="text-sm text-gray-600">
                    업계에서 사용하는 기술 스택이 표준화되어 학습 경로가
                    명확해졌습니다.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">
                    풍부한 레퍼런스
                  </div>
                  <div className="text-sm text-gray-600">
                    오픈소스와 문서화가 잘 되어 있어 빠른 학습과 적용이
                    가능합니다.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">클라우드 환경</div>
                  <div className="text-sm text-gray-600">
                    개인도 손쉽게 배포와 운영을 경험할 수 있는 환경이
                    구축되었습니다.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>결론:</strong> 남는 10%는 코드 품질/협업 태도/문제
                해결력인데, 이는 면접/코드리뷰에서 걸러내면 충분합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 기본기 요구사항 */}
      {activeSection === "requirements" && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              요즘 웹개발자에게 "기본기"로 보는 세트
            </h2>
            <p className="text-gray-600 mb-8">
              이 정도는 "풀스택 개발자라면 당연히 손에 익어 있어야 한다"
              수준입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullstackSkills.map((skillGroup, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${skillGroup.color} p-4`}>
                    <div className="flex items-center gap-2 text-white">
                      {skillGroup.icon}
                      <h3 className="font-semibold">{skillGroup.category}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {skillGroup.skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 실전 프로젝트 예시 */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              기본기 통과를 위한 실전 프로젝트 예시
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  게시판 시스템
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  CRUD, 페이지네이션, 검색, 파일 업로드
                </p>
                <div className="text-xs text-gray-500">
                  React + Spring Boot + MySQL
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  실시간 채팅
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  WebSocket, 메시지 저장, 온라인 상태
                </p>
                <div className="text-xs text-gray-500">
                  Socket.io + Redis + 이벤트 처리
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  배포 및 운영
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Docker, CI/CD, 모니터링, 로그
                </p>
                <div className="text-xs text-gray-500">
                  GitHub Actions + AWS/Vercel
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실력 검증 과정 */}
      {activeSection === "validation" && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              바이브 코딩 실력 검증 과정
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    프로젝트 할당
                  </h4>
                  <p className="text-gray-600 mb-2">
                    실제 업무와 유사한 요구사항을 가진 미니 프로젝트를
                    제공합니다.
                  </p>
                  <div className="text-sm text-gray-500">
                    예: 실시간 협업 도구, 전자상거래 시스템, 소셜 네트워크 기능
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    개발 및 제출
                  </h4>
                  <p className="text-gray-600 mb-2">
                    30일 기한 내에 완성도 있는 결과물을 개발하고 Git을 통해
                    제출합니다.
                  </p>
                  <div className="text-sm text-gray-500">
                    코드 품질, 아키텍처, 문서화, 테스트 포함 여부 등을 종합 평가
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    코드 리뷰 및 면접
                  </h4>
                  <p className="text-gray-600 mb-2">
                    시니어 개발자의 코드 리뷰와 기술 면접을 통해 나머지 10%를
                    검증합니다.
                  </p>
                  <div className="text-sm text-gray-500">
                    문제 해결 과정, 협업 태도, 학습 능력, 커뮤니케이션 스킬 평가
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    채용 연결
                  </h4>
                  <p className="text-gray-600 mb-2">
                    검증을 통과한 개발자에게 파트너 기업의 채용 기회를
                    제공합니다.
                  </p>
                  <div className="text-sm text-gray-500">
                    실력에 맞는 포지션과 연봉 수준으로 매칭
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              자주 묻는 질문
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          🚀 개발자 채용의 미래를 함께 만들어보세요
        </h3>
        <p className="text-slate-200 mb-6">
          바이브 코딩과 함께 더 나은 개발 문화를 구축하고, 진짜 실력 있는
          개발자를 발굴하세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            <Play className="w-4 h-4" />
            데모 체험하기
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-slate-700 transition-colors font-medium">
            <Users className="w-4 h-4" />
            파트너십 문의
          </button>
        </div>
      </div>
    </div>
  );
};

StartupIdeaPage.displayName = "StartupIdeaPage";
export default StartupIdeaPage;
