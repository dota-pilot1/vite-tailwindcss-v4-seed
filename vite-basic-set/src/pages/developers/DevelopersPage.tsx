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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { developers, teams, setSelectedDeveloper, updateDeveloper } =
    useDeveloperStore();

  // URL 파라미터 확인 및 전체화면 모드 설정
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fullscreenParam = urlParams.get("fullscreen");
    const panelParam = urlParams.get("panel");

    if (fullscreenParam === "true") {
      setIsFullscreen(true);
      setSidebarOpen(false);

      // 특정 패널이 지정된 경우 해당 패널을 열기
      if (panelParam && dockviewRef.current) {
        setTimeout(() => {
          // 기존 패널들을 모두 제거하고 지정된 패널만 열기
          const currentPanels = dockviewRef.current?.panels || [];
          currentPanels.forEach((panel) => {
            if (panel.id !== panelParam) {
              dockviewRef.current?.removePanel(panel);
            }
          });

          // 지정된 패널이 없으면 새로 생성
          if (!currentPanels.find((p) => p.id === panelParam)) {
            if (panelParam.startsWith("developer-")) {
              const developerId = panelParam.replace("developer-", "");
              const developer = developers.find((d) => d.id === developerId);
              if (developer) {
                handleDeveloperDoubleClick(developer);
              }
            }
          }
        }, 100);
      }
    }
  }, [developers]);

  // ESC 키로 전체화면 모드 종료
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        // URL에서 파라미터 제거
        const url = new URL(window.location.href);
        url.searchParams.delete("fullscreen");
        url.searchParams.delete("panel");
        window.history.replaceState({}, "", url.toString());
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen]);

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
        // 즉시 크기 설정
        const floatingWidth = Math.min(1400, window.innerWidth * 0.8);
        const floatingHeight = Math.min(900, window.innerHeight * 0.8);

        // API를 통한 크기 설정
        if (group.api.setSize) {
          try {
            group.api.setSize({
              width: floatingWidth,
              height: floatingHeight,
            });
            console.log(
              "Set floating group size:",
              floatingWidth,
              "x",
              floatingHeight,
            );
          } catch (error) {
            console.log("Failed to set floating group size:", error);
          }
        }

        // DOM 요소 직접 조작
        const groupElement = group.element;
        if (groupElement) {
          const centerX = Math.max(20, (window.innerWidth - floatingWidth) / 2);
          const centerY = Math.max(
            20,
            (window.innerHeight - floatingHeight) / 2,
          );

          groupElement.style.cssText += `
            width: ${floatingWidth}px !important;
            height: ${floatingHeight}px !important;
            left: ${centerX}px !important;
            top: ${centerY}px !important;
            min-width: ${floatingWidth}px !important;
            min-height: ${floatingHeight}px !important;
          `;
        }

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
      // 현재 활성 패널을 플로팅 그룹으로 분리 (훨씬 더 큰 사이즈로)
      // 화면의 80% 크기로 설정
      const floatingWidth = Math.min(1400, window.innerWidth * 0.8);
      const floatingHeight = Math.min(900, window.innerHeight * 0.8);
      const centerX = Math.max(20, (window.innerWidth - floatingWidth) / 2);
      const centerY = Math.max(20, (window.innerHeight - floatingHeight) / 2);

      dockviewRef.current.addFloatingGroup(targetGroup.activePanel, {
        position: { left: centerX, top: centerY },
      });
    } catch (error) {
      console.log("Floating group creation failed:", error);
    }

    setTimeout(() => {
      saveLayout();
    }, 300);
  };

  // 새탭에서 전체화면으로 열기
  const openInNewTab = (groupId: string) => {
    const group = dockviewRef.current?.groups.find((g) => g.id === groupId);
    if (!group || !group.activePanel) return;

    const panel = group.activePanel;
    const panelId = panel.id;

    // 현재 패널의 정보를 가져와서 새탭에서 전체화면으로 열기
    const currentUrl = window.location.origin + window.location.pathname;
    const newTabUrl = `${currentUrl}?fullscreen=true&panel=${panelId}`;

    // 새탭에서 열기
    const newWindow = window.open(newTabUrl, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };

  // 세련된 플로팅 그룹 스타일 및 헤더 액션 적용
  const enhanceFloatingGroup = (group: any) => {
    setTimeout(() => {
      const groupElement = group.element;
      if (!groupElement) return;

      // 플로팅 그룹에 세련된 클래스 추가
      groupElement.classList.add("enhanced-floating-group");

      // 현대적이고 큰 플로팅 다이어로그 스타일
      const floatingWidth = Math.min(1400, window.innerWidth * 0.8);
      const floatingHeight = Math.min(900, window.innerHeight * 0.8);

      // API를 통한 크기 강제 설정
      if (group.api && group.api.setSize) {
        try {
          group.api.setSize({
            width: floatingWidth,
            height: floatingHeight,
          });
        } catch (error) {
          console.log("Failed to set group size via API:", error);
        }
      }

      groupElement.style.cssText = `
        border-radius: 16px;
        box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.25),
                    0 16px 32px -8px rgba(0, 0, 0, 0.1),
                    0 0 0 1px rgba(0, 0, 0, 0.05);
        background: white;
        overflow: hidden;
        min-width: ${floatingWidth}px;
        min-height: ${floatingHeight}px;
        width: ${floatingWidth}px;
        height: ${floatingHeight}px;
        border: 2px solid rgba(59, 130, 246, 0.1);
        backdrop-filter: blur(20px);
      `;

      // 더 현대적인 헤더 스타일링 및 버튼 추가
      const header = groupElement.querySelector(
        ".dv-tabs-and-actions-container",
      );
      if (header && !header.querySelector(".floating-actions")) {
        header.style.cssText = `
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border-radius: 16px 16px 0 0;
          padding: 12px 20px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        `;

        // 더 큰 플로팅 헤더 액션 버튼들 추가
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "floating-actions flex items-center gap-2";
        actionsContainer.innerHTML = `
          <button class="floating-header-btn minimize-btn" title="최소화">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <button class="floating-header-btn maximize-btn" title="최대화">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/>
            </svg>
          </button>
          <button class="floating-header-btn close-btn" title="닫기">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        `;

        // 버튼 이벤트 리스너 추가
        const maximizeBtn = actionsContainer.querySelector(".maximize-btn");
        const minimizeBtn = actionsContainer.querySelector(".minimize-btn");
        const closeBtn = actionsContainer.querySelector(".close-btn");

        // 최대화 버튼
        maximizeBtn?.addEventListener("click", () => {
          const currentWidth = parseInt(groupElement.style.width);
          const currentHeight = parseInt(groupElement.style.height);
          const maxWidth = window.innerWidth - 40;
          const maxHeight = window.innerHeight - 40;

          if (
            currentWidth >= maxWidth - 100 &&
            currentHeight >= maxHeight - 100
          ) {
            // 원래 크기로 복원
            const originalWidth = Math.min(1400, window.innerWidth * 0.8);
            const originalHeight = Math.min(900, window.innerHeight * 0.8);
            const centerX = Math.max(
              20,
              (window.innerWidth - originalWidth) / 2,
            );
            const centerY = Math.max(
              20,
              (window.innerHeight - originalHeight) / 2,
            );

            groupElement.style.cssText += `
              width: ${originalWidth}px !important;
              height: ${originalHeight}px !important;
              left: ${centerX}px !important;
              top: ${centerY}px !important;
            `;

            if (group.api && group.api.setSize) {
              group.api.setSize({
                width: originalWidth,
                height: originalHeight,
              });
            }
          } else {
            // 최대화
            groupElement.style.cssText += `
              width: ${maxWidth}px !important;
              height: ${maxHeight}px !important;
              left: 20px !important;
              top: 20px !important;
            `;

            if (group.api && group.api.setSize) {
              group.api.setSize({
                width: maxWidth,
                height: maxHeight,
              });
            }
          }
        });

        // 최소화 버튼
        minimizeBtn?.addEventListener("click", () => {
          const minimizedHeight = 48;
          groupElement.style.cssText += `
            height: ${minimizedHeight}px !important;
            overflow: hidden !important;
          `;

          const content = groupElement.querySelector(".dv-group-view");
          if (content) {
            content.style.display = "none";
          }

          // 더블클릭으로 복원
          header.addEventListener("dblclick", () => {
            const originalHeight = Math.min(900, window.innerHeight * 0.8);
            groupElement.style.cssText += `
              height: ${originalHeight}px !important;
              overflow: visible !important;
            `;

            if (content) {
              content.style.display = "";
            }

            if (group.api && group.api.setSize) {
              group.api.setSize({
                height: originalHeight,
              });
            }
          });
        });

        // 닫기 버튼
        closeBtn?.addEventListener("click", () => {
          if (group.panels.length > 0) {
            group.panels.forEach((panel: any) => {
              dockviewRef.current?.removePanel(panel);
            });
          }
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
    <div className={`h-screen ${isFullscreen ? "fullscreen-mode" : "flex"}`}>
      {/* 사이드바 토글 버튼 - 전체화면에서는 숨김 */}
      {!sidebarOpen && !isFullscreen && (
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

      {/* 좌측 사이드바 - 전체화면에서는 숨김 */}
      {sidebarOpen && !isFullscreen && (
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

      {/* 메인 콘텐츠 영역 */}
      <div className={`${isFullscreen ? "w-full h-full" : "flex-1"} bg-white`}>
        <DockviewReact
          onReady={onReady}
          theme={themeLight}
          onWillDrop={handleWillDrop}
          components={{
            welcomePanel: WelcomePanel,
            developerEditPanel: DeveloperEditPanel,
          }}
        />

        {/* 컨텍스트 메뉴 - 전체화면에서는 숨김 */}
        {contextMenu && !isFullscreen && (
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

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 hover:text-green-700 flex items-center gap-2"
              onClick={() => {
                openInNewTab(contextMenu.groupId);
                closeContextMenu();
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
              </svg>
              새탭 전체화면 열기
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

            /* 더 현대적인 플로팅 그룹 스타일 */
            .enhanced-floating-group {
              backdrop-filter: blur(20px);
              border: 2px solid rgba(59, 130, 246, 0.1);
              animation: floatingGroupAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.25);
            }

            .enhanced-floating-group:hover {
              box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.3),
                          0 0 0 2px rgba(59, 130, 246, 0.2);
              transform: translateY(-4px);
              border-color: rgba(59, 130, 246, 0.2);
            }

            /* 더 부드러운 플로팅 그룹 애니메이션 */
            @keyframes floatingGroupAppear {
              0% {
                opacity: 0;
                transform: scale(0.9) translateY(-30px);
                filter: blur(8px);
              }
              60% {
                opacity: 0.8;
                transform: scale(1.02) translateY(-5px);
                filter: blur(2px);
              }
              100% {
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

            /* 더 큰 플로팅 헤더 액션 버튼 */
            .floating-header-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              border: none;
              background: rgba(255, 255, 255, 0.1);
              color: rgba(255, 255, 255, 0.9);
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.2s ease;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .floating-header-btn:hover {
              background: rgba(255, 255, 255, 0.2);
              color: white;
              transform: scale(1.1);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .floating-header-btn:active {
              transform: scale(0.95);
              transition: transform 0.1s ease;
            }

            .floating-header-btn.close-btn:hover {
              background: rgba(239, 68, 68, 0.9);
              border-color: rgba(239, 68, 68, 1);
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

            /* 기본 플로팅 그룹 크기 강제 설정 */
            .dv-floating-group {
              min-width: min(1400px, 80vw) !important;
              min-height: min(900px, 80vh) !important;
              width: min(1400px, 80vw) !important;
              height: min(900px, 80vh) !important;
            }

            .enhanced-floating-group {
              min-width: min(1400px, 80vw) !important;
              min-height: min(900px, 80vh) !important;
              width: min(1400px, 80vw) !important;
              height: min(900px, 80vh) !important;
            }

            /* 전체화면 모드 스타일 */
            .fullscreen-mode {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
              background: white;
              overflow: hidden;
            }

            .fullscreen-mode .dv-dockview {
              height: 100vh !important;
              width: 100vw !important;
            }

            /* 전체화면 모드에서 ESC 키 안내 */
            .fullscreen-mode::before {
              content: "ESC 키를 눌러 전체화면을 종료하세요";
              position: fixed;
              top: 10px;
              right: 20px;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 8px 12px;
              border-radius: 4px;
              font-size: 12px;
              z-index: 10000;
              animation: fadeInOut 3s ease-in-out;
            }

            @keyframes fadeInOut {
              0%, 100% { opacity: 0; }
              10%, 90% { opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default DevelopersPage;
