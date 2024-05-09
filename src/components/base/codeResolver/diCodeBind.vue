<template>
  <DraggableModal
    :visible="props.visible"
    width="80%"
    :title="'DI绑定:' + state.codeInfo?.di"
    :footer="null"
    @cancel="closeModal"
    :wrap-class-name="'modal-select-box modal-inherit-height'"
  >
    <div class="xc-page">
      <a-form layout="horizontal" v-innerLabel>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="产品名称:">
              <a-input v-model:value="state.filters.goodsName" placeholder="请输入"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="供应商:">
              <a-input
                v-model:value="state.filters.provName"
                placeholder="请输入"
              ></a-input> </a-form-item
          ></a-col>
          <a-col :span="6">
            <a-form-item label="生产厂家:">
              <a-input
                v-model:value="state.filters.mfrsName"
                placeholder="请输入"
              ></a-input> </a-form-item
          ></a-col>
          <a-col :span="6">
            <a-form-item label="采购模式:" v-if="!props.purMode">
              <a-select
                v-if="!props.purMode"
                v-model:value="state.filters.purMode"
                :options="DIPURMODELIST"
                placeholder="请选择"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6" v-if="state.filters.goodsIds?.length > 0">
            <a-form-item v-if="state.filters.goodsIds?.length > 0">
              <Popover placement="right" width="20" trigger="click">
                <Tag
                  v-for="item in state.filters.goodsIds"
                  :key="item"
                  closable
                  @close="
                    (index) => {
                      state.filters.goodsIds.splice(index, 1);
                    }
                  "
                  >{{ item }}</Tag
                >
                <Button>产品ID({{ state.filters.goodsIds.length }})</Button>
              </Popover>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-button type="primary" @click="search(1)">查询</a-button>
              <a-button @click="searchReset()">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="xc-content xc-page" style="padding: 0 16px">
        <a-table
          class="dy-table xc-content"
          size="small"
          table-name="HDI-DICODEBIND"
          :scroll="{ y: '100%', x: '100%' }"
          :columns="state.columns"
          :data-source="state.tableData"
          :pagination="state.pagination"
          :show-index="true"
          @change="handleTableChange"
          @resize-column="handleResizeColumn"
          row-key="id"
          :loading="state.loading"
          :locale="state.localeObj"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
              <a-button type="link" @click="goToBindDi(record)">绑定</a-button>
            </template>
          </template>
        </a-table>
        <xcTableNoData style="display: none"></xcTableNoData>
      </div>
    </div>
    <goodsDIEdit ref="goodsDiBinder" @refresh="goToBack"> </goodsDIEdit>
  </DraggableModal>
</template>
<script lang="tsx" setup>
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { watch, reactive, ref } from 'vue';
  // import { useTable } from '@/components/core/dynamic-table';
  import { PAGE_OBJ } from '@/enums/paginationEnums';
  import { cloneDeep, uniq } from 'lodash-es';
  import barCoderApi from '@/api/codeResolver';
  import { columns } from './columns';
  import { Popover, Tag, Button } from 'ant-design-vue';
  import { DIPURMODELIST } from '@/enums/stockEnum';
  import goodsDIEdit from '@/views/mdqc/myGoods/goodsDIInfo/add/index.vue';
  import xcTableNoData from '@/components/xc/xc-table/xc-table-noData/index.vue';
  // const [DynamicTable] = useTable();
  const props = defineProps({
    visible: {
      type: Boolean,
      require: true,
    },
    purMode: {
      type: String,
      required: false,
    },
    hosId: {
      type: String,
      required: false,
    },
  });
  const state = reactive({
    loading: false,
    tableData: [] as any[],
    pagination: cloneDeep(PAGE_OBJ),
    filters: {
      purMode: '-1',
      goodsName: '',
      page: 1,
      rows: 20,
      total: 0,
      goodsIds: [],
      provId: '',
    },
    codeInfo: '',
    columns: cloneDeep(columns),
    localeObj: {
      emptyText: <xcTableNoData></xcTableNoData>,
    },
  });
  const goodsDiBinder = ref();
  const goToBindDi = (row) => {
    if (!row) {
      message.error('请选择!');
      return;
    } else {
      let diGoodsGg = '';
      try {
        //产品DI规格
        if (state.codeInfo.lstGoods && state.codeInfo.lstGoods.length > 0) {
          diGoodsGg = state.codeInfo.lstGoods[0].goodsPackageVo.goodsGg;
        }
      } catch (e) {
        diGoodsGg = '';
      }
      let bindDiInfo = {
        di: state.codeInfo.di,
        diType: `${state.codeInfo.udiKind}`,
        codeKind: state.codeInfo.code.substr(0, 2),
        // hosGoodsId: row.id,
        id: row.id,
        goodsGg: diGoodsGg,
        hosVersion: 2,
        spdGoodsCode: row.spdGoodsCode,
      };
      goodsDiBinder.value?.show({ goodsInfo: bindDiInfo, dialogTitle: '产品DI信息' });
      // this.$refs.goodsDiBinder.show(bindDiInfo);
    }
  };
  const emits = defineEmits(['update:visible', 'close']);
  const closeModal = () => {
    emits('update:visible', false);
  };
  const search = async () => {
    state.tableData = [];
    let param = {
      orderBy: '',
      pageNum: state.pagination.current,
      pageSize: state.pagination.pageSize,
      queryObject: {
        hosId: props.hosId,
        // hosId: 'h001e',
        purMode: state.filters.purMode,
        goodsName: state.filters.goodsName,
        goodsIds: state.filters.goodsIds,
        // collectorId: 'p11024',
        collectorId: state.filters.collectorId,
        subProvId: state.filters.subProvId,
        flag: 1,
      },
    };
    try {
      state.loading = true;
      const { data } = await barCoderApi.getHosGood(param);
      state.tableData = data.data;
      state.pagination.total = data.total;
      state.pagination.pageSize = data.pageSize;
      state.pagination.current = data.pageNum;
    } catch (error) {
    } finally {
      state.loading = false;
    }
  };
  const searchReset = async () => {
    state.filters.purMode = '-1';
    state.filters.goodsName = '';
  };
  const handleTableChange = (pagination) => {
    state.pagination.current = pagination.current;
    state.pagination.pageSize = pagination.pageSize;
  };
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const show = (goodsIds, collectorId, subProvId, codeInfo) => {
    state.codeInfo = codeInfo;
    let Ids = Object.assign([], goodsIds);
    state.filters.goodsIds = uniq(Ids);
    state.filters.subProvId = subProvId;
    state.filters.collectorId = collectorId;
    search();
  };
  const goToBack = () => {
    // message.success('操作成功2');
    console.log(2);
    emits('update:visible', false);
  };
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        console.log(val);
        // state.filters.
        // search();
      } else {
        // 清除所有值
      }
    },
  );
  defineExpose({
    show,
  });
</script>
<style lang="less" scoped>
  .xc-page {
    padding-top: 0px;
    // ._inner-label-form {
    //   margin-left: 0px !important;
    // }
    // ._inner-label-form ._form-col:last-child:has(._btn) {
    //   padding-right: 0px;
    // }
  }
</style>
<style lang="less">
  .modal-inherit-height {
    .ant-modal-body {
      & > div {
        height: 100%;
      }
    }
  }
</style>
