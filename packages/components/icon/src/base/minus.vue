<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from '../icon-component.vue';
  export default defineComponent({
    name: 'Minus',
    components: {
      IconComponent,
    }
  });
</script>

<template>
  <IconComponent>
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M883.77734375 434.04101562H140.22265625C97.33203125 434.04101562 62.26367187 469.109375 62.26367187 512c0 42.890625 35.06835938 77.95898438 77.95898438 77.95898438h743.5546875c42.890625 0 77.95898438-35.06835938 77.95898438-77.95898438 0-42.890625-35.06835938-77.95898438-77.95898438-77.95898438z"
      ></path>
    </svg>
  </IconComponent>
</template>
