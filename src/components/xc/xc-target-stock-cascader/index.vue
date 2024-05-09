<template>
  <a-cascader
    v-bind="omit(props, ['name'])"
    :value="props.valArr"
    :options="state.options"
    :show-search="{ filter }"
    :field-names="state.areaFieldNames"
    placeholder="请选择"
    @change="handleChange"
    :allow-clear="state.flag"
  />
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import { omit } from 'lodash-es';
  import { cascaderProps } from 'ant-design-vue/es/cascader/index';
  //   import deptApi from '@/api/basic/dept/product';
  import commonApi from '@/api/common';
  //   import { getAreaList } from './../../../api/basic/common';
  const props = defineProps({
    // 搜索传参
    name: {
      type: String,
      required: false,
      default: '',
    },
    valArr: {
      type: Array,
      required: false,
    },
    pickType: {
      type: String,
      required: false,
      default: 'LY',
    },
    ...cascaderProps(),
  });
  const state = reactive({
    // valArr: [] as any[],
    options: [] as any[], //地区选项
    areaFieldNames: {
      label: 'name',
      value: 'code',
      children: 'stockAreaList',
    },
    flag: false,
  });
  // 加载院区下拉框
  const getList = async () => {
    const result = await commonApi.stockInfoOut({
      pickType: props.pickType,
    });
    if (result.code == 0) {
      state.options = result.data.targetStock;
      // state.options.forEach((item) => (item.isLeaf = false));
    }
  };
  const filter: any = (inputValue, path) => {
    return path.some((option) => option.shelfName.indexOf(inputValue) > -1);
  };
  const handleChange = async (e, options) => {
    // state.valArr = e;
    emit('change', options);
    emit('update:modelValue', e);
  };
  const emit = defineEmits<{
    (e: 'update:modelValue', param): void;
    (e: 'change', options): void;
  }>();
  // 初始化加载
  onMounted(() => {
    getList();
  });
</script>
<style lang="less" scoped></style>
