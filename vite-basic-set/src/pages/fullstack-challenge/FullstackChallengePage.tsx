import React, { useState } from "react";
import {
  Code2,
  Trophy,
  Clock,
  Users,
  Star,
  CheckCircle2,
  Play,
  Download,
  Database,
  Server,
  Globe,
  Settings,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export interface FullstackChallengePageProps {
  className?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "초급" | "중급" | "고급";
  duration: string;
  participants: number;
  rating: number;
  tags: string[];
  requirements: string[];
  deliverables: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  rewards: {
    points: number;
    badge: string;
    certificate: boolean;
  };
}

/**
 * FullstackChallengePage
 *
 * 풀스택 개발 챌린지 전용 페이지
 * - 다양한 난이도의 풀스택 프로젝트 챌린지
 * - 기술 스택별 요구사항
 * - 실시간 참여 현황 및 랭킹
 * - 완료 시 보상 시스템
 */
export const FullstackChallengePage: React.FC<FullstackChallengePageProps> = ({
  className,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "초급" | "중급" | "고급"
  >("all");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );

  const challenges: Challenge[] = [
    {
      id: "ecommerce-basic",
      title: "기본 전자상거래 플랫폼",
      description:
        "상품 목록, 장바구니, 주문 처리가 가능한 기본적인 쇼핑몰을 구축하세요.",
      difficulty: "초급",
      duration: "2주",
      participants: 245,
      rating: 4.5,
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      requirements: [
        "사용자 인증 및 권한 관리",
        "상품 CRUD 기능",
        "장바구니 및 주문 처리",
        "결제 시스템 연동",
        "반응형 UI 구현",
      ],
      deliverables: [
        "GitHub 소스 코드",
        "배포된 데모 사이트",
        "API 문서",
        "설치 및 실행 가이드",
      ],
      techStack: {
        frontend: ["React", "Tailwind CSS", "Redux Toolkit"],
        backend: ["Node.js", "Express", "JWT"],
        database: ["MongoDB", "Redis"],
        devops: ["Docker", "Vercel", "GitHub Actions"],
      },
      rewards: {
        points: 1000,
        badge: "E-commerce Builder",
        certificate: true,
      },
    },
    {
      id: "collaboration-platform",
      title: "실시간 협업 플랫폼",
      description:
        "팀 프로젝트 관리와 실시간 소통이 가능한 협업 도구를 개발하세요.",
      difficulty: "중급",
      duration: "3주",
      participants: 187,
      rating: 4.7,
      tags: ["Next.js", "Socket.io", "PostgreSQL", "Docker"],
      requirements: [
        "실시간 채팅 및 알림",
        "프로젝트 및 태스크 관리",
        "파일 공유 및 버전 관리",
        "사용자 역할 및 권한 시스템",
        "대시보드 및 분석 기능",
      ],
      deliverables: [
        "완성된 웹 애플리케이션",
        "모바일 반응형 UI",
        "실시간 기능 데모",
        "성능 테스트 결과",
        "배포 가이드",
      ],
      techStack: {
        frontend: ["Next.js", "TypeScript", "Zustand"],
        backend: ["NestJS", "Socket.io", "GraphQL"],
        database: ["PostgreSQL", "Redis"],
        devops: ["Docker", "AWS", "CI/CD"],
      },
      rewards: {
        points: 2000,
        badge: "Collaboration Expert",
        certificate: true,
      },
    },
    {
      id: "microservices-architecture",
      title: "마이크로서비스 아키텍처",
      description:
        "확장 가능한 마이크로서비스 기반의 대규모 애플리케이션을 설계하고 구현하세요.",
      difficulty: "고급",
      duration: "4주",
      participants: 89,
      rating: 4.9,
      tags: ["Kubernetes", "gRPC", "Event Sourcing", "CQRS"],
      requirements: [
        "마이크로서비스 아키텍처 설계",
        "API Gateway 및 서비스 디스커버리",
        "이벤트 기반 통신",
        "분산 트랜잭션 처리",
        "모니터링 및 로깅 시스템",
        "자동 스케일링 구현",
      ],
      deliverables: [
        "마이크로서비스 클러스터",
        "아키텍처 문서",
        "성능 벤치마크",
        "장애 복구 시나리오",
        "운영 가이드",
      ],
      techStack: {
        frontend: ["React", "Micro-frontends"],
        backend: ["Spring Boot", "gRPC", "Event Sourcing"],
        database: ["PostgreSQL", "MongoDB", "Elasticsearch"],
        devops: ["Kubernetes", "Helm", "Prometheus", "Grafana"],
      },
      rewards: {
        points: 5000,
        badge: "Architecture Master",
        certificate: true,
      },
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
        return "bg-green-100 text-green-800 border-green-200";
      case "중급":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "고급":
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredChallenges =
    selectedDifficulty === "all"
      ? challenges
      : challenges.filter((c) => c.difficulty === selectedDifficulty);

  const stats = {
    totalChallenges: challenges.length,
    totalParticipants: challenges.reduce((sum, c) => sum + c.participants, 0),
    averageRating: (
      challenges.reduce((sum, c) => sum + c.rating, 0) / challenges.length
    ).toFixed(1),
    completionRate: "78%",
  };

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className || ""}`}>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
            <Code2 className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">풀스택 챌린지</h1>
        </div>
        <p className="text-lg text-gray-600">
          실전 프로젝트를 통해 풀스택 개발 역량을 검증하고 향상시키세요
        </p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {stats.totalChallenges}
          </div>
          <div className="text-sm text-gray-600">전체 챌린지</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.totalParticipants}
          </div>
          <div className="text-sm text-gray-600">참여자 수</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-amber-600 mb-1">
            {stats.averageRating}
          </div>
          <div className="text-sm text-gray-600">평균 평점</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-slate-600 mb-1">
            {stats.completionRate}
          </div>
          <div className="text-sm text-gray-600">완료율</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm font-medium text-gray-700">난이도:</span>
        {["all", "초급", "중급", "고급"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDifficulty === level
                ? "bg-slate-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {level === "all" ? "전체" : level}
          </button>
        ))}
      </div>

      {/* 챌린지 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedChallenge(challenge)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {challenge.title}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                      challenge.difficulty,
                    )}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.rating}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {challenge.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants}명 참여</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.rewards.points}P</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {challenge.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {challenge.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{challenge.tags.length - 3}
                  </span>
                )}
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                <Play className="w-4 h-4" />
                챌린지 시작
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 챌린지 상세 모달 */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedChallenge.title}
                  </h2>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                      selectedChallenge.difficulty,
                    )}`}
                  >
                    {selectedChallenge.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    프로젝트 개요
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedChallenge.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        예상 소요시간: {selectedChallenge.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        참여자: {selectedChallenge.participants}명
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="text-gray-700">
                        평점: {selectedChallenge.rating}/5.0
                      </span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3">요구사항</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedChallenge.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">제출물</h4>
                  <ul className="space-y-2">
                    {selectedChallenge.deliverables.map(
                      (deliverable, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    기술 스택
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-900">
                          Frontend
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.techStack.frontend.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Server className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-900">
                          Backend
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.techStack.backend.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-amber-500" />
                        <span className="font-medium text-gray-900">
                          Database
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.techStack.database.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-gray-900">
                          DevOps
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.techStack.devops.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-50 text-slate-700 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      완료 시 보상
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-700">
                          {selectedChallenge.rewards.points} 포인트
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">
                          {selectedChallenge.rewards.badge} 배지
                        </span>
                      </div>
                      {selectedChallenge.rewards.certificate && (
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">완료 인증서</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
                  <Play className="w-4 h-4" />
                  챌린지 시작하기
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  <Download className="w-4 h-4" />
                  상세 명세서 다운로드
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 하단 안내 */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          💡 챌린지 참여 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">챌린지 선택</h4>
              <p className="text-sm text-gray-600">
                본인의 실력과 관심사에 맞는 챌린지를 선택하세요
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                프로젝트 개발
              </h4>
              <p className="text-sm text-gray-600">
                주어진 기간 내에 요구사항을 만족하는 결과물을 개발하세요
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">제출 및 평가</h4>
              <p className="text-sm text-gray-600">
                완성된 프로젝트를 제출하고 전문가 리뷰를 받으세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FullstackChallengePage.displayName = "FullstackChallengePage";
export default FullstackChallengePage;
