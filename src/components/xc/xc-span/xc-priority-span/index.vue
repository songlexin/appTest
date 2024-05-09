<template>
  <span :class="['statusAll', `status-${props.priority}`]">
    {{ priorityObj[String(props.priority)] || '--' }}
  </span>
</template>
<script lang="ts">
  export default {
    name: 'XcPrioritySpan',
  };
</script>
<script lang="ts" setup>
  const props = defineProps({
    priority: {
      type: Number,
      required: true,
      default: -1,
    },
  });
  const priorityObj = {
    '0': '低',
    '1': '中',
    '2': '高',
  };
</script>
<style lang="less" scoped>
  .statusAll {
    padding: 4px 6px;
    border-radius: 4px;
  }
  .status-0 {
    background: rgba(16, 163, 151, 0.102);
    color: #10a397;
  }
  .status-1 {
    background: rgba(250, 173, 20, 0.1);
    color: #faad14;
  }
  .status-2 {
    background: rgba(255, 77, 79, 0.1);
    color: #ff4d4f;
  }
</style>
