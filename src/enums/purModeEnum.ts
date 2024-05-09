export enum PurModeEnum {
  LOW = '10',
  PKG = '16',
  HIGH = '20',
  SUR = '40',
}
// 产品管理模式
export const PUR_MODE_MAP = {
  '10': '低值',
  '15': '定数包',
  '16': '单元包',
  '20': '高值',
  '30': '办公用品',
  '35': '捐赠物资',
  '40': '手术包',
  '50': '灭菌包',
  '60': '试剂',
  '70': '护理包',
};

// 产品管理模式下拉选项
export const PUR_MODE_OPTION = [
  { value: '10', label: '低值' },
  { value: '15', label: '定数包' },
  { value: '16', label: '单元包' },
  { value: '20', label: '高值' },
  { value: '30', label: '办公用品' },
  { value: '35', label: '捐赠物资' },
  { value: '40', label: '手术包' },
  { value: '50', label: '灭菌包' },
  { value: '60', label: '试剂' },
  { value: '70', label: '护理包' },
];

//产品导入基础管理模式
export const BASIC_PUR_MODE_OPTION = [
  { value: '10', label: '低值' },
  { value: '20', label: '高值' },
  { value: '30', label: '办公用品' },
  { value: '35', label: '捐赠物资' },
  { value: '60', label: '试剂' },
];

//产品导入基础管理模式
export const FUSION_PUR_MODE_OPTION = [
  { value: '10', label: '低值' },
  { value: '20', label: '高值' },
  { value: '60', label: '试剂' },
];

export const FINAICAL_PUR_MODE_OPTION = [
  { value: '10', label: '低值耗材' },
  { value: '20', label: '高值耗材' },
  { value: '60', label: '检验试剂' },
];

// 是否停采
export const IS_PURCHASE = {
  0: '是',
  1: '否',
};

// 状态 启用 停用
export const TB_STATUS = {
  0: '停用',
  1: '启用',
};

export const purModeName = (purMode) => {
  return PUR_MODE_MAP[purMode] || '未知';
};
//结算单发票录入产品类型
export const INVOICE_PUR_MODE_OPTION = [
  { value: '-1', label: '全部' },
  { value: '10', label: '低值' },
  { value: '20', label: '高值' },
  // { value: '15', label: '定数包' },
  { value: '60', label: '试剂' },
];
