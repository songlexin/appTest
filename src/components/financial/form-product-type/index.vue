<template>
  <a-select
    mode="multiple"
    v-model:value="state.purMode"
    :options="state.purModeList"
    :field-names="{ label: 'cname', value: 'val' }"
    placeholder="请选择耗材类型"
    style="width: 100%"
    @change="change"
    allow-clear
    maxTagCount="responsive"
  ></a-select>
</template>
<script lang="ts" setup>
  // 产品耗材类型
  import { reactive, onMounted } from 'vue';
  import commonApi from '@/api/common';
  const state = reactive({
    purMode: [] as any[],
    purModeList: [] as any[],
  });
  const emit = defineEmits<{
    (e: 'update:modelValue', param): void;
    (e: 'purModeChange'): void;
  }>();

  onMounted(() => {
    getList();
  });
  const getList = async () => {
    const result = await commonApi.dictList({ dictId: 'PUR_MODE' });
    if (result.code == 0) {
      state.purModeList = result.data;
    }
  };
  const change = () => {
    emit('update:modelValue', state.purMode);
    emit('purModeChange');
  };
</script>
<style lang="less" scoped></style>
