import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./widgets/layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ManualPage from "./pages/manual/ManualPage";
import UserGuidePage from "./pages/user-guide/UserGuidePage";
import SystemReportPage from "./pages/system-report/SystemReportPage";
import TodoPage from "./pages/todo/TodoPage";
import PlanPage from "./pages/plan/PlanPage";
import PlanFullstackPage from "./pages/plan-fullstack/PlanFullstackPage";
import PlanCallcenterPage from "./pages/plan-callcenter/PlanCallcenterPage";
import StartupIdeaPage from "./pages/startup-idea/StartupIdeaPage";
import FullstackChallengePage from "./pages/fullstack-challenge/FullstackChallengePage";
import DevelopersPage from "./pages/developers/DevelopersPage";

/**
 * App.tsx
 *
 * 애플리케이션 Composition Root.
 * - React Router 구성 (BrowserRouter + Routes)
 * - AppLayout 은 전역 프레임, 내부 Outlet 을 통해 하위 페이지 렌더
 * - 모든 페이지가 개별 라우트로 분리되어 헤더 드롭다운에서 접근 가능
 * - 모던 관리자 페이지 디자인으로 업데이트
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DevelopersPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="manual" element={<ManualPage />} />
          <Route path="user-guide" element={<UserGuidePage />} />
          <Route path="system-report" element={<SystemReportPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="plan-fullstack" element={<PlanFullstackPage />} />
          <Route path="plan-callcenter" element={<PlanCallcenterPage />} />
          <Route path="startup-idea" element={<StartupIdeaPage />} />
          <Route
            path="fullstack-challenge"
            element={<FullstackChallengePage />}
          />
          <Route path="developers" element={<DevelopersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
