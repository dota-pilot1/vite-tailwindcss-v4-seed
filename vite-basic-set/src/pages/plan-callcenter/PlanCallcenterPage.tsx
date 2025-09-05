import type React from "react";
import { useState } from "react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
  category: string;
  techStack: string[];
  estimatedDays: number;
  resources: string[];
}

// 콜센터 코어 시스템 도전 과제 (50개)
const CALLCENTER_CHALLENGES: Challenge[] = [
  // Level 1 - 기초 콜센터 시스템 (1-10)
  {
    id: 1,
    title: "기본 PBX 시스템 구축",
    description:
      "FreePBX를 활용한 기본적인 Private Branch Exchange 시스템 설치 및 설정",
    difficulty: "Level 1",
    category: "PBX 기초",
    techStack: ["FreePBX", "Asterisk", "SIP", "Linux", "VoIP"],
    estimatedDays: 7,
    resources: [
      "FreePBX 설치 가이드",
      "Asterisk 기본 설정",
      "SIP 프로토콜 이해",
    ],
  },
  {
    id: 2,
    title: "SIP 트렁크 연동 설정",
    description: "VoIP 서비스 제공업체와 SIP 트렁크 연결 및 통화 테스트",
    difficulty: "Level 1",
    category: "연결성",
    techStack: ["SIP Trunk", "NAT", "Firewall", "SIP Provider"],
    estimatedDays: 4,
    resources: ["SIP 트렁크 설정 가이드", "NAT 구성", "VoIP 네트워크 기초"],
  },
  {
    id: 3,
    title: "기본 IVR 메뉴 구축",
    description:
      "Interactive Voice Response 시스템으로 고객 자동 응답 메뉴 생성",
    difficulty: "Level 1",
    category: "IVR",
    techStack: ["Asterisk Dialplan", "Audio Files", "IVR Menu", "Call Flow"],
    estimatedDays: 5,
    resources: [
      "Asterisk Dialplan 가이드",
      "IVR 설계 원칙",
      "오디오 파일 처리",
    ],
  },
  {
    id: 4,
    title: "큐 시스템 구현",
    description: "대기열 관리 시스템으로 통화량 분산 및 대기 음악 설정",
    difficulty: "Level 1",
    category: "큐 관리",
    techStack: ["Queue System", "Music on Hold", "Agent Management"],
    estimatedDays: 6,
    resources: ["Asterisk Queue 설정", "대기열 전략", "상담원 관리"],
  },
  {
    id: 5,
    title: "통화 녹음 시스템",
    description: "법적 요구사항 준수를 위한 자동 통화 녹음 및 저장",
    difficulty: "Level 1",
    category: "녹음",
    techStack: ["Call Recording", "File Storage", "Privacy Compliance"],
    estimatedDays: 4,
    resources: ["통화녹음 법적 요구사항", "오디오 저장 형식", "데이터 보안"],
  },
  {
    id: 6,
    title: "기본 보고서 시스템",
    description: "통화량, 대기시간, 상담원 성과 등 기본 통계 보고서 생성",
    difficulty: "Level 1",
    category: "보고서",
    techStack: ["MySQL", "PHP", "Chart.js", "Statistics"],
    estimatedDays: 8,
    resources: ["CDR 분석", "통계 쿼리", "데이터 시각화"],
  },
  {
    id: 7,
    title: "Softphone 클라이언트 설정",
    description: "PC/모바일용 소프트웨어 전화기 클라이언트 구성 및 배포",
    difficulty: "Level 1",
    category: "클라이언트",
    techStack: ["Softphone", "SIP Client", "WebRTC", "Mobile App"],
    estimatedDays: 5,
    resources: ["SIP 클라이언트 설정", "WebRTC 기초", "모바일 VoIP"],
  },
  {
    id: 8,
    title: "기본 네트워크 보안 설정",
    description: "VoIP 트래픽 보안을 위한 방화벽 및 SIP 보안 구성",
    difficulty: "Level 1",
    category: "보안",
    techStack: ["Firewall", "SIP Security", "TLS/SRTP", "fail2ban"],
    estimatedDays: 6,
    resources: ["VoIP 보안 가이드", "SIP 보안 모범사례", "네트워크 보안"],
  },
  {
    id: 9,
    title: "상담원 대시보드",
    description: "상담원이 사용할 기본적인 통화 관리 웹 인터페이스",
    difficulty: "Level 1",
    category: "UI/UX",
    techStack: ["Web Interface", "PHP", "JavaScript", "Bootstrap"],
    estimatedDays: 10,
    resources: ["웹 인터페이스 설계", "사용자 경험", "상담원 워크플로우"],
  },
  {
    id: 10,
    title: "백업 및 복구 시스템",
    description: "콜센터 설정 및 데이터의 자동 백업 및 재해 복구 계획",
    difficulty: "Level 1",
    category: "백업",
    techStack: ["Backup Scripts", "Database Backup", "System Recovery"],
    estimatedDays: 7,
    resources: ["시스템 백업 전략", "재해 복구 계획", "데이터 무결성"],
  },

  // Level 2 - 중급 콜센터 기능 (11-20)
  {
    id: 11,
    title: "고급 IVR 스크립트 엔진",
    description: "조건부 분기와 데이터베이스 연동이 가능한 동적 IVR 시스템",
    difficulty: "Level 2",
    category: "IVR 고급",
    techStack: ["AGI Scripts", "Database Integration", "Conditional Logic"],
    estimatedDays: 12,
    resources: ["AGI 프로그래밍", "데이터베이스 연동", "복잡한 콜 플로우"],
  },
  {
    id: 12,
    title: "ACD (Automatic Call Distribution)",
    description: "상담원 스킬, 우선순위, 로드밸런싱을 고려한 지능형 통화 분배",
    difficulty: "Level 2",
    category: "통화 분배",
    techStack: ["Call Routing", "Skill-based Routing", "Load Balancing"],
    estimatedDays: 15,
    resources: ["ACD 알고리즘", "스킬 기반 라우팅", "통화 분배 전략"],
  },
  {
    id: 13,
    title: "CTI (Computer Telephony Integration)",
    description: "CRM 시스템과 통화 시스템의 실시간 연동",
    difficulty: "Level 2",
    category: "시스템 연동",
    techStack: ["CTI API", "CRM Integration", "Screen Pop", "Call Control"],
    estimatedDays: 18,
    resources: ["CTI 프로토콜", "CRM 연동 패턴", "실시간 데이터 동기화"],
  },
  {
    id: 14,
    title: "실시간 모니터링 대시보드",
    description: "통화 상태, 큐 현황, 상담원 성과를 실시간으로 모니터링",
    difficulty: "Level 2",
    category: "모니터링",
    techStack: ["Real-time Dashboard", "WebSocket", "AMI", "Chart.js"],
    estimatedDays: 14,
    resources: ["Asterisk AMI", "실시간 웹 인터페이스", "성과 지표 설계"],
  },
  {
    id: 15,
    title: "아웃바운드 캠페인 시스템",
    description: "자동 발신 캠페인 관리 및 예측 다이얼러 구현",
    difficulty: "Level 2",
    category: "아웃바운드",
    techStack: ["Predictive Dialer", "Campaign Management", "DNC Lists"],
    estimatedDays: 20,
    resources: ["예측 다이얼링 알고리즘", "캠페인 관리", "규제 준수"],
  },
  {
    id: 16,
    title: "음성 품질 모니터링",
    description: "통화 품질 측정 및 네트워크 성능 최적화",
    difficulty: "Level 2",
    category: "품질 관리",
    techStack: ["VoIP Quality", "RTCP", "Jitter", "Packet Loss"],
    estimatedDays: 16,
    resources: ["VoIP 품질 메트릭", "네트워크 최적화", "품질 측정 도구"],
  },
  {
    id: 17,
    title: "콜백 관리 시스템",
    description: "고객 요청 기반 자동 콜백 스케줄링 및 관리",
    difficulty: "Level 2",
    category: "콜백",
    techStack: [
      "Callback Scheduling",
      "Queue Management",
      "Time Zone Handling",
    ],
    estimatedDays: 13,
    resources: ["콜백 전략", "시간대 관리", "스케줄링 알고리즘"],
  },
  {
    id: 18,
    title: "멀티 테넌트 콜센터",
    description: "여러 조직을 위한 격리된 콜센터 환경 구축",
    difficulty: "Level 2",
    category: "멀티 테넌트",
    techStack: ["Multi-tenancy", "Data Isolation", "Resource Sharing"],
    estimatedDays: 22,
    resources: ["멀티 테넌트 아키텍처", "데이터 격리", "리소스 공유"],
  },
  {
    id: 19,
    title: "고급 보고서 및 분석",
    description: "비즈니스 인텔리전스를 위한 고급 통계 및 트렌드 분석",
    difficulty: "Level 2",
    category: "분석",
    techStack: ["Business Intelligence", "Data Mining", "Trend Analysis"],
    estimatedDays: 17,
    resources: ["BI 도구 활용", "데이터 마이닝", "통계 분석"],
  },
  {
    id: 20,
    title: "모바일 콜센터 앱",
    description: "상담원용 모바일 애플리케이션 개발",
    difficulty: "Level 2",
    category: "모바일",
    techStack: ["Mobile App", "WebRTC", "Push Notifications", "Offline Mode"],
    estimatedDays: 25,
    resources: ["모바일 VoIP", "앱 개발", "오프라인 지원"],
  },

  // Level 3 - 고급 콜센터 시스템 (21-30)
  {
    id: 21,
    title: "지능형 음성 봇 (IVR Bot)",
    description: "자연어 처리와 음성 인식을 결합한 대화형 IVR 시스템",
    difficulty: "Level 3",
    category: "AI 음성봇",
    techStack: ["NLP", "ASR", "TTS", "Dialog Management", "Machine Learning"],
    estimatedDays: 35,
    resources: ["음성인식 엔진", "자연어처리", "대화 관리 시스템"],
  },
  {
    id: 22,
    title: "실시간 감정 분석 시스템",
    description: "통화 중 고객 감정 상태를 실시간으로 분석하여 상담원에게 알림",
    difficulty: "Level 3",
    category: "AI 분석",
    techStack: [
      "Emotion Analysis",
      "Real-time Processing",
      "ML Models",
      "Alert System",
    ],
    estimatedDays: 28,
    resources: ["감정 인식 모델", "실시간 분석", "머신러닝 파이프라인"],
  },
  {
    id: 23,
    title: "클라우드 기반 콜센터 (CCaaS)",
    description: "AWS/Azure를 활용한 확장 가능한 클라우드 콜센터 플랫폼",
    difficulty: "Level 3",
    category: "클라우드",
    techStack: [
      "AWS Connect",
      "Microservices",
      "Auto Scaling",
      "Cloud Architecture",
    ],
    estimatedDays: 42,
    resources: ["클라우드 아키텍처", "서비스 메시", "자동 스케일링"],
  },
  {
    id: 24,
    title: "AI 기반 통화 요약 시스템",
    description: "GPT를 활용한 자동 통화 내용 요약 및 티켓 생성",
    difficulty: "Level 3",
    category: "AI 요약",
    techStack: ["GPT API", "Speech-to-Text", "NLP", "Ticket System"],
    estimatedDays: 21,
    resources: ["LLM 활용", "통화 전사", "자동 티켓팅"],
  },
  {
    id: 25,
    title: "고급 WFM (Workforce Management)",
    description: "예측 분석 기반 상담원 스케줄링 및 인력 최적화",
    difficulty: "Level 3",
    category: "인력 관리",
    techStack: [
      "Predictive Analytics",
      "Scheduling Algorithms",
      "Resource Optimization",
    ],
    estimatedDays: 38,
    resources: ["예측 모델링", "스케줄링 최적화", "인력 계획"],
  },
  {
    id: 26,
    title: "옴니채널 통합 플랫폼",
    description: "음성, 채팅, 이메일, 소셜미디어를 통합한 멀티채널 상담",
    difficulty: "Level 3",
    category: "옴니채널",
    techStack: [
      "Omnichannel",
      "Chat Bot",
      "Email Processing",
      "Social Media API",
    ],
    estimatedDays: 45,
    resources: ["채널 통합 전략", "통합 상담원 인터페이스", "고객 여정 관리"],
  },
  {
    id: 27,
    title: "실시간 통화 코칭 시스템",
    description: "AI가 실시간으로 상담원에게 스크립트와 코칭을 제공",
    difficulty: "Level 3",
    category: "AI 코칭",
    techStack: [
      "Real-time AI",
      "Speech Analysis",
      "Coaching Engine",
      "Performance Tracking",
    ],
    estimatedDays: 32,
    resources: ["실시간 AI 분석", "코칭 알고리즘", "성과 추적"],
  },
  {
    id: 28,
    title: "고급 사기 탐지 시스템",
    description: "음성 생체 인식과 행동 패턴 분석을 통한 사기 통화 탐지",
    difficulty: "Level 3",
    category: "보안",
    techStack: [
      "Voice Biometrics",
      "Fraud Detection",
      "Pattern Analysis",
      "Risk Scoring",
    ],
    estimatedDays: 40,
    resources: ["음성 생체 인식", "사기 패턴 분석", "위험 점수 시스템"],
  },
  {
    id: 29,
    title: "지능형 라우팅 엔진",
    description:
      "고객 프로필, 상담 이력, 상담원 전문성을 고려한 AI 기반 통화 라우팅",
    difficulty: "Level 3",
    category: "AI 라우팅",
    techStack: [
      "AI Routing",
      "Customer Profiling",
      "Skill Matching",
      "Predictive Routing",
    ],
    estimatedDays: 35,
    resources: ["지능형 라우팅", "고객 프로파일링", "예측적 분배"],
  },
  {
    id: 30,
    title: "실시간 번역 시스템",
    description: "다국어 고객 지원을 위한 실시간 음성 번역 서비스",
    difficulty: "Level 3",
    category: "다국어",
    techStack: [
      "Real-time Translation",
      "Multi-language ASR/TTS",
      "Language Detection",
    ],
    estimatedDays: 33,
    resources: ["실시간 번역", "다국어 음성 처리", "언어 감지"],
  },

  // Level 4 - 엔터프라이즈 급 (31-40)
  {
    id: 31,
    title: "하이브리드 클라우드 콜센터",
    description: "온프레미스와 클라우드를 결합한 하이브리드 아키텍처",
    difficulty: "Level 4",
    category: "하이브리드 클라우드",
    techStack: [
      "Hybrid Architecture",
      "Private/Public Cloud",
      "Data Governance",
      "Security",
    ],
    estimatedDays: 60,
    resources: ["하이브리드 아키텍처", "데이터 거버넌스", "보안 정책"],
  },
  {
    id: 32,
    title: "대규모 트래픽 처리 시스템",
    description: "동시 10,000+ 통화를 처리할 수 있는 초대규모 콜센터 인프라",
    difficulty: "Level 4",
    category: "대규모 처리",
    techStack: [
      "Load Balancing",
      "Distributed Architecture",
      "High Availability",
      "Performance Tuning",
    ],
    estimatedDays: 70,
    resources: ["분산 아키텍처", "고가용성 설계", "성능 최적화"],
  },
  {
    id: 33,
    title: "AI 기반 예측 분석 플랫폼",
    description:
      "고객 행동, 상담 결과, 비즈니스 메트릭을 예측하는 AI 분석 시스템",
    difficulty: "Level 4",
    category: "예측 분석",
    techStack: [
      "Predictive AI",
      "Big Data",
      "ML Pipeline",
      "Business Intelligence",
    ],
    estimatedDays: 56,
    resources: ["예측 모델링", "빅데이터 처리", "ML 파이프라인"],
  },
  {
    id: 34,
    title: "자동화된 품질 관리 시스템",
    description: "AI가 모든 통화를 자동 평가하고 품질 점수를 부여하는 시스템",
    difficulty: "Level 4",
    category: "품질 자동화",
    techStack: [
      "Automated QA",
      "Speech Analytics",
      "Scoring Algorithms",
      "Compliance Monitoring",
    ],
    estimatedDays: 48,
    resources: ["자동 품질 평가", "음성 분석", "컴플라이언스 모니터링"],
  },
  {
    id: 35,
    title: "블록체인 기반 통화 인증",
    description: "통화 기록의 무결성과 부인 방지를 위한 블록체인 시스템",
    difficulty: "Level 4",
    category: "블록체인",
    techStack: [
      "Blockchain",
      "Smart Contracts",
      "Immutable Records",
      "Cryptography",
    ],
    estimatedDays: 45,
    resources: ["블록체인 아키텍처", "스마트 컨트랙트", "암호화 기법"],
  },
  {
    id: 36,
    title: "디지털 트윈 콜센터",
    description:
      "실제 콜센터의 디지털 트윈을 구축하여 시뮬레이션과 최적화 수행",
    difficulty: "Level 4",
    category: "디지털 트윈",
    techStack: ["Digital Twin", "Simulation", "IoT Sensors", "3D Modeling"],
    estimatedDays: 65,
    resources: ["디지털 트윈 기술", "시뮬레이션 엔진", "IoT 통합"],
  },
  {
    id: 37,
    title: "양자 암호화 통신",
    description: "최고 수준의 보안이 요구되는 환경을 위한 양자 암호화 통신",
    difficulty: "Level 4",
    category: "양자 보안",
    techStack: [
      "Quantum Cryptography",
      "QKD",
      "Post-quantum Security",
      "Advanced Encryption",
    ],
    estimatedDays: 52,
    resources: ["양자 암호화", "포스트 양자 보안", "고급 암호화"],
  },
  {
    id: 38,
    title: "자율 운영 콜센터",
    description:
      "AI가 자동으로 시스템을 모니터링하고 최적화하는 자율 운영 시스템",
    difficulty: "Level 4",
    category: "자율 운영",
    techStack: [
      "Autonomous Operations",
      "Self-healing Systems",
      "AI Orchestration",
      "Auto-optimization",
    ],
    estimatedDays: 75,
    resources: ["자율 시스템", "자가 치유", "AI 오케스트레이션"],
  },
  {
    id: 39,
    title: "엣지 컴퓨팅 콜센터",
    description: "지연 시간 최소화를 위한 엣지 컴퓨팅 기반 분산 콜센터",
    difficulty: "Level 4",
    category: "엣지 컴퓨팅",
    techStack: [
      "Edge Computing",
      "5G Networks",
      "Low Latency",
      "Distributed Processing",
    ],
    estimatedDays: 58,
    resources: ["엣지 컴퓨팅", "5G 네트워킹", "분산 처리"],
  },
  {
    id: 40,
    title: "메타버스 콜센터",
    description: "VR/AR 기술을 활용한 몰입형 3D 콜센터 환경",
    difficulty: "Level 4",
    category: "메타버스",
    techStack: ["VR/AR", "3D Environment", "Spatial Audio", "Avatar System"],
    estimatedDays: 50,
    resources: ["VR 개발", "공간 오디오", "아바타 시스템"],
  },

  // Level 5 - 연구개발/미래기술 (41-50)
  {
    id: 41,
    title: "AGI 기반 완전 자동 콜센터",
    description:
      "AGI(Artificial General Intelligence)를 활용한 완전 자동화된 콜센터",
    difficulty: "Level 5",
    category: "AGI",
    techStack: [
      "AGI",
      "Autonomous AI",
      "Self-learning Systems",
      "Cognitive Computing",
    ],
    estimatedDays: 120,
    resources: ["AGI 기술", "인지 컴퓨팅", "자율 학습 시스템"],
  },
  {
    id: 42,
    title: "뇌-컴퓨터 인터페이스 상담",
    description: "BCI 기술을 활용한 생각만으로 제어하는 상담원 인터페이스",
    difficulty: "Level 5",
    category: "BCI",
    techStack: [
      "Brain-Computer Interface",
      "Neural Networks",
      "EEG Processing",
      "Thought Recognition",
    ],
    estimatedDays: 150,
    resources: ["BCI 기술", "뇌파 처리", "신경망 인터페이스"],
  },
  {
    id: 43,
    title: "홀로그램 상담원 시스템",
    description: "3D 홀로그램 기술을 활용한 가상 상담원 시스템",
    difficulty: "Level 5",
    category: "홀로그램",
    techStack: [
      "Hologram Technology",
      "3D Projection",
      "Gesture Recognition",
      "Spatial Computing",
    ],
    estimatedDays: 100,
    resources: ["홀로그램 기술", "3D 프로젝션", "공간 컴퓨팅"],
  },
  {
    id: 44,
    title: "시공간 분산 콜센터",
    description: "다차원 시공간 개념을 활용한 차세대 분산 콜센터 시스템",
    difficulty: "Level 5",
    category: "차원 컴퓨팅",
    techStack: [
      "Quantum Computing",
      "Spacetime Distribution",
      "Multi-dimensional Processing",
    ],
    estimatedDays: 180,
    resources: ["양자 컴퓨팅", "다차원 처리", "시공간 분산"],
  },
  {
    id: 45,
    title: "DNA 저장 기반 통화 기록",
    description: "DNA 분자를 활용한 초장기 통화 기록 저장 시스템",
    difficulty: "Level 5",
    category: "생체 저장",
    techStack: [
      "DNA Storage",
      "Molecular Computing",
      "Biological Systems",
      "Long-term Preservation",
    ],
    estimatedDays: 200,
    resources: ["DNA 저장 기술", "분자 컴퓨팅", "생체 시스템"],
  },
  {
    id: 46,
    title: "감정 공명 기반 상담 시스템",
    description: "상담원과 고객의 감정을 실시간으로 동조시키는 감정 공명 기술",
    difficulty: "Level 5",
    category: "감정 기술",
    techStack: [
      "Emotion Resonance",
      "Biometric Sync",
      "Empathy Engine",
      "Emotional AI",
    ],
    estimatedDays: 130,
    resources: ["감정 동조 기술", "생체 신호 동기화", "공감 엔진"],
  },
  {
    id: 47,
    title: "시간 역행 통화 분석",
    description: "양자 역학을 활용한 시간 역행적 통화 품질 예측 및 최적화",
    difficulty: "Level 5",
    category: "양자 시간",
    techStack: [
      "Quantum Mechanics",
      "Time Reversal",
      "Causal Analysis",
      "Temporal Computing",
    ],
    estimatedDays: 220,
    resources: ["양자 역학", "시간 역행", "인과 분석"],
  },
  {
    id: 48,
    title: "의식 기반 AI 상담원",
    description: "인공 의식을 가진 AI 상담원 개발 및 윤리적 운영 시스템",
    difficulty: "Level 5",
    category: "인공 의식",
    techStack: [
      "Artificial Consciousness",
      "Ethics Engine",
      "Consciousness Detection",
      "Moral Computing",
    ],
    estimatedDays: 300,
    resources: ["인공 의식", "윤리 엔진", "도덕적 컴퓨팅"],
  },
  {
    id: 49,
    title: "다차원 병렬 콜센터",
    description: "평행 우주 이론을 적용한 다차원 병렬 처리 콜센터",
    difficulty: "Level 5",
    category: "다차원",
    techStack: [
      "Parallel Universe Computing",
      "Quantum Superposition",
      "Multi-reality Processing",
    ],
    estimatedDays: 365,
    resources: ["병렬 우주 컴퓨팅", "양자 중첩", "다중 현실 처리"],
  },
  {
    id: 50,
    title: "콜센터 특이점 시스템",
    description: "기술적 특이점에 도달한 초지능 콜센터 시스템",
    difficulty: "Level 5",
    category: "특이점",
    techStack: [
      "Technological Singularity",
      "Superintelligence",
      "Recursive Self-improvement",
    ],
    estimatedDays: 500,
    resources: ["기술적 특이점", "초지능", "재귀적 자기 개선"],
  },
];

