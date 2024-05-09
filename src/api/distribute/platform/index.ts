import { request } from '@/utils/request';

const platformFollowApi = {
  /**跟台配送 **/
  // 跟台配送分页查询列表
  queryOperationPage(data) {
    return request({
      url: '/hdiFusion/bill/operation/page',
      method: 'post',
      data,
    });
  },
  // 跟台配送单据状态汇总
  queryOperationTotal(data) {
    return request({
      url: '/hdiFusion/bill/operation/status/total',
      method: 'post',
      data,
    });
  },
  // 跟台配送单详情 非组套
  queryOperationDetail(data) {
    return request({
      url: `/hdiFusion/bill/operation/one/${data.billId}`,
      method: 'get',
    });
  },
  // 跟台配送单详情 非组套 申请明细
  queryOperationDetailPage(data) {
    return request({
      url: '/hdiFusion/bill/operation/detail/page',
      method: 'post',
      data,
    });
  },
  // 跟台配送单详情 非组套 下一条
  queryOperationNext(data) {
    return request({
      url: '/hdiFusion/bill/operation/next',
      method: 'post',
      data,
    });
  },
  // 跟台配送单详情 单个确认
  operationEnsure(data) {
    return request({
      url: '/hdiFusion/bill/operation/ensure',
      method: 'post',
      data,
    });
  },
  // 跟台配送单详情 批量确认
  operationEnsureBatch(data) {
    return request({
      url: '/hdiFusion/bill/operation/ensure/batch',
      method: 'post',
      data,
    });
  },
  // 跟台配送单 配送 非组套 提交
  operationSubmit(data) {
    return request({
      url: '/hdiFusion/bill/distr/operation/submit',
      method: 'post',
      data,
    });
  },
  // 跟台配送单 配送 非组套 紧急配送 获取科室
  getDeptList(data) {
    return request({
      url: '/platformService/sys/org/f/v1/list',
      method: 'post',
      data,
    });
  },
  // 跟台配送单 配送 非组套 左侧不分页
  operationDetail(data) {
    return request({
      url: `/hdiFusion/bill/operation/detail/${data.billId}/${data.hosVersion}`,
      method: 'get',
    });
  },
  //跟台配送单 配送 非组套 导出模板
  operationExportTemplate(data) {
    return request({
      url: `/hdiFusion/bill/operation/export/template`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
  //跟台配送单 配送 非组套 导入
  operationImportBatch(data) {
    return request({
      url: `/hdiFusion/bill/operation/importBatch`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 3600000,
    });
  },
  // 跟台配送单 配送 非组套 扫码
  operationCode(data) {
    return request({
      url: '/hdiFusion/bill/barcode/operation/notice/analyse',
      method: 'post',
      data,
    });
  },
  // 不合格不动 配送 非组套 扫码
  operationReturnCode(data) {
    return request({
      url: '/hdiFusion/bill/barcode/operation/return/analyse',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单产品明细列表
  returnOperationDetail(data) {
    return request({
      url: `/hdiFusion/bill/return/operation/detail/${data.billId}`,
      method: 'get',
    });
  },
  // 不合格补送 手术跟台不合格补送-分页查询
  returnOperationPage(data) {
    return request({
      url: '/hdiFusion/bill/return/operationPage',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单-页签汇总
  returnOperationTotal(data) {
    return request({
      url: '/hdiFusion/bill/return/operationTotal',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单-详情
  returnOperationRtn(data) {
    return request({
      url: `/hdiFusion/bill/return/operationRtn/${data.billId}`,
      method: 'get',
    });
  },
  // 不合格补送 手术跟台退货单-详情 下一条
  returnOperationNext(data) {
    return request({
      url: '/hdiFusion/bill/return/nextOperation',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单-详情 退货明细分页
  returnOperationDetailPage(data) {
    return request({
      url: '/hdiFusion/bill/return/batch/page',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单-详情 退货明细分页 条码列表
  queryUniqueCodeList(data) {
    return request({
      url: '/hdiFusion/bill/return/queryUniqueCodeList',
      method: 'post',
      data,
    });
  },
  // 不合格补送 配送 提交
  operationReturnSubmit(data) {
    return request({
      url: '/hdiFusion/bill/distr/operation/return/submit',
      method: 'post',
      data,
    });
  },
  // 配送单 明细 列表
  operationDePage(data) {
    return request({
      url: '/hdiFusion/bill/distr/operation/detail/page',
      method: 'post',
      data,
    });
  },
  // 配送单 详情 非组套 下一页
  operationNext(data) {
    return request({
      url: '/hdiFusion/bill/distr/operation/next',
      method: 'post',
      data,
    });
  },
  // 不合格补送 手术跟台退货单-详情
  operationById(data) {
    return request({
      url: `/hdiFusion/bill/distr/operation/${data.id}`,
      method: 'get',
    });
  },
  // 紧急配送 组套非组套接口
  operationPkgFlag(data) {
    return request({
      url: '/hdiFusion/bill/operation/operationPkgFlag',
      method: 'post',
      data,
    });
  },
  // 组套 配送 查询所有组套名称
  getAllOperationPkg(data) {
    return request({
      url: '/hdiFusion/bill/operation/getAllOperationPkg',
      method: 'post',
      data,
    });
  },
  // 根据手术组套ID，获取当前供应商的组套产品
  getAllOperationPkgListByNoticeIdPage(data) {
    return request({
      url: `/hdiFusion/bill/operation/getAllOperationPkgListByNoticeIdPage`,
      method: 'post',
      data,
    });
  },
  // 2.0根据手术通知单id查询手术通知套包
  getAllOperationPkgListByNoticeId(data) {
    return request({
      url: `/hdiFusion/bill/operation/getAllOperationPkgListByNoticeId`,
      method: 'post',
      data,
    });
  },
  // 2.0根据手术通知单id查询手术通知套包
  getGZGoodsMfrsIdCertCodeList(data) {
    return request({
      url: `/hdiFusion/bill/operation/getGZGoodsMfrsIdCertCodeList`,
      method: 'post',
      data,
    });
  },
  // 组套 配送 暂存
  operationCache(data) {
    return request({
      url: '/hdiFusion/bill/operation/operationCache',
      method: 'post',
      data,
    });
  },
  // 2.0配送组套信息
  operationPkgList(data) {
    return request({
      url: '/hdiFusion/bill/operation/operationPkgList',
      method: 'post',
      data,
    });
  },
  // 2.0配送组套产品明细
  selectOperationDistrRecordGoods(data) {
    return request({
      url: '/hdiFusion/bill/operation/selectOperationDistrRecordGoods',
      method: 'post',
      data,
    });
  },
  // 2.0组套验证产品接口
  checkGoodsCertValidPeriodOperation(data) {
    return request({
      url: '/hdiFusion/bill/operation/checkGoodsCertValidPeriod',
      method: 'post',
      data,
    });
  },
  // 2.0组套配送
  add2(data) {
    return request({
      url: '/hdiFusion/bill/operation/add2',
      method: 'post',
      data,
    });
  },
  // 2.0组套配送获取产品列表
  listGoodsByPage(data) {
    return request({
      url: '/hdiFusion/bill/operation/listByPage',
      method: 'post',
      data,
    });
  },
  // 2.0配送组套产品明细条码查询
  selectOperDistrUDIList(data) {
    return request({
      url: '/hdiFusion/bill/operation/selectOperDistrUDIList',
      method: 'post',
      data,
    });
  },
  // 2.0获取二级供应商
  getHosCollectorProvVoCheckAllList(data) {
    return request({
      url: '/hdiFusion/bill/operation/getHosCollectorProvVoCheckAllList',
      method: 'post',
      data,
    });
  },
};
export default platformFollowApi;
