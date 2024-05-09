<template>
  <a-select
    v-model:value="value"
    show-search
    placeholder="请输入文本"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="options"
    allow-clear
    @search="handleSearch"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { getHos, getProv, getUser } from './../../../api/database';
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
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
  let value = computed<[]>({
    get() {
      return props.value;
    },
    set() {},
  });
  const options = computed<[]>({
    get() {
      return state.listData;
    },
    set() {},
  });
  const state = reactive({
    listData: [] as any[], //数据列表 //数据列表
  });

  let currentValue = '';
  const fetch = async (value: string) => {
    currentValue = value;
    let result = null;
    // 获取医院数据
    if (props.type == 'hos') {
      result = await getHos(value);
    } else if (props.type == 'prov') {
      //获取供应商数据
      result = await getProv(value);
    } else if (props.type == 'user') {
      // 获取用户数据
      result = await getUser(value);
    }
    if (currentValue === value) {
      const data: any[] = [];
      result.forEach((r: any) => {
        if (props.type == 'user') {
          data.push({
            value: r.userId,
            label: r.ename,
          });
        } else {
          data.push({
            value: r.id,
            label: r.cname,
          });
        }
      });
      state.listData = data;
      return data;
    }
  };
  const emit = defineEmits<{
    (e: 'changeSel', id: string): void;
  }>();

  const handleSearch = (val: string) => {
    if (val) {
      fetch(val);
    } else {
      state.listData = [];
    }
  };
  const handleChange = async (val: string) => {
    value = val;
    emit('changeSel', val);
  };
</script>
