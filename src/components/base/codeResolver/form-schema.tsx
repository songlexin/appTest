import { FormItemSchema, TableSearchFormProps } from '@/components/core/table-search-form';
import { DIPURMODELIST } from '@/enums/stockEnum';
export const biSchemas: FormItemSchema[] = [
  {
    field: 'goodsName',
    component: 'Input',
    label: '产品名称',
    componentProps: {
      placeholder: 'id、品名、规格',
    },
    // vIf: (cb) => {
    //   console.log(cb);
    //   return true;
    // },
  },
  {
    field: 'provName',
    component: 'Input',
    label: '供应商',
    componentProps: {
      placeholder: '供应商',
    },
  },
  {
    field: 'mfrsName',
    component: 'Input',
    label: '生产厂家',
    componentProps: {
      placeholder: '厂家、品牌、产地',
    },
  },
  {
    field: 'purMode',
    component: 'Select',
    label: '采购模式',
    componentProps: {
      placeholder: '厂家、品牌、产地',
      options: DIPURMODELIST,
    },
  },
];
export const formProps: TableSearchFormProps = {
  schemas: biSchemas,
  autoAdvancedLine: 1, // 超过1行自动折叠
  showDrawerButton: false, // 始终显示高级筛选
};
