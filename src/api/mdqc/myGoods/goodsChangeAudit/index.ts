import { request } from '@/utils/request';
const goodsInfoAudit = {
  //商品变更审核查询列表
  listChangeGoods(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/listChangeGoodsByPage',
      method: 'post',
      data,
    });
  },
  // 展开子表
  listChildGoods(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getGoodsChangeDetails',
      method: 'post',
      data,
    });
  },
  // 产品批量审核通过/驳回提交
  batchAuditChange(data, params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/batchAuditChange',
      method: 'post',
      data,
      params,
    });
  },
  // 产品单条驳回/单条通过提交
  auditChange(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/auditChange',
      method: 'post',
      data,
    });
  },
  //变更产品导出
  exportExcelChangeGoods(data) {
    return request({
      url: `/hdiFusion/goodsAuditBill/exportExcelChangeGoods`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },

  // 证照变更审核列表
  getUnAuditedList(data) {
    return request({
      url: `/hdiFusion/goodsAuditBill/getUnAuditedList`,
      method: 'post',
      data,
    });
  },
};
export default goodsInfoAudit;
