import type React from "react";
import {
  Database,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const SpringJpaJooqPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spring JPA with jOOQ
              </h1>
              <p className="text-gray-600 mt-2">
                타입 안전하고 강력한 데이터베이스 접근
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                개념 설명
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring JPA와 jOOQ의 결합은 ORM의 편리함과 SQL의 강력함을
                  동시에 제공합니다. JPA로 간단한 CRUD를, jOOQ로 복잡한 쿼리를
                  타입 안전하게 작성할 수 있습니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  JPA vs jOOQ 비교
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Spring JPA 장점
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 빠른 개발 속도</li>
                      <li>• 자동 DDL 생성</li>
                      <li>• 캐싱 지원</li>
                      <li>• 트랜잭션 관리</li>
                    </ul>
                  </div>
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      jOOQ 장점
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 타입 안전한 SQL</li>
                      <li>• 복잡한 쿼리 지원</li>
                      <li>• 성능 최적화</li>
                      <li>• SQL 표준 준수</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  통합 전략
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>JPA: 단순한 CRUD, 엔티티 관계 매핑</li>
                  <li>jOOQ: 복잡한 집계, 분석 쿼리, 동적 SQL</li>
                  <li>같은 트랜잭션 컨텍스트에서 함께 사용</li>
                  <li>코드 생성을 통한 타입 안전성 확보</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                도전해볼 만한 챌린지
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    초급: 하이브리드 CRUD 구현
                  </h3>
                  <p className="text-gray-600 text-sm">
                    JPA 엔티티와 jOOQ 조회를 결합한 기본 서비스
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    중급: 동적 검색 시스템
                  </h3>
                  <p className="text-gray-600 text-sm">
                    jOOQ로 동적 where 조건과 정렬을 지원하는 검색 API
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    고급: 분석 대시보드
                  </h3>
                  <p className="text-gray-600 text-sm">
                    복잡한 집계와 윈도우 함수를 사용한 리포팅 시스템
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    1
                  </div>
                  <span className="text-sm text-gray-700">
                    JPA 기본 개념 복습
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    2
                  </div>
                  <span className="text-sm text-gray-700">
                    jOOQ 코드 생성 설정
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    3
                  </div>
                  <span className="text-sm text-gray-700">
                    DSL을 사용한 쿼리 작성
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    4
                  </div>
                  <span className="text-sm text-gray-700">트랜잭션 통합</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    5
                  </div>
                  <span className="text-sm text-gray-700">성능 최적화</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-green-600" />
                참고 자료
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.jooq.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  jOOQ 공식 사이트
                </a>
                <a
                  href="https://spring.io/guides/gs/accessing-data-jpa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring Data JPA Guide
                </a>
                <a
                  href="https://github.com/jOOQ/jOOQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  jOOQ GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringJpaJooqPage;
