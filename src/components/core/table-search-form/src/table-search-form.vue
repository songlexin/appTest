<template>
  <Form
    style="min-width: 768px"
    ref="tableSearchFormRef"
    autocomplete="off"
    class="table-search-form !mb-12px"
    v-innerLabel="formRealInfo"
    v-bind="pick(getFormProps, aFormPropKeys)"
    :model="formModel"
  >
    <Row v-bind="getRowConfig" style="width: 100%" class="!gap-y-8px table-form-row-container">
      <!-- 表单项 -->

      <TableSearchFormItem
        v-for="schemaItem in formSchemasRef"
        :key="schemaItem.field"
        v-model:form-model="formModel"
        :schema="schemaItem"
        :table-instance="tableInstance"
      >
        <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </TableSearchFormItem>

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

<script lang="ts" setup>
  import { vInnerLabel } from '@/directives/innerLabel';
  import { Form, Row } from 'ant-design-vue';
  import { cloneDeep, pick } from 'lodash-es';
  import { useAttrs, watchEffect } from 'vue';
  import FormAction from './components/form-action.vue';
  import {
    createFormContext,
    useAdvanced,
    useFormEvents,
    useFormMethods,
    useFormState,
    type TableSearchFormType,
  } from './hooks/';
  import { aFormPropKeys, tableSearchFormEmits, tableSearchFormProps } from './table-search-form';
  import TableSearchFormItem from './table-search-form-item.vue';

  defineOptions({
    name: 'TableSearchForm',
  });

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
  watchEffect(() => {
    console.log(cloneDeep(formModel));
  });
  // 初始化表单默认值
  initFormValues();

  // a-form表单事件二次封装和扩展
  const formEvents = useFormEvents({ ...formState, emit, handleFormValues });

  const handleToggleDrawer = () => {
    drawerVisible.value = true;
  };

  // 当前组件所有的状态和方法 这回会开链接
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

<style lang="less">
  ._inner-label-form ._form-col {
    padding: 0 16px 0px 0 !important;
    margin: 0 !important;
  }
  // .table-form-row-container{
  //   &>div:nth-child(4){

  //       padding-right: 0!important;
  //     }
  // }
  .table-search-form {
    // margin-right: -16px !important;
  }
  ._inner-label-form ._form-col-btn-group {
    padding-right: 0 !important;
    // margin-right: 16px !important;
  }
</style>
