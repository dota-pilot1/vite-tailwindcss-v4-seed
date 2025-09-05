import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./widgets/layout/AppLayout";

import AboutPage from "./pages/about/AboutPage";
import ManualPage from "./pages/manual/ManualPage";
import UserGuidePage from "./pages/user-guide/UserGuidePage";
import SystemReportPage from "./pages/system-report/SystemReportPage";
import TodoPage from "./pages/todo/TodoPage";
import PlanPage from "./pages/plan/PlanPage";
import PlanFullstackPage from "./pages/plan-fullstack/PlanFullstackPage";
import PlanCallcenterPage from "./pages/plan-callcenter/PlanCallcenterPage";
import StartupIdeaPage from "./pages/startup-idea/StartupIdeaPage";
import DevelopersPage from "./pages/developers/DevelopersPage";
import DevJournalPage from "./pages/DevJournalPage";
import SpringSecurityPage from "./pages/SpringSecurityPage";
import SpringWebSocketPage from "./pages/SpringWebSocketPage";
import SpringAIPage from "./pages/SpringAIPage";
import SpringJpaJooqPage from "./pages/SpringJpaJooqPage";
import SpringWebFluxPage from "./pages/SpringWebFluxPage";
import SpringJava21Page from "./pages/SpringJava21Page";
import SpringGraphQLPage from "./pages/SpringGraphQLPage";
import RedisOverviewPage from "./pages/RedisOverviewPage";
import RedisUsagePage from "./pages/RedisUsagePage";
import RedisStudyPage from "./pages/RedisStudyPage";
import RedisSpringPage from "./pages/RedisSpringPage";
import RedisKafkaPage from "./pages/RedisKafkaPage";

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
          <Route path="home" element={<DevelopersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="manual" element={<ManualPage />} />
          <Route path="user-guide" element={<UserGuidePage />} />
          <Route path="system-report" element={<SystemReportPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="plan-fullstack" element={<PlanFullstackPage />} />
          <Route path="plan-callcenter" element={<PlanCallcenterPage />} />
          <Route path="startup-idea" element={<StartupIdeaPage />} />
          <Route path="dev-journal" element={<DevJournalPage />} />
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="spring-security" element={<SpringSecurityPage />} />
          <Route path="spring-websocket" element={<SpringWebSocketPage />} />
          <Route path="spring-ai" element={<SpringAIPage />} />
          <Route path="spring-jpa-jooq" element={<SpringJpaJooqPage />} />
          <Route path="spring-webflux" element={<SpringWebFluxPage />} />
          <Route path="spring-java21" element={<SpringJava21Page />} />
          <Route path="spring-graphql" element={<SpringGraphQLPage />} />
          <Route path="redis-overview" element={<RedisOverviewPage />} />
          <Route path="redis-usage" element={<RedisUsagePage />} />
          <Route path="redis-study" element={<RedisStudyPage />} />
          <Route path="redis-spring" element={<RedisSpringPage />} />
          <Route path="redis-kafka" element={<RedisKafkaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
