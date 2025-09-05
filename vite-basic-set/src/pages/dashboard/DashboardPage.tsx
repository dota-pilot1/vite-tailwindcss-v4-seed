import type React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600">총 사용자</h3>
          <p className="text-3xl font-bold text-blue-600">12,345</p>
          <p className="text-sm text-green-500">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600">매출</h3>
          <p className="text-3xl font-bold text-green-600">$54,321</p>
          <p className="text-sm text-green-500">+8% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600">주문 수</h3>
          <p className="text-3xl font-bold text-yellow-600">987</p>
          <p className="text-sm text-red-500">-3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600">전환율</h3>
          <p className="text-3xl font-bold text-slate-600">3.24%</p>
          <p className="text-sm text-green-500">+0.5% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">실시간 차트</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">차트 영역 (Chart.js / Recharts)</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">최근 활동</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                U
              </div>
              <div>
                <p className="font-medium">새로운 사용자 등록</p>
                <p className="text-sm text-gray-500">5분 전</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                $
              </div>
              <div>
                <p className="font-medium">결제 완료</p>
                <p className="text-sm text-gray-500">12분 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
