export const SETTLEMENT_OPTION = [
  {
    value: '正常消耗结算',
    key: 0,
  },
  {
    value: '中心库入库结算',
    key: 1,
  },
  {
    value: '不结算',
    key: 2,
  },
  {
    value: '消耗结算',
    key: 3,
  },
  {
    value: '入定向仓结算',
    key: 4,
  },
  {
    value: '中心库出库结算',
    key: 5,
  },
  {
    value: '科室出库结算',
    key: 6,
  },
  {
    value: '科室整件出库结算',
    key: 7,
  },
];
// 合并成全量的结算方式
export const SETTLEMENT_OPTION2 = [
  {
    value: '正常消耗结算',
    key: 0,
  },
  {
    value: '入中心库结算',
    key: 1,
  },
  {
    value: '入定向仓结算',
    key: 4,
  },
  {
    value: '不结算',
    key: 2,
  },
  {
    value: '消耗结算',
    key: 3,
  },
];
export const getSettlementDesc = (key) => {
  const option = SETTLEMENT_OPTION.find((item) => item.key == key);
  return option ? option.value : '消耗结算';
};
