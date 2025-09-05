import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Activity,
  TrendingUp,
  Users,
  Search,
  Clock,
  Server,
  Database,
  Wifi,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Zap,
  Globe,
} from "lucide-react";

export interface SystemReportPageProps {
  className?: string;
}

interface SystemMetrics {
  totalNodes: number;
  totalFolders: number;
  totalItems: number;
  activeUsers: number;
  searchPerformance: string;
  systemHealth: "정상" | "주의" | "위험";
  uptime: string;
  responseTime: string;
  lastUpdate: string;
  popularSearches: string[];
  dailyUsers: number[];
  weeklyGrowth: number;
  errorRate: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
}

/**
 * SystemReportPage
 *
 * 시스템 분석 및 리포트 전용 페이지
 * - 실시간 시스템 메트릭
 * - 성능 분석 차트
 * - 사용자 활동 통계
 * - 시스템 상태 모니터링
 */
export const SystemReportPage: React.FC<SystemReportPageProps> = ({
  className,
}) => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalNodes: 42,
    totalFolders: 18,
    totalItems: 24,
    activeUsers: 12,
    searchPerformance: "평균 150ms",
    systemHealth: "정상",
    uptime: "99.9%",
    responseTime: "85ms",
    lastUpdate: "2024-01-15 14:30",
    popularSearches: ["Dev", "팀", "그룹", "서울", "FE"],
    dailyUsers: [45, 52, 48, 61, 55, 67, 73],
    weeklyGrowth: 15.3,
    errorRate: 0.02,
    memoryUsage: 68,
    diskUsage: 45,
    networkLatency: 12,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<"1d" | "7d" | "30d">(
    "7d",
  );
  const [isLoading, setIsLoading] = useState(false);

  // 실시간 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeUsers: Math.max(
          1,
          prev.activeUsers + Math.floor(Math.random() * 6) - 3,
        ),
        responseTime: `${Math.floor(Math.random() * 50 + 60)}ms`,
        networkLatency: Math.floor(Math.random() * 20 + 5),
        lastUpdate: new Date().toLocaleString("ko-KR"),
      }));
    }, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // 실제로는 API 호출
    setTimeout(() => {
      setMetrics((prev) => ({
        ...prev,
        lastUpdate: new Date().toLocaleString("ko-KR"),
      }));
      setIsLoading(false);
    }, 1000);
  };

  const getHealthColor = (health: SystemMetrics["systemHealth"]) => {
    switch (health) {
      case "정상":
        return "text-green-600 bg-green-100";
      case "주의":
        return "text-yellow-600 bg-yellow-100";
      case "위험":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getHealthIcon = (health: SystemMetrics["systemHealth"]) => {
    switch (health) {
      case "정상":
        return <CheckCircle className="w-4 h-4" />;
      case "주의":
        return <AlertCircle className="w-4 h-4" />;
      case "위험":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const mainMetrics = [
    {
      icon: <Activity className="w-6 h-6" />,
      label: "전체 노드",
      value: metrics.totalNodes,
      change: "+12%",
      changeType: "increase" as const,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "활성 사용자",
      value: `${metrics.activeUsers}명`,
      change: `+${metrics.weeklyGrowth}%`,
      changeType: "increase" as const,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "응답 시간",
      value: metrics.responseTime,
      change: "-8ms",
      changeType: "decrease" as const,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "가동률",
      value: metrics.uptime,
      change: "+0.1%",
      changeType: "increase" as const,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
    },
  ];

  const systemStatus = [
    {
      name: "API 서버",
      status: "정상",
      uptime: "99.9%",
      icon: <Server className="w-5 h-5" />,
    },
    {
      name: "데이터베이스",
      status: "정상",
      uptime: "100%",
      icon: <Database className="w-5 h-5" />,
    },
    {
      name: "네트워크",
      status: "정상",
      uptime: "99.8%",
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      name: "검색 엔진",
      status: "정상",
      uptime: "99.7%",
      icon: <Search className="w-5 h-5" />,
    },
  ];

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className || ""}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-slate-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">시스템 리포트</h1>
          </div>
          <p className="text-lg text-gray-600">
            실시간 시스템 성능 및 사용자 활동 분석
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="1d">오늘</option>
            <option value="7d">7일</option>
            <option value="30d">30일</option>
          </select>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            새로고침
          </button>
        </div>
      </div>

      {/* 시스템 상태 개요 */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">시스템 상태</h2>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(
                metrics.systemHealth,
              )}`}
            >
              {getHealthIcon(metrics.systemHealth)}
              {metrics.systemHealth}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatus.map((system, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {system.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {system.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    가동률: {system.uptime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주요 메트릭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div
              className={`inline-flex p-3 rounded-lg ${metric.bgColor} mb-4`}
            >
              <div
                className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
              >
                {metric.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">{metric.label}</div>
              <div
                className={`text-xs font-medium ${
                  metric.changeType === "increase"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 사용자 활동 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            사용자 활동 분석
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">일평균 사용자</span>
              <span className="font-medium text-gray-900">
                {Math.round(
                  metrics.dailyUsers.reduce((a, b) => a + b, 0) /
                    metrics.dailyUsers.length,
                )}
                명
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">주간 증가율</span>
              <span className="font-medium text-green-600">
                +{metrics.weeklyGrowth}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">페이지뷰</span>
              <span className="font-medium text-gray-900">2,847</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">세션 시간</span>
              <span className="font-medium text-gray-900">8분 32초</span>
            </div>
          </div>
        </div>

        {/* 성능 지표 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            성능 지표
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">메모리 사용률</span>
                <span className="font-medium text-gray-900">
                  {metrics.memoryUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.memoryUsage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">디스크 사용률</span>
                <span className="font-medium text-gray-900">
                  {metrics.diskUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.diskUsage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">에러율</span>
                <span className="font-medium text-gray-900">
                  {metrics.errorRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.errorRate * 50}%` }}
                ></div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">네트워크 지연시간</span>
                <span className="font-medium text-gray-900">
                  {metrics.networkLatency}ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인기 검색어 및 업데이트 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            인기 검색어
          </h3>
          <div className="space-y-3">
            {metrics.popularSearches.map((term, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">#{term}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {Math.floor(Math.random() * 50 + 10)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" />
            시스템 정보
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">마지막 업데이트</span>
              </div>
              <span className="font-medium text-gray-900 text-sm">
                {metrics.lastUpdate}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">서버 버전</span>
              </div>
              <span className="font-medium text-gray-900 text-sm">v2.1.0</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">DB 크기</span>
              </div>
              <span className="font-medium text-gray-900 text-sm">24.8 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 내보내기 옵션 */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-slate-600" />
          리포트 내보내기
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">PDF 리포트</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">CSV 데이터</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Excel 파일</span>
          </button>
        </div>
      </div>
    </div>
  );
};

SystemReportPage.displayName = "SystemReportPage";
export default SystemReportPage;
