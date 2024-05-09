import { request } from '@/utils/request';
const autoCodeApi = {
  // 供应商产品列表
  selectProvGoodsAll(data) {
    return request({
      url: `/hdiFusion/basic/prov/goods/listVoPage`,
      method: 'post',
      data,
    });
  },
  // 配送扫码处理
  decodeBarcode(data) {
    return request({
      url: `/hdiFusion/bill/barcode/decode`,
      method: 'post',
      data,
    });
  },
  // 插入DI
  insertGoodsPackage(data) {
    return request({
      url: `/hdiFusion/bill/barcode/insertGoodsPackage`,
      method: 'post',
      data,
    });
  },
  // 包码查询打印信息(全部)
  queryFillPrint(data) {
    return request({
      url: '/hdiFusion/bill/barcode/fillPrint',
      method: 'post',
      data,
      timeout: 30000,
    });
  },
};
export default autoCodeApi;
