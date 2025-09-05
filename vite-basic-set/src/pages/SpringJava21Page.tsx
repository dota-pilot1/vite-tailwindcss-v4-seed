import type React from "react";
import {
  Coffee,
  Sparkles,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const SpringJava21Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spring Java 21 문법
              </h1>
              <p className="text-gray-600 mt-2">
                최신 Java 21 기능을 활용한 Spring 개발
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-orange-600" />
                Java 21 주요 기능
              </h2>
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Record Patterns (Preview)
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    // Switch expressions with record patterns
                    <br />
                    switch (point) {"{"}
                    <br />
                    &nbsp;&nbsp;case Point(var x, var y) -&gt; processPoint(x,
                    y);
                    <br />
                    &nbsp;&nbsp;default -&gt; handleDefault();
                    <br />
                    {"}"}
                  </code>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Pattern Matching for switch
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    String formatValue(Object obj) {"{"}
                    <br />
                    &nbsp;&nbsp;return switch (obj) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;case Integer i -&gt; "int: " + i;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;case String s -&gt; "string: " + s;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;case null -&gt; "null";
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;default -&gt; obj.toString();
                    <br />
                    &nbsp;&nbsp;{"}"};<br />
                    {"}"}
                  </code>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Virtual Threads (Project Loom)
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Spring Boot 3.2+ 지원
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 경량 스레드로 높은 동시성 처리</li>
                    <li>• 기존 Thread Pool 모델의 한계 극복</li>
                    <li>• Blocking I/O 작업에서 성능 향상</li>
                    <li>• 간단한 설정으로 활성화 가능</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  String Templates (Preview)
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    String name = "Spring";
                    <br />
                    String version = "6.1";
                    <br />
                    String message = STR."Hello {"{"}
                    name
                    {"}"} {"{"}
                    version
                    {"}"}!";
                    <br />
                    // Result: "Hello Spring 6.1!"
                  </code>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Sequenced Collections
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <code className="text-sm">
                    List&lt;String&gt; list = List.of("a", "b", "c");
                    <br />
                    String first = list.getFirst(); // "a"
                    <br />
                    String last = list.getLast(); // "c"
                    <br />
                    List&lt;String&gt; reversed = list.reversed();
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Spring Boot와 Java 21
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Virtual Threads 활성화
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <code>
                      # application.properties
                      <br />
                      spring.threads.virtual.enabled=true
                    </code>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    성능 모니터링
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <code>
                      @Component
                      <br />
                      public class VirtualThreadMonitor {"{"}
                      <br />
                      &nbsp;&nbsp;@EventListener
                      <br />
                      &nbsp;&nbsp;public void handleRequest(RequestEvent event){" "}
                      {"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;Thread thread =
                      Thread.currentThread();
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;log.info("Thread: {"{"}
                      {"}"}', Virtual: {"{"}
                      {"}"}",
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thread.getName(),
                      thread.isVirtual());
                      <br />
                      &nbsp;&nbsp;{"}"}
                      <br />
                      {"}"}
                    </code>
                  </div>
                </div>
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
                    초급: Virtual Threads 비교 테스트
                  </h3>
                  <p className="text-gray-600 text-sm">
                    기존 Platform Threads vs Virtual Threads 성능 비교
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    중급: Pattern Matching 활용
                  </h3>
                  <p className="text-gray-600 text-sm">
                    복잡한 데이터 처리 로직을 Pattern Matching으로 간소화
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibent text-gray-800">
                    고급: Record와 Sealed Classes
                  </h3>
                  <p className="text-gray-600 text-sm">
                    도메인 모델을 Record와 Sealed Classes로 재설계
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    전문가: 고성능 웹 서버
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Virtual Threads를 활용한 초고속 동시성 처리 시스템
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    1
                  </div>
                  <span className="text-sm text-gray-700">
                    Java 21 새로운 문법 익히기
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    2
                  </div>
                  <span className="text-sm text-gray-700">
                    Virtual Threads 개념 이해
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    3
                  </div>
                  <span className="text-sm text-gray-700">
                    Pattern Matching 활용법
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    4
                  </div>
                  <span className="text-sm text-gray-700">
                    Spring Boot 3.2+ 설정
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    5
                  </div>
                  <span className="text-sm text-gray-700">
                    성능 측정 및 최적화
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-600">
                    6
                  </div>
                  <span className="text-sm text-gray-700">
                    실제 프로젝트 적용
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                참고 자료
              </h3>
              <div className="space-y-3">
                <a
                  href="https://openjdk.org/projects/jdk/21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Java 21 Release Notes
                </a>
                <a
                  href="https://spring.io/blog/2023/09/09/all-together-now-spring-boot-3-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring Boot 3.2 Virtual Threads
                </a>
                <a
                  href="https://openjdk.org/jeps/444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  JEP 444: Virtual Threads
                </a>
                <a
                  href="https://github.com/openjdk/loom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  Project Loom Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringJava21Page;
