<template>
  <a-dropdown>
    <a class="primary-color-font" @click.prevent>
      {{ props.statusSel?.label }}({{ props.statusSel?.number }})
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="order in props.statusList"
          :key="order.value"
          :class="props.statusSel.value === order.value ? 'active-sel' : ''"
        >
          <a href="javascript:;" class="ant-drop-a" @click="orderTypeChange(order)"
            ><label>{{ order.label }}({{ order.number }})</label
            ><CheckOutlined v-if="props.statusSel.value === order.value"
          /></a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  import { StatusList, Item } from './type';
  import { PropType } from 'vue';
  import { DownOutlined, CheckOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    statusList: {
      type: Array as PropType<StatusList>,
      required: true,
    },
    statusSel: {
      type: Object as PropType<Item>,
      required: false,
    },
  });
  // const state = reactive({
  //   orderTypeSel: {} as any,
  // });
  // watch(
  //   () => props,
  //   (val) => {
  //     state.orderTypeSel = val.statusSel
  //       ? val.statusSel
  //       : val.statusList[0]
  //       ? val.statusList[0]
  //       : {};
  //   },
  //   {
  //     deep: true,
  //     immediate: true,
  //   },
  // );
  const emit = defineEmits(['changeType']);
  // 类型切换
  const orderTypeChange = (order) => {
    // state.orderTypeSel = order;
    emit('changeType', order);
  };
</script>

<style lang="less" scoped>
  .ant-drop-a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
  }
  .primary-color-font {
    color: var(--ant-primary-color);
  }
</style>

<style lang="less">
  .active-sel {
    background-color: var(--xc-cm2-color);
  }
  .ant-list-header {
    padding: 8px;
  }
  .ant-list-items {
    margin: 0 9px 0 16px;
  }
</style>
