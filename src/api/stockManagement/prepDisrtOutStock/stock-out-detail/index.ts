import { request } from '@/utils/request';
const stockOutDetailApi = {
  // 出库单明细分页查询
  getPrepDistrInStockList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/getPrepDistrInStockList`,
      method: 'post',
      data,
    });
  },
  // 出库单明细导出
  exportDistrInStockList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/exportDistrInStockList`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};

export default stockOutDetailApi;
