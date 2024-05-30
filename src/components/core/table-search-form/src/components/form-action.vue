<template>
  <Col v-if="showActionButtonGroup" v-bind="actionColOpt" class="_form-col-btn-group">
    <div style="width: 100%; text-align: right">
      <Form.Item>
        <Button
          v-if="showSubmitButton"
          type="primary"
          v-bind="getSubmitBtnOptions"
          @click="submit"
          style="margin-left: 0 !important"
        >
          {{ getSubmitBtnOptions.text }}
        </Button>
        <Button
          v-if="showResetButton"
          type="primary"
          ghost
          v-bind="getResetBtnOptions"
          @click="resetFields"
        >
          {{ getResetBtnOptions.text }}
        </Button>

        <Button
          v-if="!isAdvanced && !showDrawerBtn"
          type="default"
          @click="toggleAdvanced"
          class="_btn collapse"
        >
          <span>展开</span>
          <span>
            <i class="iconfont icon-icon_arrow_down" style="margin-left: 6px"></i>
          </span>
        </Button>
        <Button
          v-if="showAdvancedButton && !hideAdvanceBtn && isAdvanced && !showDrawerBtn"
          type="default"
          @click="toggleAdvanced"
          class="_btn"
        >
          <span>收起</span>
          <span>
            <i class="iconfont icon-icon_arrow_up" style="margin-left: 6px"></i>
          </span>
        </Button>

        <template v-if="showExportButton">
          <Button type="default" @click="exportFile" class="_btn" v-bind='getExportBtnOptions'>
            <!-- <span>导出</span> -->
            {{ getExportBtnOptions.text }}
          </Button>
        </template>
      </Form.Item>
    </div>
  </Col>
</template>
<script lang="ts" setup>
  import { Button, ButtonProps } from '@/components/basic/button';
import { isArray } from '@/utils/is';
import { Col, Form } from 'ant-design-vue';
import { computed, type PropType } from 'vue';
import { useFormContext } from '../hooks/useFormContext';
import { FormItemSchema } from '../types';
import type { ColEx } from '../types/component';
  // import { selColor } from '@/utils/getColor';

  type ButtonOptions = Partial<ButtonProps> & { text: string };

  defineOptions({
    name: 'FormAction',
    inheritAttrs: false,
  });

  const emit = defineEmits(['toggle-advanced', 'toggle-drawer','export-file']);

  const props = defineProps({
    showActionButtonGroup: {
      type: Boolean,
      default: true,
    },
    showResetButton: {
      type: Boolean,
      default: true,
    },
    showSubmitButton: {
      type: Boolean,
      default: true,
    },
    showAdvancedButton: {
      type: Boolean,
      default: true,
    },
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    },
    exportButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({}),
    },
    actionSpan: {
      type: Number,
      default: 25,
    },
    isAdvanced: Boolean,
    hideAdvanceBtn: Boolean,
    showDrawerButton: Boolean,
    showExportButton: Boolean,
    /* 所有表单项配置 */
    schemas: {
      type: Array as PropType<Array<FormItemSchema>>,
      default: () => [],
    },
  });

  const formContext = useFormContext();
  const { resetFields, submit} = formContext;

  // 计算action区域宽度
  const showDrawerBtn = computed(() => {
    return false;
    // return props.showDrawerButton || props.schemas.length >= (100 / baseSpan.value) * 2;
  });
  // 计算按钮区域 Col 参数
  const actionColOpt = computed(() => {
    const { schemas, actionColOptions } = props;
    let order = 0;

    if (isArray(schemas)) {
      order = schemas.length + 1;
    }
    const actionColOpt: Partial<ColEx> = {
      order,
      ...actionColOptions,
    };

    return actionColOpt;
  });
  // 计算 action btn的span
  // const actionColOpt = computed(() => {
  //   const { showAdvancedButton, actionSpan: span } = props;
  //   const actionSpan = 100 - span;
  //   const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {};
  //   const actionColOpt: Partial<ColEx> = {
  //     style: { textAlign: 'right' },
  //     span: showAdvancedButton ? 6 : 4,
  //     ...advancedSpanObj,
  //   };
  //   return actionColOpt;
  // });

  const getResetBtnOptions = computed((): ButtonOptions => {
    return Object.assign(
      {
        text: '重置',
      },
      props.resetButtonOptions,
    );
  });

  const getSubmitBtnOptions = computed(() => {
    return Object.assign(
      {
        text: '查询',
      },
      props.submitButtonOptions,
    );
  });
  const getExportBtnOptions = computed(() => {
    return Object.assign(
      {
        text: '导出',
      },
      props.exportButtonOptions,
    );
  });
  // 点击【展开/收起】按钮触发
  function toggleAdvanced() {
    emit('toggle-advanced', props.isAdvanced);
  }
  function exportFile() {
    emit('export-file');
  }

  // function toggleDrawer() {
  //   emit('toggle-Drawer');
  // }
</script>

<style lang="less" scoped>
  .collapse {
    padding-left: 16px !important;
    padding-right: 12px !important;
  }
</style>
