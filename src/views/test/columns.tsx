import type { TableColumn } from '@/components/core/dynamic-table';
// import { STATUS } from './form-schema';

export const columns: TableColumn[] = [
  {
    title: '回报自己',
    dataIndex: 'returnBalance',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
  {
    title: '原供应商',
    dataIndex: 'oldProvName',
    ellipsis: true,
    resizable: true,
    width: 100,
  },
  {
    title: '新供应商',
    dataIndex: 'newProvName',
    ellipsis: true,
    resizable: true,
    width: 100,
  },
  {
    title: '合同号',
    dataIndex: 'contactNo',
    ellipsis: true,
    resizable: true,
    width: 80,
  },
  {
    title: '预计生效日期',
    dataIndex: 'validDate',
    ellipsis: true,
    resizable: true,
    width: 100,
  },

  {
    title: '制单日期',
    dataIndex: 'fillDate',
    ellipsis: true,
    resizable: true,
    width: 100,
  },
  {
    title: '实际生效日期',
    dataIndex: 'actualdate',
    ellipsis: true,
    resizable: true,
    width: 100,
  },
  {
    title: '制单人',
    dataIndex: 'fillName',
    ellipsis: true,
    resizable: true,
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    resizable: true,
    width: 120,
  },
];
