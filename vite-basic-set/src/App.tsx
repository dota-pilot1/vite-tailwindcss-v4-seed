import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./widgets/layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ManualPage from "./pages/manual/ManualPage";
import TodoPage from "./pages/todo/TodoPage";
import DevelopersPage from "./pages/developers/DevelopersPage";

/**
 * App.tsx
 *
 * 애플리케이션 Composition Root.
 * - React Router 구성 (BrowserRouter + Routes)
 * - AppLayout 은 전역 프레임, 내부 Outlet 을 통해 하위 페이지 렌더
 * - 라우트: "/"(index) → HomePage, "/about" → AboutPage
 * - 기존 수동 state 기반 내비게이션 제거 (URL 중심 전환)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="manual" element={<ManualPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="developers" element={<DevelopersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
