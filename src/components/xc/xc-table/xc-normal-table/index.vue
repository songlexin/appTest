<template>
  <div class="xc-page">
    <div class="xc-header xc-header-table-search">
      <slot name="xcHeaderTableSearch">
        <SchemaForm @toggle-Drawer="handleToggleDrawer">
          <template v-for="slotName in soltTopList" #[slotName]="slotData" :key="slotName">
            <slot :name="slotName" v-bind="slotData"></slot> </template></SchemaForm
      ></slot>
    </div>
    <slot name="contentBoxTable">
      <DynamicTable
        :table-name="'RECEIVE_DETAIL'"
        class="xc-content components-table-demo-nested"
        :columns="props.tableInfo.columns"
        :data-source="state.queryData"
        :pagination="state.pagination"
        :row-key="props.tableInfo.rowKey"
        :scroll="{ y: '100%' }"
        @change="handleTableChange"
        @resizeColumn="handleResizeColumn"
      >
        <template
          v-for="slotName in ['bodyCell', 'headerCell', 'summaryTable']"
          #[slotName]="slotData"
          :key="slotName"
        >
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>
      </DynamicTable>
    </slot>
    <!-- 高级搜索 -->
    <a-drawer
      v-model:visible="state.drawerVisible"
      title="高级筛选"
      placement="right"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      :width="500"
    >
      <SchemaFormDrawer>
        <template v-for="slotName in soltList" #[slotName]="slotData" :key="slotName">
          <slot :name="slotName" v-bind="slotData"></slot> </template
      ></SchemaFormDrawer>
      <a-form :model="state.search" autocomplete="off" :label-col="{ style: { width: '100px' } }">
        <a-form-item
          v-for="item in props.tableFormSearchList"
          :key="item.formName"
          :label="item.formLabel"
          :name="item.formName"
        >
          <template v-if="item.formType === 'input'">
            <a-input
              :placeholder="item.placeholderTxt ? item.placeholderTxt : '请输入'"
              v-model:value="state.search[item.formName]"
            ></a-input>
          </template>
          <template v-else-if="item.formType === 'select'">
            <a-select
              :disabled="item.disabled"
              v-model:value="state.search[item.formName]"
              :placeholder="item.placeholderTxt ? item.placeholderTxt : '请选择'"
              show-search
              style="width: 100%"
              :filter-option="filterOption1"
              :options="item.formTypeOption"
              :field-names="item.fieldNames"
            ></a-select>
          </template>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button style="margin-right: 8px" @click="reset">重置</a-button>
        <a-button type="primary" @click="searchList">筛选</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'XcNormalTable',
  };
</script>
<script setup lang="ts">
  import { reactive, onMounted, computed } from 'vue';
  import { cloneDeep } from 'lodash-es';
  // import { useRouter } from 'vue-router';
  //   import { message, Modal } from 'ant-design-vue';
  // import { selColor } from '@/utils/getColor';
  import { useTable } from '@/components/core/dynamic-table';
  // import listApi from '@/api/basic/dept/list';
  import { PAGE_OBJ } from '@/enums/paginationEnums';
  import { TableType, FormSearchList } from './normalTable';
  // import { schemas } from './form-schema';
  import { useForm } from '@/components/core/schema-form';
  import type { FormSchema } from '@/components/core/schema-form';
  //   import { getLoginUser } from '@/utils/authUtil';
  const [DynamicTable] = useTable();
  //   const loginUser = getLoginUser();

  const props = defineProps({
    tableFormSearchList: {
      type: Array as PropType<FormSearchList>,
      required: false,
      default: () => [],
    },
    tableInfo: {
      type: Object as PropType<TableType>,
      required: false,
      default: () => {},
    },
    fetchData: {
      type: Function,
      required: false,
      default: () => ({}),
    },
    schemas: {
      type: Array as PropType<FormSchema[]>,
      required: true,
      default: () => [],
    },
  });

  const [SchemaForm] = useForm({
    labelWidth: 100,
    schemas: props.schemas.slice(0, 3),
    showAdvancedButton: true,
    baseCol: {
      span: 6,
    },
    actionColOptions: {
      span: 6,
    },
    isDawerButton: props.schemas.length > 3,
  });

  const handleToggleDrawer = () => {
    state.drawerVisible = true;
  };
  const [SchemaFormDrawer] = useForm({
    labelWidth: 100,
    schemas: props.schemas,
    showAdvancedButton: false,
    actionColOptions: {
      span: 24,
    },
    baseCol: {
      span: 24,
    },
  });
  let soltList = computed({
    get() {
      let arr = [] as any[];
      props.schemas.map((item: any) => {
        if (item.slot) {
          arr.push(item.slot);
        }
      });
      return arr;
    },
    set(value) {
      return value;
    },
  });
  let soltTopList = computed({
    get() {
      let arr = [] as any[];
      props.schemas.slice(0, 3).map((item: any) => {
        if (item.slot) {
          arr.push(item.slot);
        }
      });
      return arr;
    },
    set(value) {
      return value;
    },
  });

  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const handleTableChange = (pagination) => {
    state.pagination.current = pagination.current;
    state.pagination.pageSize = pagination.pageSize;
    getList();
  };
  // 查询
  const searchList = () => {
    state.pagination.current = 1;
    getList();
  };
  // 分页查询系统列表
  async function getList() {
    try {
      state.drawerVisible = false;
      const param = {
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
        orderBy: props.tableInfo.orderBy,
        queryObject: {
          ...state.search,
          //   hosId: userStore.userInfo.mgrCorpId,
        },
      };
      const res = await props.fetchData(param);
      const { data, total } = res.data;
      state.queryData = data;
      state.pagination.total = total;
    } catch (error) {}
  }
  onMounted(() => {
    getList();
  });
  const state = reactive({
    queryData: [] as any[], //table数据列表
    pagination: cloneDeep(PAGE_OBJ),
    drawerVisible: false,
    search: {} as any,
  });
  //重置
  const reset = () => {
    state.search = {
      ename: '',
      branchId: undefined,
      deptKind: undefined,
    };
    state.pagination.current = 1;
    getList();
  };
  // 前端搜索
  const filterOption1 = (input: string, option: any, item) => {
    // return option.ename.indexOf(input) >= 0;
  };
</script>
<style lang="less" scoped></style>
