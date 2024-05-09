import type { TableColumn } from '@/components/core/dynamic-table';
import { ALLPURMODELIST } from '@/enums/stockEnum';
export const columns: TableColumn[] = [
  {
    title: 'id',
    dataIndex: 'goodsName',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '品名',
    dataIndex: 'goodsName',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '规格',
    dataIndex: 'goodsGg',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '单位',
    dataIndex: 'unit',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '已绑定DI数',
    dataIndex: 'diCount',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '高/低值',
    dataIndex: 'purMode',
    ellipsis: true,
    resizable: true,
    width: 120,
    customRender: ({ record }) => {
      if (record.purMode) {
        let data = ALLPURMODELIST.find((item) => item.value == record.purMode);
        return data?.label;
      } else {
        return '';
      }
    },
  },
  {
    title: '包装数量',
    dataIndex: 'packeage',
    ellipsis: true,
    resizable: true,
    width: 120,
    align: 'right',
  },
  {
    title: '产地',
    dataIndex: 'made',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '厂家',
    dataIndex: 'mfrsName',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '供应商',
    dataIndex: 'provName',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    resizable: true,
    width: 80,
    fixed: 'right',
  },
];
