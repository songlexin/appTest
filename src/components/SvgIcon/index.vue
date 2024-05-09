<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClass" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#409eff',
    },
  });
  // 图标在 iconfont 中的名字
  const iconClass = computed(() => {
    return `#icon-${props.name}`;
  });
  // 给图标添加上类名
  const svgClass = computed(() => {
    if (props.class) {
      return `svg-icon ${props.class}`;
    }
    return 'svg-icon';
  });
</script>
<style scoped>
  .svg-icon {
    width: 0.42667rem;
    height: 0.42667rem;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
  }
</style>
