import { request } from '@/utils/request';
const goodsInfoApi = {
  // 院区下拉
  getHosList(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getBranch',
      method: 'post',
      data,
    });
  },
  // 查询列表
  getGoodsList(data, params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getAuditGoodsListByPage',
      method: 'post',
      data,
      params,
    });
  },
  //审核商品导出
  getAuditGoodsExport(data) {
    return request({
      url: `/hdiFusion/goodsAuditBill/getAuditGoodsExport`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },

  // 批量审核
  batchAuditByGoodsCert(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/batchAuditByGoodsCert',
      method: 'post',
      data,
    });
  },
  // 批量驳回
  batchRejectAudit(data, params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/batchRejectAudit',
      method: 'post',
      data,
      params,
    });
  },
  // 可展开列表
  batchRgetAuditGoodsList(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getAuditGoodsListByIds',
      method: 'post',
      data,
    });
  },
  // 单个审核
  singleAudit(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/singleAudit',
      method: 'post',
      data,
    });
  },
  //审核详情批量通过
  batchPassAuditDatail(data, params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/batchPassAudit',
      method: 'post',
      data,
      params,
    });
  },

  //证照类型 线上采购类别/新产品分类/储运条件/运输条件/字典
  getDictValueByDictEname(data) {
    return request({
      url: '/hdiFusion/sys/dict/getDictValueByDictEname',
      method: 'post',
      data,
    });
  },
  getOneHosProvCertificates(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getOneHosProvCertificates',
      method: 'post',
      data,
    });
  },
  // 销售代表
  getProvSalesRepList(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getProvSalesRepList',
      method: 'post',
      data,
    });
  },
  // 贯标承诺书
  getCns(params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getCns',
      method: 'get',
      params,
    });
  },
  // 获取医院商品准入证明
  getAccessCertByHosGoodsId(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getAccessCertByHosGoodsId',
      method: 'post',
      data,
    });
  },
  // 法人委托书
  getFrwtsByHosGoodsId(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getFrwtsByHosGoodsId',
      method: 'post',
      data,
    });
  },
  // 产品说明书
  getProductManualByHosGoodsId(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getProductManualByHosGoodsId',
      method: 'post',
      data,
    });
  },
  // 获取医院是否隐藏资质证书标志
  getGoodsAuditForm(params) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getGoodsAuditForm',
      method: 'get',
      params,
    });
  },
  getMcmsGoodsRegInfoList(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/getMcmsGoodsRegInfoList',
      method: 'post',
      data,
    });
  },
  //获取证照链路
  goodsJxsqsLink(data) {
    return request({
      url: '/hdiFusion/goodsAuditBill/hosGoodsJxsqsLink',
      method: 'post',
      data,
    });
  },
  getDictValue(data) {
    return request({
      url: '/hdiFusion/sys/dict/getDictValue',
      method: 'post',
      data,
    });
  },
};
export default goodsInfoApi;
