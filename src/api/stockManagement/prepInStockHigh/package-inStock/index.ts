// 备货产品入库
import { request } from '@/utils/request';
const packageInStockApi = {
  addCertificateCode(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/addCertificateCode`,
      method: 'post',
      data,
    });
  },
  //查询符合要求的 备货产品数据
  getPackageGoods(data) {
    return request({
      url: `/hdiFusion/orderMgr/getPackageGoodsList`,
      method: 'post',
      data,
    });
  },
  //添加入库
  addPrepInStockHighIn(data) {
    return request({
      url: `/hdiFusion/orderMgr/packageInStock`,
      method: 'post',
      data,
    });
  },
};
export default packageInStockApi;
