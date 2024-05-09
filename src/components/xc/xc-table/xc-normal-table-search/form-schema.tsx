// import { UploadOutlined } from '@ant-design/icons-vue';
// import { Radio, Button } from 'ant-design-vue';
import type { FormSchema } from '@/components/core/schema-form';
import commonApi from '@/api/common';

//获取枚举字典LIST
const getEnums = async () => {
  const { code, data } = await commonApi.getRecTypeList({ name: 'BusinessTypeEnum' });
  return code == 0 ? data : [];
};

export const schemas: FormSchema[] = [
  {
    field: 'orderNo',
    component: 'Input',
    label: '业务单号',
    // helpMessage: '3333',
    // required: true,
    // defaultValue: '1',
    // suffix: '天',
    // componentSlots: () => {
    //   return {
    //     prefix: () => 'pSlot',
    //     suffix: () => 'sSlot',
    //   };
    // },
    componentProps: () => {
      return {
        placeholder: '业务单号',
        // onChange: (_) => {
        // },
      };
    },
    // slot: 'slotA',
    // rules: [
    //   { required: true, message: '业务单号不能为空' },
    //   { max: 100, message: '业务单号不超过100个字', trigger: 'blur' },
    // ],
  },
  {
    field: 'businessType',
    component: 'Select',
    label: '业务类型',
    // required: true,
    componentProps: {
      fieldNames: { label: 'value', value: 'key' },
      request: async (_) => {
        return await getEnums();
      },
      // options: [
      //   {
      //     label: '选项1',
      //     value: '1',
      //     key: '1',
      //   },
      //   {
      //     label: '选项2',
      //     value: '2',
      //     key: '2',
      //   },
      // ],
      // onChange: (e) => {
      // },
    },
    // defaultValue: '1',
  },
  {
    field: 'createOrderTime',
    component: 'RangePicker',
    label: '制单时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    // defaultValue: '1',
  },
  {
    field: 'Checkbox',
    component: 'CheckboxGroup',
    label: '字段1',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field2',
    component: 'RadioGroup',
    label: '字段2',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field3',
    component: 'Switch',
    label: '字段3',
  },
];
