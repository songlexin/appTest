<template>
  <div>
    <a-form
      ref="tableOneRef"
      class="xc-page"
      :model="state.formOne"
      autocomplete="off"
      style="padding-top: 0"
    >
      <a-table
        table-name="APRMS-CHECK-REPLY-REGISTER1"
        :columns="columns"
        :data-source="state.formOne.tableList"
        :scroll="{ y: '200px ' }"
        :row-key="(item) => item.id"
        :show-tool-bar="false"
        @resize-column="handleResizeColumn"
        :pagination="false"
        :show-index="true"
      >
        <template #headerCell="{ column }">
          <template
            v-if="
              [
                'accountDate',
                'receiveBalance',
                'returnBalance',
                'userCname',
                'ledgerTypeCode',
                'differTypeCode',
                'receiptFlag',
              ].includes(column.dataIndex)
            "
          >
            <p><span style="color: red"> * </span> {{ column.title }}</p>
          </template>
        </template>
        <template #bodyCell="{ column, record, index }">
          <a-form-item
            v-if="column.dataIndex === 'returnBalance'"
            :name="['tableList', index, 'returnBalance']"
            :rules="[{ required: true, message: '请输入规格型号' }]"
          >
            <a-input v-model:value="record.returnBalance"></a-input>
          </a-form-item>
        </template>
      </a-table>
      <a-button type="primary" @click="submit">提交</a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/components/core/dynamic-table';

  import { PAGE_OBJ } from '@/enums/paginationEnums';

  import { cloneDeep } from 'lodash-es';
  import { onMounted, reactive, ref } from 'vue';
  import { columns } from './columns';
  const [DynamicTable] = useTable();

  const state = reactive({
    registerTitle: '',
    formState: {
      sendLetterDate: '',
      backLetterDate: '' as any,
      backLetterStamp: '',
      accountingName: '' as any,
      custWanderCycle: 0,
      backLetterPassFlag: 0,
      remark: '',
    },
    pagination: cloneDeep(PAGE_OBJ), // 分页参数
    showAdjustModal: false,
    showInvoiceModal: false,
    adjustTableData: [],
    adjustPagination: cloneDeep(PAGE_OBJ), // 分页参数
    adjustTitle: '差异调节—选择未核销记账明细',
    adjustType: '',
    busiType: '',
    adjustColumns: [] as any,
    selectedRowKeys: [] as any,
    selectedRows: {} as any,
    showSelect: false,
    selectLength: 0,
    erpChecked: false,
    invoiceChecked: false,
    ledgerOptions: [] as any,
    diffOptions: [] as any, //差异类型
    formOne: {
      tableList: [{ returnBalance: '22' }] as any,
    },

    beforeAdjustOne: 0,
    afterAdjustOne: 0 as any,
    beforeAdjustTwo: 0,
    afterAdjustTwo: 0 as any,
    difference: 0 as any,
    clickMenu: '',
    stampOptions: [
      {
        label: '没有盖章',
        value: '0',
      },
      {
        label: '公章',
        value: '1',
      },
      {
        label: '部门章',
        value: '2',
      },
      {
        label: '其他印章',
        value: '3',
      },
      {
        label: '财务专用章',
        value: '4',
      },
    ],
    passFlagOptions: [
      {
        label: '合格',
        value: 1,
      },
      {
        label: '不合格',
        value: 0,
      },
    ],
    busiOptions: [
      {
        label: '新增ERP',
        value: '10',
      },
      {
        label: '新增回款',
        value: '20',
      },
      {
        label: '新增发票',
        value: '30',
      },
      {
        label: '新增其他',
        value: '40',
      },
    ],
    receiptOptions: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
  });

  const submit = () => {
    tableOneRef.value.validate();
  };

  const changeLedgerOne = (val, record) => {
    const row = state.ledgerOptions.filter((item) => {
      return item.kindCode == val;
    });
    record.ledgerTypeDesc = row[0].kindName;
    // record.ledgerTypeCode = row[0].kindCode;
  };

  // 拖拉表格列
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };

  const tableOneRef = ref();

  onMounted(() => {});
</script>

<style lang="less" scoped>
  .xc-page {
    padding: 0;
  }
  .adjust-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    margin-top: 12px;
    .main-title {
      font-family: Microsoft YaHei;
      font-size: 16px;
      font-weight: 600;
      color: #323232;
    }
    .amount-title {
      font-family: Microsoft YaHei;
      font-size: 14px;
      font-weight: normal;
      color: #646566;
    }
    .diff-amount {
      font-size: 14px;
      font-weight: normal;
      color: #d40000;
    }
    i.line {
      display: inline-block;
      width: 1px;
      height: 12px;
      background-color: #dcdee0;
      margin: 0 16px;
    }
    :deep(.ant-dropdown-trigger) {
      display: flex;
      align-items: center;
    }
  }
</style>
