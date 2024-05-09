<script lang="tsx">
  import { defineComponent, computed } from 'vue';
  import card from '@/components/base/card';
  import { omit } from 'lodash-es';
  import { descriptionsProps } from 'ant-design-vue/es/descriptions/index';
  import { RightOutlined, UpOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';

  import { FormDetailList, RecoderChangeCode, ShowControl } from './type';
  // 为了支持自定义tsxRender
  export default defineComponent({
    name: 'XcDetailDescription',
    components: {
      RightOutlined,
      UpOutlined,
      LeftOutlined,
      card,
      cardTitle: card.title,
      cardContainer: card.container,
    },
    props: {
      ...descriptionsProps(),
      pageDisable: {
        type: Boolean,
        required: false,
        default: false,
      },
      headerTitle: {
        type: String,
        required: false,
      },
      descriptionsList: {
        type: Array as PropType<FormDetailList>,
        required: true,
        default: () => [],
      },
      detailInfo: {
        type: Object as PropType<any>,
        required: true,
        default: () => {},
      },
      showO: {
        type: Object as PropType<ShowControl>,
        required: true,
        default: () => {},
      },
      // 详情展开收起图标=操作展开收起
      detailRightIcon: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    setup(props, { emit, slots }) {
      const backTo = () => {
        emit('back');
      };
      const handlePageClick = (code: RecoderChangeCode) => {
        if (disabled.value) {
          return;
        }
        emit('recordChange', code);
      };
      const extraSlot = computed(() => {
        return slots?.extra?.();
      });
      const getItemRender = (item) => {
        let content;
        if (slots.field) {
          content = slots.field?.({
            fieldOp: item,
            recod: props.detailInfo,
          });
          const emptyDom =
            content &&
            content.every(
              (item) => (item.children === 'v-if' || item.children === '') && !content[0].component,
            );
          if (!emptyDom) {
            return content;
          }
        }

        if (item.h) {
          return item.h(props.detailInfo);
        } else {
          return (
            <div
              class="ellipsis"
              title={
                typeof item.customRender === 'function'
                  ? item.customRender(props.detailInfo)
                  : props.detailInfo[item.value] || ''
              }
            >
              {typeof item.customRender === 'function'
                ? item.customRender(props.detailInfo)
                : props.detailInfo[item.value] || ''}
            </div>
          );
        }
      };
      const disabled = computed(() => props.pageDisable);
      const titleSlot = computed(() => {
        return (
          <div class="flex-1 flex flex-row detail-title-box">
            {props.showO.backBtn ? (
              <span class="arrow">
                <span onClick={backTo} class="mr-5px text-sm prefix-line cursor-pointer ret-text">
                  <LeftOutlined class="text-sm" /> 返回
                </span>
              </span>
            ) : (
              ''
            )}
            <cardTitle style="margin-bottom:0px" showPrefix={!!props.showO.showTitlePrefixed}>
              {props.headerTitle}
            </cardTitle>
            {props.showO.recoderChangeBtn ? (
              <span>
                <p class="pre-next-box">
                  <Tooltip title="上一条" color="black">
                    <span class={disabled.value ? 'pre-box disabled' : 'pre-box'}>
                      <span
                        class="icon iconfont icon_arrow_left"
                        onClick={() => handlePageClick('prev')}
                      >
                        &#xe61f; {disabled.value}
                      </span>
                    </span>
                  </Tooltip>
                  <i class="line"></i>
                  <Tooltip title="下一条" color="black">
                    <span class={disabled.value ? 'next-box disabled' : 'next-box'}>
                      <span
                        class="icon iconfont icon_arrow_right"
                        onClick={() => handlePageClick('next')}
                      >
                        &#xe627;
                      </span>
                    </span>
                  </Tooltip>
                </p>
              </span>
            ) : (
              ''
            )}
          </div>
        );
      });
      const descriptionsListRender = computed(() => {
        return (
          <>
            {props.descriptionsList.map((item) =>
              item.hide ? (
                ''
              ) : (
                <a-descriptions-item key={item.title} label={item.title} span={item.spanNum || 1}>
                  {getItemRender(item)}
                </a-descriptions-item>
              ),
            )}
          </>
        );
      });
      return () => {
        return (
          <cardContainer>
            <a-descriptions
              {...omit(props, [
                'headerTitle',
                'descriptionsList',
                'detailInfo',
                'detailRightIcon',
                'showO',
              ])}
              class="xc-header xc-table-detail-description"
            >
              {{
                title: () => titleSlot.value || '',
                default: () => descriptionsListRender.value || '',
                extra: () => {
                  return extraSlot.value || '';
                },
              }}
            </a-descriptions>
          </cardContainer>
        );
      };
    },
  });
</script>
<style lang="less" scoped>
  .detail-title-box {
    align-items: center;
    margin-bottom: 16px;
    line-height: 24px;
  }
  .arrow {
    user-select: none;
    font-weight: normal;
    color: #8894a8;
    font-size: 14px;
  }
  .prefix-line {
    font-size: 16px;
    padding-right: 9px;
    margin-right: 8px;
    position: relative;
    font-weight: 300;
  }
  .prefix-line::after {
    content: '';
    position: absolute;
    height: 16px;
    top: 2px;
    right: 0px;
    width: 1px;
    background-color: #c8c9cc;
    display: block;
  }
  .title-prefix-line {
    margin-left: 10px;
    position: relative;
  }
  .title-prefix-line::before {
    content: '';
    position: absolute;
    height: 20px;
    top: 3px;
    left: -8px;
    border-right: 3px solid var(--ant-primary-color);
    display: block;
  }
  .pre-next-box {
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    span.pre-box {
      border-radius: 4px 0 0 4px;
      user-select: none;
      &:hover {
        border-radius: 4px 0 0 4px;
      }
      .iconfont:hover {
        border-radius: 4px 0 0 4px;
      }
    }
    span.next-box {
      user-select: none;
      border-radius: 0 4px 4px 0;
      &:hover {
        border-radius: 0 4px 4px 0;
      }
      .iconfont:hover {
        border-radius: 0 4px 4px 0;
      }
    }
    span.pre-box,
    span.next-box {
      background: #f2f3f5;
      .iconfont {
        line-height: 24px;
        font-size: 20px;
      }
    }
    span.pre-box:hover,
    span.next-box:hover {
      background: var(--xc-cm2-color);
      color: var(--xc-cm5-color);
      cursor: pointer;
      background: var(--xc-cm2-color);
    }
    span.pre-box.disabled:hover,
    span.next-box.disabled:hover {
      cursor: wait;
      background: #f2f3f5 !important;
    }
    span {
      background: transparent;
      color: #4e5d78;
      text-align: center;
      height: 24px;
      display: flex;
      justify-content: center;
      width: 32px;
      // border-radius: 0 4px 4px 0;
      .xc-header-icon {
        display: flex;
        margin: 0 8px;
        font-size: 14px;
      }
    }
    i.line {
      padding: 3px 0;
      background: #eee;
    }
    i.line::after {
      content: '';
      width: 1px;
      background-color: #c8c9cc;
      display: block;
      height: 100%;
    }
  }
  .ret-text {
    font-size: 14px;
  }
  .xc-header {
    background-color: #fff;
    padding-right: 12px;
    :deep(.ant-descriptions-item-label) {
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    :deep(.ant-descriptions-item-content) {
      color: #333;
    }
    :deep(.ant-descriptions-header) {
      margin-bottom: 12px;
    }
    .xc-header-div {
      display: flex;
      align-items: center;
    }
    :deep(.ant-descriptions-item) {
      padding-bottom: 12px;
    }
  }
</style>
