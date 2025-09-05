import type React from "react";
import { BookOpen, Calendar, Code, Target, TrendingUp, CheckCircle, Plus, Edit3, Clock, Tag } from "lucide-react";

const DevJournalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">개발 일지</h1>
                <p className="text-gray-600 mt-2">성장하는 개발자의 학습과 경험을 기록하세요</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              새 일지 작성
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 최근 일지 목록 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  최근 개발 일지
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {/* 일지 항목 1 */}
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Redis 캐싱 성능 최적화 완료</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          완료
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        사용자 세션 데이터를 Redis에 캐싱하여 응답 시간을 40% 단축시켰습니다.
                        Connection Pool 설정과 TTL 최적화가 핵심이었습니다.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          2024.01.15
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          Redis, 성능최적화
                        </div>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <Edit3 className="w-3 h-3" />
                          수정
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 일지 항목 2 */}
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Spring WebFlux 스터디 시작</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          진행중
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        리액티브 프로그래밍의 기본 개념을 익히고 있습니다.
                        Mono와 Flux의 차이점과 Backpressure에 대해 학습 중입니다.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          2024.01.12
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          Spring, 리액티브
                        </div>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <Edit3 className="w-3 h-3" />
                          수정
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 일지 항목 3 */}
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">마이크로서비스 아키텍처 설계</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          계획
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        기존 모놀리식 애플리케이션을 마이크로서비스로 분해하는 전략을 세우고 있습니다.
                        도메인 경계 설정과 데이터 일관성이 주요 고려사항입니다.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          2024.01.10
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          아키텍처, 설계
                        </div>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <Edit3 className="w-3 h-3" />
                          수정
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 일지 작성 팁 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 효과적인 개발 일지 작성 팁</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">구체적인 문제와 해결 과정 기록</h4>
                    <p className="text-gray-600 text-sm">어떤 문제를 만났고, 어떻게 해결했는지 상세히 기록하세요</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">배운 점과 인사이트 정리</h4>
                    <p className="text-gray-600 text-sm">기술적 학습 내용뿐만 아니라 얻은 인사이트도 함께 기록하세요</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">다음 단계 계획 수립</h4>
                    <p className="text-gray-600 text-sm">현재 학습을 바탕으로 다음에 할 일을 계획해보세요</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-600">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">코드 스니펫과 참고 자료 첨부</h4>
                    <p className="text-gray-600 text-sm">핵심 코드와 유용한 참고 자료 링크를 함께 보관하세요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 이번 달 통계 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                이번 달 통계
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">작성한 일지</span>
                  <span className="font-semibold text-blue-600">12개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">완료한 학습</span>
                  <span className="font-semibold text-green-600">8개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">진행 중인 프로젝트</span>
                  <span className="font-semibold text-yellow-600">3개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">해결한 이슈</span>
                  <span className="font-semibold text-purple-600">15개</span>
                </div>
              </div>
            </div>

            {/* 카테고리 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📂 카테고리</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Spring Framework</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">8</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Redis</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">5</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">데이터베이스</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">4</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">아키텍처</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">3</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">성능 최적화</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">6</span>
                </div>
              </div>
            </div>

            {/* 빠른 작업 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                빠른 작업
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">새 학습 일지 작성</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">프로젝트 회고 작성</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">트러블슈팅 기록</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevJournalPage;
