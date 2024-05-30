<template>
  <div class="xc-content max-h-full" :style="props.styleObj" ref="dynamicTableFullRef">
    <!-- <SchemaForm
      v-if="search"
      ref="queryFormRef"
      class="bg-white dark:bg-black mb-16px !pt-24px pr-24px"
      submit-on-reset
      v-bind="getFormProps"
      :table-instance="tableAction"
      @toggle-advanced="(e) => $emit('toggle-advanced', e)"
      @submit="handleSubmit"
    >
      <template v-for="item of getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </SchemaForm> -->
    <TableSearchForm
      v-if="search"
      ref="queryFormRef"
      class="bg-white dark:bg-black !p-0"
      submit-on-reset
      v-bind="getFormProps"
      :table-instance="tableAction"
      @toggle-advanced="(e) => $emit('toggle-advanced', e)"
      @submit="handleSubmit"
    >
      <template v-for="item of getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </TableSearchForm>
    <div class="bg-white dark:bg-black dy-table">
      <ToolBar
        v-if="showToolBar"
        :export-file-name="exportFileName"
        :title="headerTitle"
        :title-tooltip="titleTooltip"
        :show-table-setting="showTableSetting"
        :fullType="fullType"
        :placementType="placementType"
      >
        <template v-for="name of Object.keys($slots)" #[name]="data">
          <slot :name="name" v-bind="data || {}"></slot>
        </template>
      </ToolBar>
      <SchemaForm
        ref="editTableFormRef"
        no-style
        :initial-values="editFormModel"
        :show-action-button-group="false"
        :show-advanced-button="false"
        @validate="handleEditFormValidate"
      >
        <Table
          ref="tableRef"
          v-bind="getBindValues"
          :columns="innerColumns"
          :data-source="tableData"
          :pagination="props.pagination"
          @change="handleTableChange"
          :locale="state.localeObj"
          :bordered="false"
          :loading="props.loading"
        >
          <template v-for="(_, slotName) of $slots" #[slotName]="slotData" :key="slotName">
            <slot :name="slotName" v-bind="slotData"></slot>
          </template>
          <template #bodyCell="slotData">
            <slot name="bodyCell" v-bind="slotData"></slot>
          </template>
        </Table>
      </SchemaForm>
      <div class="summary-table">
        <a-space :size="24"><slot name="summaryTable"></slot> </a-space
      ></div>
      <xcTableNoData style="display: none"></xcTableNoData>
    </div>
  </div>
</template>

<script lang="tsx" setup>
  import { SchemaForm } from '@/components/core/schema-form';
  import { TableSearchForm } from '@/components/core/table-search-form';
  import { useFullscreen } from '@vueuse/core';
  import { Table } from 'ant-design-vue';
  import { provide, reactive, ref, useSlots, watchEffect } from 'vue';
  import { ToolBar } from './components';
  import { dynamicTableEmits, dynamicTableProps } from './dynamic-table';
  import {
    createTableContext,
    useColumns,
    useEditable,
    useExportData2Excel,
    useTableForm,
    useTableMethods,
    useTableState,
  } from './hooks';
  import type { TableActionType } from './types';
  // @ts-ignore
  import xcTableNoData from '@/components/xc/xc-table/xc-table-noData/index.vue';

  defineOptions({
    name: 'DynamicTable',
    inheritAttrs: false,
  });

  const props = defineProps(dynamicTableProps);
  const emit = defineEmits(dynamicTableEmits);
  const slots = useSlots();
  const state = reactive({
    localeObj: {
      emptyText: <xcTableNoData nodataText={props.nodataText}></xcTableNoData>,
    },
  });
  watchEffect(() => {
    state.localeObj.emptyText = props.loading ? (
      <div></div>
    ) : (
      <xcTableNoData
        nodataText={props.nodataText}
        style="width:100px; left:50%;position:sticky;transform: translateX(-50px);"
      ></xcTableNoData>
    );
  });
  // if (props.fullType === 'detail') {
  // 详情页面 触发详情页全屏
  const dynamicTableFullRef = ref<HTMLElement>();
  const { toggle, isFullscreen } = useFullscreen(dynamicTableFullRef);
  provide('dynamicTableFullRefKey', { toggle, isFullscreen });
  // }

  // 表格内部状态
  const tableState = useTableState({ props, slots });
  const { tableRef, tableData, queryFormRef, editTableFormRef, getBindValues, editFormModel } =
    tableState;
  // 表格内部方法
  const tableMethods = useTableMethods({ state: tableState, props, emit });
  const { setProps, fetchData, handleSubmit, reload, handleTableChange, handleEditFormValidate } =
    tableMethods;
  // 控制编辑行
  const editableHooks = useEditable({ props, state: tableState });
  /** 表格scroll */

  const tableAction: TableActionType = {
    setProps,
    reload,
    fetchData,
    ...editableHooks,
  };

  // 表格列的配置描述
  const { innerColumns } = useColumns({
    props,
    slots,
    state: tableState,
    methods: tableMethods,
    tableAction,
  });

  // 搜索表单
  const { getFormProps, replaceFormSlotKey, getFormSlotKeys } = useTableForm({
    tableState,
    tableMethods,
    slots,
  });

  // 表单导出
  const exportData2ExcelHooks = useExportData2Excel({
    props,
    state: tableState,
    methods: tableMethods,
  });

  // 当前组件所有的状态和方法
  const instance = {
    ...props,
    ...tableState,
    ...tableMethods,
    ...editableHooks,
    ...exportData2ExcelHooks,
    emit,
  };

  createTableContext(instance);

  fetchData();

  defineExpose(instance);
</script>

<style lang="less" scoped>
  .summary-table {
    position: absolute;
    bottom: 16px;
    left: 16px;
    font-size: 14px;
    color: #323232;
    :deep(span) {
      color: #646566;
    }
  }
  :deep(.ant-table-wrapper) {
    // padding: 0 8px 0 8px;

    .ant-table {
      .ant-table-title {
        display: flex;
      }

      .ant-image:hover {
        cursor: zoom-in;
      }

      .ant-btn {
        // margin-right: 10px;
      }
    }
  }

  .actions > * {
    margin-right: 10px;
  }

  .dy-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;

    :deep(.ant-table-pagination.ant-pagination) {
      margin: 0;
      padding: 0px 24px;
      border-top: 1px solid #e6e6e6;
      height: 48px;
      display: flex;
      align-items: center;
    }
    .ant-table-wrapper {
      height: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
      overflow-y: hidden;
    }

    :deep(.ant-form-horizontal) {
      flex: 1;
      height: 0;
      .ant-row {
        height: 100%;
      }
    }
    .nodata {
      margin: 24px 0;

      .nodata-img {
        width: 80px;
        height: 80px;
        text-align: center;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        margin-top: 12px;
        text-align: center;
      }
    }
  }
</style>
