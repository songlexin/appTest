import { defineComponent, PropType, ref } from 'vue';
import { Form, Row } from 'ant-design-vue';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { provide } from 'vue';
import { omit } from 'lodash-es';

export default defineComponent({
  props: {
    isLoading: String as PropType<string>,
    layout: {
      type: String as PropType<'inline' | 'horizontal' | 'vertical'>,
      default: 'vertical',
    },
    span: Number as PropType<number>,
    gutter: {
      type: Number as PropType<number>,
      default: 16,
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
        {...omit(attrs, ['layout'])}
        {...props}
        wrapperCol={props.layout == 'vertical' ? { flex: 1 } : {}}
      >
        <Row gutter={props.gutter}>{slots.default?.()}</Row>
      </Form>
    );
  },
});
