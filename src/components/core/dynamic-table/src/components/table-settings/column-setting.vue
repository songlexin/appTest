<template>
  <Tooltip placement="top">
    <template #title>
      <span>列设置</span>
    </template>
    <Popover
      :placement="props.placementType"
      trigger="click"
      overlay-class-name="cloumn-list"
      @visible-change="handleVisibleChange"
    >
      <template #title>
        <div class="popover-title">
          <!-- <Checkbox
            v-model:checked="checkAll"
            :indeterminate="indeterminate"
            @change="handleCheckAllChange"
          >
            列展示
          </Checkbox>
           -->
          <label>设置</label>
          <a-button size="small" type="link" @click="reset"> 重置 </a-button>
        </div>
      </template>
      <template #content>
        <div class="content-top">
          <p class="content-title">表格设置</p>
          <div style="margin: 16px 0">
            <label class="set-label">行高设置</label>
            <a-radio-group v-model:value="selectedKeysRef" @change="sizeChange">
              <a-radio-button value="large">分散</a-radio-button>
              <a-radio-button value="middle">中等</a-radio-button>
              <a-radio-button value="small">紧簇</a-radio-button>
            </a-radio-group></div
          >
          <label class="set-label">显示序列号</label>
          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            序号列
          </Checkbox>
        </div>
        <div ref="columnListRef">
          <p class="content-title" style="margin: 16px 0">字段设置</p>
          <div
            class="columnListRefLeft"
            v-if="tableColumns.filter((item) => item.fixed === 'left').length"
            ref="columnListRefLeft"
          >
            <template
              v-for="item in tableColumns.filter((item) => item.fixed === 'left')"
              :key="table.getColumnKey(item)"
            >
              <div class="check-item">
                <div style="padding: 4px 16px 8px 0">
                  <i
                    class="iconfont icon-icon_draggable table-column-drag-icon pr-6px cursor-move"
                  ></i>
                  <Checkbox
                    v-model:checked="item.hideInTable"
                    :true-value="false"
                    :false-value="true"
                    @change="handleColumsCheckChange()"
                  >
                    {{ item.title }}
                  </Checkbox>
                </div>
                <div class="column-fixed">
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title>{{ item.fixed === 'left' ? '取消' : '' }}固定到列首 </template>

                    <i
                      class="iconfont icon-icon_top fixed-left"
                      :class="{
                        active: item.fixed === 'left',
                        disabledIcon: item.fixed === 'right',
                      }"
                      @click="handleColumnFixed(item, 'left')"
                    ></i>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title
                      >{{ item.fixed === 'right' ? '取消' : '' }}固定到列尾
                    </template>
                    <i
                      class="iconfont icon-icon_bottom fixed-right"
                      :class="{
                        active: item.fixed === 'right',
                        disabledIcon: item.fixed === 'left',
                      }"
                      @click="handleColumnFixed(item, 'right')"
                    ></i>
                  </Tooltip>
                </div>
              </div>
            </template>
          </div>
          <div
            v-if="
              tableColumns.filter((item) => item.fixed != 'left' && item.fixed != 'right').length
            "
            class="columnListRefNormal"
            ref="columnListRefNormal"
          >
            <template
              v-for="item in tableColumns.filter(
                (item) => item.fixed != 'left' && item.fixed != 'right',
              )"
              :key="table.getColumnKey(item)"
            >
              <div class="check-item">
                <div style="padding: 4px 16px 8px 0">
                  <i
                    class="iconfont icon-icon_draggable table-column-drag-icon pr-6px cursor-move"
                  ></i>
                  <Checkbox
                    v-model:checked="item.hideInTable"
                    :true-value="false"
                    :false-value="true"
                    @change="handleColumsCheckChange()"
                  >
                    {{ item.title }}
                  </Checkbox>
                </div>
                <div class="column-fixed">
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title>{{ item.fixed === 'left' ? '取消' : '' }}固定到列首 </template>
                    <i
                      class="iconfont icon-icon_top fixed-left"
                      :class="{
                        active: item.fixed === 'left',
                        disabledIcon: item.fixed === 'right',
                      }"
                      @click="handleColumnFixed(item, 'left')"
                    ></i>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title
                      >{{ item.fixed === 'right' ? '取消' : '' }}固定到列尾
                    </template>
                    <i
                      class="iconfont icon-icon_bottom fixed-right"
                      :class="{
                        active: item.fixed === 'right',
                        disabledIcon: item.fixed === 'left',
                      }"
                      @click="handleColumnFixed(item, 'right')"
                    ></i>
                  </Tooltip>
                </div>
              </div>
            </template> </div
          ><div
            class="columnListRefRight"
            v-if="
              tableColumns.filter((item) => item.fixed === 'right' && item.dataIndex != 'action')
                .length
            "
            ref="columnListRefRight"
          >
            <template
              v-for="item in tableColumns.filter(
                (item) => item.fixed === 'right' && item.dataIndex != 'action',
              )"
              :key="table.getColumnKey(item)"
            >
              <div class="check-item">
                <div style="padding: 4px 16px 8px 0">
                  <i
                    class="iconfont icon-icon_draggable table-column-drag-icon pr-6px cursor-move"
                  ></i>
                  <Checkbox
                    v-model:checked="item.hideInTable"
                    :true-value="false"
                    :false-value="true"
                    @change="handleColumsCheckChange()"
                  >
                    {{ item.title }}
                  </Checkbox>
                </div>
                <div class="column-fixed">
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title>{{ item.fixed === 'left' ? '取消' : '' }}固定到列首 </template>
                    <i
                      class="iconfont icon-icon_top fixed-left"
                      :class="{
                        active: item.fixed === 'left',
                        disabledIcon: item.fixed === 'right',
                      }"
                      @click="handleColumnFixed(item, 'left')"
                    ></i>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip placement="bottomLeft" :mouse-leave-delay="0.4">
                    <template #title
                      >{{ item.fixed === 'right' ? '取消' : '' }}固定到列尾
                    </template>
                    <i
                      class="iconfont icon-icon_bottom fixed-right"
                      :class="{
                        active: item.fixed === 'right',
                        disabledIcon: item.fixed === 'left',
                      }"
                      @click="handleColumnFixed(item, 'right')"
                    ></i>
                  </Tooltip>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <span class="table-size">
        <SettingOutlined />
      </span>
    </Popover>
  </Tooltip>
