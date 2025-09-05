import React from "react";
import { Copy, Check } from "lucide-react";

const ManualPage: React.FC = () => {
  const copyUrl = () => {
    const url = document.getElementById("springUrl")?.textContent;
    if (url) {
      navigator.clipboard.writeText(url.trim()).then(() => {
        const btn = document.getElementById("copyBtn");
        const icon = document.getElementById("copyIcon");
        const checkIcon = document.getElementById("checkIcon");
        const originalText = btn?.querySelector("span")?.textContent;

        if (btn && icon && checkIcon) {
          icon.style.display = "none";
          checkIcon.style.display = "inline-block";
          btn.querySelector("span")!.textContent = "복사됨!";

          setTimeout(() => {
            icon.style.display = "inline-block";
            checkIcon.style.display = "none";
            btn.querySelector("span")!.textContent = originalText || "URL 복사";
          }, 2000);
        }
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            🚀 Spring Boot 채팅/콜봇 프로젝트
          </h1>

          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              📋 프로젝트 기본 설정
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <ConfigItem label="Project" value="Gradle" />
              <ConfigItem label="Language" value="Java" />
              <ConfigItem label="Spring Boot" value="3.2.0" />
              <ConfigItem label="Group" value="com.example" />
              <ConfigItem label="Artifact" value="chatbot-service" />
              <ConfigItem label="Name" value="chatbot-service" />
              <ConfigItem label="Package" value="com.example.chatbot" />
              <ConfigItem label="Packaging" value="Jar" />
              <ConfigItem label="Java" value="17" />
            </div>
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              📦 필수 Dependencies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Spring Web",
                "WebSocket",
                "Spring Data JPA",
                "MySQL Driver",
                "Spring Security",
                "Validation",
                "Spring Boot DevTools",
                "Lombok",
                "Spring Boot Actuator",
              ].map((dep) => (
                <DepItem key={dep} name={dep} />
              ))}
            </div>
          </div>

          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              🔗 Spring Initializr URL
            </h2>
            <p className="text-blue-700 mb-4">
              아래 URL을 클릭하면 설정된 프로젝트를 바로 다운로드할 수 있습니다:
            </p>
            <div
              id="springUrl"
              className="p-4 bg-white rounded-lg border border-blue-300 text-gray-800 font-mono break-all text-sm"
            >
              https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.2.0&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=chatbot-service&name=chatbot-service&description=WebSocket%20STOMP%20Chat%20and%20CallBot%20Service&packageName=com.example.chatbot&dependencies=web,websocket,data-jpa,mysql,security,validation,devtools,lombok,actuator
            </div>
            <button
              id="copyBtn"
              onClick={copyUrl}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy id="copyIcon" className="w-4 h-4" />
              <Check id="checkIcon" className="w-4 h-4 hidden" />
              <span>URL 복사</span>
            </button>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              🗺️ 개발 단계별 로드맵
            </h2>
            <div className="space-y-6">
              <RoadmapPhase
                title="1단계: 기본 채팅 기능 (1-2주)"
                items={[
                  "WebSocket + STOMP 설정",
                  "실시간 메시지 송수신",
                  "채팅방 기능",
                  "기본 UI (Thymeleaf or React)",
                ]}
              />
              <RoadmapPhase
                title="2단계: 콜봇 기능 추가 (2-3주)"
                items={[
                  "WebRTC 연동",
                  "음성 인식 (STT)",
                  "텍스트 음성 변환 (TTS)",
                  "챗봇 로직 (ChatGPT API 연동)",
                ]}
              />
              <RoadmapPhase
                title="3단계: 보안 & 인증 (1-2주)"
                items={[
                  "JWT 인증",
                  "Spring Security 설정",
                  "OAuth2 소셜 로그인",
                  "권한 기반 접근 제어",
                ]}
              />
              <RoadmapPhase
                title="4단계: 운영 환경 구축 (2-3주)"
                items={[
                  "Docker 컨테이너화",
                  "CI/CD 파이프라인",
                  "모니터링 (Prometheus/Grafana)",
                  "로그 관리 (ELK Stack)",
                ]}
              />
              <RoadmapPhase
                title="5단계: 고도화 (3-4주)"
                items={[
                  "MSA 구조로 분리",
                  "Redis 클러스터링",
                  "Load Balancing",
                  "성능 최적화",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-center">
    <div className="w-32 text-sm font-semibold text-gray-600">{label}:</div>
    <div className="px-3 py-1 bg-white rounded-md border border-gray-200 text-sm font-mono text-gray-800">
      {value}
    </div>
  </div>
);

const DepItem: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
    <Check className="w-5 h-5 text-green-500" />
    <span className="text-sm text-gray-700">{name}</span>
  </div>
);

const RoadmapPhase: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => (
  <div className="p-4 bg-white rounded-lg border border-gray-200">
    <div className="font-bold text-gray-800 mb-2">{title}</div>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: `• ${item}` }}
        />
      ))}
    </ul>
  </div>
);

export default ManualPage;
