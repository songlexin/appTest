/* eslint-disable vue/one-component-per-file */
/**
 * 支持联动下拉选择，下拉分页加载的，输入搜索的动态下拉控件
 */

import { type DefineComponent, defineComponent, reactive } from 'vue';
import { Input } from 'ant-design-vue';
export const DynamicInput = defineComponent({
  setup() {
    const state = reactive({
      value: null as any,
      laoding: false,
      isReady: false,
      async reload() {
        state.value = '';
        state.isReady = true;
      },
    });

    return () => <Input v-model:value={state.value} loading={state.laoding} allow-clear />;
  },
}) as DefineComponent;
