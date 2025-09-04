import { create } from 'zustand';

export interface Developer {
  id: string;
  name: string;
  email: string;
  level: 'Junior' | 'Middle' | 'Senior' | 'Lead';
  team: string;
  skills: string[];
  joinDate: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  lead: string;
  memberCount: number;
}

interface DeveloperStore {
  developers: Developer[];
  teams: Team[];
  selectedDeveloper: Developer | null;
  isLoading: boolean;

  // Actions
  setSelectedDeveloper: (developer: Developer | null) => void;
  addDeveloper: (developer: Omit<Developer, 'id'>) => void;
  updateDeveloper: (id: string, updates: Partial<Developer>) => void;
  deleteDeveloper: (id: string) => void;
  getDevelopersByTeam: (teamId: string) => Developer[];
}

// 샘플 데이터
const initialDevelopers: Developer[] = [
  {
    id: '1',
    name: '김프론트',
    email: 'kim.frontend@company.com',
    level: 'Senior',
    team: 'frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    joinDate: '2022-01-15',
  },
  {
    id: '2',
    name: '이리액트',
    email: 'lee.react@company.com',
    level: 'Middle',
    team: 'frontend',
    skills: ['React', 'JavaScript', 'CSS', 'Storybook'],
    joinDate: '2022-08-20',
  },
  {
    id: '3',
    name: '박주니어',
    email: 'park.junior@company.com',
    level: 'Junior',
    team: 'frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    joinDate: '2023-03-10',
  },
  {
    id: '4',
    name: '최백엔드',
    email: 'choi.backend@company.com',
    level: 'Lead',
    team: 'backend',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    joinDate: '2021-05-12',
  },
  {
    id: '5',
    name: '정노드',
    email: 'jung.node@company.com',
    level: 'Senior',
    team: 'backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    joinDate: '2021-11-30',
  },
  {
    id: '6',
    name: '오데브',
    email: 'oh.dev@company.com',
    level: 'Middle',
    team: 'backend',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    joinDate: '2022-06-15',
  },
  {
    id: '7',
    name: '서풀스택',
    email: 'seo.fullstack@company.com',
    level: 'Senior',
    team: 'fullstack',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    joinDate: '2021-09-01',
  },
  {
    id: '8',
    name: '윤인프라',
    email: 'yoon.infra@company.com',
    level: 'Lead',
    team: 'devops',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    joinDate: '2020-12-01',
  },
];

const initialTeams: Team[] = [
  {
    id: 'frontend',
    name: 'Frontend Team',
    description: '사용자 인터페이스 개발 팀',
    lead: '김프론트',
    memberCount: 3,
  },
  {
    id: 'backend',
    name: 'Backend Team',
    description: '서버 및 API 개발 팀',
    lead: '최백엔드',
    memberCount: 3,
  },
  {
    id: 'fullstack',
    name: 'Fullstack Team',
    description: '전체 스택 개발 팀',
    lead: '서풀스택',
    memberCount: 1,
  },
  {
    id: 'devops',
    name: 'DevOps Team',
    description: '인프라 및 배포 관리 팀',
    lead: '윤인프라',
    memberCount: 1,
  },
];

export const useDeveloperStore = create<DeveloperStore>((set, get) => ({
  developers: initialDevelopers,
  teams: initialTeams,
  selectedDeveloper: null,
  isLoading: false,

  setSelectedDeveloper: (developer) =>
    set({ selectedDeveloper: developer }),

  addDeveloper: (newDeveloper) =>
    set((state) => ({
      developers: [
        ...state.developers,
        { ...newDeveloper, id: Date.now().toString() }
      ]
    })),

  updateDeveloper: (id, updates) =>
    set((state) => ({
      developers: state.developers.map((dev) =>
        dev.id === id ? { ...dev, ...updates } : dev
      )
    })),

  deleteDeveloper: (id) =>
    set((state) => ({
      developers: state.developers.filter((dev) => dev.id !== id)
    })),

  getDevelopersByTeam: (teamId) => {
    const { developers } = get();
    return developers.filter((dev) => dev.team === teamId);
  },
}));
