<template>
  <Tooltip :title="getTitle" placement="top" :visible="state.visible">
    <span
      class="table-size"
      @click="fullScreen"
      ref="spanRef"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      @blur="mouseleave"
    >
      <i class="iconfont icon-icon_table_full" v-if="!screenObj?.isFullscreen"></i>
      <i class="iconfont icon-a-icon_table_exitfull" v-else></i>
      <!-- <FullscreenOutlined  />
      <FullscreenExitOutlined v-else /> -->
    </span>
  </Tooltip>
</template>
<script lang="ts" setup>
  // import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import { inject, computed, reactive } from 'vue';
  const props = defineProps({
    fullType: {
      type: String,
      default: '',
    },
  });
  const screenObj: any =
    props.fullType === 'detail'
      ? reactive(inject('dynamicTableFullRefKey'))
      : reactive(inject('dynamicTableFullRefKeyMain'));
  function fullScreen() {
    // table.reload();
    screenObj.toggle();
    setTimeout(() => {
      state.visible = false;
    }, 50);
  }
  const state = reactive({
    visible: false,
  });
  const getTitle = computed(() => {
    return screenObj?.isFullscreen ? '退出全屏' : '全屏';
  });
  const mouseenter = () => {
    state.visible = true;
  };
  const mouseleave = () => {
    state.visible = false;
  };
  // const emit = defineEmits(['fullChange']);
</script>
<style lang="less">
  .table-size {
    border: 1px solid #dcdee0;
    width: 32px;
    // text-align: center;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    padding: 8px;
    // display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: var(--ant-primary-color-hover);
      cursor: pointer;
    }
  }
</style>
