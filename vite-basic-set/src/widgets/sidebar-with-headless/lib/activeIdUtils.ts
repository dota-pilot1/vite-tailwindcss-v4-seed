import { type HeadlessTreeNode } from "../ui/HeadlessTreeNav";

/**
 * 현재 pathname 을 기준으로 activeId 계산 (meta.route 매칭)
 */
export function deriveActiveId(
  nodes: HeadlessTreeNode[],
  pathname: string,
): string | undefined {
  const stack: HeadlessTreeNode[] = [...nodes];
  while (stack.length) {
    const n = stack.pop()!;
    // @ts-expect-error(meta 자유 필드)
    const route = n.meta?.route;
    if (route && route === pathname) return n.id;
    if (n.children) stack.push(...n.children);
  }
  return undefined;
}
