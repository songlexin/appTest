<template>
  <div class="xc-layout-tb xc-page put-page">
    <!-- 顶部基本信息 -->
    <a-descriptions class="xc-header">
      <template #title>
        {{ props.headerTitle
        }}<right-outlined
          class="xc-header-icon"
          v-show="state.headerShow"
          @click="state.headerShow = false"
        /><up-outlined
          class="xc-header-icon"
          v-show="!state.headerShow"
          @click="state.headerShow = true"
        />
      </template>
      <template v-if="$slots.extra" #extra>
        <slot name="extra"></slot>
      </template>
      <template v-if="state.headerShow">
        <a-descriptions-item
          v-for="item in props.descriptionsList"
          :key="item.title"
          :label="item.title"
          :span="item.spanNum || 1"
        >
          {{
            typeof item.customRender === 'function'
              ? item.customRender(props.detailInfo)
              : props.detailInfo[item.value] || '--'
          }}
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <!-- 顶部搜索条件 -->
    <div class="xc-content" style="padding-top: 8px">
      <div class="xc-content-box">
        <!-- <div class="xc-content-title" style="margin-bottom: 16px">请领详情</div> -->
        <!-- :row-key="(item) => item.id" -->
        <slot name="contentBoxTable">
          <DynamicTable
            :table-name="'RECEIVE_DETAIL'"
            class="xc-content components-table-demo-nested"
            :columns="props.tableInfo.columns"
            :data-source="props.tableInfo.queryData"
            :pagination="props.tableInfo.pagination"
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
      </div>
    </div>
    <!-- 审批显示 -->
    <div v-if="props.isAuditShow" class="xc-foot">
      <slot name="footAudit">
        <a-row>
          <a-col :span="24">
            <a-form :model="state.sumbitParams">
              <a-form-item label="审核意见" name="remark">
                <a-textarea
                  v-model:value="state.sumbitParams.remark"
                  placeholder="限50字符"
                  maxlength="50"
                ></a-textarea
              ></a-form-item>
            </a-form>
          </a-col>
        </a-row>
        <div style="text-align: center">
          <a-button type="primary" @click="action(true)"> 通过</a-button>
          <a-button type="danger" ghost style="margin: 0 16px" @click="action(false)">
            驳回</a-button
          >
          <a-button @click="goBack"> 返回</a-button>
        </div></slot
      >
    </div>
  </div>
</template>
<script setup lang="ts">
  // 适用头部是descriptions详情
  // 中部是table
  // 底部可能会form提交的审核页面和详情页面
  import { reactive, onMounted, PropType } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { RightOutlined, UpOutlined } from '@ant-design/icons-vue';
  // import { message } from 'ant-design-vue';
  // import { detailColumns } from './columns';
  // import { rules } from './rules';
  import { useTable } from '@/components/core/dynamic-table';
  import { PAGE_OBJ } from '@/enums/paginationEnums';
  // import ReceiveSearchApi from '@/api/dept/receive/search';
  // import ReceiveAuditApi from '@/api/dept/receive/audit';
  // import { formatEnum } from '@/utils/dict-format';
  // defineOptions({ name: 'receive-Detail' });
  const props = defineProps({
    headerTitle: {
      type: String,
      required: false,
    },
    descriptionsList: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
    detailInfo: {
      type: Object as PropType<any>,
      required: true,
      default: () => {},
    },
    tableInfo: {
      type: Object as PropType<any>,
      required: false,
      default: () => {},
    },
    isAuditShow: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  const [DynamicTable] = useTable();
  const state = reactive({
    queryData: [] as any[], //table数据列表
    pagination: cloneDeep(PAGE_OBJ),
    detailInfo: {} as any,
    sum: {} as any,
    sumbitParams: {
      remark: '',
    },
    columns: [] as any[],
    statusList: [] as any[],
    headerShow: true,
  });

  // const emits = defineEmits(['back']);
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const emit = defineEmits(['click:back', 'click:pass', 'click:reject', 'click:handleTableChange']);

  onMounted(async () => {});
  // 页码改变
  const handleTableChange = (pagination) => {
    // state.pagination.current = pagination.current;
    // state.pagination.pageSize = pagination.pageSize;
    // getList();
    emit('click:handleTableChange', pagination);
  };
  const action = async (obj) => {
    if (obj) {
      emit('click:pass', obj);
    } else {
      emit('click:reject', obj);
    }
  };
  //返回
  const goBack = () => {
    emit('click:back');
  };
</script>
<style lang="less" scoped>
  .put-page {
    background: #f2f3f5 !important;
    padding: 0 !important;
    .xc-header-icon {
      color: #999;
      margin-left: 8px;
      display: inline-block;
      width: 12px;
      height: 8px;
      display: flex;
      align-items: center;
    }
    .header-title {
      margin-bottom: 16px;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
  }
</style>
