// 深度优先
export const dfs = <T extends { children?: T[] }>(
  data: T[],
  { visitor }: { visitor: (node: T) => void }
) => {
  // 深度优先遍历
  const stack = [...data]
  while (stack.length) {
    const node = stack.shift()
    visitor(node!)
    const children = node?.children
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.unshift(children[i])
      }
    }
  }
}
