<template>
  <a-cascader
    v-bind="omit(props, ['sigleValue', 'onUpdate:sigleValue', 'onChange', 'options'])"
    :show-search="{ filter }"
    v-model:value="valArr"
    :options="options"
    placeholder="请选择"
    @change="handleChange"
    :fieldNames="props.fieldNames"
  />
</template>
<script lang="ts" setup>
  import { omit } from 'lodash-es';
  import { cascaderProps } from 'ant-design-vue/es/cascader/index';
  import { computedAsync } from '@vueuse/core';
  import { computed } from 'vue';
  const props = defineProps({
    ...cascaderProps(),
    sigleValue: {
      type: String,
      required: false,
    },
    fieldNames: {
      type: Object,
      required: false,
      default: () => {
        return {
          label: 'cname',
          value: 'id',
          children: 'children',
        };
      },
    },
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    // 传入的fetchData 需要将结果return
    fetchData: {
      type: Function,
      required: false,
    },
  });
  let valArr = computed({
    get() {
      return getTrueValBySingleVal();
    },
    set(value) {
      return value;
    },
  });
  const options = computedAsync(async () => {
    if (props.fetchData) {
      return props.fetchData ? props.fetchData() : [];
    } else {
      return props.options;
    }
  }, []);
  const filter = (inputValue, path) => {
    const label = props.fieldNames.label;
    return path.some(
      (option) => option[label].toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  };
  // const filter: any = (inputValue, path) => {
  //   return path.some((option) => option.shelfName.indexOf(inputValue) > -1);
  // };
  //   查找所有的父节点并返回
  function findParent(data, type, val, result) {
    // console.log('findParent', data);
    if (!data) {
      return;
    }
    for (let item of data) {
      if (item[type] === val) {
        result.unshift(item[type]);
        return result;
      }
      if (item.children && item.children.length > 0) {
        let isFind = findParent(item.children, type, val, result);
        if (isFind) {
          result.unshift(item[type]);
          return result;
        }
      }
    }
  }
  //   根据单个值查找所有的父节点
  const getTrueValBySingleVal = () => {
    const type = props.fieldNames.value;
    const result = findParent(options.value, type, props.sigleValue, []);
    return result || [];
  };
  const handleChange = async (val, options) => {
    // console.log('handleChange1111', val);
    // console.log('handleChange', options);
    const sigleValue = val ? val[val.length - 1] : '';
    emit('update:sigleValue', sigleValue);
    emit('update:changeOptions', options);
  };
  const emit = defineEmits<{
    (e: 'update:sigleValue', sigleValue): void;
    (e: 'update:changeOptions', options): void;
  }>();
</script>
<style lang="less" scoped></style>