</template>

<script lang="ts" setup>
  // 表格设置不以ID为核心，全自动以url为key
  import TABLE_NAMES from './tableState';
  import { nextTick, ref, unref, watchEffect } from 'vue';
  import { nanoid } from 'nanoid';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { Tooltip, Popover, Divider } from 'ant-design-vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import Checkbox from './../../../../../../components/basic/check-box/index.vue';
  import { useSortable } from './../../../../../../hooks/useSortable';
  import { isNullAndUnDef } from './../../../../../../utils/is';
  import {
    sysProjectTableInsert,
    updateTableSetting,
    sysProjectTableTableSetting,
  } from './../../../../../../api/login';
  import { getRunProject, getUserId } from './../../../../../../utils/authUtil';
  import { useUserStore } from './../../../../../../store/modules/user';
  // import { useThemeStore } from './../../../../../../store/modules/projectConfig';
  import type { TableColumn } from '../../types/column';
  import type { TableProps } from 'ant-design-vue/es/table/Table';
  import { useRoute } from 'vue-router';
  // import { groupBy } from 'lodash-es';
  const props = defineProps({
    placementType: {
      type: String,
      default: 'leftTop',
    },
  });
  const userStore = useUserStore();
  const corpId = userStore.userInfo.corpId;
  const projectCode = getRunProject();
  // const themeStore = useThemeStore();
  const userId = getUserId();
  const route = useRoute();
  // type TableColumnType<T = any> = TableColumn<T> & {
  //   /** 目的是解决：类型实例化过深，且可能无限 */
  //   formItemProps?: any;
  // };

  const table = useTableContext();

  type SizeType = NonNullable<TableProps['size']>;
  // 表格大小
  const selectedKeysRef = ref<SizeType>(unref(table.getProps)?.size || 'small');

  const TABLE_NAME_KEY = `TABLE${route.fullPath.toUpperCase().replace(/\//g, '-')}`;
  TABLE_NAMES.set(TABLE_NAME_KEY, (TABLE_NAMES.get(TABLE_NAME_KEY) || 0) + 1);

  const TABLE_NAME = `${TABLE_NAME_KEY}`;

  console.log(TABLE_NAME);
  function sizeChange() {
    table.setProps({
      size: selectedKeysRef.value,
    });

    updateOrInsertTable();
  }

  // const tableName = table.tableName||nanoid();
  const tableName = TABLE_NAME;

  let tableId = ref();
  let inited = false;

  let defaultShowIndex = !!table.showIndex;
  let defaultBordered = table.bordered;
  defaultBordered = false;
  let defaultColumns = cloneDeep(table.columns);
  const tableColumns = ref([] as any[]);

  const checkIndex = ref(defaultShowIndex);
  const checkBordered = ref(table.bordered);
  const columnListRef = ref<HTMLDivElement>();

  const initCheckStatus = async () => {
    table.setProps({ loading: true });
    const dataProp = await sysProjectTableTableSetting({
      corpId: userStore.userInfo.corpId,
      projectCode,
      tableName,
      userId,
    });

    tableId.value = dataProp?.id;
    if (dataProp && dataProp.columns && dataProp.columns.length) {
      const temp: any = cloneDeep(table.columns);
      for (let i = 0; i < temp.length; i++) {
        const res = dataProp.columns.find((item) => {
          return item.title === temp[i].title && item.dataIndex === temp[i].dataIndex;
        });
        if (res) {
          temp[i].fixed = temp[i].fixed ? temp[i].fixed : res.fixed;
          temp[i].hideInTable = res.hideInTable;
          temp[i].sort = res.sort;
        }
      }
      dataProp.bordered = dataProp?.border ? true : false;
      dataProp.bordered = false;
      defaultColumns = temp;
      defaultColumns.sort((a, b) => {
        return Number(a.sort) - Number(b.sort);
      });
    } else {
      defaultColumns = cloneDeep(table.columns);
      dataProp.bordered = true;
      dataProp.bordered = false; // 暂时去掉表格边框，后面可能会需要动态配置边框
      dataProp.showIndex = true;
    }
    defaultBordered = dataProp.bordered;
    defaultShowIndex = dataProp.showIndex;
    table.setProps({ showIndex: defaultShowIndex, size: dataProp?.size || 'small' });
    nextTick(() => {
      table.setProps({ loading: false });
    });
    resetInit();
  };

  const resetInit = () => {
    tableColumns.value = cloneDeep(defaultColumns);
    checkIndex.value = defaultShowIndex ? true : false;
    checkBordered.value = defaultBordered;
    tableColumns.value.forEach((item: any) =>
      item.hideInTable ? (item.hideInTable = true) : (item.hideInTable = false),
    );
  };

  resetInit();
  initCheckStatus();
  // sizeChange();

  // const indeterminate = computed(() => {
  //   return (
  //     tableColumns.value.length > 0 &&
  //     tableColumns.value.some((n: any) => n.hideInTable) &&
  //     tableColumns.value.some((n: any) => !n.hideInTable)
  //   );
  // });

  watchEffect(() => {
    table.setProps({ columns: tableColumns.value });
  });
  // 设置序号列
  const handleIndexCheckChange = (e) => {
    table.setProps({ showIndex: e.target.checked });
    updateOrInsertTable();
  };
  // const handleCheckAllChange = () => {
  //   updateOrInsertTable();
  // };
  // 设置边框
  // const handleBorderedCheckChange = (e) => {
  //   table.setProps({ bordered: e.target.checked });
  //   updateOrInsertTable();
  // };
  const handleColumsCheckChange = () => {
    updateOrInsertTable();
  };

  const handleColumnFixed = (columItem: TableColumn<any>, direction: 'left' | 'right') => {
    columItem.fixed = columItem.fixed === direction ? false : direction;
    fixedSort();
    // table.setProps({ columns: arr });
    updateOrInsertTable();
  };

  // 按照fixed排序
  const fixedSort = () => {
    const columns = unref(tableColumns.value);

    const leftArr = columns.filter((n) => n.fixed === 'left');
    const rightArr = columns.filter((n) => n.fixed === 'right');
    const normalArr = columns.filter((n) => n.fixed != 'right' && n.fixed != 'left');
    let arr = [] as any[];
    arr = arr.concat(leftArr).concat(normalArr).concat(rightArr);
    tableColumns.value = arr;
  };

  const updateOrInsertTable = async () => {
    const columsItem = tableColumns.value.map((item) => {
      let { title, dataIndex, fixed = '', hideInTable, sort = 0 } = item;
      hideInTable = hideInTable ? 1 : 0;
      return { title, dataIndex, fixed, hideInTable, sort };
    });
    // 设置sort 便于后面保存
    for (let i = 0; i < columsItem.length; i++) {
      columsItem[i].sort = i;
    }
    const params = {
      border: checkBordered.value ? 1 : 0,
      showIndex: checkIndex.value ? 1 : 0,
      columns: [...columsItem],
      tableName,
      projectCode,
      size: selectedKeysRef.value,
      userId,
      corpId,
    };
    if (tableId.value) {
      updateTableSetting(params);
    } else {
      await sysProjectTableInsert(params);

      const res = await sysProjectTableTableSetting({
        corpId,
        projectCode,
        tableName,
        userId,
      });
      tableId.value = res?.id;
    }
  };

  const columnListRefLeft = ref();
  const columnListRefNormal = ref();
  const columnListRefRight = ref();

  async function handleVisibleChange() {
    if (inited) return;
    await nextTick();
    const columnListElLeft = unref(columnListRefLeft);
    if (!columnListElLeft) return;

    // Drag and drop sort
    const objLeft = useSortable(columnListElLeft, {
      handle: '.table-column-drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return;
        }
        // Sort column
        const columns = tableColumns.value;
        columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
        // fixedSort();
        updateOrInsertTable();
      },
    });
    objLeft.initSortable();

    const columnListElNormal = unref(columnListRefNormal);
    if (!columnListElNormal) return;
    // Drag and drop sort
    const objNormal = useSortable(columnListElNormal, {
      handle: '.table-column-drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return;
        }
        // Sort column
        const columns = tableColumns.value;
        columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
        // fixedSort();
        updateOrInsertTable();
      },
    });
    objNormal.initSortable();

    const columnListElRight = unref(columnListRefRight);
    if (!columnListElRight) return;
    // Drag and drop sort
    const { initSortable } = useSortable(columnListElRight, {
      handle: '.table-column-drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return;
        }
        // Sort column
        const columns = tableColumns.value;
        columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
        updateOrInsertTable();
      },
    });
    initSortable();
    inited = true;
  }

  const reset = () => {
    defaultColumns = defaultColumns.map((item) => {
      item.hideInTable = false;
      return item;
    });
    defaultBordered = table.bordered;
    defaultBordered = false;
    resetInit();
    updateOrInsertTable();
    table.setProps({ showIndex: defaultShowIndex, bordered: defaultBordered });
  };
