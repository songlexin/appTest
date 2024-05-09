// 单据形态
export const BILL_MODE_MAP = {
  '10': '低值散件',
  '16': '低值整件',
  '20': '高值备货',
  '25': '高值跟台',
  '40': '手术套包',
  '60': '试剂散件',
  '66': '试剂整件',
};

export const BILL_MODE_OPTION = [
  { value: '', label: '全部' },
  { value: '10', label: '低值散件' },
  { value: '16', label: '低值整件' },
  { value: '20', label: '高值备货' },
  { value: '40', label: '手术套包' },
  { value: '60', label: '试剂散件' },
  { value: '66', label: '试剂整件' },
];

export const billModeName = (billMode) => {
  return BILL_MODE_MAP[billMode] || '未知';
};

export const isBarcode = (billMode) => {
  return billMode == '16' || billMode == '20' || billMode == '66';
};
