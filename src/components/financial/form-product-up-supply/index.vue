<template>
  <a-select
    v-bind="omit(props, ['provId'])"
    v-model:value="state.selectVal"
    :options="state.list"
    :field-names="{ label: 'provName', value: 'provId' }"
    placeholder="请选择"
    style="width: 100%"
    @select="change"
    allow-clear
  ></a-select>
</template>
<script lang="ts" setup>
  // 院区组件
  import { reactive, onMounted, watch } from 'vue';
  import { omit } from 'lodash-es';
  import { selectProps } from 'ant-design-vue/es/select/index';
  // import { debounce } from 'lodash-es';
  import priceApi from '@/api/financial/invoiceEnter/invoice-enter-page';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const state = reactive({
    selectVal: undefined as any,
    list: [] as any[],
  });
  const props = defineProps({
    provId: {
      type: undefined || String,
      required: true,
    },
    ...selectProps(),
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
  const emit = defineEmits<{
    (e: 'update:value', param): void;
    (e: 'valChange'): void;
  }>();
  onMounted(() => {
    getList();
  });
  const getList = async () => {
    const result = await priceApi.provUpList({
      hosId: userStore.userInfo.mgrCorpId,
      provId: props.provId,
    });
    if (result.code == 0) {
      state.list = result.data;
    }
  };
  // 前端搜索
  // const filterOption1 = (input: string, option: any) => {
  //   return option.siteName.indexOf(input) >= 0;
  // };

  const change = () => {
    emit('update:value', state.selectVal);
    emit('valChange');
  };
  // const fetchList = (value) => {
  //   getList(value);
  // };
  // 记得暴露
  defineExpose({
    getList,
  });
</script>
<style lang="less" scoped></style>
