import { request } from '@/utils/request';

const initDataAuditApi = {
  getTableList(data) {
    return request({
      url: '/hdiFusion/import/goods/getGoodsBeginInfos',
      method: 'post',
      data,
    });
  },

  //初始数据审核导出
  downloadGoodsBeginInfos(data) {
    return request({
      url: `/hdiFusion/import/goods/downloadGoodsBeginInfos`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },

  //初始数据审核删除
  deleteTableList(params) {
    return request({
      url: '/hdiFusion/import/goods/deleteGoodsInfo',
      method: 'get',
      params,
    });
  },
  //初始数据批量删除
  deleteBatchTableList(data) {
    return request({
      url: '/hdiFusion/import/goods/batchDeleteGoodsInfo',
      method: 'post',
      data,
    });
  },

  //初审通过
  addTableList(data) {
    return request({
      url: '/hdiFusion/import/goods/importCurrentGoods',
      method: 'post',
      data,
    });
  },

  //批量审核通过
  addBatchTableList(data) {
    return request({
      url: '/hdiFusion/import/goods/importMultiGoods',
      method: 'post',
      data,
    });
  },

  //获取一级商信息（可通过医院或二级商来获取一级商信息）
  listProvInfoBySubProv(data) {
    return request({
      url: `/hdiFusion/supplyRelation/listProvInfoBySubProv`,
      method: 'post',
      data,
    });
  },
};

export default initDataAuditApi;
