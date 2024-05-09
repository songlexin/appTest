import { request } from '@/utils/request';
const prepOutStockApi = {
  // 录入条形码
  queryPrepGoodsCode(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStockList/queryPrepGoodsCodePkg`,
      method: 'post',
      data,
    });
  },
  // 备货管理出库提交
  submitPrepOutStock(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/prepGoodsOutStock`,
      method: 'post',
      data,
    });
  },
};

export default prepOutStockApi;
