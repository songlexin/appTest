<script lang="tsx">
  import { defineComponent, computed } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { GroupOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'XcViewType',
    components: {
      Tooltip,
      GroupOutlined,
      UnorderedListOutlined,
    },
    props: {
      type: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {
      const getType = computed(() => {
        return props.type;
      });
      const spanRender = (msg) => {
        return <span>{msg}</span>;
      };
      const list = [
        { label: '分屏视图', value: '1' },
        { label: '列表视图', value: '2' },
      ];
      const listRender = () => {
        return (
          <>
            {list.map((item) => (
              <Tooltip placement={'top'} title={spanRender(item.label)}>
                <a-radio-button value={item.value}>
                  {item.value === '1' ? (
                    <i class="iconfont icon-icon_table_card"></i>
                  ) : (
                    <i class="iconfont icon-icon_table_list"></i>
                  )}
                </a-radio-button>
              </Tooltip>
            ))}
          </>
        );
      };
      // 视图切换
      const viewTypeChange = (event) => {
        emit('changeType', event.target.value);
      };
      return () => {
        return (
          <a-radio-group class="view-radio" v-model:value={getType.value} onChange={viewTypeChange}>
            {listRender}
          </a-radio-group>
        );
      };
    },
  });
</script>
<style lang="less" scoped>
  .view-radio {
    :deep(.ant-radio-button-wrapper) {
      // line-height: 32px;
      // padding: 0 8.5px; */
      padding: 0;
      width: 32px;
      height: 32px;
      text-align: center;
    }
  }
</style>
