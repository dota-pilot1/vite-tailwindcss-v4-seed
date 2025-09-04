import type React from "react";
import { useState } from "react";
import {
  type Developer,
  type Team,
  useDeveloperStore,
} from "../../../stores/developerStore";

interface DeveloperTreeMenuProps {
  teams: Team[];
  onDeveloperDoubleClick: (developer: Developer) => void;
  onTeamDoubleClick: (team: Team) => void;
}

const DeveloperTreeMenu: React.FC<DeveloperTreeMenuProps> = ({
  teams,
  onDeveloperDoubleClick,
  onTeamDoubleClick,
}) => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(
    new Set(["frontend", "backend"]),
  );
  const { getDevelopersByTeam } = useDeveloperStore();

  const toggleTeam = (teamId: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Lead":
        return "👑";
      case "Senior":
        return "🌟";
      case "Middle":
        return "💎";
      case "Junior":
        return "🌱";
      default:
        return "👤";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Lead":
        return "text-purple-600";
      case "Senior":
        return "text-blue-600";
      case "Middle":
        return "text-green-600";
      case "Junior":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-2">
      {teams.map((team) => {
        const teamDevelopers = getDevelopersByTeam(team.id);
        const isExpanded = expandedTeams.has(team.id);

        return (
          <div key={team.id} className="mb-2">
            {/* 팀 헤더 */}
            <div
              className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer select-none"
              onClick={() => toggleTeam(team.id)}
              onDoubleClick={() => onTeamDoubleClick(team)}
            >
              <span className="mr-2 text-gray-500">
                {isExpanded ? "📂" : "📁"}
              </span>
              <span className="font-medium text-gray-800 flex-1">
                {team.name}
              </span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {teamDevelopers.length}
              </span>
            </div>

            {/* 팀원 목록 */}
            {isExpanded && (
              <div className="ml-6 space-y-1">
                {teamDevelopers.map((developer) => (
                  <div
                    key={developer.id}
                    className="flex items-center p-2 hover:bg-blue-50 rounded cursor-pointer select-none group"
                    onDoubleClick={() => onDeveloperDoubleClick(developer)}
                  >
                    <span className="mr-2">
                      {getLevelIcon(developer.level)}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-800">
                          {developer.name}
                        </span>
                        <span
                          className={`text-xs font-medium ${getLevelColor(developer.level)}`}
                        >
                          {developer.level}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {developer.email}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs text-blue-600">더블클릭</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DeveloperTreeMenu;
