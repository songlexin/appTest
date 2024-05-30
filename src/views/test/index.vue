<template>
  <div class="xc-page" ref="dynamicTableFullRef">
    <TableSearchForm
      :ref="refs.bind('mainSearch')"
      :schemas="mainSearchSchemas"
      class="!w-auto flex-0"
      :reset-func="handleReset"
      @submit="handleSearch"
    />
    <DynamicTable
      table-name="APRMS-CUSTOMER-STATUS"
      :scroll="{ y: '100%' }"
      :columns="state.showFlag ? columnsShow : columns"
      fullType="main"
      :data-source="state.tableData"
      :pagination="state.pagination"
      :row-key="(record) => record.id"
      @resize-column="handleResizeColumn"
      @change="handleTableChange"
      :loading="state.loading"
    >
      <template #tableTopLeftAction>
        <title-with-line> 部门应收状态查询 {{ state.showFlag }}</title-with-line>
      </template>
      <template #tableTopRightAction>
        <a-button style="margin: 0 8px 0 0" @click="exportFile" :loading="state.doExportLoaing">
          导出</a-button
        >
      </template>
      <template #summaryTable>
        <span style="margin-right: 16px"
          >平台应收:
          {{
            state.sumReturnAmt3
              ? Number(state.sumReturnAmt3)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '0.00'
          }}</span
        >
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { getCompanyInfoXcTreeWithRange } from '@/api/basic/common';
  import operateApi from '@/api/operate';
  import { useTable } from '@/components/core/dynamic-table';
  import {
    FormItemSchema,
    TableSearchForm,
    TableSearchFormInstance,
  } from '@/components/core/table-search-form';
  import { PAGE_OBJ } from '@/enums/paginationEnums';
  import { useDownloadExcel } from '@/hooks/functions/useResultDownload';
  import { useFullscreen } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { cloneDeep } from 'lodash-es';
  import * as R from 'ramda';
  import { onMounted, provide, reactive, ref, watchEffect } from 'vue';
  import { columns, columnsShow } from './columns';
  const dynamicTableFullRef = ref<HTMLElement>();
  const { toggle, isFullscreen } = useFullscreen(dynamicTableFullRef);
  provide('dynamicTableFullRefKeyMain', { toggle, isFullscreen });
  const [DynamicTable] = useTable();
  // const userStore = useUserStore();
  const state = reactive({
    companyList: [] as any[],
    tableData: [],
    pagination: cloneDeep(PAGE_OBJ), // 分页参数
    searchFormRef: {} as TableSearchFormInstance,
    loading: false,
    sumReturnAmt2: '',
    sumReturnAmt3: '',
    doExportLoaing: false,
    getValue: '',
    showFlag: false,
  });

  // 拖拉表格列
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const refs = reactive<any>({
    mainSearch: null,
    mainTable: null,
    bind: R.curry((name, $evet) => {
      refs[name] = $evet;
    }),
  });
  const mainSearchState = {
    firstCompanyCode: '',
  };
  const mainSearchSchemas: FormItemSchema[] = [
    {
      field: 'mgrCorpId',
      label: '所属公司',
      component: 'DynamicTreeSelect',
      componentProps: {
        disablePaging: true,
        allowClear: false,
        defaultSelectFirst: true,
        enableFrontSearch: true,
        'onUpdate:first-select': (firstId) => {
          mainSearchState.firstCompanyCode = firstId;
          refs.mainSearch.setFormModel('mgrCorpId', firstId);
          queryList();
        },

        placeholder: '请输入',
        api: getCompanyInfoXcTreeWithRange,
        field: {
          // 描述树结构信息
          searchField: 'conditionName',
          labelField: 'cname',
          valueField: 'id',
          childrenField: 'childMenu',
        },
      },
    },
    {
      field: 'custName',
      label: '客户名称',
      component: 'Input',
      componentProps: {},
    },
    {
      field: 'operateName',
      label: '部门名称',
      component: 'Input',
      // component: 'Select',
      // componentProps: {
      //     fieldNames: { label: 'mgrCorpName', value: 'mgrCorpId' },
      //     options: state.companyList,
      //     disabled: true,
      //   },
    },
    {
      field: 'groupByCust',
      component: 'Checkbox',
      label: '按客户分组',
      colProps: {
        span: 1,
      },
      componentSlots: 'Check',
      componentProps: {
        onChange: handleSearch,
      },
    },
  ];

  // 表格查询
  const queryList = async () => {
    state.loading = true;
    try {
      const params = {
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
        predicate: '',
        queryObject: {
          companyCode: refs.mainSearch.formModel.mgrCorpId,
          custName: refs.mainSearch.formModel.custName,
          operateName: refs.mainSearch.formModel.operateName,
          groupByCust: refs.mainSearch.formModel?.groupByCust ? 1 : '',
        },
      };

      const res = await operateApi.getOperateList(params);
      const { data, total, pageSize, pageNum, totalInfo } = res.data;
      state.tableData = data;
      state.sumReturnAmt2 = totalInfo?.sumReturn2;
      state.sumReturnAmt3 = totalInfo?.sumReturn3;
      state.pagination.total = total;
      state.pagination.pageSize = pageSize;
      state.pagination.current = pageNum;
    } catch (error) {
    } finally {
      state.loading = false;
    }
  };

  //表格查询
  async function handleSearch() {
    state.pagination.current = 1;
    await queryList();
  }
  async function handleReset() {
    refs.mainSearch.setFormModel('mgrCorpId', mainSearchState.firstCompanyCode);
    refs.mainSearch.setFormModel('custName', '');
    refs.mainSearch.setFormModel('operateName', '');
    refs.mainSearch.setFormModel('groupByCust', false);

    handleSearch();
  }
  // 页码改变
  const handleTableChange = (pagination) => {
    state.pagination.current = pagination.current;
    state.pagination.pageSize = pagination.pageSize;
    if (state.pagination.pageSize != pagination.pageSize) {
      state.pagination.pageSize = pagination.pageSize;
      state.pagination.current = 1;
    } else {
      state.pagination.current = pagination.current;
    }
    queryList();
  };
  // 导出
  const exportFile = async () => {
    state.doExportLoaing = true;
    try {
      const param = {
        companyCode: refs.mainSearch.formModel.mgrCorpId,
        custName: refs.mainSearch.formModel.custName,
        operateName: refs.mainSearch.formModel.operateName,
        groupByCust: refs.mainSearch.formModel?.groupByCust ? 1 : '',
      };
      const fileName = `部门应收状态报表${dayjs().format('YYYY-MM-DD')}.xlsx`;
      const exportResult = await useDownloadExcel(param, operateApi.operateExportFile, fileName);
      console.log(exportResult);
    } catch (error) {
      console.log(error);
    } finally {
      state.doExportLoaing = false;
    }
  };
  watchEffect(() => {
    state.getValue = refs.mainSearch?.formModel?.mgrCorpId;
    state.showFlag = refs.mainSearch?.formModel?.groupByCust;
    console.log('col---', columns);
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  :deep(.ant-form-item .ant-checkbox) {
    margin-left: 100px;
  }

  :deep(.xc-page .xc-content .ant-table-container .ant-checkbox) {
    margin-left: 0;
  }
</style>
