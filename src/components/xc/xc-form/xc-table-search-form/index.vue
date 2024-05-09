<template>
  <div class="xc-header xc-header-table-search">
    <slot name="xcHeaderTableSearch">
      <SchemaForm @toggle-Drawer="handleToggleDrawer">
        <template v-for="slotName in soltTopList" #[slotName]="slotData" :key="slotName">
          <slot :name="slotName" v-bind="slotData"></slot> </template></SchemaForm
    ></slot>
    <!-- 高级搜索 -->
    <a-drawer
      v-model:visible="state.drawerVisible"
      title="高级筛选"
      placement="right"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      :width="500"
    >
      <SchemaFormDrawer>
        <template v-for="slotName in soltList" #[slotName]="slotData" :key="slotName">
          <slot :name="slotName" v-bind="slotData"></slot> </template
      ></SchemaFormDrawer>
    </a-drawer>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'XcTableSearchForm',
  };
</script>
<script setup lang="ts">
  import { reactive, computed, PropType } from 'vue';
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

  const [SchemaForm] = useForm({
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
  const [SchemaFormDrawer] = useForm({
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
    drawerVisible: false,
  });
</script>
<style lang="less" scoped></style>
