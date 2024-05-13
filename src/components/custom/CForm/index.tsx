import { defineComponent, PropType, ref } from 'vue';
import { Form, Row } from 'ant-design-vue';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { provide } from 'vue';
import { omit } from 'lodash-es';
import './index.less';

export default defineComponent({
  props: {
    layout: {
      type: String as PropType<'inline' | 'horizontal' | 'vertical'>,
      default: 'vertical',
    },
    labelCol: {
      type: Object as PropType<object>,
    },
    wrapperCol: {
      type: Object as PropType<object>,
    },
    span: Number as PropType<number>,
    gutter: {
      type: Number as PropType<number>,
      default: 24,
    },
  },
  setup(props, { slots, attrs, expose }) {
    const formRef = ref<FormExpose>({} as any);
    provide('span', props.span);
    expose({
      resetFields: (callBack) => formRef.value.resetFields(callBack),
      clearValidate: (callBack) => formRef.value.clearValidate(callBack),
      validateFields: (callBack) => formRef.value.validateFields(callBack),
      validate: (callBack) => formRef.value.validate(callBack),
      getFieldsValue: (callBack) => formRef.value.getFieldsValue(callBack),
      scrollToField: (callBack) => formRef.value.scrollToField(callBack),
    });
    return () => (
      <Form
        ref={formRef}
        {...omit(attrs, ['class'])}
        class={attrs.class ? `cform ${attrs.class}` : 'cform'}
        layout={props.layout}
        labelCol={props.layout == 'vertical' ? { span: 24 } : props.labelCol}
        wrapperCol={props.layout == 'vertical' ? { flex: 1 } : props.wrapperCol}
      >
        <Row gutter={props.gutter}>{slots.default?.()}</Row>
      </Form>
    );
  },
});
