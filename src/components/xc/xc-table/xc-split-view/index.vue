<script lang="tsx">
  import { defineComponent, reactive, computed, watch, nextTick } from 'vue';
  // @ts-ignore
  // import xcTableNoData from '@/components/xc/xc-table/xc-table-noData/index.vue';
  // import { message } from 'ant-design-vue';
  export default defineComponent({
    name: 'XcSplitView',
    props: {
      tableData: {
        type: Array as any,
        required: true,
      },
      checkedList: {
        type: Array as any,
        required: false,
      },
      loading: {
        type: Boolean,
        required: false,
      },
      canLoad: {
        type: Boolean,
        required: true,
        default: true,
      },
      index: {
        type: Number,
        required: false,
      },
    },
    setup(props, { emit, slots }) {
      const state = reactive({
        selIndex: 0,
      });
      watch(
        () => props.index,
        (val) => {
          if (val === 0 || val) {
            state.selIndex = val;
            nextTick(() => {
              const className = `.active-sel`;
              document.querySelector(className)?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            });
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );
      const changeRecord = (item) => {
        if (item.index === state.selIndex) {
          return;
        }
        state.selIndex = item.index;
        emit('recordChange', item);
      };
      const listEmpty = () => {
        return (
          <>
            <div class="nodata">
              <div>
                <img class="nodata-img" src={state.srcUrl} />
              </div>
              <p>暂无数据</p>
            </div>
          </>
        );
      };
      const listItemRender = (item) => {
        return (
          <>
            <a-list-item
              class={state.selIndex === item.index ? 'active-sel' : ''}
              onClick={() => changeRecord(item)}
            >
              <div style="width:100%">{slots.listItem?.(item)}</div>
            </a-list-item>
          </>
        );
      };
      const getList = () => {
        if (props.canLoad) {
          emit('loadMore');
        }
      };
      const getCheckedList = computed(() => {
        return props.checkedList;
      });
      return () => {
        return (
          <div class="split-view xc-content" style="height: 100%">
            <div class="split-view-list xc-page" style="padding-top:0">
              <div class="split-view-header">{slots.header?.()}</div>
              <a-checkbox-group
                v-model:value={getCheckedList.value}
                class="xc-content"
                style="height: 0;width:100%"
              >
                <a-list
                  class="xc-page"
                  loading={props.loading}
                  dataSource={props.tableData}
                  locale={{ emptyText: listEmpty() }}
                  renderItem={(item) => listItemRender(item)}
                  v-loadMore={{ value: getList, domClass: '.ant-spin-container' }}
                ></a-list>
              </a-checkbox-group>
            </div>
            <div class="split-view-right">{slots.rightContent?.()}</div>
          </div>
        );
      };
    },
  });
</script>
<style lang="less">
  .ant-list-items {
    height: 100%;
    // overflow-y: auto;
  }
  .active-sel {
    background-color: var(--xc-cm2-color) !important;
  }
</style>
<style lang="less" scoped>
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
  .split-view {
    display: flex;
    border-top: 1px solid #f0f0f0;
    // flex-direction: column;

    .split-view-list {
      width: 390px;
      // padding: 8px 8px 8px;
      .split-view-header {
        padding: 8px 16px 0;
      }
    }

    .split-view-right {
      flex: 1;
      width: 0;
      background-color: #f2f3f5;
      padding: 8px;
    }
  }
</style>
