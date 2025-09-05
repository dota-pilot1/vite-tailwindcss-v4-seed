import type React from "react";
import {
  Layers,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const SpringWebFluxPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spring WebFlux
              </h1>
              <p className="text-gray-600 mt-2">
                리액티브 프로그래밍을 위한 비동기 웹 프레임워크
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                개념 설명
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring WebFlux는 리액티브 스트림 기반의 비동기 웹
                  프레임워크입니다. 적은 수의 스레드로 많은 동시 요청을 처리할
                  수 있어 고성능 애플리케이션에 적합합니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  WebMVC vs WebFlux
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Spring WebMVC
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 동기식 처리</li>
                      <li>• Thread-per-request</li>
                      <li>• Blocking I/O</li>
                      <li>• 전통적인 서블릿 기반</li>
                    </ul>
                  </div>
                  <div className="border border-indigo-200 bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">
                      Spring WebFlux
                    </h4>
                    <ul className="text-sm text-indigo-700 space-y-1">
                      <li>• 비동기식 처리</li>
                      <li>• Event Loop</li>
                      <li>• Non-blocking I/O</li>
                      <li>• Reactive Streams</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  핵심 개념
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                    <strong>Mono:</strong> 0개 또는 1개의 아이템을 비동기로 처리
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                    <strong>Flux:</strong> 0개 이상의 아이템 스트림을 비동기로
                    처리
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                    <strong>Backpressure:</strong> 데이터 생산자와 소비자 간의
                    속도 조절
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  언제 사용할까?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>높은 동시성이 필요한 애플리케이션</li>
                  <li>I/O 집약적인 작업 (API 호출, 데이터베이스 쿼리)</li>
                  <li>실시간 스트리밍 데이터 처리</li>
                  <li>마이크로서비스 간 비동기 통신</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                도전해볼 만한 챌린지
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    초급: 기본 리액티브 API
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mono, Flux를 사용한 간단한 REST API 구현
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    중급: 리액티브 데이터베이스 연동
                  </h3>
                  <p className="text-gray-600 text-sm">
                    R2DBC를 사용한 비동기 데이터베이스 작업
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    고급: 스트리밍 데이터 처리
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Server-Sent Events와 무한 스트림 처리
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    전문가: 마이크로서비스 통신
                  </h3>
                  <p className="text-gray-600 text-sm">
                    WebClient와 Circuit Breaker를 활용한 탄력적 시스템
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    1
                  </div>
                  <span className="text-sm text-gray-700">
                    리액티브 프로그래밍 개념
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    2
                  </div>
                  <span className="text-sm text-gray-700">
                    Mono/Flux 기본 연산자
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    3
                  </div>
                  <span className="text-sm text-gray-700">
                    WebFlux 라우터와 핸들러
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    4
                  </div>
                  <span className="text-sm text-gray-700">
                    R2DBC 리액티브 데이터베이스
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    5
                  </div>
                  <span className="text-sm text-gray-700">
                    에러 처리와 테스팅
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                    6
                  </div>
                  <span className="text-sm text-gray-700">
                    성능 모니터링과 튜닝
                  </span>
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
                  href="https://docs.spring.io/spring-framework/reference/web/webflux.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring WebFlux Reference
                </a>
                <a
                  href="https://projectreactor.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Project Reactor
                </a>
                <a
                  href="https://spring.io/guides/gs/reactive-rest-service/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Building Reactive REST Service
                </a>
                <a
                  href="https://github.com/spring-projects/spring-framework/tree/main/spring-webflux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  WebFlux Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringWebFluxPage;
