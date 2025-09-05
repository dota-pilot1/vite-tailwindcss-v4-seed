import type React from "react";
import { useState } from "react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "초급" | "중급" | "고급";
  category: string;
  techStack: string[];
  estimatedDays: number;
  resources: string[];
}

// 80개 풀스택 개발자 도전 과제 (완전 복원)
const FULLSTACK_CHALLENGES: Challenge[] = [
  // 초급 (1-20)
  {
    id: 1,
    title: "간단한 Todo 리스트 앱",
    description: "CRUD 기능을 포함한 기본적인 할 일 관리 애플리케이션",
    difficulty: "초급",
    category: "기초 웹앱",
    techStack: ["HTML", "CSS", "JavaScript", "Local Storage"],
    estimatedDays: 3,
    resources: ["MDN JavaScript 가이드", "DOM 조작 튜토리얼"]
  },
  {
    id: 2,
    title: "반응형 포트폴리오 웹사이트",
    description: "HTML, CSS, JavaScript로 만드는 개인 포트폴리오 사이트",
    difficulty: "초급",
    category: "퍼블리싱",
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    estimatedDays: 5,
    resources: ["CSS Grid & Flexbox 가이드", "반응형 웹 디자인 패턴"]
  },
  {
    id: 3,
    title: "날씨 정보 앱",
    description: "OpenWeatherMap API를 활용한 실시간 날씨 정보 표시",
    difficulty: "초급",
    category: "API 연동",
    techStack: ["JavaScript", "Fetch API", "JSON", "CSS"],
    estimatedDays: 4,
    resources: ["RESTful API 기초", "JSON 데이터 처리"]
  },
  {
    id: 4,
    title: "간단한 블로그 시스템",
    description: "정적 블로그 생성기를 활용한 개인 블로그 구축",
    difficulty: "초급",
    category: "콘텐츠 관리",
    techStack: ["Jekyll", "GitHub Pages", "Markdown", "Liquid"],
    estimatedDays: 6,
    resources: ["Jekyll 공식 문서", "Markdown 문법 가이드"]
  },
  {
    id: 5,
    title: "계산기 웹 애플리케이션",
    description: "기본 연산 기능을 포함한 웹 기반 계산기",
    difficulty: "초급",
    category: "기초 웹앱",
    techStack: ["HTML", "CSS", "JavaScript", "Math Functions"],
    estimatedDays: 3,
    resources: ["JavaScript 수학 객체", "이벤트 처리 기초"]
  },
  {
    id: 6,
    title: "색상 팔레트 생성기",
    description: "HSL 색상 모델을 활용한 색상 조합 생성 도구",
    difficulty: "초급",
    category: "디자인 도구",
    techStack: ["JavaScript", "Canvas API", "CSS", "Color Theory"],
    estimatedDays: 4,
    resources: ["Canvas API 튜토리얼", "색상 이론 기초"]
  },
  {
    id: 7,
    title: "메모 애플리케이션",
    description: "브라우저 로컬 스토리지를 활용한 간단한 메모장",
    difficulty: "초급",
    category: "데이터 저장",
    techStack: ["JavaScript", "LocalStorage", "CSS", "HTML"],
    estimatedDays: 4,
    resources: ["웹 스토리지 API", "데이터 직렬화"]
  },
  {
    id: 8,
    title: "QR 코드 생성기",
    description: "텍스트를 QR 코드로 변환하는 웹 도구",
    difficulty: "초급",
    category: "유틸리티",
    techStack: ["JavaScript", "QR Code Library", "HTML5", "CSS"],
    estimatedDays: 3,
    resources: ["QR.js 라이브러리", "JavaScript 라이브러리 사용법"]
  },
  {
    id: 9,
    title: "타이머 & 스톱워치 앱",
    description: "시간 측정 기능을 포함한 웹 기반 타이머 애플리케이션",
    difficulty: "초급",
    category: "시간 관리",
    techStack: ["JavaScript", "Date API", "CSS Animation", "HTML"],
    estimatedDays: 4,
    resources: ["JavaScript Date 객체", "CSS 애니메이션 기초"]
  },
  {
    id: 10,
    title: "단위 변환기",
    description: "길이, 무게, 온도 등 다양한 단위 변환 도구",
    difficulty: "초급",
    category: "유틸리티",
    techStack: ["JavaScript", "Math", "Form Handling", "CSS"],
    estimatedDays: 5,
    resources: ["폼 처리 기초", "수학 계산 로직"]
  },
  {
    id: 11,
    title: "간단한 퀴즈 앱",
    description: "객관식 문제와 점수 시스템을 포함한 퀴즈 게임",
    difficulty: "초급",
    category: "게임",
    techStack: ["JavaScript", "JSON", "CSS", "Event Handling"],
    estimatedDays: 6,
    resources: ["게임 로직 설계", "상태 관리 기초"]
  },
  {
    id: 12,
    title: "이미지 갤러리",
    description: "필터링과 라이트박스 기능을 포함한 이미지 갤러리",
    difficulty: "초급",
    category: "미디어",
    techStack: ["JavaScript", "CSS Grid", "Modal", "Image Optimization"],
    estimatedDays: 7,
    resources: ["이미지 최적화", "모달 창 구현"]
  },
  {
    id: 13,
    title: "RSS 피드 리더",
    description: "RSS 피드를 읽어와 표시하는 뉴스 리더 앱",
    difficulty: "초급",
    category: "콘텐츠 관리",
    techStack: ["JavaScript", "XML Parsing", "RSS", "Fetch API"],
    estimatedDays: 8,
    resources: ["RSS 형식 이해", "XML 파싱 기법"]
  },
  {
    id: 14,
    title: "북마크 관리자",
    description: "웹사이트 북마크를 저장하고 분류하는 관리 도구",
    difficulty: "초급",
    category: "데이터 관리",
    techStack: ["JavaScript", "LocalStorage", "URL Validation", "CSS"],
    estimatedDays: 6,
    resources: ["URL 유효성 검사", "데이터 구조 설계"]
  },
  {
    id: 15,
    title: "간단한 그림 그리기 앱",
    description: "HTML5 Canvas를 활용한 기본 드로잉 애플리케이션",
    difficulty: "초급",
    category: "그래픽스",
    techStack: ["Canvas API", "JavaScript", "Mouse Events", "CSS"],
    estimatedDays: 8,
    resources: ["Canvas 드로잉 기초", "마우스 이벤트 처리"]
  },
  {
    id: 16,
    title: "암호 생성기",
    description: "다양한 옵션을 제공하는 보안 암호 생성 도구",
    difficulty: "초급",
    category: "보안 도구",
    techStack: ["JavaScript", "Cryptography", "Random Generation", "Form Controls"],
    estimatedDays: 4,
    resources: ["암호 보안 기준", "난수 생성 기법"]
  },
  {
    id: 17,
    title: "URL 단축기",
    description: "긴 URL을 짧은 코드로 변환하는 서비스",
    difficulty: "초급",
    category: "웹 서비스",
    techStack: ["JavaScript", "URL Encoding", "Hash Functions", "LocalStorage"],
    estimatedDays: 7,
    resources: ["해시 함수 이해", "URL 인코딩"]
  },
  {
    id: 18,
    title: "텍스트 분석 도구",
    description: "글자 수, 단어 수, 읽기 시간을 계산하는 텍스트 분석기",
    difficulty: "초급",
    category: "텍스트 처리",
    techStack: ["JavaScript", "String Methods", "Regular Expressions", "Statistics"],
    estimatedDays: 5,
    resources: ["정규식 기초", "문자열 처리 기법"]
  },
  {
    id: 19,
    title: "간단한 채팅 인터페이스",
    description: "메시지 표시와 입력 기능을 포함한 채팅 UI",
    difficulty: "초급",
    category: "UI 컴포넌트",
    techStack: ["JavaScript", "DOM Manipulation", "CSS Flexbox", "Event Handling"],
    estimatedDays: 6,
    resources: ["DOM 조작 고급", "채팅 UI 패턴"]
  },
  {
    id: 20,
    title: "탭 기반 콘텐츠 뷰어",
    description: "탭으로 전환 가능한 콘텐츠 표시 컴포넌트",
    difficulty: "초급",
    category: "UI 컴포넌트",
    techStack: ["JavaScript", "CSS Transitions", "Event Delegation", "Accessibility"],
    estimatedDays: 5,
    resources: ["접근성 가이드라인", "탭 인터페이스 패턴"]
  },

  // 중급 (21-40)
  {
    id: 21,
    title: "React 기반 Todo 앱",
    description: "React Hook과 Context API를 활용한 상태관리 Todo 애플리케이션",
    difficulty: "중급",
    category: "React 앱",
    techStack: ["React", "React Hooks", "Context API", "CSS Modules"],
    estimatedDays: 10,
    resources: ["React 공식 문서", "Hook 패턴 가이드"]
  },
  {
    id: 22,
    title: "Node.js REST API 서버",
    description: "Express.js를 활용한 RESTful API 서버 구축",
    difficulty: "중급",
    category: "백엔드",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT"],
    estimatedDays: 14,
    resources: ["Express.js 가이드", "RESTful API 설계 원칙"]
  },
  {
    id: 23,
    title: "실시간 채팅 애플리케이션",
    description: "Socket.IO를 활용한 실시간 메시징 시스템",
    difficulty: "중급",
    category: "실시간 통신",
    techStack: ["Socket.IO", "Node.js", "React", "MongoDB"],
    estimatedDays: 18,
    resources: ["Socket.IO 문서", "실시간 통신 패턴"]
  },
  {
    id: 24,
    title: "JWT 인증 시스템",
    description: "회원가입, 로그인, 토큰 기반 인증이 포함된 시스템",
    difficulty: "중급",
    category: "인증",
    techStack: ["JWT", "bcrypt", "Express.js", "React", "Axios"],
    estimatedDays: 12,
    resources: ["JWT 토큰 이해", "보안 인증 패턴"]
  },
  {
    id: 25,
    title: "이미지 업로드 & 리사이징",
    description: "파일 업로드와 이미지 처리 기능을 포함한 미디어 관리 시스템",
    difficulty: "중급",
    category: "파일 처리",
    techStack: ["Multer", "Sharp", "AWS S3", "React Dropzone"],
    estimatedDays: 15,
    resources: ["이미지 처리 라이브러리", "클라우드 스토리지 연동"]
  },
  {
    id: 26,
    title: "결제 시스템 연동",
    description: "Stripe API를 활용한 온라인 결제 처리 시스템",
    difficulty: "중급",
    category: "결제",
    techStack: ["Stripe API", "Webhook", "Node.js", "React", "Security"],
    estimatedDays: 16,
    resources: ["Stripe 개발자 문서", "결제 보안 가이드"]
  },
  {
    id: 27,
    title: "검색 기능 구현",
    description: "Elasticsearch를 활용한 전문 검색 시스템",
    difficulty: "중급",
    category: "검색",
    techStack: ["Elasticsearch", "Node.js", "React", "Debouncing"],
    estimatedDays: 20,
    resources: ["Elasticsearch 가이드", "검색 UX 패턴"]
  },
  {
    id: 28,
    title: "데이터 시각화 대시보드",
    description: "Chart.js를 활용한 인터랙티브 데이터 대시보드",
    difficulty: "중급",
    category: "데이터 시각화",
    techStack: ["Chart.js", "React", "D3.js", "PostgreSQL"],
    estimatedDays: 17,
    resources: ["Chart.js 문서", "데이터 시각화 원칙"]
  },
  {
    id: 29,
    title: "캐싱 시스템 구현",
    description: "Redis를 활용한 데이터 캐싱과 세션 관리",
    difficulty: "중급",
    category: "캐싱",
    techStack: ["Redis", "Node.js", "Express Session", "Performance"],
    estimatedDays: 13,
    resources: ["Redis 문서", "캐싱 전략 가이드"]
  },
  {
    id: 30,
    title: "API 게이트웨이 구축",
    description: "마이크로서비스를 위한 API 게이트웨이 시스템",
    difficulty: "중급",
    category: "API 게이트웨이",
    techStack: ["Express Gateway", "Rate Limiting", "Load Balancing", "Authentication"],
    estimatedDays: 19,
    resources: ["API 게이트웨이 패턴", "마이크로서비스 아키텍처"]
  },
  {
    id: 31,
    title: "WebSocket STOMP 실시간 채팅 & 유저 대시보드",
    description: "WebSocket과 STOMP 프로토콜을 활용한 실시간 채팅 및 사용자 상태 대시보드 구현",
    difficulty: "중급",
    category: "실시간 통신",
    techStack: ["WebSocket", "STOMP", "Spring Boot", "React", "Socket.IO"],
    estimatedDays: 14,
    resources: ["STOMP Protocol 공식문서", "Socket.IO 가이드", "Spring WebSocket 레퍼런스"]
  },
  {
    id: 32,
    title: "TypeScript 마이그레이션",
    description: "기존 JavaScript 프로젝트를 TypeScript로 점진적 마이그레이션",
    difficulty: "중급",
    category: "코드 품질",
    techStack: ["TypeScript", "ESLint", "Prettier", "Type Definitions"],
    estimatedDays: 12,
    resources: ["TypeScript 핸드북", "마이그레이션 가이드"]
  },
  {
    id: 33,
    title: "PWA 구현",
    description: "Service Worker와 Web App Manifest를 활용한 Progressive Web App",
    difficulty: "중급",
    category: "PWA",
    techStack: ["Service Worker", "Web App Manifest", "IndexedDB", "Push Notifications"],
    estimatedDays: 16,
    resources: ["PWA 개발 가이드", "Service Worker 쿡북"]
  },
  {
    id: 34,
    title: "테스트 자동화 구축",
    description: "Jest, Cypress를 활용한 단위 테스트와 E2E 테스트",
    difficulty: "중급",
    category: "테스팅",
    techStack: ["Jest", "React Testing Library", "Cypress", "Test Coverage"],
    estimatedDays: 15,
    resources: ["Jest 공식 문서", "테스팅 베스트 프랙티스"]
  },
  {
    id: 35,
    title: "Docker 컨테이너화",
    description: "애플리케이션의 Docker 컨테이너화와 Docker Compose 활용",
    difficulty: "중급",
    category: "DevOps",
    techStack: ["Docker", "Docker Compose", "Multi-stage Build", "Volume Management"],
    estimatedDays: 11,
    resources: ["Docker 공식 문서", "컨테이너화 베스트 프랙티스"]
  },
  {
    id: 36,
    title: "GraphQL API 개발",
    description: "Apollo Server를 활용한 GraphQL API 서버 구축",
    difficulty: "중급",
    category: "API",
    techStack: ["GraphQL", "Apollo Server", "Schema Design", "Resolver Patterns"],
    estimatedDays: 18,
    resources: ["GraphQL 스펙", "Apollo Server 문서"]
  },
  {
    id: 37,
    title: "상태 관리 라이브러리 적용",
    description: "Redux Toolkit 또는 Zustand를 활용한 복잡한 상태 관리",
    difficulty: "중급",
    category: "상태 관리",
    techStack: ["Redux Toolkit", "RTK Query", "Zustand", "Immer"],
    estimatedDays: 13,
    resources: ["Redux Toolkit 가이드", "상태 관리 패턴"]
  },
  {
    id: 38,
    title: "성능 최적화",
    description: "React 앱의 렌더링 최적화와 번들 크기 최적화",
    difficulty: "중급",
    category: "성능 최적화",
    techStack: ["React.memo", "useMemo", "Lazy Loading", "Code Splitting"],
    estimatedDays: 14,
    resources: ["React 성능 최적화", "웹 성능 측정"]
  },
  {
    id: 39,
    title: "CI/CD 파이프라인",
    description: "GitHub Actions를 활용한 자동화된 빌드 및 배포",
    difficulty: "중급",
    category: "DevOps",
    techStack: ["GitHub Actions", "Automated Testing", "Deployment", "Environment Management"],
    estimatedDays: 12,
    resources: ["GitHub Actions 문서", "CI/CD 베스트 프랙티스"]
  },
  {
    id: 40,
    title: "모바일 반응형 최적화",
    description: "터치 인터랙션과 모바일 UX를 고려한 반응형 웹 앱",
    difficulty: "중급",
    category: "모바일 최적화",
    techStack: ["Responsive Design", "Touch Events", "Viewport Meta", "Mobile Performance"],
    estimatedDays: 10,
    resources: ["모바일 웹 가이드", "터치 인터페이스 패턴"]
  },

  // 고급 (41-80) - 일반 고급 과제 + 관리자 대시보드 과제
  {
    id: 41,
    title: "Redis & Kafka 실시간 이벤트 브로드캐스팅",
    description: "Redis와 Kafka를 활용한 대규모 실시간 이벤트 처리 및 브로드캐스팅 시스템",
    difficulty: "고급",
    category: "메시징 & 캐싱",
    techStack: ["Redis", "Apache Kafka", "Spring Boot", "Docker"],
    estimatedDays: 21,
    resources: ["Kafka Documentation", "Redis Streams Guide", "Event-Driven Architecture 패턴"]
  },
  {
    id: 42,
    title: "Lexical Editor 기반 슈퍼 에디터",
    description: "Meta의 Lexical 프레임워크를 활용한 고도화된 텍스트 에디터 구현",
    difficulty: "고급",
    category: "에디터 & UI",
    techStack: ["Lexical", "React", "TypeScript", "Tailwind CSS"],
    estimatedDays: 28,
    resources: ["Lexical 공식 문서", "Rich Text Editor 패턴", "WYSIWYG 에디터 베스트 프랙티스"]
  },
  {
    id: 43,
    title: "마이크로서비스 아키텍처",
    description: "Spring Boot + NestJS를 활용한 이상적인 MSA 구조 설계",
    difficulty: "고급",
    category: "백엔드 & MSA",
    techStack: ["Spring Boot", "NestJS", "API Gateway", "Service Mesh", "gRPC"],
    estimatedDays: 56,
    resources: ["MSA 설계 패턴", "Spring Cloud 가이드", "NestJS 마이크로서비스 문서"]
  },
  {
    id: 44,
    title: "실시간 영상 스트리밍 플랫폼",
    description: "WebRTC와 미디어 서버를 활용한 대규모 라이브 스트리밍 서비스",
    difficulty: "고급",
    category: "미디어 & 스트리밍",
    techStack: ["WebRTC", "FFmpeg", "RTMP", "HLS", "CDN"],
    estimatedDays: 56,
    resources: ["WebRTC 심화", "미디어 서버 구축", "CDN 최적화"]
  },
  {
    id: 45,
    title: "머신러닝 추천 시스템",
    description: "사용자 행동 기반 개인화 추천 엔진과 실시간 학습 시스템",
    difficulty: "고급",
    category: "머신러닝",
    techStack: ["Python", "TensorFlow", "Apache Spark", "MLflow", "Feature Store"],
    estimatedDays: 49,
    resources: ["추천 시스템 알고리즘", "MLOps 파이프라인", "실시간 ML 서빙"]
  },
  {
    id: 46,
    title: "블록체인 DApp 플랫폼",
    description: "이더리움 기반 완전한 탈중앙화 애플리케이션 플랫폼",
    difficulty: "고급",
    category: "블록체인",
    techStack: ["Solidity", "Web3.js", "Ethereum", "IPFS", "Smart Contracts"],
    estimatedDays: 42,
    resources: ["Solidity 문서", "Web3 개발 가이드", "DeFi 프로토콜 분석"]
  },
  {
    id: 47,
    title: "Kubernetes 오케스트레이션",
    description: "컨테이너 오케스트레이션과 서비스 메시 구축",
    difficulty: "고급",
    category: "인프라 & DevOps",
    techStack: ["Kubernetes", "Istio", "Helm", "Prometheus", "Grafana"],
    estimatedDays: 35,
    resources: ["Kubernetes 공식 문서", "Service Mesh 패턴", "클라우드 네이티브 아키텍처"]
  },
  {
    id: 48,
    title: "대규모 이커머스 플랫폼",
    description: "무신사급 대규모 이커머스 플랫폼의 모든 기능 구현",
    difficulty: "고급",
    category: "이커머스",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Payment Gateway"],
    estimatedDays: 91,
    resources: ["이커머스 아키텍처", "결제 시스템 구현", "재고 관리 시스템"]
  },
  {
    id: 49,
    title: "AI 콜봇 시스템",
    description: "음성인식과 자연어처리를 활용한 고도화된 콜봇 시스템",
    difficulty: "고급",
    category: "AI & 음성처리",
    techStack: ["STT", "TTS", "NLP", "Machine Learning", "WebRTC"],
    estimatedDays: 49,
    resources: ["음성인식 API 문서", "자연어처리 모델", "대화형 AI 시스템 설계"]
  },
  {
    id: 50,
    title: "실시간 협업 에디터",
    description: "Google Docs 수준의 실시간 공동 편집 시스템",
    difficulty: "고급",
    category: "협업 도구",
    techStack: ["Operational Transform", "WebSocket", "CRDT", "Monaco Editor"],
    estimatedDays: 63,
    resources: ["Operational Transform 이론", "실시간 협업 알고리즘", "충돌 해결 전략"]
  },
  {
    id: 51,
    title: "서버리스 아키텍처 구축",
    description: "AWS Lambda와 서버리스 컴포넌트를 활용한 확장 가능한 시스템",
    difficulty: "고급",
    category: "서버리스",
    techStack: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFormation", "CDK"],
    estimatedDays: 35,
    resources: ["서버리스 아키텍처 패턴", "AWS Lambda 최적화", "서버리스 보안"]
  },
  {
    id: 52,
    title: "GraphQL Federation 시스템",
    description: "분산 GraphQL 스키마를 통합하는 Federation 시스템",
    difficulty: "고급",
    category: "API & GraphQL",
    techStack: ["GraphQL", "Apollo Federation", "Schema Stitching", "Distributed Systems"],
    estimatedDays: 28,
    resources: ["GraphQL Federation 가이드", "분산 스키마 설계", "GraphQL 성능 최적화"]
  },
  {
    id: 53,
    title: "실시간 IoT 데이터 처리",
    description: "대규모 IoT 센서 데이터의 실시간 수집과 분석 시스템",
    difficulty: "고급",
    category: "IoT & 빅데이터",
    techStack: ["Apache Kafka", "InfluxDB", "Grafana", "MQTT", "Time Series Analysis"],
    estimatedDays: 42,
    resources: ["시계열 데이터베이스", "IoT 아키텍처 패턴", "실시간 스트림 처리"]
  },
  {
    id: 54,
    title: "AR/VR 웹 플랫폼",
    description: "WebXR API를 활용한 몰입형 3D 웹 경험 플랫폼",
    difficulty: "고급",
    category: "AR/VR",
    techStack: ["WebXR", "Three.js", "WebGL", "A-Frame", "Spatial Computing"],
    estimatedDays: 49,
    resources: ["WebXR 스펙", "3D 웹 그래픽스", "공간 컴퓨팅 개념"]
  },
  {
    id: 55,
    title: "분산 시스템 모니터링",
    description: "마이크로서비스 환경의 종합 모니터링과 로깅 시스템",
    difficulty: "고급",
    category: "모니터링",
    techStack: ["Prometheus", "Grafana", "Jaeger", "ELK Stack", "OpenTelemetry"],
    estimatedDays: 35,
    resources: ["분산 추적", "메트릭 수집 전략", "로그 집계 패턴"]
  },
  {
    id: 56,
    title: "고성능 검색 엔진",
    description: "Elasticsearch 클러스터 기반 대용량 검색 시스템",
    difficulty: "고급",
    category: "검색 & 인덱싱",
    techStack: ["Elasticsearch", "Logstash", "Kibana", "Full-text Search", "Relevance Scoring"],
    estimatedDays: 42,
    resources: ["Elasticsearch 클러스터링", "검색 관련성 튜닝", "인덱싱 최적화"]
  },
  {
    id: 57,
    title: "보안 취약점 스캐너",
    description: "웹 애플리케이션 보안 취약점을 자동 탐지하는 보안 도구",
    difficulty: "고급",
    category: "사이버 보안",
    techStack: ["Python", "Security Scanning", "OWASP", "Penetration Testing"],
    estimatedDays: 56,
    resources: ["OWASP Top 10", "웹 보안 테스팅", "취약점 분석 도구"]
  },
  {
    id: 58,
    title: "크로스플랫폼 데스크톱 앱",
    description: "Electron과 Tauri를 활용한 고성능 데스크톱 애플리케이션",
    difficulty: "고급",
    category: "데스크톱 앱",
    techStack: ["Electron", "Tauri", "Rust", "Native APIs", "Auto-updater"],
    estimatedDays: 35,
    resources: ["Electron 아키텍처", "Tauri vs Electron 비교", "네이티브 통합"]
  },
  {
    id: 59,
    title: "분산 캐시 시스템",
    description: "Redis Cluster와 일관성 해싱을 활용한 분산 캐싱",
    difficulty: "고급",
    category: "캐싱 & 성능",
    techStack: ["Redis Cluster", "Consistent Hashing", "Cache Strategies", "High Availability"],
    estimatedDays: 28,
    resources: ["분산 캐시 패턴", "일관성 해싱 이론", "캐시 무효화 전략"]
  },
  {
    id: 60,
    title: "통합 개발 환경 (IDE) 구축",
    description: "VSCode Extension 또는 독립 IDE를 통한 맞춤형 개발 환경",
    difficulty: "고급",
    category: "개발 도구",
    techStack: ["Electron", "Monaco Editor", "Language Server Protocol", "Debug Adapter"],
    estimatedDays: 84,
    resources: ["IDE 아키텍처", "Language Server 구현", "디버깅 프로토콜"]
  },

  // 관리자 대시보드 전용 고급 과제 (61-80)
  {
    id: 61,
    title: "실시간 시스템 모니터링 대시보드",
    description: "서버 리소스, 네트워크, 애플리케이션 상태를 실시간으로 모니터링하는 관리자 대시보드",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["WebSocket", "Chart.js", "System Metrics", "Alert System", "Real-time Updates"],
    estimatedDays: 35,
    resources: ["시스템 메트릭 수집", "실시간 차트 라이브러리", "알림 시스템 설계"]
  },
  {
    id: 62,
    title: "고급 사용자 권한 관리 시스템",
    description: "RBAC, ABAC 기반의 세밀한 권한 제어와 역할 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["RBAC", "ABAC", "Permission Matrix", "Role Hierarchy", "Access Control"],
    estimatedDays: 28,
    resources: ["권한 관리 패턴", "보안 접근 제어", "역할 기반 시스템 설계"]
  },
  {
    id: 63,
    title: "동적 폼 빌더 & 검증 시스템",
    description: "관리자가 GUI로 폼을 생성하고 복잡한 검증 규칙을 설정할 수 있는 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Form Builder", "JSON Schema", "Dynamic Validation", "Drag & Drop", "Rule Engine"],
    estimatedDays: 42,
    resources: ["동적 폼 생성 패턴", "JSON Schema 검증", "드래그 앤 드롭 UI"]
  },
  {
    id: 64,
    title: "고급 데이터 시각화 엔진",
    description: "D3.js 기반 커스텀 차트와 인터랙티브 데이터 탐색 도구",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["D3.js", "Canvas Rendering", "Data Mining", "Interactive Charts", "Export Tools"],
    estimatedDays: 49,
    resources: ["D3.js 고급 패턴", "데이터 시각화 원칙", "성능 최적화 기법"]
  },
  {
    id: 65,
    title: "멀티테넌트 관리 시스템",
    description: "여러 조직을 위한 격리된 환경과 리소스 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Multi-tenancy", "Data Isolation", "Resource Quota", "Tenant Management", "SaaS Architecture"],
    estimatedDays: 56,
    resources: ["멀티테넌트 아키텍처", "데이터 격리 전략", "SaaS 설계 패턴"]
  },
  {
    id: 66,
    title: "실시간 로그 분석 & 검색 시스템",
    description: "대용량 로그 데이터의 실시간 분석과 고급 검색 기능을 제공하는 관리 도구",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Elasticsearch", "Logstash", "Kibana", "Log Parsing", "Real-time Analysis"],
    estimatedDays: 45,
    resources: ["ELK Stack 고급 활용", "로그 분석 패턴", "실시간 스트림 처리"]
  },
  {
    id: 67,
    title: "AI 기반 이상 탐지 & 알림 시스템",
    description: "머신러닝을 활용한 시스템 이상 징후 탐지와 지능형 알림 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Machine Learning", "Anomaly Detection", "Alert Engine", "Predictive Analytics", "Time Series Analysis"],
    estimatedDays: 63,
    resources: ["이상 탐지 알고리즘", "시계열 데이터 분석", "예측 분석 모델"]
  },
  {
    id: 68,
    title: "고급 백업 & 복원 관리 시스템",
    description: "자동화된 백업 스케줄링과 포인트-인-타임 복원을 지원하는 데이터 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Backup Strategies", "Point-in-time Recovery", "Incremental Backup", "Data Integrity", "Disaster Recovery"],
    estimatedDays: 38,
    resources: ["백업 전략 설계", "재해 복구 계획", "데이터 무결성 검증"]
  },
  {
    id: 69,
    title: "실시간 성능 프로파일링 도구",
    description: "애플리케이션의 실시간 성능 분석과 병목 지점 식별을 위한 프로파일링 대시보드",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Performance Profiling", "Flame Graphs", "Memory Analysis", "CPU Monitoring", "Database Profiling"],
    estimatedDays: 52,
    resources: ["성능 프로파일링 기법", "플레임 그래프 생성", "메모리 분석 도구"]
  },
  {
    id: 70,
    title: "코드 품질 & 보안 취약점 대시보드",
    description: "정적 분석과 보안 스캔 결과를 통합하여 보여주는 코드 품질 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Static Analysis", "Security Scanning", "Code Metrics", "Vulnerability Assessment", "Compliance Reporting"],
    estimatedDays: 35,
    resources: ["코드 품질 메트릭", "보안 취약점 스캐닝", "컴플라이언스 체크"]
  },
  {
    id: 71,
    title: "고급 워크플로우 & 승인 시스템",
    description: "복잡한 비즈니스 프로세스를 위한 유연한 워크플로우와 다단계 승인 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Workflow Engine", "BPMN", "Approval Chains", "Process Automation", "State Management"],
    estimatedDays: 49,
    resources: ["워크플로우 엔진 설계", "BPMN 표준", "프로세스 자동화"]
  },
  {
    id: 72,
    title: "실시간 API 트래픽 분석 대시보드",
    description: "API 호출 패턴, 응답 시간, 에러율을 실시간으로 분석하는 API 모니터링 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["API Analytics", "Rate Limiting", "Traffic Monitoring", "Response Time Analysis", "Error Tracking"],
    estimatedDays: 33,
    resources: ["API 모니터링 패턴", "트래픽 분석 기법", "성능 메트릭 수집"]
  },
  {
    id: 73,
    title: "지능형 리소스 할당 & 스케일링 시스템",
    description: "사용 패턴을 분석하여 자동으로 리소스를 할당하고 스케일링하는 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Auto Scaling", "Resource Allocation", "Predictive Scaling", "Load Balancing", "Cost Optimization"],
    estimatedDays: 56,
    resources: ["자동 스케일링 전략", "리소스 최적화", "비용 관리 시스템"]
  },
  {
    id: 74,
    title: "고급 데이터베이스 관리 콘솔",
    description: "쿼리 최적화, 인덱스 분석, 성능 튜닝을 위한 통합 데이터베이스 관리 도구",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Query Optimization", "Index Analysis", "Performance Tuning", "Database Monitoring", "Schema Management"],
    estimatedDays: 42,
    resources: ["데이터베이스 성능 튜닝", "쿼리 최적화 기법", "인덱스 설계 원칙"]
  },
  {
    id: 75,
    title: "실시간 보안 위협 탐지 대시보드",
    description: "침입 탐지, 비정상 접근, 보안 이벤트를 실시간으로 모니터링하는 보안 관제 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Intrusion Detection", "Security Analytics", "Threat Intelligence", "SIEM", "Incident Response"],
    estimatedDays: 63,
    resources: ["보안 정보 이벤트 관리", "위협 인텔리전스", "침입 탐지 시스템"]
  },
  {
    id: 76,
    title: "고급 캐시 관리 & 무효화 시스템",
    description: "분산 캐시의 효율적 관리와 지능적 캐시 무효화 전략을 제공하는 관리 도구",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Distributed Caching", "Cache Invalidation", "Memory Management", "Performance Monitoring", "Hit Rate Analysis"],
    estimatedDays: 28,
    resources: ["분산 캐시 관리", "캐시 무효화 패턴", "메모리 최적화"]
  },
  {
    id: 77,
    title: "실시간 사용자 행동 분석 대시보드",
    description: "사용자의 실시간 행동 패턴을 추적하고 인사이트를 제공하는 분석 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["User Analytics", "Behavioral Tracking", "Heatmaps", "Session Recording", "Conversion Funnel"],
    estimatedDays: 45,
    resources: ["사용자 행동 분석", "웹 분석 도구", "전환율 최적화"]
  },
  {
    id: 78,
    title: "고급 설정 관리 & 피처 토글 시스템",
    description: "런타임 설정 변경과 단계별 기능 배포를 지원하는 설정 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Feature Flags", "Configuration Management", "A/B Testing", "Canary Deployment", "Runtime Configuration"],
    estimatedDays: 35,
    resources: ["피처 토글 패턴", "설정 관리 전략", "카나리 배포"]
  },
  {
    id: 79,
    title: "지능형 용량 계획 & 예측 시스템",
    description: "사용량 패턴을 분석하여 미래 용량 요구사항을 예측하는 관리 시스템",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["Capacity Planning", "Predictive Analytics", "Resource Forecasting", "Trend Analysis", "Growth Modeling"],
    estimatedDays: 49,
    resources: ["용량 계획 방법론", "예측 분석 모델", "트렌드 분석 기법"]
  },
  {
    id: 80,
    title: "통합 DevOps 파이프라인 관리 콘솔",
    description: "CI/CD, 배포, 모니터링, 롤백을 통합 관리하는 DevOps 운영 대시보드",
    difficulty: "고급",
    category: "관리자 대시보드",
    techStack: ["CI/CD Management", "Deployment Automation", "Pipeline Monitoring", "Rollback Systems", "Infrastructure as Code"],
    estimatedDays: 70,
    resources: ["DevOps 파이프라인 설계", "배포 자동화", "인프라 코드화"]
  }
];

