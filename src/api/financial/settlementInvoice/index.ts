import { request } from '@/utils/request';
const settlementInvoiceApi = {
  //查询医院名称下拉列表
  getProHosList(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/getProHosList`,
      method: 'post',
      data,
    });
  },
  //查询二级供应商下拉列表
  getSubProvAndHosByUserId(userId) {
    return request({
      url: `/hdiFusion/invoiceEntry/getSubProvAndHosByUserId/${userId}`,
      method: 'get',
    });
  },
  //查询院区下拉列表
  queryBranch(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/queryBranch`,
      method: 'post',
      data,
    });
  },
  //查询全院科室下拉列表
  getOrgsByUnit(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/getOrgsByUnit`,
      method: 'post',
      data,
    });
  },
  //发票录入列表
  listDetailByPage(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/listDetailByPage`,
      method: 'post',
      data,
    });
  },
  //结算单发票录入列表
  listDetailByPageDetailJnsy(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/listDetailByPageDetailJnsy`,
      method: 'post',
      data,
    });
  },
  // 发票批量录入
  updateInvoiceNumber(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/updateInvoiceNumber`,
      method: 'post',
      data,
    });
  },
  //发票明细打印列表
  invoiceDetailList(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/invoiceDetailList`,
      method: 'post',
      data,
    });
  },
  //确认
  confirmInvoice(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/confirmInvoice`,
      method: 'post',
      data,
    });
  },
  //编辑
  editInvoice(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/editInvoice`,
      method: 'post',
      data,
    });
  },
  //作废
  cancelInvoice(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/cancelInvoice`,
      method: 'post',
      data,
    });
  },
  //明细查看
  getSettleBillByInvoiceCode(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/getSettleBillByInvoiceCode`,
      method: 'post',
      data,
    });
  },
  //导出
  exportSettlePrintDetail(data) {
    return request({
      url: `/hdiFusion/invoiceEntry/exportSettlePrintDetail`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};
export default settlementInvoiceApi;
