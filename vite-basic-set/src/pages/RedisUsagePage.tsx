import type React from "react";
import {
  Activity,
  TrendingUp,
  Zap,
  CheckCircle,
  ExternalLink,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const RedisUsagePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Redis 활용</h1>
              <p className="text-gray-600 mt-2">
                실제 프로젝트에서 Redis를 효과적으로 활용하는 방법
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 캐싱 전략 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-600" />
                캐싱 전략
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Cache-Aside (Lazy Loading)
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    애플리케이션이 직접 캐시를 관리하는 패턴
                  </p>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    data = cache.get(key)
                    <br />
                    if data is None:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;data = database.get(key)
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;cache.set(key, data, ttl=3600)
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Write-Through
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    데이터 쓰기 시 캐시와 데이터베이스에 동시 저장
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>데이터 일관성 보장</li>
                    <li>쓰기 지연 시간 증가</li>
                    <li>캐시 미스 최소화</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Write-Back (Write-Behind)
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    캐시에 먼저 쓰고, 나중에 데이터베이스에 비동기로 쓰기
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>빠른 쓰기 성능</li>
                    <li>데이터 손실 가능성</li>
                    <li>복잡한 구현</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 실시간 기능 구현 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                실시간 기능 구현
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      실시간 리더보드
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                      # 점수 추가
                      <br />
                      ZADD leaderboard 100 "user1"
                      <br />
                      ZADD leaderboard 200 "user2"
                      <br />
                      <br />
                      # 상위 10명 조회
                      <br />
                      ZREVRANGE leaderboard 0 9 WITHSCORES
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      실시간 카운터
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                      # 조회수 증가
                      <br />
                      INCR page:views:123
                      <br />
                      EXPIRE page:views:123 86400
                      <br />
                      <br />
                      # 현재 조회수
                      <br />
                      GET page:views:123
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      세션 관리
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                      # 세션 저장
                      <br />
                      HSET session:abc123 user_id 456
                      <br />
                      HSET session:abc123 login_time now
                      <br />
                      EXPIRE session:abc123 1800
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Pub/Sub 메시징
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                      # 구독
                      <br />
                      SUBSCRIBE notifications
                      <br />
                      <br />
                      # 발행
                      <br />
                      PUBLISH notifications "New message"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 성능 최적화 팁 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                성능 최적화 팁
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    적절한 데이터 타입 선택
                  </h3>
                  <p className="text-gray-600 text-sm">
                    각 용도에 맞는 최적의 데이터 구조 사용
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">TTL 설정</h3>
                  <p className="text-gray-600 text-sm">
                    메모리 효율성을 위한 적절한 만료 시간 설정
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">파이프라이닝</h3>
                  <p className="text-gray-600 text-sm">
                    여러 명령어를 한 번에 전송하여 네트워크 오버헤드 감소
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    Connection Pooling
                  </h3>
                  <p className="text-gray-600 text-sm">
                    연결 재사용으로 연결 오버헤드 최소화
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 사용 사례별 패턴 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                주요 사용 패턴
              </h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    분산 락
                  </h4>
                  <p className="text-xs text-gray-600">
                    SETNX를 이용한 뮤텍스 구현
                  </p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    레이트 리미팅
                  </h4>
                  <p className="text-xs text-gray-600">API 호출 제한 구현</p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    큐 시스템
                  </h4>
                  <p className="text-xs text-gray-600">LIST를 이용한 작업 큐</p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    풀 텍스트 검색
                  </h4>
                  <p className="text-xs text-gray-600">RediSearch 모듈 활용</p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    지리 정보
                  </h4>
                  <p className="text-xs text-gray-600">
                    Geospatial 명령어 활용
                  </p>
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
                <a
                  href="https://redis.io/docs/manual/patterns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Redis Design Patterns
                </a>
                <a
                  href="https://redis.io/docs/manual/pipelining/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Redis Pipelining
                </a>
                <a
                  href="https://redis.io/docs/manual/optimization/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Memory Optimization
                </a>
                <a
                  href="https://github.com/redis/redis-doc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  Redis Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedisUsagePage;
