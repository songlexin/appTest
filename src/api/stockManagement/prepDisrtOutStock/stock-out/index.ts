import { request } from '@/utils/request';
const stockOutApi = {
  // 出库单分页查询
  queryPrepDisrtOutStockPage(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/queryPage`,
      method: 'post',
      data,
    });
  },
  // 出库单查看详情
  getPrepInStockDetailList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/getPrepInStockDetailList`,
      method: 'post',
      data,
    });
  },

  // TODO 备货出库打印
  remotePrint(data) {
    return request({
      // url: `/hdiFusion/orderMgr/prepInStock/getPrepDistrInStockList`,
      // method: 'post',
      data,
    });
  },
};

export default stockOutApi;
