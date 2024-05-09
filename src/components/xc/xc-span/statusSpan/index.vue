<template>
  <span :class="['status-span', `status-${props.type}`]">{{ props.text }}</span>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'green',
    },
    text: {
      type: String,
      required: true,
      default: '--',
    },
  });
</script>

<style lang="less" scoped>
  .status-span {
    padding: 2px 6px;
    // border-radius: 4px;
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    white-space: nowrap;
  }

  .status-green {
    color: #34c759;
    background: rgba(52, 199, 89, 0.1);
  }
  .status-orange {
    color: #ff9500;
    background: rgba(255, 149, 0, 0.1);
  }
  .status-red {
    color: #ff3b30;
    background: rgba(255, 59, 48, 0.1);
  }
  .status-blue {
    color: #007aff;
    background: rgba(0, 122, 255, 0.1);
  }

  .status-gray {
    color: #969799;
    background: rgba(150, 151, 153, 0.1);
  }
</style>