</script>

<style lang="less" scoped>
  @primary-color: #00f;
  .check-item {
    align-items: center;
  }
  .column-fixed {
    .fixed-right,
    .fixed-left {
      &.active,
      &:hover {
        color: @primary-color;
      }
      // &.disabledIcon {
      //   color: #f2f3f5;
      //   cursor: not-allowed;
      // }
    }
  }

  // .columnListRefLeft,
  // .columnListRefNormal {
  //   border-bottom: 1px dashed @primary-color;
  // }

  .columnListRefLeft + .columnListRefNormal {
    border-top: 1px dashed @primary-color;
  }
  .columnListRefLeft + .columnListRefRight {
    border-top: 1px dashed @primary-color;
  }
  .columnListRefNormal + .columnListRefRight {
    border-top: 1px dashed @primary-color;
  }

  .popover-title {
    height: 44px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }
  .content-top {
    padding: 4px 0 16px 0;
    border-bottom: 1px solid #dcdee0;
  }
  .content-title {
    color: #323232;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
  .set-label {
    width: 80px;
    display: inline-block;
  }
</style>
<style lang="less">
  .cloumn-list {
    .ant-popover-inner {
      // height: 600px;
      // overflow: auto;
      .ant-popover-inner-content {
        max-height: 430px;
        overflow: auto;
      }
    }
  }
</style>
