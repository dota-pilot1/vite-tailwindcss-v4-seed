import type React from "react";
import { Zap, Brain, Bot, Sparkles, CheckCircle, ExternalLink, BookOpen, Code, Target, Link as LinkIcon } from "lucide-react";

const SpringAIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spring AI</h1>
              <p className="text-gray-600 mt-2">AI 애플리케이션 개발을 위한 Spring 프레임워크</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 개념 설명 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                개념 설명
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring AI는 AI 기반 애플리케이션 개발을 위한 Spring 프레임워크의 확장입니다.
                  다양한 AI 모델과의 통합을 통해 자연어 처리, 이미지 생성, 텍스트 분석 등의
                  기능을 쉽게 구현할 수 있습니다.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">핵심 개념</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold">AI Model Integration</h4>
                    </div>
                    <p className="text-sm text-gray-600">다양한 AI 모델과의 표준화된 통합</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold">Vector Database</h4>
                    </div>
                    <p className="text-sm text-gray-600">임베딩과 벡터 검색을 위한 데이터베이스 지원</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 특징</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>OpenAI, Azure OpenAI, Anthropic 등 다양한 AI 모델 지원</li>
                  <li>RAG (Retrieval-Augmented Generation) 패턴 구현</li>
                  <li>벡터 데이터베이스 통합 (Pinecone, Weaviate, Chroma)</li>
                  <li>텍스트 생성, 이미지 생성, 오디오 처리</li>
                  <li>Function Calling 및 Tool 사용</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">지원 AI 모델</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Chat Models:</strong><br/>
                      • OpenAI GPT-3.5/4<br/>
                      • Azure OpenAI<br/>
                      • Anthropic Claude
                    </div>
                    <div>
                      <strong>Embedding Models:</strong><br/>
                      • OpenAI text-embedding<br/>
                      • Azure OpenAI embeddings<br/>
                      • Transformers 모델
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 관련 생태계 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
                관련 생태계
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">AI 모델 제공자</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• OpenAI</li>
                    <li>• Azure OpenAI Service</li>
                    <li>• Anthropic Claude</li>
                    <li>• Hugging Face Transformers</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">벡터 데이터베이스</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pinecone</li>
                    <li>• Weaviate</li>
                    <li>• Chroma</li>
                    <li>• Redis Vector</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">문서 처리</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• PDF 문서 파싱</li>
                    <li>• 텍스트 분할 (Text Splitting)</li>
                    <li>• 메타데이터 추출</li>
                    <li>• ETL 파이프라인</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">모니터링 & 관찰</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 토큰 사용량 추적</li>
                    <li>• 응답 시간 모니터링</li>
                    <li>• 비용 추적</li>
                    <li>• 에러 핸들링</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 도전해볼 만한 챌린지 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                도전해볼 만한 챌린지
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">초급: 간단한 챗봇 구현</h3>
                  <p className="text-gray-600 text-sm">OpenAI API를 사용한 기본 질의응답 시스템</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">중급: RAG 기반 문서 검색</h3>
                  <p className="text-gray-600 text-sm">문서 임베딩과 벡터 검색을 통한 지식 기반 QA 시스템</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">고급: 멀티모달 AI 애플리케이션</h3>
                  <p className="text-gray-600 text-sm">텍스트, 이미지, 오디오를 처리하는 종합 AI 서비스</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">전문가: AI 에이전트 시스템</h3>
                  <p className="text-gray-600 text-sm">Function Calling을 활용한 자율적 작업 수행 에이전트</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 학습 계획 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">1</div>
                  <span className="text-sm text-gray-700">AI 기본 개념과 LLM 이해</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">2</div>
                  <span className="text-sm text-gray-700">Spring AI 프로젝트 설정</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">3</div>
                  <span className="text-sm text-gray-700">Chat Model API 통합</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">4</div>
                  <span className="text-sm text-gray-700">Embedding과 벡터 검색</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">5</div>
                  <span className="text-sm text-gray-700">RAG 패턴 구현</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">6</div>
                  <span className="text-sm text-gray-700">Function Calling 활용</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-semibold text-purple-600">7</div>
                  <span className="text-sm text-gray-700">프로덕션 배포 및 모니터링</span>
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
                <a href="https://spring.io/projects/spring-ai" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring AI 공식 사이트
                </a>
                <a href="https://docs.spring.io/spring-ai/reference/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring AI Reference Guide
                </a>
                <a href="https://github.com/spring-projects/spring-ai" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Spring AI GitHub
                </a>
                <a href="https://spring.io/blog/category/ai" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Spring AI Blog Posts
                </a>
                <a href="https://github.com/spring-projects/spring-ai-examples" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Code className="w-4 h-4" />
                  Spring AI Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringAIPage;