const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
  switch (difficulty) {
    case "Level 1":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Level 2":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "Level 3":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Level 4":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Level 5":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const ChallengeTable: React.FC<{
  challenges: Challenge[];
  title: string;
  description: string;
}> = ({ challenges, title, description }) => {
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
                <tr
                  key={challenge.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {challenge.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    <div className="max-w-xs">{challenge.title}</div>
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

const PlanCallcenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5"
  >("all");

  const level1Challenges = CALLCENTER_CHALLENGES.filter(
    (c) => c.difficulty === "Level 1",
  );
  const level2Challenges = CALLCENTER_CHALLENGES.filter(
    (c) => c.difficulty === "Level 2",
  );
  const level3Challenges = CALLCENTER_CHALLENGES.filter(
    (c) => c.difficulty === "Level 3",
  );
  const level4Challenges = CALLCENTER_CHALLENGES.filter(
    (c) => c.difficulty === "Level 4",
  );
  const level5Challenges = CALLCENTER_CHALLENGES.filter(
    (c) => c.difficulty === "Level 5",
  );

  const getFilteredChallenges = () => {
    switch (activeTab) {
      case "Level 1":
        return level1Challenges;
      case "Level 2":
        return level2Challenges;
      case "Level 3":
        return level3Challenges;
      case "Level 4":
        return level4Challenges;
      case "Level 5":
        return level5Challenges;
      default:
        return CALLCENTER_CHALLENGES;
    }
  };

  const TabButton: React.FC<{
    tab: "all" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
    label: string;
    count: number;
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
            콜센터 코어 시스템 구축을 위한 50가지 도전 과제
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Level 1 기초 PBX부터 Level 5 미래 기술까지, 전문적인 콜센터 시스템을
            단계별로 구축해보세요.
          </p>

          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton
              tab="all"
              label="전체"
              count={CALLCENTER_CHALLENGES.length}
            />
            <TabButton
              tab="Level 1"
              label="Level 1"
              count={level1Challenges.length}
            />
            <TabButton
              tab="Level 2"
              label="Level 2"
              count={level2Challenges.length}
            />
            <TabButton
              tab="Level 3"
              label="Level 3"
              count={level3Challenges.length}
            />
            <TabButton
              tab="Level 4"
              label="Level 4"
              count={level4Challenges.length}
            />
            <TabButton
              tab="Level 5"
              label="Level 5"
              count={level5Challenges.length}
            />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
            (level, idx) => {
              const levelChallenges = CALLCENTER_CHALLENGES.filter(
                (c) => c.difficulty === level,
              );
              const colors = ["emerald", "cyan", "indigo", "violet", "rose"];
              const descriptions = [
                "기초 PBX (4-10일)",
                "중급 기능 (12-25일)",
                "AI 시스템 (21-45일)",
                "엔터프라이즈 (45-75일)",
                "미래 기술 (100-500일)",
              ];

              return (
                <div
                  key={level}
                  className="p-4 bg-white rounded-lg shadow-sm border"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 bg-${colors[idx]}-500 rounded-full mr-2`}
                    ></div>
                    <h3 className="font-medium text-gray-900">{level}</h3>
                  </div>
                  <p
                    className={`text-2xl font-bold text-${colors[idx]}-600 mt-1`}
                  >
                    {levelChallenges.length}개
                  </p>
                  <p className="text-sm text-gray-500">{descriptions[idx]}</p>
                </div>
              );
            },
          )}
        </div>

        {/* 과제 테이블 */}
        {activeTab === "all" ? (
          <>
            <ChallengeTable
              challenges={level1Challenges}
              title="📞 Level 1: 기초 콜센터 시스템 (1-10번)"
              description="PBX 설치, SIP 트렁크, 기본 IVR 등 콜센터의 기본 구성 요소를 학습합니다."
            />
            <ChallengeTable
              challenges={level2Challenges}
              title="🔧 Level 2: 중급 콜센터 기능 (11-20번)"
              description="ACD, CTI 연동, 실시간 모니터링 등 실무에서 필요한 고급 기능들을 구현합니다."
            />
            <ChallengeTable
              challenges={level3Challenges}
              title="🤖 Level 3: AI 기반 콜센터 (21-30번)"
              description="음성 봇, 감정 분석, 실시간 번역 등 AI 기술이 접목된 지능형 시스템을 구축합니다."
            />
            <ChallengeTable
              challenges={level4Challenges}
              title="🏢 Level 4: 엔터프라이즈 급 시스템 (31-40번)"
              description="대규모 트래픽 처리, 하이브리드 클라우드, 블록체인 등 기업급 기술을 적용합니다."
            />
            <ChallengeTable
              challenges={level5Challenges}
              title="🚀 Level 5: 미래 기술 연구 (41-50번)"
              description="AGI, BCI, 홀로그램 등 차세대 기술을 활용한 혁신적인 콜센터 시스템입니다."
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
                      레벨
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
                    <tr
                      key={challenge.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {challenge.id}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                        <div className="max-w-xs">{challenge.title}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="max-w-md leading-relaxed">
                          {challenge.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(challenge.difficulty)}`}
                        >
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

        {/* 현실적인 콜센터 구축 가이드 */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📞 콜센터 시스템 마스터 로드맵
          </h2>

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            {[
              {
                level: "Level 1",
                color: "emerald",
                title: "기초 PBX",
                desc: "PBX, SIP, IVR 기초",
              },
              {
                level: "Level 2",
                color: "cyan",
                title: "중급 기능",
                desc: "ACD, CTI, 모니터링",
              },
              {
                level: "Level 3",
                color: "indigo",
                title: "AI 시스템",
                desc: "음성봇, 감정 분석",
              },
              {
                level: "Level 4",
                color: "violet",
                title: "엔터프라이즈",
                desc: "대규모, 하이브리드",
              },
              {
                level: "Level 5",
                color: "rose",
                title: "미래 기술",
                desc: "AGI, 양자 기술",
              },
            ].map((item) => (
              <div
                key={item.level}
                className={`p-4 bg-${item.color}-50 rounded-lg border border-${item.color}-200`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-2`}
                  ></div>
                  <h3 className={`font-semibold text-${item.color}-800`}>
                    {item.level}
                  </h3>
                </div>
                <p className={`text-xs text-${item.color}-600 mb-1`}>
                  {item.title}
                </p>
                <p className={`text-xs text-${item.color}-600`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              🚦 현실적인 콜센터 구축 전략
            </h3>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>
                <strong>일반 중소기업:</strong> 3CX + LangChain 조합으로 80%
                요구사항 충족 가능
              </p>
              <p>
                <strong>중견기업 (제주항공급):</strong> 3CX 기반 + 클라우드
                확장으로 1000콜 대응
              </p>
              <p>
                <strong>대기업:</strong> Level 3-4 과제로 완전 커스텀 시스템
                구축
              </p>
              <p>
                <strong>연구소/대학:</strong> Level 5 미래 기술 연구 프로젝트
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">
              💡 현실적인 개발 접근법
            </h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>
                <strong>3CX vs Asterisk:</strong> 운영 효율성을 중시한다면 3CX,
                무제한 커스터마이징이 필요하다면 Asterisk
              </p>
              <p>
                <strong>콜봇 커스터마이징:</strong> 대부분은 기성 솔루션 +
                AI(LangChain) 조합으로 충분
              </p>
              <p>
                <strong>트래픽 현실:</strong> 평상시 100~300콜, 피크시
                500~800콜이 일반적
              </p>
              <p>
                <strong>학습 순서:</strong> Level 순서대로 단계적 접근, 실습
                위주 학습 권장
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCallcenterPage;
