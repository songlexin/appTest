<template>
  <div class="flex justify-between  tool-bar mb-8px table-tool">
    <div style="display: flex; align-items: center">
      <slot name="tableTopLeftAction"></slot>
    </div>
    <!-- <slot name="headerTitle">
      <div class="title">
        {{ title }}
        <BasicHelp v-if="titleTooltip" class="ml-6px pt-3px" :text="titleTooltip" />
      </div>
    </slot> -->

    <div style="display: flex; align-items: center">
      <div class="table-top-right-action flex flex-row">
            <slot name="tableTopRightAction"></slot>
            <span v-if="exportFileName" @click="exportData2Excel">
              <slot name="export-button">
                <a-button type="primary">导出</a-button>
              </slot>
            </span>
          </div>
      <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" />
      <TableSetting v-if="showTableSetting" :fullType="fullType" :placementType="placementType" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Divider, Space } from 'ant-design-vue';
import TableSetting from '../table-settings/index.vue';
// import BasicHelp from '@/components/basic/basic-help/index.vue';
import { useTableContext } from '@/components/core/dynamic-table/src/hooks';

defineOptions({
  name: 'ToolBar',
});

defineProps({
  title: {
    type: String,
    default: '',
  },
  exportFileName: {
    type: String,
    default: '',
  },
  titleTooltip: {
    type: String,
    default: '',
  },
  showTableSetting: {
    type: Boolean,
    default: true,
  },
  fullType: {
    type: String,
    default: '',
  },
  placementType: {
    type: String,
    default: 'leftTop',
  },
});

const { exportData2Excel } = useTableContext();
</script>

<style lang="less" >
.table-top-right-action {
  margin-right:  !important;
  &>button{
    &:last-child{
      margin: 0px!important;
    }
  }
  &>span:last-child{
    button:last-child{
      margin: 0px!important;
    }
  }
  form.table-search-form {
    margin-bottom: 0 !important;

    .table-form-row-container {
      flex-wrap: nowrap;
      column-gap: 8px;
    
    }
  }
}
</style>
