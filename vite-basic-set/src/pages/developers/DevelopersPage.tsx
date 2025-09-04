import React from "react";
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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    groupId: string;
  } | null>(null);
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
    let saveTimeout: number;
    event.api.onDidLayoutChange(() => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveLayout();
      }, 300);
    });

    // 그룹 추가시 이벤트 등록
    event.api.onDidAddGroup((group) => {
      console.log("Group added:", group);
      addContextMenuToGroup(group);

      // 플로팅 그룹 감지 및 스타일 적용
      if (group.api.location.type === "floating") {
        enhanceFloatingGroup(group);
      }
    });

    // 기존 그룹들에 컨텍스트 메뉴 추가
    setTimeout(() => {
      event.api.groups.forEach((group) => {
        addContextMenuToGroup(group);
      });
    }, 500);

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

    // 키보드 단축키 등록 (필수 기능만)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dockviewRef.current) return;

      // Ctrl+W: 현재 활성 탭 닫기
      if (e.ctrlKey && !e.shiftKey && e.key === "w") {
        e.preventDefault();
        closeActiveTab();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 제거
    const cleanup = () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    // 레이아웃 복원 시작
    restoreLayout();

    // cleanup 함수 반환
    return cleanup;
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

  // 유틸 기능 함수들
  const closeActiveTab = () => {
    if (!dockviewRef.current || !dockviewRef.current.activePanel) return;

    const activePanel = dockviewRef.current.activePanel;
    if (activePanel.id !== "welcome") {
      dockviewRef.current.removePanel(activePanel);
      setTimeout(() => {
        saveLayout();
      }, 300);
    }
  };

  const closeOtherTabs = (groupId?: string) => {
    if (!dockviewRef.current) return;

    const targetGroup = groupId
      ? dockviewRef.current.groups.find((g) => g.id === groupId)
      : dockviewRef.current.activeGroup;

    if (!targetGroup || !targetGroup.activePanel) return;

    const activeId = targetGroup.activePanel.id;
    const panels = targetGroup.panels.filter(
      (p) => p.id !== activeId && p.id !== "welcome",
    );

    panels.forEach((panel) => {
      dockviewRef.current?.removePanel(panel);
    });

    setTimeout(() => {
      saveLayout();
    }, 300);
  };

  const closeGroupTabs = (groupId: string) => {
    if (!dockviewRef.current) return;

    const targetGroup = dockviewRef.current.groups.find(
      (g) => g.id === groupId,
    );
    if (!targetGroup) return;

    const panels = targetGroup.panels.filter((p) => p.id !== "welcome");
    panels.forEach((panel) => {
      dockviewRef.current?.removePanel(panel);
    });

    setTimeout(() => {
      saveLayout();
    }, 300);
  };

  const floatActiveTab = (groupId: string) => {
    if (!dockviewRef.current) return;

    const targetGroup = dockviewRef.current.groups.find(
      (g) => g.id === groupId,
    );
    if (!targetGroup || !targetGroup.activePanel) return;

    try {
      // 현재 활성 패널을 플로팅 그룹으로 분리
      dockviewRef.current.addFloatingGroup(targetGroup.activePanel, {
        position: { left: 100, top: 100 },
      });
    } catch (error) {
      console.log("Floating group creation failed:", error);
    }

    setTimeout(() => {
      saveLayout();
    }, 300);
  };

  // 세련된 플로팅 그룹 스타일 및 헤더 액션 적용
  const enhanceFloatingGroup = (group: any) => {
    setTimeout(() => {
      const groupElement = group.element;
      if (!groupElement) return;

      // 플로팅 그룹에 세련된 클래스 추가
      groupElement.classList.add("enhanced-floating-group");

      // 그림자 및 둥근 모서리 적용
      groupElement.style.cssText = `
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 10px 10px -5px rgba(0, 0, 0, 0.04),
                    0 0 0 1px rgba(0, 0, 0, 0.05);
        background: white;
        overflow: hidden;
      `;

      // 헤더 스타일링 및 버튼 추가
      const header = groupElement.querySelector(
        ".dv-tabs-and-actions-container",
      );
      if (header && !header.querySelector(".floating-actions")) {
        header.style.cssText = `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px 12px 0 0;
          padding: 8px 16px;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `;

        // 플로팅 헤더 액션 버튼들 추가
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "floating-actions flex items-center gap-1";
        actionsContainer.innerHTML = `
          <button class="floating-header-btn minimize-btn" title="최소화">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <button class="floating-header-btn close-btn" title="닫기">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        `;

        // 이벤트 리스너 추가
        const minimizeBtn = actionsContainer.querySelector(".minimize-btn");
        const closeBtn = actionsContainer.querySelector(".close-btn");

        minimizeBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          groupElement.style.display =
            groupElement.style.display === "none" ? "block" : "none";
        });

        closeBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          const panels = group.panels.filter((p: any) => p.id !== "welcome");
          panels.forEach((panel: any) => {
            dockviewRef.current?.removePanel(panel);
          });
        });

        header.appendChild(actionsContainer);
      }
    }, 100);
  };

  // 컨텍스트 메뉴 추가 (드래그 앤 드롭 방해하지 않는 방식)
  const addContextMenuToGroup = (group: any) => {
    setTimeout(() => {
      const groupElement = group.element;
      if (!groupElement) return;

      const tabsContainer = groupElement.querySelector(
        ".dv-tabs-and-actions-container",
      );
      if (!tabsContainer) return;

      // 우클릭 이벤트 추가
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          groupId: group.id,
        });
      };

      tabsContainer.addEventListener("contextmenu", handleContextMenu);
    }, 100);
  };

  // 컨텍스트 메뉴 닫기
  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // 외부 클릭 시 컨텍스트 메뉴 닫기
  React.useEffect(() => {
    const handleClick = () => closeContextMenu();
    if (contextMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu]);

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

        {/* 컨텍스트 메뉴 */}
        {contextMenu && (
          <div
            className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[9999]"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                closeGroupTabs(contextMenu.groupId);
                closeContextMenu();
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              이 그룹의 모든 탭 닫기
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                closeOtherTabs(contextMenu.groupId);
                closeContextMenu();
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
              다른 탭들 닫기
            </button>

            <hr className="my-1" />

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
              onClick={() => {
                floatActiveTab(contextMenu.groupId);
                closeContextMenu();
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5,16L3,14L5,12L6.5,13.5L4.75,15.25L12.25,15.25L10.5,13.5L12,12L16,16L12,20L10.5,18.5L12.25,16.75L4.75,16.75L6.5,18.5L5,20L3,18L5,16M15,8L13,6L15,4L16.5,5.5L14.75,7.25L22.25,7.25L20.5,5.5L22,4L24,6L22,8L20.5,6.5L22.25,8.25L14.75,8.25L16.5,9.5L15,11L13,9L15,8Z" />
              </svg>
              새 창으로 분리
            </button>
          </div>
        )}

        {/* 세련된 플로팅 뷰 및 헤더 액션 스타일 */}
        <style>
          {`
            /* 컨텍스트 메뉴 애니메이션 */
            .fixed {
              animation: contextMenuFadeIn 0.15s ease-out;
            }

            @keyframes contextMenuFadeIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(-8px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            /* 플로팅 그룹 세련된 스타일 */
            .enhanced-floating-group {
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              animation: floatingGroupAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .enhanced-floating-group:hover {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
                          0 0 0 1px rgba(255, 255, 255, 0.1);
              transform: translateY(-2px);
            }

            /* 플로팅 그룹 나타나는 애니메이션 */
            @keyframes floatingGroupAppear {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(-20px);
                filter: blur(4px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0);
              }
            }

            .enhanced-floating-group .dv-tab {
              color: rgba(255, 255, 255, 0.9);
              border: none;
              background: transparent;
              transition: all 0.2s ease;
              margin: 0 2px;
            }

            .enhanced-floating-group .dv-tab.dv-active {
              color: white;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 6px;
              box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            .enhanced-floating-group .dv-tab:hover {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 6px;
              transform: translateY(-1px);
            }

            /* 플로팅 헤더 액션 버튼 */
            .floating-header-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              border: none;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
              color: rgba(255, 255, 255, 0.8);
              cursor: pointer;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .floating-header-btn:hover {
              background: rgba(255, 255, 255, 0.2);
              color: white;
              transform: scale(1.05);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .floating-header-btn:active {
              transform: scale(0.95);
              transition: transform 0.1s ease;
            }

            .close-btn:hover {
              background: rgba(239, 68, 68, 0.8) !important;
              color: white !important;
              border-color: rgba(239, 68, 68, 0.3);
            }

            .minimize-btn:hover {
              background: rgba(59, 130, 246, 0.8) !important;
              border-color: rgba(59, 130, 246, 0.3);
            }

            /* 플로팅 그룹 드래그 핸들 */
            .enhanced-floating-group .dv-tabs-and-actions-container {
              cursor: move;
              position: relative;
            }

            .enhanced-floating-group .dv-tabs-and-actions-container:active {
              cursor: grabbing;
            }

            .enhanced-floating-group .dv-tabs-and-actions-container::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 8px;
              width: 4px;
              height: 4px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              box-shadow:
                0 6px 0 rgba(255, 255, 255, 0.3),
                0 12px 0 rgba(255, 255, 255, 0.3);
              transform: translateY(-50%);
            }

            /* 플로팅 그룹 리사이즈 핸들 개선 */
            .enhanced-floating-group .dv-resize-handle {
              background: rgba(0, 0, 0, 0.1);
              transition: all 0.2s ease;
            }

            .enhanced-floating-group .dv-resize-handle:hover {
              background: rgba(0, 0, 0, 0.2);
            }

            /* 플로팅 그룹 내 컨텐츠 영역 */
            .enhanced-floating-group .dv-group-view > .dv-content {
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(10px);
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default DevelopersPage;
