<template>
  <Space :size="8">
    <FullSetting v-if="fullType" :fullType="fullType" />
    <ColumnSetting :placementType="placementType" />
    <!-- <SizeSetting /> -->
  </Space>
</template>

<script lang="ts" setup>
  import { Space } from 'ant-design-vue';
  // import SizeSetting from './size-setting.vue';
  // import RefreshSetting from './refresh-setting.vue';
  import ColumnSetting from './column-setting.vue';
  import FullSetting from './full-setting.vue';
  // import FullSetting from '@/layout/header/components/fullscreen/index.vue';
  defineProps({
    fullType: {
      type: String,
      default: '',
    },
    placementType: {
      type: String,
      default: 'leftTop',
    },
  });
</script>
