// 入库明细查询-备货
import { request } from '@/utils/request';
const checkDetailApi = {
  getList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/getPrepDistrInStockList`,
      method: 'post',
      data,
    });
  },
  // spdHDIService/orderMgr/prepInStock/exportDistrInStockList
  exportInStockExcel(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/exportDistrInStockList`,
      method: 'post',
      data,
      responseType: 'blob',
      headers: { Accept: 'application/octet-stream' },
    });
  },
  // getSubProvList(data) {
  //   return request({
  //     url: `/hdiFusion/prov/collector4orderMgr/hosCollectorProv/listVoExt`,
  //     method: 'post',
  //     data,
  //   });
  // },
};
export default checkDetailApi;
