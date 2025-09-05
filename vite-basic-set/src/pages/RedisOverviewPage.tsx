import type React from "react";
import { HardDrive, Zap, Database, Cloud, CheckCircle, ExternalLink, BookOpen, Code, Target, Link as LinkIcon } from "lucide-react";

const RedisOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
              <HardDrive className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Redis 개요</h1>
              <p className="text-gray-600 mt-2">Remote Dictionary Server - 인메모리 데이터 구조 저장소</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 개념 설명 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-red-600" />
                Redis란?
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Redis(Remote Dictionary Server)는 오픈소스 인메모리 데이터 구조 저장소입니다.
                  데이터베이스, 캐시, 메시지 브로커로 사용되며, 극도로 빠른 성능을 자랑합니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">핵심 특징</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold">초고속 성능</h4>
                    </div>
                    <p className="text-sm text-gray-600">인메모리 저장으로 마이크로초 단위 응답시간</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold">다양한 데이터 타입</h4>
                    </div>
                    <p className="text-sm text-gray-600">String, Hash, List, Set, Sorted Set 등</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">지원하는 데이터 구조</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>기본 타입:</strong><br/>
                      • String: 텍스트, 숫자, 바이너리<br/>
                      • Hash: 필드-값 쌍의 맵<br/>
                      • List: 순서가 있는 문자열 목록
                    </div>
                    <div>
                      <strong>고급 타입:</strong><br/>
                      • Set: 중복 없는 문자열 컬렉션<br/>
                      • Sorted Set: 점수로 정렬된 집합<br/>
                      • JSON, Stream, HyperLogLog 등
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 사용 사례</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>캐싱:</strong> 데이터베이스 쿼리 결과, 세션 정보 캐시</li>
                  <li><strong>실시간 분석:</strong> 리더보드, 카운터, 통계</li>
                  <li><strong>메시징:</strong> Pub/Sub 패턴으로 실시간 메시지 전달</li>
                  <li><strong>세션 저장소:</strong> 분산 환경에서 세션 관리</li>
                  <li><strong>큐 시스템:</strong> 작업 큐, 지연 작업 처리</li>
                </ul>
              </div>
            </div>

            {/* Redis vs 다른 솔루션 비교 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cloud className="w-6 h-6 text-blue-600" />
                Redis vs 다른 솔루션
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Redis vs Memcached</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-50 p-3 rounded">
                      <strong className="text-red-800">Redis 장점:</strong><br/>
                      • 다양한 데이터 타입 지원<br/>
                      • 영속성 옵션 제공<br/>
                      • Pub/Sub, Lua 스크립트 지원
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong className="text-gray-800">Memcached 장점:</strong><br/>
                      • 단순한 아키텍처<br/>
                      • 멀티스레드 지원<br/>
                      • 메모리 효율성
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Redis vs 전통적 RDBMS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-50 p-3 rounded">
                      <strong className="text-red-800">Redis:</strong><br/>
                      • 극도로 빠른 읽기/쓰기<br/>
                      • NoSQL 스키마리스<br/>
                      • 수평 확장 가능
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong className="text-blue-800">RDBMS:</strong><br/>
                      • ACID 트랜잭션 보장<br/>
                      • 복잡한 쿼리 지원<br/>
                      • 관계형 데이터 모델링
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 아키텍처 특징 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                아키텍처 특징
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">단일 스레드 모델</h3>
                  <p className="text-gray-600 text-sm">명령어 처리는 단일 스레드로 실행되어 원자성 보장</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">영속성 옵션</h3>
                  <p className="text-gray-600 text-sm">RDB 스냅샷과 AOF 로그를 통한 데이터 영속화</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">복제 및 클러스터링</h3>
                  <p className="text-gray-600 text-sm">마스터-슬레이브 복제, Redis Cluster를 통한 샤딩</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">고가용성</h3>
                  <p className="text-gray-600 text-sm">Redis Sentinel을 통한 자동 장애 조치</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 빠른 시작 가이드 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-600" />
                빠른 시작
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">1</div>
                  <span className="text-sm text-gray-700">Redis 서버 설치</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">2</div>
                  <span className="text-sm text-gray-700">Redis CLI 사용법</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">3</div>
                  <span className="text-sm text-gray-700">기본 명령어 익히기</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">4</div>
                  <span className="text-sm text-gray-700">데이터 타입별 사용법</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-semibold text-red-600">5</div>
                  <span className="text-sm text-gray-700">애플리케이션 연동</span>
                </div>
              </div>
            </div>

            {/* 참고 자료 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                참고 자료
              </h3>
              <div className="space-y-3">
                <a href="https://redis.io/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis 공식 사이트
                </a>
                <a href="https://redis.io/docs/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis Documentation
                </a>
                <a href="https://try.redis.io/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis 온라인 튜토리얼
                </a>
                <a href="https://redis.io/commands/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis Commands Reference
                </a>
                <a href="https://github.com/redis/redis" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Redis GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedisOverviewPage;
