export const DISTR_STATUS_OPTION = [
  { value: '', label: '全部' },
  { value: '10', label: '待确认', desc: '待确认' },
  { value: '15', label: '已驳回', desc: '已驳回' },
  { value: '20', label: '审核通过', desc: '待验收' },
  { value: '24', label: '部分验收', desc: '部分验收' },
  { value: '25', label: '验收完成', desc: '已完成' },
  { value: '61', label: '已关闭', desc: '已关闭' },
];

export const getDistrStatusDesc = (key) => {
  const option = DISTR_STATUS_OPTION.find((item) => item.value == key);
  return option ? option.desc : key > 25 ? '已收货' : '--';
};
