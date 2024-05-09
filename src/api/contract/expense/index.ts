import { request } from '@/utils/request';
const expenseApi = {
  // 结算单分页列表
  getOutBalancePage(data) {
    return request({
      url: `/hdiFusion/provRateMain/getMainListByPage`,
      method: 'post',
      data,
    });
  },
  // 生成费用单
  generateExpenseOrder(data) {
    return request({
      url: `/hdiFusion/provRateMain/insertProvRateInfo`,
      method: 'post',
      data,
    });
  },
  // 生成全部费用单
  generateAllExpenseOrder(data) {
    return request({
      url: `/hdiFusion/provRateMain/insertProvRateInfoAll`,
      method: 'post',
      data,
    });
  },
  // 结算单详情分页列表
  getOutBalanceDetail(data) {
    return request({
      url: `/hdiFusion/provRateMain/getDetailListByPage`,
      method: 'post',
      data,
    });
  },

  // 费用单分页列表
  getExpensePage(data) {
    return request({
      url: `/hdiFusion/provRateMain/getProvRateMainBillList`,
      method: 'post',
      data,
    });
  },
  // 费用单详情分页列表
  getExpenseDetail(data) {
    return request({
      url: `/hdiFusion/provRateMain/getProvRateSubBillList`,
      method: 'post',
      data,
    });
  },
  // 费用单导出excel
  exportExpenseList(data) {
    return request({
      url: `/hdiFusion/provRateMain/exportData`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
  //获取二级商的一级商信息
  listProvInfoBySubProv(data) {
    return request({
      url: `/hdiFusion/supplyRelation/getProvInfoList`,
      method: 'post',
      data,
    });
  },
  // 费用单确认
  confirmBill(data) {
    return request({
      url: `/hdiFusion/provRateMain/updateProvRateMainBill`,
      method: 'post',
      data,
    });
  },
};
export default expenseApi;
