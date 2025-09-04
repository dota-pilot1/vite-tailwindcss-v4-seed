import type React from "react";
import { useRef, useState } from "react";
import {
  DockviewReact,
  type DockviewReadyEvent,
  type DockviewApi,
  type DockviewWillDropEvent,
  themeLight,
} from "dockview";
import {
  useDeveloperStore,
  type Developer,
  type Team,
} from "../../stores/developerStore";
import DeveloperTreeMenu from "./components/DeveloperTreeMenu";
import DeveloperEditForm from "./components/DeveloperEditForm";

export const DevelopersPage: React.FC = () => {
  const dockviewRef = useRef<DockviewApi | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // 기본값: 열린 상태
  const { developers, teams, setSelectedDeveloper, updateDeveloper } =
    useDeveloperStore();

  const onReady = (event: DockviewReadyEvent) => {
    dockviewRef.current = event.api;

    // 환영 화면을 기본 패널로 추가
    event.api.addPanel({
      id: "welcome",
      component: "welcomePanel",
      title: "개발자 관리",
    });
  };

  const addDeveloperTab = (developer: Developer) => {
    if (!dockviewRef.current) return;

    const tabId = `developer-${developer.id}`;
    const existingPanel = dockviewRef.current.getPanel(tabId);

    // 이미 열린 탭이 있으면 활성화만
    if (existingPanel) {
      existingPanel.api.setActive();
      return;
    }

    // 새 탭 추가
    dockviewRef.current.addPanel({
      id: tabId,
      component: "developerEditPanel",
      title: `${developer.name} 수정`,
      params: { developer },
    });
  };

  const handleDeveloperDoubleClick = (developer: Developer) => {
    setSelectedDeveloper(developer);
    addDeveloperTab(developer);
  };

  const handleTeamDoubleClick = (team: Team) => {
    alert(
      `팀 선택: ${team.name}\n설명: ${team.description}\n리더: ${team.lead}`,
    );
  };

  const handleWillDrop = (event: DockviewWillDropEvent) => {
    // 상하 분할(above, below) 방지, 좌우 분할(left, right, within)만 허용
    if (event.position === "above" || event.position === "below") {
      event.preventDefault();
    }
  };

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 환영 화면 컴포넌트
  const WelcomePanel: React.FC<{ params?: any }> = () => {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            개발자 관리 시스템
          </h3>
          <p className="text-gray-600 mb-6">
            좌측 트리에서 개발자를 더블클릭하면 수정 탭이 열립니다.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {developers.length}
              </div>
              <div className="text-sm text-gray-600">총 개발자</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {teams.length}
              </div>
              <div className="text-sm text-gray-600">총 팀</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="text-lg font-medium text-blue-800 mb-2">
              🎯 사용법
            </h4>
            <ul className="text-blue-700 text-sm text-left space-y-1">
              <li>• 개발자 더블클릭: 수정 탭 열기</li>
              <li>• 탭 분할: 드래그로 화면 분할 가능</li>
              <li>• 탭 닫기: 탭의 ✕ 버튼 클릭</li>
              <li>• 사이드바 토글: 헤더의 ✕ 버튼</li>
            </ul>
          </div>

          <button
            onClick={toggleSidebar}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            사이드바 {sidebarOpen ? "닫기" : "열기"}
          </button>
        </div>
      </div>
    );
  };

  // 개발자 수정 폼 패널
  const DeveloperEditPanel: React.FC<{ params?: { developer: Developer } }> = ({
    params,
  }) => {
    if (!params?.developer) {
      return <div className="p-4">개발자 정보를 로드할 수 없습니다.</div>;
    }

    const { developer } = params;

    const handleSave = (updates: Partial<Developer>) => {
      updateDeveloper(developer.id, updates);

      // 탭 제목 업데이트 (이름이 변경된 경우)
      if (updates.name && dockviewRef.current) {
        const tabId = `developer-${developer.id}`;
        const panel = dockviewRef.current.getPanel(tabId);
        if (panel) {
          panel.api.setTitle(`${updates.name} 수정`);
        }
      }
    };

    const handleCancel = () => {
      if (!dockviewRef.current) return;

      const tabId = `developer-${developer.id}`;
      const panel = dockviewRef.current.getPanel(tabId);
      if (panel) {
        dockviewRef.current.removePanel(panel);
      }
    };

    return (
      <div className="h-full overflow-y-auto">
        <DeveloperEditForm
          developer={developer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  };

  return (
    <div className="h-screen flex">
      {/* 사이드바 토글 버튼 */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-10 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-lg transition-colors"
          title="사이드바 열기"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>
      )}

      {/* 좌측 사이드바 */}
      {sidebarOpen && (
        <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto relative">
          {/* 사이드바 헤더 */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">개발 조직</h2>
              <p className="text-sm text-gray-600">
                개발자를 더블클릭하여 수정하세요
              </p>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="사이드바 닫기"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>

          <DeveloperTreeMenu
            teams={teams}
            onDeveloperDoubleClick={handleDeveloperDoubleClick}
            onTeamDoubleClick={handleTeamDoubleClick}
          />
        </div>
      )}

      {/* 우측 dockview 영역 */}
      <div className="flex-1 bg-white">
        <DockviewReact
          onReady={onReady}
          theme={themeLight}
          disableFloatingGroups={true}
          onWillDrop={handleWillDrop}
          components={{
            welcomePanel: WelcomePanel,
            developerEditPanel: DeveloperEditPanel,
          }}
        />
      </div>
    </div>
  );
};

export default DevelopersPage;
