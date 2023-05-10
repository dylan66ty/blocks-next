import {VNode} from 'vue'
export const getAllElements = (children: VNode[] | undefined):VNode[] => {
  const results: VNode[] = [];
  for (const item of children ?? []) {
    if(item.patchFlag === 256) { // v-for
      if(item.children) {
        results.push(...getAllElements(item.children as VNode[]))
      }
    }else {
      results.push(item)
    }
  }
  return results;
}