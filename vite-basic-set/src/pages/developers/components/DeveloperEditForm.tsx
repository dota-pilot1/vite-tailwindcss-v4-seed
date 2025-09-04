import type React from "react";
import { useState } from "react";
import { type Developer } from "../../../stores/developerStore";

interface DeveloperEditFormProps {
  developer: Developer;
  onSave?: (updates: Partial<Developer>) => void;
  onCancel?: () => void;
}

const DeveloperEditForm: React.FC<DeveloperEditFormProps> = ({
  developer,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Developer>(developer);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof Developer, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
    handleChange('skills', skills);
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(developer);
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{developer.name}</h2>
          <p className="text-gray-600">{developer.email}</p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              편집
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* 폼 */}
      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{developer.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{developer.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">레벨</label>
              {isEditing ? (
                <select
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              ) : (
                <p className="text-gray-900 py-2">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    developer.level === 'Lead' ? 'bg-purple-100 text-purple-800' :
                    developer.level === 'Senior' ? 'bg-blue-100 text-blue-800' :
                    developer.level === 'Middle' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {developer.level}
                  </span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">팀</label>
              {isEditing ? (
                <select
                  value={formData.team}
                  onChange={(e) => handleChange('team', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="frontend">Frontend Team</option>
                  <option value="backend">Backend Team</option>
                  <option value="fullstack">Fullstack Team</option>
                  <option value="devops">DevOps Team</option>
                </select>
              ) : (
                <p className="text-gray-900 py-2 capitalize">{developer.team}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleChange('joinDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {new Date(developer.joinDate).toLocaleDateString('ko-KR')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">기술 스택</h3>
          {isEditing ? (
            <div>
              <textarea
                value={formData.skills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="React, TypeScript, Node.js (쉼표로 구분)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">쉼표로 기술을 구분해주세요</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">정보</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor((new Date().getTime() - new Date(developer.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-gray-600">근무일수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{developer.skills.length}</div>
              <div className="text-sm text-gray-600">보유 기술</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Date().getFullYear() - new Date(developer.joinDate).getFullYear() + 1}
              </div>
              <div className="text-sm text-gray-600">근무년차</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperEditForm;
