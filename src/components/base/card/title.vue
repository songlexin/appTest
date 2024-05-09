<template>
  <div class="card-level2-title">
    <span :class="showPrefix ? 'title-prefix-line' : ''">
      <slot></slot>
    </span>
  </div>
</template>
<script lang="tsx" setup>
  import { computed } from 'vue';

  const props = defineProps({
    showPrefix: {
      type: Boolean,
      default: true,
    },
  });
  const showPrefix = computed(() => props.showPrefix);
</script>
<style lang="less" scoped>
  .card-level2-title {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 16px;
  }
  .title-prefix-line {
    padding-left: 12px;
    position: relative;
  }
  .title-prefix-line::before {
    content: '';
    position: absolute;
    height: 14px;
    top: 3px;
    left: 0px;
    width: 4px;
    background: var(--ant-primary-color);
    display: inline-block;
    box-sizing: content-box;
  }
</style>
