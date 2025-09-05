import type React from "react";
import { Shield, Lock, Key, Users, CheckCircle, ExternalLink, BookOpen, Code, Target, Link as LinkIcon } from "lucide-react";

const SpringSecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spring Security</h1>
              <p className="text-gray-600 mt-2">엔터프라이즈급 보안 프레임워크</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 개념 설명 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                개념 설명
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring Security는 Spring 기반 애플리케이션에 인증(Authentication)과 인가(Authorization) 기능을 제공하는
                  강력하고 사용자 정의가 가능한 보안 프레임워크입니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">핵심 개념</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold">인증 (Authentication)</h4>
                    </div>
                    <p className="text-sm text-gray-600">사용자가 누구인지 확인하는 과정</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold">인가 (Authorization)</h4>
                    </div>
                    <p className="text-sm text-gray-600">인증된 사용자의 권한을 확인하는 과정</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 특징</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>포괄적이고 확장 가능한 인증 및 권한 부여 지원</li>
                  <li>세션 고정, clickjacking, 사이트 간 요청 위조 등의 공격으로부터 보호</li>
                  <li>Servlet API 통합</li>
                  <li>Spring Web MVC와의 선택적 통합</li>
                </ul>
              </div>
            </div>

            {/* 관련 생태계 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-green-600" />
                관련 생태계
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">인증 제공자</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• OAuth 2.0 / OpenID Connect</li>
                    <li>• JWT (JSON Web Tokens)</li>
                    <li>• LDAP</li>
                    <li>• Database Authentication</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">통합 도구</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Spring Boot</li>
                    <li>• Spring Web MVC</li>
                    <li>• Spring WebFlux</li>
                    <li>• Spring Data</li>
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
                  <h3 className="font-semibold text-gray-800">초급: 기본 인증 구현</h3>
                  <p className="text-gray-600 text-sm">Form 기반 로그인과 메모리 사용자 저장소 구현</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">중급: JWT + OAuth2 통합</h3>
                  <p className="text-gray-600 text-sm">JWT 토큰 기반 인증과 Google OAuth2 로그인 구현</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">고급: 다중 보안 구성</h3>
                  <p className="text-gray-600 text-sm">API와 웹 애플리케이션을 위한 분리된 보안 설정 구현</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">전문가: 커스텀 보안 필터 체인</h3>
                  <p className="text-gray-600 text-sm">사용자 정의 인증 필터와 권한 검사 로직 구현</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 학습 계획 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">1</div>
                  <span className="text-sm text-gray-700">Spring Security 기본 개념</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">2</div>
                  <span className="text-sm text-gray-700">인증 메커니즘 이해</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">3</div>
                  <span className="text-sm text-gray-700">권한 부여 및 역할 관리</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">4</div>
                  <span className="text-sm text-gray-700">웹 보안 설정</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">5</div>
                  <span className="text-sm text-gray-700">JWT 및 OAuth2 통합</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">6</div>
                  <span className="text-sm text-gray-700">실제 프로젝트 적용</span>
                </div>
              </div>
            </div>

            {/* 참고 자료 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-green-600" />
                참고 자료
              </h3>
              <div className="space-y-3">
                <a href="https://spring.io/projects/spring-security" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring Security 공식 문서
                </a>
                <a href="https://docs.spring.io/spring-security/reference/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring Security Reference
                </a>
                <a href="https://spring.io/guides/gs/securing-web/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Securing a Web Application
                </a>
                <a href="https://www.baeldung.com/spring-security" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Baeldung Spring Security
                </a>
                <a href="https://github.com/spring-projects/spring-security-samples" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Spring Security Samples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringSecurityPage;
