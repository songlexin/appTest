<template>
  <a-select
    v-bind="omit(props, ['init', 'fetchData', 'options'])"
    v-model:value="val"
    :options="options"
    :field-names="{ label: 'name', value: 'id' }"
    placeholder="请选择"
    style="width: 100%"
    @select="change"
    allow-clear
  ></a-select>
</template>
<script lang="ts" setup>
  // 院区组件
  import { computed } from 'vue';
  import { omit } from 'lodash-es';
  import { selectProps } from 'ant-design-vue/es/select/index';
  //   import addressApi from '@/api/basic/dept/address';
  //   import { useUserStore } from '@/store/modules/user';
  import { computedAsync } from '@vueuse/core';
  //   const userStore = useUserStore();
  //   const state = reactive({
  //     branchId: undefined as any,
  //   });
  let val = computed({
    get() {
      return props.value;
    },
    set(value) {
      return value;
    },
  });
  const props = defineProps({
    ...selectProps(),
    init: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    fetchData: {
      type: Function,
      required: false,
    },
  });
  const options = computedAsync(async () => {
    if (props.fetchData) {
      return props.fetchData ? props.fetchData() : [];
    } else {
      return props.options;
    }
  }, []);
  const emit = defineEmits<{
    (e: 'update:modelValue', param): void;
    (e: 'branchChange', param): void;
  }>();

  const change = () => {
    emit('update:modelValue', val);
    emit('branchChange', val);
  };
</script>
<style lang="less" scoped></style>
