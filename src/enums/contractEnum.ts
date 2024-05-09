export const CONTRACT_STATUS_OPTIONS = [
  {
    value: 0,
    label: '待提交',
  },
  {
    value: 10,
    label: '待审核',
  },
  {
    value: 15,
    label: '待启用',
  },
  {
    value: 20,
    label: '启用中',
  },
  {
    value: 25,
    label: '未通过',
  },
  {
    value: 99,
    label: '已停用',
  },
];
export const CONTRACT_STATUS_MAP = {
  0: '待提交',
  10: '待审核',
  15: '待启用',
  20: '启用中',
  25: '未通过',
  99: '已停用',
};
export const CONTRACT_TYPE_MAP = {
  1: '服务合同',
  2: '集配合同',
};
export const CONTRACT_TYPE_OPTIONS = [
  {
    value: 1,
    label: '服务合同',
  },
  {
    value: 2,
    label: '集配合同',
  },
];
export const EXPENSE_TYPE_OPTIONS = [
  {
    value: 1,
    label: '服务费',
  },
  {
    value: 2,
    label: '采购费',
  },
];
export const CONTRACT_CHANGE_TYPE_OPTIONS = [
  {
    value: 1,
    label: '新增特例明细',
  },
  {
    value: 2,
    label: '修改特例明细',
  },
  {
    value: 3,
    label: '修改日期',
  },
  {
    value: 4,
    label: '修改公共费率系数',
  },
];
export const CONTRACT_CHANGE_TYPE_MAP = {
  1: '新增特例明细',
  2: '修改特例明细',
  3: '修改日期',
  4: '修改公共费率系数',
};
export const CONTRACT_CHANGE_STATUS_OPTIONS = [
  {
    value: 0,
    label: '待提交',
  },

  {
    value: 10,
    label: '待审核',
  },
  {
    value: 15,
    label: '待生效',
  },
  {
    value: 20,
    label: '已生效',
  },
  {
    value: 25,
    label: '未通过',
  },
];
export const CONTRACT_CHANGE_STATUS_MAP = {
  0: '待提交',
  10: '待审核',
  15: '待生效',
  20: '已生效',
  25: '未通过',
};
export const WARN_TYPE_OPTIONS = [
  {
    value: 1,
    label: '合同缺少',
  },
  {
    value: 2,
    label: '近效期',
  },
];
export const WARN_TYPE_MAP = {
  1: '合同缺少',
  2: '近效期',
};
