<template>
  <BasicCascader
    v-bind="omit(props, ['sigleValue', 'onUpdate:sigleValue', 'onChange'])"
    v-model:sigleValue="state.sigleValue"
    :fetch-data="loadTree"
    change-on-select
  ></BasicCascader>
</template>
<script lang="ts" setup>
  /**
   * @description 库房树下拉选择框
   * @param
   * @returns
   */
  import { omit } from 'lodash-es';
  import { reactive, onMounted, watch, nextTick } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { BasicCascader } from '@/components/base/basicCascader';
  import { cascaderProps } from 'ant-design-vue/es/cascader/index';
  import commonApi from '@/api/common';
  const userStore = useUserStore();
  const props = defineProps({
    ...cascaderProps(),
    modelValue: {
      type: String,
      require: true,
      default: '',
    },
    init: {
      type: Boolean,
      require: false,
      default: false,
    },
    val: {
      type: String,
      required: false,
    },
    startLevel: {
      type: String,
      required: false,
    },
  });
  watch(
    () => props.val,
    async (val) => {
      await nextTick();
      state.sigleValue = val;
    },
    {
      immediate: true,
      deep: true,
    },
  );
  const state = reactive({
    options: [] as any[],
    sigleValue: '' as any,
  });
  const loadTree = async () => {
    const params = {
      // hosId: userStore.userInfo.mgrCorpId,
      branchId: userStore.userInfo.mgrBranchId,
      deptId: userStore.userInfo.mgrRangeId,
      startLevel: props.startLevel,
      // deptUser:
    } as any; //deptKind 0临床科室，1设备科，2供应室，3检验科
    if (userStore.deptKind == 1) {
      params.deptUser = false;
    } else {
      params.deptUser = true;
    }
    const result = await commonApi.stockTree(params);
    if (result.code == 0) {
      return result.data || [];
      // 如果是科室，则默认选中第一个
    }
  };
  watch(
    () => state.sigleValue,
    (val) => {
      emit('change', val);
      emit('update:modelValue', val);
    },
  );
  const emit = defineEmits<{
    (e: 'update:modelValue', param): void;
    (e: 'change', options): void;
  }>();
  onMounted(() => {
    state.sigleValue = props.modelValue;
  });
</script>
<style lang="less" scoped></style>
