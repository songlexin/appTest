<template>
  <div class="tab">
    <div
      v-for="(item, index) in props.tabList"
      :key="index"
      class="tab-li"
      :class="{ active: props.activeIndex == index }"
      @click="onChangeIndex(index)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  // import { ref } from 'vue';
  import { selColor } from '@/utils/getColor';

  const emit = defineEmits<{
    (e: 'changeIndex', index): void;
  }>();
  const props = defineProps({
    // 搜索传参
    tabList: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      required: true,
      default: 0,
    },
  });
  const onChangeIndex = (index) => {
    emit('changeIndex', index);
  };
</script>
<style lang="less" scoped>
  .tab {
    padding: 0 12px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    display: flex;
    cursor: pointer;
    .tab-li {
      margin: 0 12px;
      margin-bottom: -1px;
      font-size: 16px;
      font-weight: 500;
    }
    .active {
      color: v-bind(selColor);
      border-bottom: 2px solid v-bind(selColor);
    }
  }
</style>
