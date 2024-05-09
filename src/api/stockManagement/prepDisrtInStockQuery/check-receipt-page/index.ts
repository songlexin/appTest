// 入库单查询-备货
import { request } from '@/utils/request';
const checkReceiptApi = {
  getList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/queryPage`,
      method: 'post',
      data,
    });
  },
  // /
  getDetailList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStock/getPrepInStockDetailList`,
      method: 'post',
      data,
    });
  },
  // 高值标签打印列表selectBarcode
  getBarCodeList(data) {
    return request({
      url: `/hdiFusion/orderMgr/barcodePrintingCenter/uniqueCode/selectBarcode`,
      method: 'post',
      data,
    });
  },
  // 单元包
  getPackageList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStockList/queryPackageCodePrint`,
      method: 'post',
      data,
    });
  },
  // 单元包code码
  getPackageCodeList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStockList/queryPackageUDiCodeList`,
      method: 'post',
      data,
    });
  },
  //   // 高值标签打印
  //   备货产品入库查询--单元包标签打印模板
  // /platformService/sysrPrint/getPrintByCode?resourceCode=unitPackageCode&styleCode=unitPackageCode.h0028

  // 备货产品入库查询--高值标签打印模板
  // /platformService/sysrPrint/getPrintByCode?resourceCode=commonLabel&styleCode=commonLabel.h0028
  highPrint(resourceCode, styleCode) {
    return request({
      url: `/platformService/sysrPrint/getPrintByCode?resourceCode=${resourceCode}&styleCode=${styleCode}`,
      method: 'get',
    });
  },
  packagePrint(resourceCode, styleCode) {
    return request({
      url: `/platformService/sysrPrint/getPrintByCode?resourceCode=${resourceCode}&styleCode=${styleCode}`,
      method: 'get',
    });
  },
};
export default checkReceiptApi;
