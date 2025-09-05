import type React from "react";
import { Network, MessageCircle, Users, Zap, CheckCircle, ExternalLink, BookOpen, Code, Target, Link as LinkIcon } from "lucide-react";

const SpringWebSocketPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spring WebSocket STOMP</h1>
              <p className="text-gray-600 mt-2">실시간 양방향 통신을 위한 메시징 프로토콜</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 개념 설명 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-green-600" />
                개념 설명
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring WebSocket STOMP는 Simple Text Oriented Messaging Protocol의 줄임말로,
                  WebSocket 기반의 메시징을 위한 프로토콜입니다. Spring Framework에서 실시간 양방향 통신을
                  구현할 때 사용됩니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">핵심 개념</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold">STOMP 프로토콜</h4>
                    </div>
                    <p className="text-sm text-gray-600">간단하고 상호운용 가능한 메시징 프로토콜</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold">실시간 통신</h4>
                    </div>
                    <p className="text-sm text-gray-600">서버와 클라이언트 간 즉각적인 데이터 교환</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 특징</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>WebSocket 위에서 동작하는 고수준 프로토콜</li>
                  <li>Message Broker 패턴 지원 (발행-구독 모델)</li>
                  <li>SockJS를 통한 WebSocket 대체 옵션 제공</li>
                  <li>Spring Security와의 통합 지원</li>
                  <li>사용자별, 그룹별 메시징 가능</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">STOMP 명령어</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>CONNECT:</strong> 서버 연결<br/>
                      <strong>SUBSCRIBE:</strong> 토픽 구독<br/>
                      <strong>SEND:</strong> 메시지 전송
                    </div>
                    <div>
                      <strong>DISCONNECT:</strong> 연결 해제<br/>
                      <strong>MESSAGE:</strong> 메시지 수신<br/>
                      <strong>ERROR:</strong> 오류 처리
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 관련 생태계 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                관련 생태계
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Message Broker</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Apache ActiveMQ</li>
                    <li>• RabbitMQ</li>
                    <li>• Redis Pub/Sub</li>
                    <li>• Simple In-Memory Broker</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">클라이언트 라이브러리</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• SockJS Client</li>
                    <li>• STOMP.js</li>
                    <li>• React Native STOMP</li>
                    <li>• Android/iOS STOMP</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">보안 통합</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Spring Security</li>
                    <li>• JWT 토큰 인증</li>
                    <li>• Session 기반 인증</li>
                    <li>• CORS 설정</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">모니터링 & 확장</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Spring Boot Actuator</li>
                    <li>• Cluster 확장</li>
                    <li>• Load Balancing</li>
                    <li>• Connection Pool</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 도전해볼 만한 챌린지 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                도전해볼 만한 챌린지
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">초급: 실시간 채팅방 구현</h3>
                  <p className="text-gray-600 text-sm">기본적인 WebSocket 연결과 메시지 송수신 구현</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">중급: 다중 채팅방 시스템</h3>
                  <p className="text-gray-600 text-sm">토픽별 구독, 사용자 입장/퇴장 알림, 온라인 사용자 목록</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">고급: 게임 서버 구현</h3>
                  <p className="text-gray-600 text-sm">실시간 멀티플레이어 게임, 방 생성/참가, 게임 상태 동기화</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-808">전문가: 실시간 모니터링 대시보드</h3>
                  <p className="text-gray-600 text-sm">시스템 메트릭 실시간 스트리밍, 알림 시스템, 차트 업데이트</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 학습 계획 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">1</div>
                  <span className="text-sm text-gray-700">WebSocket vs HTTP 차이점</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">2</div>
                  <span className="text-sm text-gray-700">STOMP 프로토콜 이해</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">3</div>
                  <span className="text-sm text-gray-700">Spring WebSocket 설정</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">4</div>
                  <span className="text-sm text-gray-700">Message Broker 구성</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">5</div>
                  <span className="text-sm text-gray-700">클라이언트 JavaScript 구현</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">6</div>
                  <span className="text-sm text-gray-700">보안 및 인증 통합</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-semibold text-green-600">7</div>
                  <span className="text-sm text-gray-700">확장성 고려사항</span>
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
                <a href="https://docs.spring.io/spring-framework/reference/web/websocket.html" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring WebSocket Reference
                </a>
                <a href="https://stomp.github.io/stomp-specification-1.2.html" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  STOMP Protocol Specification
                </a>
                <a href="https://spring.io/guides/gs/messaging-stomp-websocket/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Using WebSocket with STOMP
                </a>
                <a href="https://sockjs.github.io/sockjs-protocol/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  SockJS Protocol
                </a>
                <a href="https://github.com/spring-guides/gs-messaging-stomp-websocket" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Sample WebSocket Application
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringWebSocketPage;
