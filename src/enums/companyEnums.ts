// 医院公私属性
export const HOS_PROPERTY = [
  {
    label: '公立医院',
    value: '1',
  },
  {
    label: '私立医院',
    value: '2',
  },
];
// 医院级别
export const HOS_LEVEL = [
  {
    label: '三级甲等',
    value: '1',
  },
  {
    label: '三级乙等',
    value: '2',
  },
  {
    label: '二级甲等',
    value: '3',
  },
  {
    label: '二级乙等',
    value: '4',
  },
  {
    label: '其他',
    value: '5',
  },
];

// 医院版本
export const HOS_VERSION = [
  {
    label: 'SPD 2.0',
    value: '2',
  },
  {
    label: 'SPD 3.0',
    value: '3',
  },
];

// 审核状态
export const AUDIT_STATUS = [
  {
    label: '已保存',
    value: 0,
  },
  {
    label: '待审核',
    value: 10,
  },
  {
    label: '已审核',
    value: 20,
  },
  {
    label: '已驳回',
    value: 30,
  },
];

export const CHECK_STATUS = {
  '0': { text: '已保存' },
  '10': { text: '待审核' },
  '20': { text: '已审核' },
  '30': { text: '已驳回' },
};

export const COMPANY_LIST = [
  { id: 1, value: 0, label: '国药控股' },
  { id: 2, value: 1, label: '国药器械' },
  { id: 3, value: 2, label: '三方' },
];
