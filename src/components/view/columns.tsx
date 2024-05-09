import type { TableColumn } from '@/components/core/dynamic-table';

export const imgColumns: TableColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    customRender: (text) => {
      return text.index + 1;
    },
  },
  {
    title: '路径',
    dataIndex: 'url',
    ellipsis: true,
    resizable: true,
    width: 180,
  },
];

export const fileColumns: TableColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    customRender: (text) => {
      return text.index + 1;
    },
  },
  {
    title: '路径',
    dataIndex: 'url',
    ellipsis: true,
    resizable: true,
    width: 180,
  },
];
