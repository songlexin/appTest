<template>
  <a-descriptions class="xc-header" :column="props.defaultColumns">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <a-descriptions-item
      v-for="(item, key) in props.descriptionsItems"
      :key="key"
      :label="item.label"
    >
      <template v-if="item.slotName">
        <slot :name="item.slotName"></slot>
      </template>
      <div class="ellipsis" :title="item.value" v-else>
        {{ item.value }}
      </div>
    </a-descriptions-item>
  </a-descriptions>
</template>
<script setup lang="ts">
  import { PropType } from 'vue';
  const props = defineProps({
    descriptionsItems: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
    defaultColumns: {
      type: Number,
      required: false,
      default: 3,
    },
    title: {
      type: String,
      required: false,
      default: '详情',
    },
  });
</script>
<style lang="less" scoped>
  .xc-header {
    :deep(.ant-descriptions-item-label) {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }

    :deep(.ant-descriptions-item-content) {
      color: #666;
    }
  }
</style>
