import { computed, ref } from "vue"
import type { Ref } from 'vue'
import { CascaderNode } from "./type"




export const useSelectedPath = (
  dataTree: Ref<CascaderNode[]>,
  { dataMap }:
    {
      dataMap: Map<string, CascaderNode>
    }) => {
  // select node key 
  const selectedPath = ref<string[]>([])
  
  // active node key
  const activeKey = ref<string>()



  // cascader panel 渲染二维数组 
  const renderColumns = computed(() => {
    const columns: CascaderNode[][] = [dataTree.value];
    for (const key of selectedPath.value) {
      const option = dataMap.get(key);
      if (option?.hasChildren) {
        columns.push(option.children!);
      }
    }
    return columns;
  })

  const getTargetNode = (nodeKey?: string) => {
    let node = nodeKey ? dataMap.get(nodeKey) : undefined;
    // if (expandChild.value) {
    //   while (target && target.children && target.children.length > 0) {
    //     // eslint-disable-next-line prefer-destructuring
    //     target = target.children[0];
    //   }
    // }
    // return target;
    return node
  };


  const setSelectedPath = (nodeKey?: string) => {
    const node = getTargetNode(nodeKey);
    selectedPath.value = node?.pathNodes.map((n) => n.key) ?? [];
  };

  const setActiveKey = (nodeKey?:string) => {
    activeKey.value = nodeKey
  }


  return {
    renderColumns,
    selectedPath,
    setSelectedPath,
    activeKey,
    setActiveKey
  }

}