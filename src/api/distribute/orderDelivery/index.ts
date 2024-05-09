import { request } from '@/utils/request';

const orderDeliveryApi = {
  /**订单配送 **/
  // 分页查询列表
  queryPurchasePage(data) {
    return request({
      url: '/hdiFusion/bill/purchase/page',
      method: 'post',
      data,
    });
  },
  queryPurchaseTotal(data) {
    return request({
      url: '/hdiFusion/bill/purchase/status/total',
      method: 'post',
      data,
    });
  },
  // 列表详情
  queryPurchaseDetailPage(data) {
    return request({
      url: `/hdiFusion/bill/purchase/detail/page`,
      method: 'post',
      data,
    });
  },
  // 获取详情左边表格
  getDetailList(data) {
    return request({
      url: `/hdiFusion/bill/purchase/detail/${data.billId}/${data.hosVersion}`,
      method: 'get',
      data,
    });
  },

  // 列表详情右边自定义表格数据
  getTempSave(data) {
    return request({
      url: `/hdiOrder/bill/distr/pur/tempSave/${data.billId}`,
      method: 'get',
      data,
    });
  },
  deleteDetail(data) {
    return request({
      url: '/hdiOrder/bill/distr/delete/detail',
      method: 'post',
      data,
    });
  },
  deleteBarcode(data) {
    return request({
      url: '/hdiOrder/bill/distr/delete/barcode',
      method: 'post',
      data,
    });
  },
  //保存接口
  saveDistrFromPur(data) {
    return request({
      url: '/hdiFusion/bill/distr/pur/save',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  //提交接口
  submitDistrFromPur(data) {
    return request({
      url: '/hdiFusion/bill/distr/pur/submit',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  submitAuto(data) {
    return request({
      url: '/hdiFusion/bill/distr/submit/auto',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  // 获取注册证
  getCertificateList(data) {
    return request({
      url: '/hdiFusion/bill/distr/cert/select',
      method: 'post',
      data,
    });
  },
  //通用字典 (获取存储条件和运输条件下拉)
  getDictList(data) {
    return request({
      url: '/platformService/dict/value/list',
      method: 'post',
      data,
    });
  },
  // 生产厂家下拉
  getCompanyList(data) {
    return request({
      url: '/platformService/basic/company/list',
      method: 'post',
      data,
    });
  },
  /**不合格补送 **/
  // 列表
  getHdiReturnList(data) {
    return request({
      url: '/hdiFusion/bill/return/page',
      method: 'post',
      data,
    });
  },
  // 待补送详情表格
  getHdiReturnDetail(data) {
    return request({
      url: `/hdiFusion/bill/return/detail/${data.billId}`,
      method: 'get',
      data,
    });
  },
  getPurchaseOne(data) {
    return request({
      url: `/hdiFusion/bill/purchase/one/${data.billId}`,
      method: 'get',
      data,
    });
  },
  getPurchaseNext(data) {
    return request({
      url: `/hdiFusion/bill/purchase/next`,
      method: 'post',
      data,
    });
  },
  // 保存接口
  saveDistrForRtn(data) {
    return request({
      url: '/hdiFusion/bill/distr/return/save',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  //提交接口
  submitDistrForRtn(data) {
    return request({
      url: '/hdiFusion/bill/distr/return/submit',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  /** 配送单列表 **/
  // 表格查询
  getDistrPage(data) {
    return request({
      url: '/hdiFusion/bill/distr/page',
      method: 'post',
      data,
    });
  },
  getDistrNext(data) {
    return request({
      url: `/hdiFusion/bill/distr/next`,
      method: 'post',
      data,
    });
  },
  //详情下面表格
  getDistrDetailPage(data) {
    return request({
      url: `/hdiFusion/bill/distr/detail/page`,
      method: 'post',
      data,
    });
  },
  getAuditLogPage(data) {
    return request({
      url: `/hdiFusion/bill/auditLog/listPage/sync`,
      method: 'post',
      data,
    });
  },
  // 配送单明细信息
  getDistrDetailList(data) {
    return request({
      url: `/hdiFusion/bill/distr/detail/${data.id}`,
      method: 'get',
      data,
    });
  },
  // 配送单主单信息
  getDistrById(data) {
    return request({
      url: `/hdiFusion/bill/distr/${data.id}`,
      method: 'get',
      data,
    });
  },
  getBarCodeList(data) {
    return request({
      url: `/hdiFusion/bill/distr/barcode/list`,
      method: 'post',
      data,
    });
  },
  // 配送扫码处理
  scanCode(data) {
    return request({
      url: `/hdiFusion/bill/barcode/analyse`,
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
  // 配送单转换详情确认
  submitTransInfo(data) {
    return request({
      url: `/hdiFusion/bill/distr/trans`,
      method: 'post',
      data,
    });
  },
  getReturnNext(data) {
    return request({
      url: `/hdiFusion/bill/return/next`,
      method: 'post',
      data,
    });
  },
  // 获取原来退货信息
  getReturnOld(billId) {
    return request({
      url: `/hdiFusion/bill/return/source/distr/${billId}`,
      method: 'get',
    });
  },
  // 打印条码查询
  print(billId, hosId, hosVersion, provId) {
    const data = {
      pageNum: 1,
      pageSize: 1000,
      queryObject: {
        provId,
        hosId,
        hosVersion,
        distrOrderNo: billId,
      },
    };
    return request({
      url: '/hdiFusion/bill/barcode/page',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  // 新增注册证号
  insertRegistration(data) {
    return request({
      url: `/hdiFusion/bill/distr/cert/submit`,
      method: 'post',
      data,
    });
  },
  // 详情通过
  submitEnsureOne(data) {
    return request({
      url: `/hdiFusion/bill/purchase/ensure`,
      method: 'post',
      data,
    });
  },
  // 批量通过
  submitEnsureInfo(data: any[]) {
    return request({
      url: `/hdiFusion/bill/purchase/ensure/batch`,
      method: 'post',
      data,
    });
  },
  submitClosePurchase(data) {
    return request({
      url: `/hdiFusion/bill/purchase/close`,
      method: 'post',
      data,
    });
  },
  validAndClose(data) {
    return request({
      url: `/hdiFusion/bill/purchase/validAndClose`,
      method: 'post',
      data,
    });
  },
  // 新增受托生产商接口
  trustManufacturerAdd(data) {
    return request({
      url: `/hdiFusion/goods/trustManufacturer/add`,
      method: 'post',
      data,
    });
  },
  // 查询受托生产商列表接口
  trustManufacturerList(data) {
    return request({
      url: `/hdiFusion/goods/trustManufacturer/list`,
      method: 'post',
      data,
    });
  },
};
export default orderDeliveryApi;
