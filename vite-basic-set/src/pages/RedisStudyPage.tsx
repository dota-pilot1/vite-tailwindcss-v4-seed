import type React from "react";
import { Bookmark, Trophy, Target, Code2, CheckCircle, ExternalLink, BookOpen, Code, Link as LinkIcon } from "lucide-react";

const RedisStudyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Redis 챌린지형 스터디</h1>
              <p className="text-gray-600 mt-2">실전 프로젝트로 배우는 Redis 마스터 코스</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 학습 로드맵 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                학습 로드맵
              </h2>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  <div className="relative flex items-start gap-4 pb-8">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Redis 기초 마스터</h3>
                      <p className="text-gray-600 text-sm mb-2">기본 데이터 타입과 명령어 완전 정복</p>
                      <ul className="text-xs text-gray-500 list-disc list-inside">
                        <li>Redis 설치 및 설정</li>
                        <li>String, Hash, List, Set, Sorted Set 활용</li>
                        <li>기본 명령어 100개 마스터</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4 pb-8">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">실전 캐싱 구현</h3>
                      <p className="text-gray-600 text-sm mb-2">실제 웹 애플리케이션에 캐싱 적용</p>
                      <ul className="text-xs text-gray-500 list-disc list-inside">
                        <li>Cache-Aside, Write-Through 패턴 구현</li>
                        <li>세션 저장소 구축</li>
                        <li>API 응답 캐싱 시스템</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4 pb-8">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">실시간 시스템 구축</h3>
                      <p className="text-gray-600 text-sm mb-2">Pub/Sub과 스트림을 활용한 실시간 기능</p>
                      <ul className="text-xs text-gray-500 list-disc list-inside">
                        <li>실시간 채팅 시스템</li>
                        <li>라이브 리더보드</li>
                        <li>알림 시스템 구축</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">고급 아키텍처</h3>
                      <p className="text-gray-600 text-sm mb-2">클러스터링과 고가용성 구성</p>
                      <ul className="text-xs text-gray-500 list-disc list-inside">
                        <li>Redis Cluster 구성</li>
                        <li>Sentinel을 통한 고가용성</li>
                        <li>모니터링 및 성능 튜닝</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 실습 프로젝트 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-blue-600" />
                실습 프로젝트
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-gold-500" />
                    <h3 className="font-semibold text-gray-800">실시간 게임 순위 시스템</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Sorted Set을 활용한 실시간 리더보드와 점수 시스템 구현
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-semibold text-xs text-gray-700 mb-2">구현 기능:</h4>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      <li>실시간 점수 업데이트</li>
                      <li>구간별 순위 조회</li>
                      <li>주간/월간 순위 초기화</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold text-gray-800">분산 로깅 시스템</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Redis Streams를 활용한 마이크로서비스 로그 수집 시스템
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-semibold text-xs text-gray-700 mb-2">구현 기능:</h4>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      <li>로그 스트림 수집</li>
                      <li>Consumer Group 처리</li>
                      <li>로그 필터링 및 분석</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-gray-800">분산 캐시 시스템</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    일관성 해싱을 통한 확장 가능한 캐시 아키텍처 구축
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-semibold text-xs text-gray-700 mb-2">구현 기능:</h4>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      <li>샤딩 전략 구현</li>
                      <li>캐시 미스 최적화</li>
                      <li>장애 복구 시스템</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-800">E-commerce 추천 엔진</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    사용자 행동 데이터 기반 실시간 상품 추천 시스템
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-semibold text-xs text-gray-700 mb-2">구현 기능:</h4>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      <li>협업 필터링 구현</li>
                      <li>실시간 추천 업데이트</li>
                      <li>A/B 테스트 지원</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 도전 과제 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-red-600" />
                도전 과제
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">Week 1-2: Redis 마스터리</h3>
                  <p className="text-gray-600 text-sm">모든 데이터 타입과 명령어를 실제 프로젝트에 적용</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">Week 3-4: 성능 최적화</h3>
                  <p className="text-gray-600 text-sm">메모리 사용량 50% 절약하는 최적화 기법 구현</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">Week 5-6: 고가용성 구축</h3>
                  <p className="text-gray-600 text-sm">99.9% 가용성을 보장하는 Redis 클러스터 구성</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">Final Project: 실전 적용</h3>
                  <p className="text-gray-600 text-sm">실제 서비스 수준의 Redis 기반 시스템 구축</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 학습 진행률 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                학습 체크리스트
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Redis 설치 및 CLI 사용</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">기본 데이터 타입 마스터</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">캐싱 패턴 구현</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Pub/Sub 시스템 구축</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Lua 스크립트 작성</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">클러스터 구성</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">모니터링 설정</span>
                </div>
              </div>
            </div>

            {/* 참고 자료 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                학습 자료
              </h3>
              <div className="space-y-3">
                <a href="https://university.redis.com/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis University
                </a>
                <a href="https://github.com/redis/redis-om-python" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Redis OM Python
                </a>
                <a href="https://redis.io/docs/stack/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis Stack
                </a>
                <a href="https://github.com/redis/redis-benchmarks" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Performance Benchmarks
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedisStudyPage;
