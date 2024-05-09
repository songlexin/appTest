<template>
  <!-- 科室联级选择 -->
  <a-cascader
    :value="props.orgId"
    :options="oList"
    :disabled="disabled"
    :field-names="fieldNames"
    :show-search="{ filter }"
    change-on-select
    placeholder="请选择科室"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { getOrgsTree } from './../../../api/database';
  import { useUserStore } from './../../../store/modules/user';
  import type { ShowSearchType } from 'ant-design-vue/es/cascader';
  const props = defineProps({
    orgId: {
      type: Object,
      required: false,
    },
    allowClear: {
      //是否可清空
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  const oList = computed<[]>({
    get() {
      return state.orgList;
    },
    set() {},
  });
  const emit = defineEmits<{
    (e: 'change', id: string): void;
  }>();
  const fieldNames = {
    label: 'label',
    value: 'id',
    children: 'children',
  };
  const state = reactive({
    orgList: [] as any[], //数据列表
    myOrgId: '',
    curNode: null,
  });
  const userStore = useUserStore();
  const getData = async () => {
    const params = {
      branchDeptId: '',
      branchId: '',
      cname: '',
      corpCname: '',
      corpId: userStore.userInfo.corpId,
      ename: '',
      pid: '',
    };
    const data = await getOrgsTree(params);
    state.orgList = data.children[0].children;
  };

  getData();
  const handleChange = async (e) => {
    emit('change', e);
  };
  const filter: ShowSearchType['filter'] = (inputValue, path) => {
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };
</script>