const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
  switch (difficulty) {
    case "초급":
      return "bg-green-100 text-green-800 border-green-200";
    case "중급":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "고급":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const ChallengeTable: React.FC<{ challenges: Challenge[]; title: string; description: string }> = ({
  challenges,
  title,
  description
}) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  과제명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                  설명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                  기술 스택
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                  참고 자료
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {challenge.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    <div className="max-w-xs">
                      {challenge.title}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div className="max-w-md leading-relaxed">
                      {challenge.description}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {challenge.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {challenge.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {challenge.estimatedDays}일
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      <ul className="space-y-1">
                        {challenge.resources.map((resource, idx) => (
                          <li key={idx} className="text-xs leading-relaxed">
                            • {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlanFullstackPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "초급" | "중급" | "고급">("all");

  const beginnerChallenges = FULLSTACK_CHALLENGES.filter(c => c.difficulty === "초급");
  const intermediateChallenges = FULLSTACK_CHALLENGES.filter(c => c.difficulty === "중급");
  const advancedChallenges = FULLSTACK_CHALLENGES.filter(c => c.difficulty === "고급");
  const adminDashboardChallenges = advancedChallenges.filter(c => c.category === "관리자 대시보드");
  const otherAdvancedChallenges = advancedChallenges.filter(c => c.category !== "관리자 대시보드");

  const getFilteredChallenges = () => {
    switch (activeTab) {
      case "초급":
        return beginnerChallenges;
      case "중급":
        return intermediateChallenges;
      case "고급":
        return advancedChallenges;
      default:
        return FULLSTACK_CHALLENGES;
    }
  };

  const TabButton: React.FC<{
    tab: "all" | "초급" | "중급" | "고급";
    label: string;
    count: number
  }> = ({ tab, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label} ({count})
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            풀스택 웹개발자를 위한 80가지 도전 과제
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            초급부터 고급까지, 단계별로 성장할 수 있는 실무 중심의 프로젝트 과제들입니다.
            관리자 대시보드 전용 과제 20개가 포함되어 있습니다!
          </p>

          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton tab="all" label="전체" count={FULLSTACK_CHALLENGES.length} />
            <TabButton tab="초급" label="초급" count={beginnerChallenges.length} />
            <TabButton tab="중급" label="중급" count={intermediateChallenges.length} />
            <TabButton tab="고급" label="고급" count={advancedChallenges.length} />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <h3 className="font-medium text-gray-900">초급 과제</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-1">{beginnerChallenges.length}개</p>
            <p className="text-sm text-gray-500">기초 기술 습득 (3-8일)</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h3 className="font-medium text-gray-900">중급 과제</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-1">{intermediateChallenges.length}개</p>
            <p className="text-sm text-gray-500">실무 기술 확장 (10-20일)</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <h3 className="font-medium text-gray-900">고급 과제</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-1">{advancedChallenges.length}개</p>
            <p className="text-sm text-gray-500">전문가 수준 (21-91일)</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <h3 className="font-medium text-gray-900">관리자 대시보드</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600 mt-1">{adminDashboardChallenges.length}개</p>
            <p className="text-sm text-gray-500">기깔나는 관리 시스템</p>
          </div>
        </div>

        {/* 과제 테이블 */}
        {activeTab === "all" ? (
          <>
            <ChallengeTable
              challenges={beginnerChallenges}
              title="🌱 초급 과제 (1-20번)"
              description="웹 개발의 기초를 다지는 입문 수준의 프로젝트들입니다. HTML, CSS, JavaScript의 기본기를 익히고 간단한 웹 애플리케이션을 만들어보세요."
            />
            <ChallengeTable
              challenges={intermediateChallenges}
              title="🚀 중급 과제 (21-40번)"
              description="React, Node.js 등 모던 웹 기술 스택을 활용한 실무 수준의 프로젝트들입니다. 상태관리, API 연동, 인증 등을 경험해보세요."
            />
            <ChallengeTable
              challenges={otherAdvancedChallenges}
              title="⚡ 고급 과제 (41-60번)"
              description="대규모 시스템 설계와 고도화된 기술을 다루는 전문가 수준의 프로젝트들입니다. 아키텍처 설계, 성능 최적화, 분산 시스템 등을 학습하세요."
            />
            <ChallengeTable
              challenges={adminDashboardChallenges}
              title="💼 관리자 대시보드 전용 고급 과제 (61-80번)"
              description="기깔나는 관리자 페이지를 만들기 위한 전문 기술들입니다. 실시간 모니터링, 고급 권한 관리, AI 기반 분석 시스템 등을 구축해보세요."
            />
          </>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                      과제명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                      설명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      난이도
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                      기술 스택
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      기간
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                      참고 자료
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredChallenges().map((challenge) => (
                    <tr key={challenge.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {challenge.id}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                        <div className="max-w-xs">
                          {challenge.title}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="max-w-md leading-relaxed">
                          {challenge.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {challenge.category}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {challenge.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {challenge.estimatedDays}일
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          <ul className="space-y-1">
                            {challenge.resources.map((resource, idx) => (
                              <li key={idx} className="text-xs leading-relaxed">
                                • {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 학습 가이드 */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 풀스택 개발 로드맵 가이드</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h3 className="font-semibold text-green-800">초급 단계 (1-3개월)</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                웹 개발의 기초를 탄탄히 다지는 단계입니다.
              </p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• HTML, CSS, JavaScript 기본 문법</li>
                <li>• DOM 조작과 이벤트 처리</li>
                <li>• 간단한 웹 애플리케이션 제작</li>
                <li>• API 연동의 기초</li>
                <li>• 반응형 웹 디자인</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h3 className="font-semibold text-blue-800">중급 단계 (3-8개월)</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                모던 웹 기술 스택을 활용한 실무 역량 개발 단계입니다.
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• React, Vue.js 등 프론트엔드 프레임워크</li>
                <li>• Node.js, Express.js 백엔드 개발</li>
                <li>• 데이터베이스 연동 및 상태관리</li>
                <li>• 인증 시스템 구현</li>
                <li>• 테스팅과 배포 자동화</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <h3 className="font-semibold text-purple-800">고급 단계 (8개월 이상)</h3>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                대규모 시스템 설계와 전문 기술 습득 단계입니다.
              </p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• 마이크로서비스 아키텍처 설계</li>
                <li>• 클라우드 서비스와 DevOps</li>
                <li>• 고성능 시스템 최적화</li>
                <li>• AI/ML 서비스 통합</li>
                <li>• 대규모 프로덕션 운영</li>
              </ul>
            </div>
          </div>

          {/* 관리자 대시보드 특별 가이드 */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 mb-6">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <h3 className="font-semibold text-orange-800">💼 관리자 대시보드 마스터 과정</h3>
            </div>
            <p className="text-sm text-orange-700 mb-3">
              기깔나는 관리자 페이지를 만들기 위한 전문 기술들을 학습하세요.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• 실시간 모니터링 & 알림 시스템</li>
                <li>• 고급 사용자 권한 관리 (RBAC/ABAC)</li>
                <li>• 동적 폼 빌더 & 검증 엔진</li>
                <li>• AI 기반 이상 탐지 시스템</li>
              </ul>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• 고급 데이터 시각화 (D3.js)</li>
                <li>• 멀티테넌트 SaaS 아키텍처</li>
                <li>• DevOps 파이프라인 관리 콘솔</li>
                <li>• 보안 위협 탐지 & 대응 시스템</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">💡 효과적인 학습 팁</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>단계적 접근:</strong> 난이도 순서대로 차근차근 진행하세요.</p>
              <p>• <strong>실습 중심:</strong> 이론보다는 직접 만들어보며 학습하세요.</p>
              <p>• <strong>코드 리뷰:</strong> 다른 개발자의 코드를 분석하고 피드백받으세요.</p>
              <p>• <strong>포트폴리오:</strong> 완성한 프로젝트를 GitHub에 정리하세요.</p>
              <p>• <strong>커뮤니티 참여:</strong> 개발자 커뮤니티에서 경험을 공유하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanFullstackPage;
