import { request } from '@/utils/request';
const configurationApi = {
  // 医院名称
  getProHosList(data) {
    return request({
      url: `/hdiFusion/prov/reportAnalysis/reportStatistics/getProHosList`,
      method: 'post',
      data,
    });
  },
  //获取一级供应商(kind为1 的时候获取)
  gethosCollectorList(data) {
    return request({
      url: `/hdiFusion/prov/collector4orderMgr/hosCollector/hosCollectorList`,
      method: 'post',
      data,
    });
  },
  //获取一级供应商(kind不为1的时候获取)
  gethosProvInfoVoList(data) {
    return request({
      url: `/hdiFusion/prov/myGoods/provGoodsHosBatchMgrController/hosProvInfoVoList`,
      method: 'post',
      data,
    });
  },
  //列表
  getPrepGoodsConfigPage(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/getPrepGoodsConfigPage`,
      method: 'post',
      data,
    });
  },
  //保存
  getupdatePreGoodsConfig(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/updatePreGoodsConfig`,
      method: 'post',
      data,
    });
  },
  //停用
  getdeletePreGoodsConfigById(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/deletePreGoodsConfigById`,
      method: 'post',
      data,
    });
  },

  //分页查询还未备货产品
  getPrepGoodsNotConfigPage(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/getPrepGoodsNotConfigPage`,
      method: 'post',
      data,
    });
  },
  //新增备货产品
  getInsertPreGoodsConfig(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/insertPreGoodsConfig`,
      method: 'post',
      data,
    });
  },
  //批量设置货位
  getupdateBatchShlefCode(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/updateBatchShlefCode`,
      method: 'post',
      data,
    });
  },
  // 备货库存查询---一级供应商查询: gethosCollectorList
  // 备货库存查询/备货产品出库查询--出库明细查询---二级供应商查询
  getSubProvList(data) {
    return request({
      url: `/hdiFusion/prov/collector4orderMgr/hosCollectorProv/listVoExt`,
      method: 'post',
      data,
    });
  },
  // 备货库存查询---产品类型查询---枚举
  // 备货库存查询---生产厂商查询
  getPrepGoodsMfrsList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/getPrepGoodsMfrsList`,
      method: 'post',
      data,
    });
  },
  // 备货库存查询---备货库存分页列表查询
  getPrepGoodsPageList(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/getPrepGoodsConfigPage`,
      method: 'post',
      data,
    });
  },
  // 备货库存查询---导出
  exportPreGoodsExcel(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/exportExcelPreGoodsConfig`,
      method: 'post',
      data,
      responseType: 'blob',
      headers: { Accept: 'application/octet-stream' },
    });
  },
  // 备货库存查询---导出明细
  exportDetailsExcel(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepGoodsConfig/exportDetailsExcel`,
      method: 'post',
      data,
      responseType: 'blob',
      headers: { Accept: 'application/octet-stream' },
    });
  },
  // 备货库存查询---行操作查看(备货产品详情)
  getPrepGoodsDetail(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStockList/queryPrepCodeCheck`,
      method: 'post',
      data,
    });
  },
  // 备货库存查询---当前库存流水查看
  getOutOrInRecord(data) {
    return request({
      url: `/hdiFusion/orderMgr/prepInStockList/queryOutOrInRecord`,
      method: 'post',
      data,
    });
  },
};
export default configurationApi;
