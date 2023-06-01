import { defineComponent } from 'vue'


export default defineComponent({
  name: 'SorterPopup',
  props:{
    sortChange: {
      type:Function
    },
    activeSort:{
      type:String
    },
    hitColumnProp:{
      type:Boolean
    }
  },
  setup(props,) {
    const list = [
      {label: '升序',value: 'ascend'},
      {label: '降序',value: 'descend'},
    ]

    return () => {
      return (
        <div class={['bn-table__sort-popup']}>
          {
            list.map(item => (
              <div 
              class={['bn-table__sort-item',{
                'bn-table__sort-item-active': props.activeSort === item.value && props.hitColumnProp
              }]}
              onClick={() => props.sortChange!(item.value)}
              >{item.label}</div>
            ))
          }
        </div>
      )
    }
  }
})