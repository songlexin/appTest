<template>
  <a-select
    v-bind="omit(props, ['name'])"
    v-model:value="state.selectVal"
    :options="state.list"
    placeholder="请选择"
    :field-names="{ label: 'cname', value: 'val' }"
    style="width: 100%"
    @select="change"
    allow-clear
  ></a-select>
</template>
<script lang="ts" setup>
  // 供应商下拉列表
  import { reactive, onMounted, watch } from 'vue';
  import { useTypeSelectList } from '@/hooks/business/useTypeSelectList';
  import { omit } from 'lodash-es';
  import { selectProps } from 'ant-design-vue/es/select/index';
  const state = reactive({
    selectVal: undefined as any,
    list: [] as any[],
  });
  watch(
    () => props.value,
    (newVal) => {
      state.selectVal = newVal;
    },
    {
      immediate: true,
    },
  );
  const props = defineProps({
    ...selectProps(),
    // 搜索传参
    name: {
      type: String,
      required: false,
      default: '',
    },
  });

  onMounted(async () => {
    const { getDictList } = useTypeSelectList();
    state.list = await getDictList(props.name);
  });
  const emit = defineEmits<{
    (e: 'update:modelValue', param): void;
    (e: 'valChange', param): void;
  }>();
  const change = () => {
    emit('update:modelValue', state.selectVal);
    const obj = state.list?.find((item) => item.key == state.selectVal);
    emit('valChange', obj);
  };
</script>
<style lang="less" scoped></style>
