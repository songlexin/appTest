import { defineComponent } from 'vue';
import { Form, Col } from 'ant-design-vue';
import { inject } from 'vue';

export default defineComponent({
  setup(props, { slots, attrs }) {
    const span = inject('span') as number;

    return () => (
      <Col span={span}>
        <Form.Item {...attrs} {...props} v-slots={slots} />
      </Col>
    );
  },
});
