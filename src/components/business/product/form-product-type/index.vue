<template>
  <a-select
    v-model:value="state.purMode"
    :options="state.purModeList"
    :field-names="{ label: 'cname', value: 'val' }"
    placeholder="请选择"
    style="width: 100%"
    @select="change"
    allow-clear
  ></a-select>
</template>
<script lang="ts" setup>
  // 产品耗材类型
  import { reactive, onMounted } from 'vue';
  import commonApi from '@/api/common';
  const state = reactive({
    purMode: undefined,
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
