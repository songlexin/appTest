<template>
  <div>
    <SchemaForm
      @toggle-Drawer="handleToggleDrawer"
      @submit="schemaFormList"
      @reset="schemaFormListReset"
    >
      <template v-for="slotName in soltTopList" #[slotName]="slotData" :key="slotName">
        <slot :name="slotName" v-bind="slotData"></slot> </template
    ></SchemaForm>
    <!-- 高级搜索 -->
    <a-drawer
      v-model:visible="state.drawerVisible"
      title="高级筛选"
      placement="right"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      :width="500"
    >
      <SchemaFormDrawer @submit="schemaFormListDrawer" @reset="schemaFormListDrawer">
        <template v-for="slotName in soltList" #[slotName]="slotData" :key="slotName">
          <slot :name="slotName" v-bind="slotData"></slot> </template
      ></SchemaFormDrawer>
    </a-drawer>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'XcNormalTableSearch',
  };
</script>
<script setup lang="ts">
  import { reactive, computed, PropType, watch } from 'vue';
  // import { schemas } from './form-schema';
  import { useForm } from '@/components/core/schema-form';
  import type { FormSchema } from '@/components/core/schema-form';

  const props = defineProps({
    schemas: {
      type: Array as PropType<FormSchema[]>,
      required: true,
      default: () => [],
    },
  });

  const [SchemaForm, dynamicFormRef] = useForm({
    labelWidth: 100,
    schemas: props.schemas.slice(0, 3),
    showAdvancedButton: true,
    baseCol: {
      span: 6,
    },
    actionColOptions: {
      span: 6,
    },
    isDawerButton: props.schemas.length > 3,
  });

  const handleToggleDrawer = () => {
    state.drawerVisible = true;
  };
  const [SchemaFormDrawer, dynamicFormRefDrawer] = useForm({
    labelWidth: 100,
    schemas: props.schemas,
    showAdvancedButton: false,
    actionColOptions: {
      span: 24,
    },
    baseCol: {
      span: 24,
    },
  });
  let soltList = computed({
    get() {
      let arr = [] as any[];
      props.schemas.map((item: any) => {
        if (item.slot) {
          arr.push(item.slot);
        }
      });
      return arr;
    },
    set(value) {
      return value;
    },
  });
  let soltTopList = computed({
    get() {
      let arr = [] as any[];
      props.schemas.slice(0, 3).map((item: any) => {
        if (item.slot) {
          arr.push(item.slot);
        }
      });
      return arr;
    },
    set(value) {
      return value;
    },
  });

  const state = reactive({
    queryData: [] as any[], //table数据列表
    drawerVisible: false,
    search: {} as any,
  });
  const schemaFormList = () => {
    const params = dynamicFormRef?.getFieldsValue();
    const paramsDra = dynamicFormRefDrawer?.getFieldsValue();
    // dynamicFormRefDrawer?.resetFields();
    emit('searchTable', { ...params, ...paramsDra });
  };

  const schemaFormListReset = () => {
    // dynamicFormRef?.resetFields();
    dynamicFormRefDrawer?.resetFields();
    emit('searchTable', {});
  };
  const schemaFormListDrawer = () => {
    const params = dynamicFormRefDrawer?.getFieldsValue();
    state.drawerVisible = false;
    emit('searchTable', params);
  };
  const emit = defineEmits(['searchTable']);
  watch(
    () => state.drawerVisible,
    (newValue) => {
      if (newValue) {
        const searchRecord = dynamicFormRef?.getFieldsValue();
        dynamicFormRefDrawer?.setFieldsValue({
          ...searchRecord,
        });
      } else {
        const searchRecord = dynamicFormRefDrawer?.getFieldsValue();
        dynamicFormRef?.setFieldsValue({
          ...searchRecord,
        });
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );
</script>
<style lang="less" scoped></style>
