<template>
  <Form
    style="min-width: 768px"
    ref="tableSearchFormRef"
    autocomplete="off"
    class="table-search-form"
    v-innerLabel="formRealInfo"
    v-bind="pick(getFormProps, aFormPropKeys)"
    :model="formModel"
  >
    <Row v-bind="getRowConfig" style="width: 100%">
      <!-- 表单项 -->
      <template v-for="schemaItem in formSchemasRef" :key="schemaItem.field">
        <TableSearchFormItem
          v-model:form-model="formModel"
          :schema="schemaItem"
          :table-instance="tableInstance"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </TableSearchFormItem>
      </template>

      <!-- 展开、收起、查询、重置按钮 -->
      <FormAction
        v-if="showActionButtonGroup"
        v-bind="getFormActionBindProps"
        @toggle-advanced="handleToggleAdvanced"
        @toggle-Drawer="handleToggleDrawer"
      >
      </FormAction>
    </Row>
  </Form>
  <!-- 高级筛选 -->
  <!-- <a-drawer
    v-model:visible="drawerVisible"
    title="高级筛选"
    placement="right"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    :width="500"
  >
  </a-drawer> -->
</template>
<script lang="ts">
  export default {
    name: 'TableSearchForm',
  };
</script>

<script lang="ts" setup>
  import { useAttrs } from 'vue';
  import { pick } from 'lodash-es';
  import { Form, Row } from 'ant-design-vue';
  import TableSearchFormItem from './table-search-form-item.vue';
  import {
    createFormContext,
    useFormState,
    useFormEvents,
    useFormMethods,
    useAdvanced,
    type TableSearchFormType,
  } from './hooks/';
  import { tableSearchFormProps, tableSearchFormEmits, aFormPropKeys } from './table-search-form';
  import FormAction from './components/form-action.vue';
  import { vInnerLabel } from '@/directives/innerLabel';

  // defineOptions({
  //   name: 'TableSearchForm',
  // });

  const props = defineProps(tableSearchFormProps);
  const emit = defineEmits(tableSearchFormEmits);
  const attrs = useAttrs();

  // 表单内部状态
  const formState = useFormState({ props, attrs });
  const {
    formModel,
    getRowConfig,
    tableSearchFormRef,
    getFormProps,
    getFormActionBindProps,
    formSchemasRef,
    drawerVisible,
    formRealInfo,
  } = formState;
  // 表单内部方法
  const formMethods = useFormMethods({ ...formState });
  const { initFormValues, handleFormValues } = formMethods;

  // 初始化表单默认值
  initFormValues();

  // a-form表单事件二次封装和扩展
  const formEvents = useFormEvents({ ...formState, emit, handleFormValues });

  const handleToggleDrawer = () => {
    drawerVisible.value = true;
  };

  // 当前组件所有的状态和方法
  const instance = {
    ...formState,
    ...formEvents,
    ...formMethods,
  } as TableSearchFormType;

  // 搜索表单 展开/收起 表单项hooks
  const { handleToggleAdvanced } = useAdvanced({
    instance,
    emit,
  });

  emit('register', instance);

  createFormContext(instance);

  defineExpose(instance);
</script>

<style lang="less" scoped></style>
