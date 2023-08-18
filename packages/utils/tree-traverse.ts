// 深度优先遍历
export const dfs = <T extends { children?: T[] }>(
  data: T[],
  { visitor }: { visitor: (node: T, done?: () => void) => void }
) => {
  const stack = [...data]
  let _break = false
  while (stack.length) {
    if (_break) break
    const node = stack.shift()
    visitor(node!, () => {
      _break = true
    })
    const children = node?.children
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.unshift(children[i])
      }
    }
  }
}

// 广度优先遍历
export const bfs = <T extends { children?: T[] }>(
  data: T[],
  { visitor }: { visitor: (node: T, done?: () => void) => void }
) => {
  const stack = [...data]
  let _break = false
  while (stack.length) {
    if (_break) break
    const node = stack.shift()
    visitor(node!, () => {
      _break = true
    })
    const children = node?.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
}
