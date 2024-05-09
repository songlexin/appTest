// 备货产品入库
import { request } from '@/utils/request';
const highInStockApi = {
  addCertificateCode(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/addCertificateCode`,
      method: 'post',
      data,
    });
  },
  getHosCert(data) {
    return request({
      url: `/hdiFusion/orderMgr/purconfirm/getHosCerCodes`,
      method: 'post',
      data,
    });
  },
  //查询符合要求的 备货产品数据
  getPrepGoods(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/listPrepGoodsConfigVo`,
      method: 'post',
      data,
    });
  },
  // /spdHDIService/orderMgr/prepInStock/addPrepInStockHighIn
  addPrepInStockHighIn(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/addPrepInStockHighIn`,
      method: 'post',
      data,
    });
  },
};
export default highInStockApi;
