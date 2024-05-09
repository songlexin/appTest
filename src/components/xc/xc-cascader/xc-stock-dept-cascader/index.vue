<template>
  <BasicCascader
    v-bind="omit(props, ['sigleValue', 'onUpdate:sigleValue', 'onChange'])"
    v-model:sigleValue="state.sigleValue"
    :show-search="{ filter }"
    :field-names="areaFieldNames"
    :fetch-data="loadTree"
    change-on-select
    @update:changeOptions="changeOptions"
  ></BasicCascader>
</template>
<script lang="ts" setup>
  /**
   * @description 库房-科室下拉选择框
   * @param
   * @returns
   */
  import { omit } from 'lodash-es';
  import { reactive, onMounted, watch, nextTick } from 'vue';
  // import { useUserStore } from '@/store/modules/user';
  import { BasicCascader } from '@/components/base/basicCascader';
  import { cascaderProps } from 'ant-design-vue/es/cascader/index';
  // import commonApi from '@/api/common';
  import { branchDeptList } from '@/api/permission/user';
  // const userStore = useUserStore();
  const props = defineProps({
    ...cascaderProps(),
    modelValue: {
      type: String,
      require: true,
      default: '',
    },
    val: {
      type: String,
      required: false,
    },
    hosId: {
      type: Object,
      required: true,
    },
  });
  const areaFieldNames = {
    label: 'cname',
    value: 'id',
    children: 'children',
  };
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
  const changeOptions = (options) => {
    emit('update:optionsName', options);
  };
  const filter: any = (inputValue, path) => {
    return path.some((option) => option.cname.indexOf(inputValue) > -1);
  };
  const loadTree = async () => {
    const params = {
      // hosId: userStore.userInfo.mgrCorpId,
      corpId: props.hosId,
      orgName: '',
      kind: '1',
      // deptUser:
    };
    if (props.hosId) {
      const result = await branchDeptList(params);
      if (result.code == 0) {
        return result.data || [];
      }
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
