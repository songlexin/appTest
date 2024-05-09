import { request } from '@/utils/request';
const reportApi = {
  //退货明细
  returnReportListPage(data) {
    return request({
      url: '/hdiFusion/return/details/report',
      method: 'post',
      data,
    });
  },
  returnReportProductDetail(data) {
    return request({
      url: '/hdiFusion/return/details/return/detail',
      method: 'post',
      data,
    });
  },
  //配送明细

  distributionDetailListPage(data) {
    return request({
      url: '/hdiFusion/distr/report',
      method: 'post',
      data,
    });
  },
  distributionDetailProductDetail(data) {
    return request({
      url: '/hdiFusion/distr/report/detail',
      method: 'post',
      data,
    });
  },
  settlementReportListPage(data) {
    return request({
      url: '/hdiFusion/report/outBalanceDetail/listPage',
      method: 'post',
      data,
    });
  },
  invoiceDetailListPage(data) {
    return request({
      url: '/hdiFusion/report/invoiceDetail/listPage',
      method: 'post',
      data,
    });
  },
  //医院库存查询
  hosInventoryListPage(data) {
    return request({
      url: '/hdiFusion/stock/statistics/getList',
      method: 'post',
      data,
    });
  },
};
export default reportApi;
