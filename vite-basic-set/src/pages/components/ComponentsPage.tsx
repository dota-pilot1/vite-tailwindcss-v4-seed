import type React from "react";

export const ComponentsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">UI 컴포넌트 라이브러리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">복잡한 헤더 메뉴</h2>
          <p className="text-gray-600 mb-4">다중 레벨 드롭다운, 실시간 알림, 사용자 프로필</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            예제 보기
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">복잡한 사이드바</h2>
          <p className="text-gray-600 mb-4">트리 구조 네비게이션, 아코디언 메뉴</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            예제 보기
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">동적 탭 시스템</h2>
          <p className="text-gray-600 mb-4">드래그 앤 드롭 탭, 중첩 구조</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            예제 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
