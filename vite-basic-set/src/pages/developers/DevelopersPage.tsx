import type React from "react";
import { useRef, useState, useEffect } from "react";
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

  // localStorage 키
  const LAYOUT_STORAGE_KEY = "dockview-layout";

  // 레이아웃 저장
  const saveLayout = () => {
    if (!dockviewRef.current) {
      console.log("No dockview API available for saving");
      return;
    }

    try {
      const layout = dockviewRef.current.toJSON();
      console.log("Saving layout:", layout);

      // 유효한 레이아웃이면 저장
      if (layout) {
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
        console.log("Layout saved to localStorage");
      } else {
        console.log("Invalid layout, not saving");
      }
    } catch (error) {
      console.error("Failed to save layout:", error);
    }
  };

  // 레이아웃 복원
  const loadLayout = () => {
    try {
      const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY);
      console.log("Loaded from localStorage:", savedLayout);
      if (savedLayout) {
        const layout = JSON.parse(savedLayout);
        console.log("Parsed layout:", layout);
        return layout;
      }
    } catch (error) {
      console.error("Failed to load layout:", error);
    }
    console.log("No saved layout found");
    return null;
  };

  // 복원된 탭들의 유효성 검사
  const validateRestoredTabs = () => {
    if (!dockviewRef.current) return;

    const panels = dockviewRef.current.panels;
    panels.forEach((panel) => {
      const panelId = panel.id;
      if (panelId.startsWith("developer-")) {
        const developerId = panelId.replace("developer-", "");
        const developer = developers.find((d) => d.id === developerId);

        if (!developer) {
          // 개발자가 존재하지 않으면 탭 제거
          dockviewRef.current?.removePanel(panel);
        } else {
          // 개발자 이름이 변경되었을 수 있으므로 탭 제목 업데이트
          panel.api.setTitle(`${developer.name} 수정`);
        }
      }
    });
  };

  const onReady = (event: DockviewReadyEvent) => {
    dockviewRef.current = event.api;

    // 레이아웃 변경시 자동 저장 (디바운싱)
    let saveTimeout: NodeJS.Timeout;
    event.api.onDidLayoutChange(() => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveLayout();
      }, 300);
    });

    // 그룹 추가시 기본 이벤트만 등록
    event.api.onDidAddGroup((group) => {
      console.log("Group added:", group);
    });

    // 개발자 데이터가 로딩될 때까지 대기 후 레이아웃 복원
    const restoreLayout = () => {
      if (developers.length === 0) {
        // 개발자 데이터가 아직 로딩되지 않았으면 잠시 후 재시도
        setTimeout(restoreLayout, 100);
        return;
      }

      // 저장된 레이아웃 복원 시도
      const savedLayout = loadLayout();

      if (savedLayout) {
        try {
          console.log("Attempting to restore layout...");
          event.api.fromJSON(savedLayout);
          console.log("Layout restored successfully");
          // 복원된 개발자 탭들의 유효성 검사
          setTimeout(() => {
            validateRestoredTabs();
          }, 200);
        } catch (error) {
          console.error("Failed to restore layout:", error);
          // 복원 실패시 기본 환영 화면 추가
          event.api.addPanel({
            id: "welcome",
            component: "welcomePanel",
            title: "개발자 관리",
          });
        }
      } else {
        // 저장된 레이아웃이 없으면 기본 환영 화면 추가
        console.log("No saved layout, adding welcome panel");
        event.api.addPanel({
          id: "welcome",
          component: "welcomePanel",
          title: "개발자 관리",
        });
      }
    };

    // 레이아웃 복원 시작
    restoreLayout();
  };

  // 컴포넌트 언마운트 시 레이아웃 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveLayout();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveLayout();
      }
    };

    // 페이지 언로드 전 레이아웃 저장
    window.addEventListener("beforeunload", handleBeforeUnload);
    // 페이지 숨김 시 레이아웃 저장
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // 컴포넌트 언마운트 시 레이아웃 저장
      saveLayout();

      // 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
      params: {
        developerId: developer.id,
      },
    });

    // 탭 추가 후 레이아웃 저장
    setTimeout(() => {
      saveLayout();
    }, 300);
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
    // 모든 방향의 드래그 앤 드롭 허용
    console.log("Drop event:", event.position, event);
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
  const DeveloperEditPanel: React.FC<{ params?: { developerId: string } }> = ({
    params,
  }) => {
    const developer = params?.developerId
      ? developers.find((d) => d.id === params.developerId)
      : null;

    if (!developer) {
      return <div className="p-4">개발자 정보를 로드할 수 없습니다.</div>;
    }

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

      // 변경사항 저장 후 레이아웃 저장
      setTimeout(() => {
        saveLayout();
      }, 300);
    };

    const handleCancel = () => {
      if (!dockviewRef.current) return;

      const tabId = `developer-${developer.id}`;
      const panel = dockviewRef.current.getPanel(tabId);
      if (panel) {
        dockviewRef.current.removePanel(panel);
        // 탭 제거 후 레이아웃 저장
        setTimeout(() => {
          saveLayout();
        }, 300);
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

  // 휴지통 버튼 제거됨 - 드래그 앤 드롭 방해 방지

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
          onWillDrop={handleWillDrop}
          components={{
            welcomePanel: WelcomePanel,
            developerEditPanel: DeveloperEditPanel,
          }}
        />

        {/* dockview 기본 스타일만 유지 */}
      </div>
    </div>
  );
};

export default DevelopersPage;
