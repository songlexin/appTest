<template>
  <div class="priority-icon"
    ><span v-if="props.priority == 0"><img src="@/assets/images/icon_yxj_low.png" /></span>
    <span v-else-if="props.priority == 1"><img src="@/assets/images/icon_yxj_middle.png" /></span>
    <span v-else-if="props.priority == 2"><img src="@/assets/images/icon_yxj_high.png" /></span
  ></div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    priority: {
      type: Number,
      required: true,
      default: -1,
    },
  });
</script>
<style lang="less" scoped>
  .ant-descriptions-extra {
    position: relative;
  }
  .priority-icon {
    position: absolute;
    // top: 50px;
    right: 20px;
    width: 60px;
  }
</style>
