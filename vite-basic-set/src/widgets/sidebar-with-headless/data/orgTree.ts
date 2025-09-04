import { type HeadlessTreeNode } from "../ui/HeadlessTreeNav";

/**
 * 샘플 조직 + 메뉴 데이터
 * 조직(센터 > 그룹 > 팀 > 개발자) + 페이지 라우트 예시 혼합 (4단계 구조)
 */
export const ORG_TREE: HeadlessTreeNode[] = [
  {
    id: "center-seoul",
    name: "서울센터",
    isFolder: true,
    children: [
      {
        id: "group-platform",
        name: "플랫폼그룹",
        isFolder: true,
        children: [
          {
            id: "team-fe-core",
            name: "FE Core 팀",
            isFolder: true,
            children: [
              { id: "dev-a", name: "Dev A" },
              { id: "dev-b", name: "Dev B" },
            ],
          },
          {
            id: "team-fe-app",
            name: "FE App 팀",
            isFolder: true,
            children: [
              { id: "dev-c", name: "Dev C" },
              { id: "dev-d", name: "Dev D" },
            ],
          },
        ],
      },
      {
        id: "group-ops",
        name: "운영그룹",
        isFolder: true,
        children: [
          {
            id: "team-qa",
            name: "QA 팀",
            isFolder: true,
            children: [{ id: "dev-qa1", name: "QA 1" }],
          },
        ],
      },
    ],
  },
  {
    id: "center-busan",
    name: "부산센터",
    isFolder: true,
    children: [
      {
        id: "group-regional",
        name: "리저널그룹",
        isFolder: true,
        children: [
          {
            id: "team-r-fe",
            name: "FE 팀",
            isFolder: true,
            children: [{ id: "dev-e", name: "Dev E" }],
          },
        ],
      },
    ],
  },
  // 라우팅 전용 '메뉴' 섹션 (조직과 구분될 수도 있음)
  {
    id: "section-pages",
    name: "페이지",
    isFolder: true,
    children: [
      {
        id: "page-home",
        name: "홈",
        meta: { route: "/" },
      },
      {
        id: "page-about",
        name: "About",
        meta: { route: "/about" },
      },
    ],
  },
];
