import type React from "react";
import {
  Server,
  GitBranch,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const SpringGraphQLPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-pink-600 rounded-lg flex items-center justify-center">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spring with GraphQL
              </h1>
              <p className="text-gray-600 mt-2">
                유연하고 효율적인 API를 위한 GraphQL 통합
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-pink-600" />
                GraphQL vs REST API
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Spring GraphQL은 Spring Framework 6.0부터 공식 지원되는
                  GraphQL 통합 모듈입니다. 클라이언트가 필요한 데이터만 정확히
                  요청할 수 있어 효율적인 API 개발이 가능합니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      REST API
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 여러 엔드포인트</li>
                      <li>• 고정된 데이터 구조</li>
                      <li>• Over-fetching/Under-fetching</li>
                      <li>• 캐싱 용이</li>
                    </ul>
                  </div>
                  <div className="border border-pink-200 bg-pink-50 rounded-lg p-4">
                    <h3 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      GraphQL
                    </h3>
                    <ul className="text-sm text-pink-700 space-y-1">
                      <li>• 단일 엔드포인트</li>
                      <li>• 유연한 쿼리</li>
                      <li>• 정확한 데이터 페칭</li>
                      <li>• 실시간 구독</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  GraphQL 핵심 개념
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong className="text-blue-600">Query:</strong>
                      <br />
                      데이터 읽기 작업
                    </div>
                    <div>
                      <strong className="text-green-600">Mutation:</strong>
                      <br />
                      데이터 변경 작업
                    </div>
                    <div>
                      <strong className="text-purple-600">Subscription:</strong>
                      <br />
                      실시간 데이터 구독
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Spring GraphQL 구성 요소
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Schema Definition:</strong> GraphQL 스키마 정의
                    (.graphqls 파일)
                  </li>
                  <li>
                    <strong>DataFetcher:</strong> 실제 데이터 조회 로직
                  </li>
                  <li>
                    <strong>QueryResolver:</strong> 쿼리 처리를 위한 리졸버
                  </li>
                  <li>
                    <strong>MutationResolver:</strong> 변경 작업을 위한 리졸버
                  </li>
                  <li>
                    <strong>SubscriptionResolver:</strong> 실시간 구독 처리
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-600" />
                실제 구현 예제
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Schema 정의 (schema.graphqls)
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    type Query {"{"}
                    <br />
                    &nbsp;&nbsp;books: [Book]
                    <br />
                    &nbsp;&nbsp;book(id: ID!): Book
                    <br />
                    {"}"}
                    <br />
                    <br />
                    type Book {"{"}
                    <br />
                    &nbsp;&nbsp;id: ID!
                    <br />
                    &nbsp;&nbsp;title: String!
                    <br />
                    &nbsp;&nbsp;author: Author
                    <br />
                    {"}"}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    DataFetcher 구현
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    @Controller
                    <br />
                    public class BookController {"{"}
                    <br />
                    &nbsp;&nbsp;@QueryMapping
                    <br />
                    &nbsp;&nbsp;public List&lt;Book&gt; books() {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;return bookService.findAll();
                    <br />
                    &nbsp;&nbsp;{"}"}
                    <br />
                    &nbsp;&nbsp;@SchemaMapping
                    <br />
                    &nbsp;&nbsp;public Author author(Book book) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;return
                    authorService.findById(book.getAuthorId());
                    <br />
                    &nbsp;&nbsp;{"}"}
                    <br />
                    {"}"}
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
                    초급: 기본 CRUD GraphQL API
                  </h3>
                  <p className="text-gray-600 text-sm">
                    간단한 도서 관리 시스템의 GraphQL API 구현
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    중급: N+1 문제 해결
                  </h3>
                  <p className="text-gray-600 text-sm">
                    DataLoader를 활용한 효율적인 데이터 페칭
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    고급: 실시간 구독 시스템
                  </h3>
                  <p className="text-gray-600 text-sm">
                    WebSocket 기반의 실시간 알림 구독 시스템
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    전문가: 페더레이션 아키텍처
                  </h3>
                  <p className="text-gray-600 text-sm">
                    마이크로서비스 환경에서의 GraphQL Federation 구현
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pink-600" />
                학습 계획
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    1
                  </div>
                  <span className="text-sm text-gray-700">
                    GraphQL 기본 개념
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    2
                  </div>
                  <span className="text-sm text-gray-700">
                    Schema Definition Language
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    3
                  </div>
                  <span className="text-sm text-gray-700">
                    Spring GraphQL 설정
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    4
                  </div>
                  <span className="text-sm text-gray-700">
                    Query/Mutation 구현
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    5
                  </div>
                  <span className="text-sm text-gray-700">
                    DataLoader와 성능 최적화
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    6
                  </div>
                  <span className="text-sm text-gray-700">
                    인증/권한 및 보안
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-semibold text-pink-600">
                    7
                  </div>
                  <span className="text-sm text-gray-700">
                    테스팅과 모니터링
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
                  href="https://spring.io/projects/spring-graphql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring GraphQL 공식 사이트
                </a>
                <a
                  href="https://docs.spring.io/spring-graphql/reference/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring GraphQL Reference
                </a>
                <a
                  href="https://graphql.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  GraphQL 공식 사이트
                </a>
                <a
                  href="https://github.com/spring-projects/spring-graphql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  Spring GraphQL GitHub
                </a>
                <a
                  href="https://spring.io/guides/gs/graphql-server/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Building a GraphQL service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringGraphQLPage;
