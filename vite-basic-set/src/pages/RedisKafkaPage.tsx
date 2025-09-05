import type React from "react";
import { Network, Zap, Database, BarChart3, CheckCircle, ExternalLink, BookOpen, Code, Target, Link as LinkIcon } from "lucide-react";

const RedisKafkaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Redis vs Apache Kafka</h1>
              <p className="text-gray-600 mt-2">메시징 시스템 비교 분석과 적합한 사용 사례</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 기본 개념 비교 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-orange-600" />
                기본 개념 비교
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">Redis Pub/Sub</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• <strong>타입:</strong> 인메모리 데이터 저장소</li>
                    <li>• <strong>메시징:</strong> 발행-구독 패턴</li>
                    <li>• <strong>영속성:</strong> 기본적으로 휘발성</li>
                    <li>• <strong>처리량:</strong> 초당 백만 건 이상</li>
                    <li>• <strong>지연시간:</strong> 마이크로초 단위</li>
                  </ul>
                </div>

                <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Network className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-800">Apache Kafka</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• <strong>타입:</strong> 분산 스트리밍 플랫폼</li>
                    <li>• <strong>메시징:</strong> 로그 기반 스트리밍</li>
                    <li>• <strong>영속성:</strong> 디스크 기반 영구 저장</li>
                    <li>• <strong>처리량:</strong> 초당 수백만 건</li>
                    <li>• <strong>지연시간:</strong> 밀리초 단위</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 아키텍처 비교 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
                아키텍처 및 특징 비교
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">구분</th>
                      <th className="px-4 py-3 text-left font-semibold text-red-600">Redis Pub/Sub</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-600">Apache Kafka</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-700">메시지 저장</td>
                      <td className="px-4 py-3 text-red-700">메모리(휘발성)</td>
                      <td className="px-4 py-3 text-blue-700">디스크(영구)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-700">메시지 순서</td>
                      <td className="px-4 py-3 text-red-700">보장 안됨</td>
                      <td className="px-4 py-3 text-blue-700">파티션 내 순서 보장</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-700">복제</td>
                      <td className="px-4 py-3 text-red-700">마스터-슬레이브</td>
                      <td className="px-4 py-3 text-blue-700">분산 복제</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-700">스케일링</td>
                      <td className="px-4 py-3 text-red-700">수직 확장 중심</td>
                      <td className="px-4 py-3 text-blue-700">수평 확장 최적화</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-700">메시지 재처리</td>
                      <td className="px-4 py-3 text-red-700">불가능</td>
                      <td className="px-4 py-3 text-blue-700">오프셋 조정으로 가능</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-700">운영 복잡도</td>
                      <td className="px-4 py-3 text-red-700">낮음</td>
                      <td className="px-4 py-3 text-blue-700">높음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 사용 사례 비교 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                적합한 사용 사례
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Redis Pub/Sub 적합한 경우
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">실시간 채팅</h4>
                      <p className="text-gray-600 text-sm">즉각적인 메시지 전달이 중요한 채팅 시스템</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">실시간 알림</h4>
                      <p className="text-gray-600 text-sm">푸시 알림, 브라우저 알림 등 즉시 전달</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">라이브 업데이트</h4>
                      <p className="text-gray-600 text-sm">실시간 대시보드, 스포츠 점수 등</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">캐시 무효화</h4>
                      <p className="text-gray-600 text-sm">분산 캐시 시스템의 동기화</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Apache Kafka 적합한 경우
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">이벤트 소싱</h4>
                      <p className="text-gray-600 text-sm">도메인 이벤트 저장과 재처리</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">로그 집계</h4>
                      <p className="text-gray-600 text-sm">대용량 로그 데이터 수집과 분석</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">스트림 처리</h4>
                      <p className="text-gray-600 text-sm">실시간 데이터 파이프라인 구축</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">마이크로서비스 통신</h4>
                      <p className="text-gray-600 text-sm">서비스 간 비동기 메시징</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 하이브리드 아키텍처 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-600" />
                하이브리드 아키텍처
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  실제 프로덕션 환경에서는 Redis와 Kafka를 함께 사용하여 각각의 장점을 활용하는 경우가 많습니다.
                </p>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">일반적인 하이브리드 패턴</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                      <div>
                        <strong>Kafka:</strong> 이벤트 저장과 서비스 간 메시징
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                      <div>
                        <strong>Redis:</strong> 실시간 알림과 캐싱
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                      <div>
                        <strong>연동:</strong> Kafka Consumer가 Redis Pub/Sub으로 실시간 전달
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 실전 팁</h4>
                  <p className="text-yellow-700 text-sm">
                    이벤트의 영속성이 중요하면 Kafka에 저장하고, 실시간 전달이 중요하면 Redis Pub/Sub을 사용하세요.
                    두 시스템을 연결하여 장점을 모두 활용할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 성능 비교 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                성능 지표
              </h3>
              <div className="space-y-4">
                <div className="border border-red-200 bg-red-50 p-3 rounded">
                  <h4 className="font-semibold text-red-800 text-sm">Redis Pub/Sub</h4>
                  <div className="mt-2 text-xs text-red-700">
                    <div>처리량: ~1M msg/sec</div>
                    <div>지연시간: ~100μs</div>
                    <div>메모리: 높음</div>
                  </div>
                </div>
                <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Apache Kafka</h4>
                  <div className="mt-2 text-xs text-blue-700">
                    <div>처리량: ~10M msg/sec</div>
                    <div>지연시간: ~10ms</div>
                    <div>디스크: 효율적</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 선택 가이드 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                선택 가이드
              </h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">Redis를 선택하세요</h4>
                  <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                    <li>초저지연이 필요한 경우</li>
                    <li>간단한 Pub/Sub이 필요한 경우</li>
                    <li>캐싱도 함께 사용하는 경우</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">Kafka를 선택하세요</h4>
                  <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                    <li>메시지 영속성이 중요한 경우</li>
                    <li>대용량 처리가 필요한 경우</li>
                    <li>순서 보장이 중요한 경우</li>
                  </ul>
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
                <a href="https://redis.io/docs/manual/pubsub/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Redis Pub/Sub Guide
                </a>
                <a href="https://kafka.apache.org/documentation/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Kafka Documentation
                </a>
                <a href="https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Kafka Performance
                </a>
                <a href="https://github.com/confluentinc/examples" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Kafka Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedisKafkaPage;
